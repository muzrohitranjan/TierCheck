const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  college: { type: String, required: true },
  tier: { type: Number, required: true, min: 1, max: 4 },
  company: { type: String, required: true },
  role: { type: String, required: true },
  year: { type: Number, required: true },
  type: { type: String, enum: ['Campus', 'Off-Campus', 'Internship', 'Referral'], required: true },
  reviewed: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Submission', submissionSchema);
