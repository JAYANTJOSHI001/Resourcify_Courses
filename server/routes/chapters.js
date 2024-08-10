import express from 'express';
import { Chapters } from '../models/Chapters.js';

const router = express.Router();

// Create a new course
router.post('/', async (req, res) => {
  try {
    const { title, description, tags , courseTitle} = req.body;
    const notes = req.files?.notes ? req.files.notes[0].path : null;
    const video = req.files?.video ? req.files.video[0].path : null;

    const newCourse = new Chapters({ title, description, tags, notes, video, courseTitle });
    await newCourse.save();

    res.status(201).json(newCourse);
  } catch (err) {
    console.error('Error creating course:', err); // Log the error
    res.status(500).json({ error: err.message });
  }
});

// Fetch all chapters
router.get('/', async (req, res) => {
  try {
    const chapters = await Chapters.find();
    res.status(200).json(chapters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a course by ID
router.delete('/by-title/:title', async (req, res) => {
  try {
    const title = req.params.title;
    const chapter = await Chapters.findOneAndDelete({ title });

    if (!chapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }

    res.status(200).json({ message: 'Chapter deleted' });
  } catch (err) {
    console.error('Error deleting chapter:', err);
    res.status(500).json({ error: err.message });
  }
});

// Update chapter completion status
router.post('/complete', async (req, res) => {
  console.log("Ya bro i am here.");
  try {
    const id = req.body.chapterId;
    console.log('This is id i am getting: ', id);
    const chapter = await Chapters.findByIdAndUpdate(id, { completed: true }, { new: true });

    if (!chapter) {
      return res.status(500).json({ message: 'Chapter not found' });
    }

    res.status(200).json({ message: 'Chapter marked as completed', chapter });
  } catch (err) {
    console.error('Error updating chapter:', err);
    res.status(500).json({ error: err.message });
  }
});

export { router as ChapterRouter };
