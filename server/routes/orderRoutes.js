import express from 'express';
import prisma from '../utils/prisma.js';

const router = express.Router();

// POST /api/orders
router.post('/', async (req, res) => {
  try {
    const { items, total, tax, shippingAddress, userId } = req.body;
    
    // Basic validation
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in order' });
    }

    // Default fallback user if userId is not provided (for guest checkout)
    let userRecord = await prisma.user.findFirst();
    if (!userRecord) {
      userRecord = await prisma.user.create({
        data: {
          name: 'Guest User',
          email: 'guest@example.com',
          password: 'securepassword123'
        }
      });
    }
    
    const uId = userId || userRecord.id;

    const order = await prisma.order.create({
      data: {
        totalAmount: total,
        shippingAddress: JSON.stringify(shippingAddress),
        user: { connect: { id: uId } },
        status: "SHIPPED",
        orderItems: {
          create: items.map(item => ({
            quantity: item.quantity,
            price: item.price,
            product: { connect: { id: item.id } }
          }))
        }
      }
    });

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/orders
router.get('/', async (req, res) => {
  try {
    let uId = req.headers['userid'];
    if (!uId) {
      let userRecord = await prisma.user.findFirst();
      if (!userRecord) {
        userRecord = await prisma.user.create({
          data: {
            name: 'Guest User',
            email: 'guest@example.com',
            password: 'securepassword123'
          }
        });
      }
      uId = userRecord.id;
    }
    
    const orders = await prisma.order.findMany({
      where: { userId: uId },
      include: {
        orderItems: {
          include: { product: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
