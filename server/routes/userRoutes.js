import express from 'express';
import prisma from '../utils/prisma.js';

const router = express.Router();

// GET /api/users/profile
router.get('/profile', async (req, res) => {
  try {
    const userId = req.headers['userid'];
    let user;
    
    if (userId) {
      user = await prisma.user.findUnique({
        where: { id: userId },
        include: { addresses: true }
      });
    }

    if (!user) {
      // Fallback to first user or create guest
      user = await prisma.user.findFirst({
        include: { addresses: true }
      });
      
      if (!user) {
        user = await prisma.user.create({
          data: {
            name: 'Aaditya Sharma',
            email: 'aaditya@example.com',
            password: 'securepassword123',
            role: 'CUSTOMER'
          },
          include: { addresses: true }
        });
      }
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
