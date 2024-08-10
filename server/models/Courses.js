import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  tags: {
    type: [String],
  },
  chapters: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapters'
  }],
  introVideo: {
    type: String,
  },
  enrolledBy: {
    type: [String], // Change from String to [String]
    default: [], // Set default value as an empty array
  },
});

const Course = mongoose.model('Course', courseSchema);

export { Course };
