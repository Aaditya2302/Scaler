import express from 'express';
import prisma from '../utils/prisma.js';

const router = express.Router();

// Helper to get a default user for guest operations
async function getGuestUser() {
  let user = await prisma.user.findFirst();
  if (!user) {
    user = await prisma.user.create({
      data: { name: 'Guest', email: 'guest@example.com', password: 'xyz' }
    });
  }
  return user.id;
}

// GET /api/cart
router.get('/', async (req, res) => {
  try {
    const userId = req.headers['userid'] || await getGuestUser();
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true }
    });
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/cart
router.post('/', async (req, res) => {
  try {
    const userId = req.headers['userid'] || await getGuestUser();
    const { productId, quantity } = req.body;
    
    // Check if already in cart
    const existing = await prisma.cartItem.findFirst({
      where: { userId, productId }
    });

    if (existing) {
      const updated = await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity }
      });
      return res.json(updated);
    } else {
      const newItem = await prisma.cartItem.create({
        data: { userId, productId, quantity }
      });
      return res.status(201).json(newItem);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/cart/:productId
router.put('/:productId', async (req, res) => {
  try {
    const userId = req.headers['userid'] || await getGuestUser();
    const { quantity } = req.body;
    const { productId } = req.params;
    
    const existing = await prisma.cartItem.findFirst({
      where: { userId, productId }
    });
    
    if (existing) {
      const updated = await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity }
      });
      return res.json(updated);
    }
    res.status(404).json({ error: "Cart item not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/cart/:productId
router.delete('/:productId', async (req, res) => {
  try {
    const userId = req.headers['userid'] || await getGuestUser();
    const { productId } = req.params;
    
    // Delete all cart items for this product and user
    await prisma.cartItem.deleteMany({
      where: { userId, productId }
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/cart
router.delete('/', async (req, res) => {
  try {
    const userId = req.headers['userid'] || await getGuestUser();
    await prisma.cartItem.deleteMany({
      where: { userId }
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
