const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  location: { type: String, required: true },
  tier: { type: String, required: true },
  worth: { type: String, enum: ['yes', 'maybe', 'no'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
