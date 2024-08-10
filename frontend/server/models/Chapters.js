import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  notes: { 
    type: String 
  },
  video: { 
    type: String 
  }, 
  courseTitle:{
    type: String
  },
  tags: [{ type: String }],  // Array of tags
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const ChapterModel = mongoose.model('Chapter', chapterSchema);

export {ChapterModel as Chapters}