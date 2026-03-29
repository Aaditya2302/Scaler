import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Cleaning up database...');
  await prisma.cartItem.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.review.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  console.log('Seeding categories...');
  const categoryData = [
    { name: 'Electronics', slug: 'electronics' },
    { name: 'Home', slug: 'home' },
    { name: 'Fashion & Sports', slug: 'fashion-sports' },
    { name: 'Office Products', slug: 'office-products' },
    { name: 'Deals', slug: 'deals' },
    { name: 'Best Sellers', slug: 'best-sellers' },
    { name: 'Small Business', slug: 'small-business' }
  ];

  const categories = {};
  for (const cat of categoryData) {
    categories[cat.name] = await prisma.category.create({ data: cat });
  }

  console.log('Seeding products...');
  const productData = [
    // Card 1: deals_saved
    { id: '1', name: 'Solid Wood Dining Table', slug: 'table-1', price: 12500, description: 'Rustic solid wood dining table for 6. Durable and elegant.', categoryId: categories['Home'].id, images: ['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=400&fit=crop'], stock: 15 },
    { id: '2', name: 'Premium Cotton Hoodie', slug: 'hoodie-1', price: 1999, description: 'Soft and warm cotton hoodie. Perfect for winter.', categoryId: categories['Fashion & Sports'].id, images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop'], stock: 100 },
    { id: '3', name: "Men's Half Zip Sweatshirt", slug: 'half-zip-1', price: 2499, description: 'Stylish half zip sweatshirt for casual wear.', categoryId: categories['Fashion & Sports'].id, images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop'], stock: 80 },
    { id: '4', name: 'Lightweight Puffer Jacket', slug: 'jacket-1', price: 4500, description: 'Warm and lightweight jacket for extreme cold.', categoryId: categories['Fashion & Sports'].id, images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop'], stock: 45 },
    
    // Card 2: revamp_home
    { id: 'revamp-1', name: 'Luxury Cushion Covers', slug: 'cushions-1', price: 899, description: 'Set of 4 luxury velvet cushion covers.', categoryId: categories['Home'].id, images: ['https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=800&fit=crop'], stock: 200 },
    { id: 'revamp-2', name: 'Ceramic Figurines', slug: 'figurines-1', price: 1200, description: 'Handcrafted ceramic figurines for home decor.', categoryId: categories['Home'].id, images: ['https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&h=800&fit=crop'], stock: 60 },
    { id: 'revamp-3', name: 'Smart Storage Bin', slug: 'storage-1', price: 2500, description: 'Decorative home storage bins.', categoryId: categories['Home'].id, images: ['https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800&h=800&fit=crop'], stock: 150 },
    { id: 'revamp-4', name: 'Modern Pendant Light', slug: 'light-1', price: 3500, description: 'Elegant lighting solutions for your living room.', categoryId: categories['Home'].id, images: ['https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&h=800&fit=crop'], stock: 30 },

    // Card 3: up_to_60
    { id: 'shoes-1', name: 'Nike Revolution 6', slug: 'nike-shoes-1', price: 3695, description: 'Comfortable running shoes for men.', categoryId: categories['Fashion & Sports'].id, images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop'], stock: 50 },
    { id: 'shoes-2', name: 'Adidas Ultraboost', slug: 'adidas-shoes-1', price: 17999, description: 'High performance running shoes.', categoryId: categories['Fashion & Sports'].id, images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=800&fit=crop'], stock: 25 },
    { id: 'shoes-3', name: 'Women Stilettos', slug: 'woman-shoes-1', price: 4500, description: 'Elegant evening footwear.', categoryId: categories['Fashion & Sports'].id, images: ['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&h=800&fit=crop'], stock: 40 },
    { id: 'shoes-4', name: 'Lavie Handbag', slug: 'handbag-1', price: 2999, description: 'Stylish and spacious women handbag.', categoryId: categories['Fashion & Sports'].id, images: ['https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&h=800&fit=crop'], stock: 100 },

    // Card 4: up_to_75
    { id: '5', name: 'Sony WH-CH720N', slug: 'sony-headphones-1', price: 9990, description: 'Noise cancelling over-ear headphones.', categoryId: categories['Electronics'].id, images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=800&fit=crop'], stock: 120 },

    // Amazon LIVE & others
    { id: '10', name: 'Classic Leather Boots', slug: 'boots-1', price: 5499, description: 'Sturdy and stylish leather boots.', categoryId: categories['Fashion & Sports'].id, images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop'], stock: 50 },
    { id: '11', name: 'Yellow Summer Dress', slug: 'dress-1', price: 1599, description: 'Breezy cotton summer dress.', categoryId: categories['Fashion & Sports'].id, images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=150&h=150&fit=crop'], stock: 75 },
    { id: '12', name: 'Denim Jacket', slug: 'jacket-2', price: 3299, description: 'Classic blue denim jacket.', categoryId: categories['Fashion & Sports'].id, images: ['https://images.unsplash.com/photo-1523206489230-c6224c5bbd69?w=150&h=150&fit=crop'], stock: 60 },
    { id: '13', name: 'Formal White Shirt', slug: 'shirt-1', price: 1299, description: 'Crisp white formal shirt.', categoryId: categories['Fashion & Sports'].id, images: ['https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=150&h=150&fit=crop'], stock: 100 },

    { id: 'school-1', name: 'Hardbound Notebooks', slug: 'notes-1', price: 499, description: 'Premium hardbound notebooks for students.', categoryId: categories['Office Products'].id, images: ['https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&h=800&fit=crop'], stock: 500 },
    { id: 'school-2', name: 'Educational Book Set', slug: 'books-1', price: 1499, description: 'Comprehensive school book collection.', categoryId: categories['Office Products'].id, images: ['https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=800&fit=crop'], stock: 200 },
    { id: 'school-3', name: 'Exam Prep Kit', slug: 'bundle-1', price: 899, description: 'Stationery bundles for exam preparation.', categoryId: categories['Office Products'].id, images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop'], stock: 300 },
    { id: 'school-4', name: 'Deluxe Writing Set', slug: 'writing-1', price: 350, description: 'Pens, pencils and ergonomic supplies.', categoryId: categories['Office Products'].id, images: ['https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&h=800&fit=crop'], stock: 400 },

    { id: 'small-biz-1', name: 'Handmade Soap Set', slug: 'soap-1', price: 699, description: 'Organic handmade soap bars.', categoryId: categories['Small Business'].id, images: ['https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&h=800&fit=crop'], stock: 100 },
    { id: 'small-biz-2', name: 'Artisanal Candle', slug: 'candle-1', price: 499, description: 'Scented artisanal candles for relaxation.', categoryId: categories['Small Business'].id, images: ['https://images.unsplash.com/photo-1506410591915-e3d4eb1578e0?w=800&h=800&fit=crop'], stock: 150 },
    { id: 'small-biz-3', name: 'Woven Table Runner', slug: 'runner-1', price: 850, description: 'Handcrafted woven table runner.', categoryId: categories['Small Business'].id, images: ['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&h=800&fit=crop'], stock: 50 },
    { id: 'small-biz-4', name: 'Wooden Plant Pot', slug: 'pot-1', price: 1200, description: 'Eco-friendly wooden plant pots.', categoryId: categories['Small Business'].id, images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop'], stock: 80 },

    { id: 'home-ess-1', name: 'Egyptian Cotton Sheets', slug: 'sheets-1', price: 2999, description: 'High thread count Egyptian cotton bedsheets.', categoryId: categories['Home'].id, images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop'], stock: 120 },
    { id: 'home-ess-2', name: 'Memory Foam Pillow', slug: 'pillow-1', price: 1499, description: 'Ergonomic pillow for better sleep.', categoryId: categories['Home'].id, images: ['https://images.unsplash.com/photo-1516733725897-1563dc22283a?w=800&h=800&fit=crop'], stock: 200 },
    { id: 'home-ess-3', name: 'Plush Microfiber Towel', slug: 'towel-1', price: 599, description: 'Super absorbent microfiber towels.', categoryId: categories['Home'].id, images: ['https://images.unsplash.com/photo-1416862291207-4ca732144d83?w=800&h=800&fit=crop'], stock: 300 },
    { id: 'home-ess-4', name: 'Glass Coffee Pot', slug: 'coffeepot-1', price: 1199, description: 'Heat resistant glass carafes.', categoryId: categories['Home'].id, images: ['https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&h=800&fit=crop'], stock: 150 },



    { id: 'bestseller-1', name: 'Durable Wristwatch', slug: 'watch-1', price: 7999, description: 'Stylish and durable analog watch.', categoryId: categories['Best Sellers'].id, images: ['https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=200&h=200&fit=crop'], stock: 100 },
    { id: 'bestseller-2', name: 'Smart TV 55 Inch', slug: 'tv-1', price: 45000, description: '4K Ultra HD smart television.', categoryId: categories['Best Sellers'].id, images: ['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=200&fit=crop'], stock: 20 },
    { id: 'bestseller-3', name: 'Canon DSLR Camera', slug: 'camera-1', price: 55000, description: 'Professional grade DSLR camera with lens.', categoryId: categories['Best Sellers'].id, images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&h=200&fit=crop'], stock: 15 },
    { id: 'bestseller-4', name: 'Comfortable Yoga Mat', slug: 'yoga-1', price: 1199, description: 'Non-slip grip yoga mat for exercises.', categoryId: categories['Best Sellers'].id, images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=200&h=200&fit=crop'], stock: 300 },
    { id: 'bestseller-5', name: 'Stainless Steel Pot', slug: 'pot-2', price: 1599, description: 'Premium stainless steel cooking pot.', categoryId: categories['Best Sellers'].id, images: ['https://images.unsplash.com/photo-1584990347449-a6e812f8e136?w=200&h=200&fit=crop'], stock: 200 }
  ];

  // Adding generic products for "live", "related", and remaining bestsellers
  for (let i = 1; i <= 8; i++) {
    productData.push({
      id: `live-${i}`,
      name: `Live Deal Product ${i}`,
      slug: `live-deal-${i}`,
      price: 1999 + i * 100,
      description: 'Exclusive deal from Amazon LIVE session.',
      categoryId: categories['Deals'].id,
      images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop'],
      stock: 50
    });
  }

  for (let i = 1; i <= 6; i++) {
    productData.push({
      id: `related-${i}`,
      name: `Related Item ${i}`,
      slug: `related-item-${i}`,
      price: 1000 + i * 200,
      description: 'Product related to your current view.',
      categoryId: categories['Best Sellers'].id,
      images: ['https://images.unsplash.com/photo-1556821839-440d9df764f6?w=200&h=200&fit=crop'],
      stock: 100
    });
  }

  // Seeding products
  await prisma.product.createMany({
    data: productData.map(p => ({
        ...p,
        rating: 4.0 + Math.random(),
        numReviews: Math.floor(Math.random() * 5000)
    }))
  });

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

