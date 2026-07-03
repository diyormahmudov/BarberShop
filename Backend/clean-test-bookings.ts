import { PrismaClient } from '@prisma/client';

// Set DATABASE_URL
process.env.DATABASE_URL = 'file:/var/www/barber/Backend/dev.db';

const prisma = new PrismaClient();

async function cleanTestBookings() {
  try {
    console.log('🗑️  Cleaning test bookings from database...');
    
    // Get all bookings
    const allBookings = await prisma.form.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    console.log(`📊 Found ${allBookings.length} total bookings`);
    
    if (allBookings.length === 0) {
      console.log('✅ No bookings to clean');
      return;
    }
    
    // Display bookings before deletion
    console.log('\n📋 Bookings to be deleted:');
    allBookings.forEach((booking, index) => {
      console.log(`${index + 1}. ${booking.clientName} - ${booking.service} (${new Date(booking.time).toLocaleString()})`);
    });
    
    // Delete all bookings
    const result = await prisma.form.deleteMany({});
    console.log(`\n✅ Deleted ${result.count} bookings`);
    
    // Also delete notifications
    const notificationResult = await prisma.notification.deleteMany({});
    console.log(`✅ Deleted ${notificationResult.count} notifications`);
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

cleanTestBookings();
