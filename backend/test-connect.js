require('dotenv').config();
const mongoose = require('mongoose');

console.log('MONGO_URI:', process.env.MONGO_URI ? 'Set' : 'MISSING');

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    mongoose.connection.db.listCollections().toArray((err, collections) => {
      if (err) console.error('Collections error:', err);
      else console.log('Collections:', collections.map(c => c.name));
      mongoose.connection.close();
    });
  })
  .catch(err => console.error('❌ Connection failed:', err.message));

