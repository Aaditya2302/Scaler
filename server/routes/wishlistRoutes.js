import express from 'express';
import prisma from '../utils/prisma.js';

const router = express.Router();

// Helper to get a default user for guest operations
async function getGuestUser() {
  let user = await prisma.user.findFirst();
  if (!user) {
    user = await prisma.user.create({
      data: { name: 'Guest User', email: 'guest@example.com', password: 'securepassword123' }
    });
  }
  return user.id;
}

// GET /api/wishlist
router.get('/', async (req, res) => {
  try {
    const userId = req.headers['userid'] || await getGuestUser();
    const items = await prisma.wishlistItem.findMany({
      where: { userId },
      include: { product: true }
    });
    res.json(items);
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/wishlist
router.post('/', async (req, res) => {
  try {
    const userId = req.headers['userid'] || await getGuestUser();
    const { productId } = req.body;
    
    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    // Check if already in wishlist
    const existing = await prisma.wishlistItem.findFirst({
      where: { userId, productId }
    });

    if (existing) {
      return res.json(existing);
    }

    const newItem = await prisma.wishlistItem.create({
      data: { userId, productId }
    });
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/wishlist/:productId
router.delete('/:productId', async (req, res) => {
  try {
    const userId = req.headers['userid'] || await getGuestUser();
    const { productId } = req.params;
    
    await prisma.wishlistItem.deleteMany({
      where: { userId, productId }
    });
    res.json({ success: true });
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
