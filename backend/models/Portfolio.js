const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    githubUsername: {
      type: String,
      required: true,
      trim: true
    },
    title: {
      type: String,
      default: 'My Developer Portfolio'
    },
    bio: {
      type: String,
      default: ''
    },
    skills: [
      {
        name: String,
        category: { type: String, default: 'General' }
      }
    ],
    projects: [
      {
        name: String,
        description: String,
        language: String,
        stars: Number,
        forks: Number,
        url: String,
        featured: { type: Boolean, default: true }
      }
    ],
    theme: {
      type: String,
      enum: ['dark', 'light', 'cyberpunk', 'minimal'],
      default: 'dark'
    },
    isPublished: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Portfolio', portfolioSchema);