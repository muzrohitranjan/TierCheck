const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  role: { type: String, required: true },
  tier: { type: String, required: true }
});

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  badge: { type: String, required: true },
  badgeClass: { type: String, required: true },
  t1: { type: Number, required: true, min: 0, max: 100 },
  t2: { type: Number, required: true, min: 0, max: 100 },
  t3: { type: Number, required: true, min: 0, max: 100 },
  t4: { type: Number, required: true, min: 0, max: 100 },
  roles: [roleSchema],
  verified: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);
