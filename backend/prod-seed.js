require('dotenv').config();
const { seedDatabase } = require('./seed');

async function main() {
  try {
    console.log('🚀 Direct production seed starting...');
    
    const result = await seedDatabase({
      reset: true,
      connect: true,
      disconnect: true,
      mongoUri: process.env.MONGO_URI
    });
    
    console.log('✅ SEED SUCCESS!');
    console.log('Inserted:', result.inserted);
    console.log('Final counts:', result.after);
    process.exit(0);
  } catch (err) {
    console.error('❌ SEED FAILED:', err.message);
    process.exit(1);
  }
}

main();

