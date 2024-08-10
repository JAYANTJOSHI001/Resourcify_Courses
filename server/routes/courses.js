import express from 'express';
import multer from 'multer';
import { Course } from '../models/Courses.js';
import { User } from '../models/User.js';

const router = express.Router();
const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../src/images/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/courses", upload.single("image"), async (req, res) => {
  console.log("console req body",req.body);
  const imageName = req.file.filename;
  console.log(imageName);

  try {
    const temp = await Images.create({ thumbnail: imageName });
    console.log("console log temp",temp);
    res.status(200).json({ status: "ok" });
  } catch (error) {
    res.status(500).json({ status: error });
  }
});

router.post('/enroll', async (req, res) => {
  const { userId, courseId } = req.body;
  console.log("this is req", req.body);

  try {
      // Find the user by ID
      const course = await Course.findById(userId);
      if (!course) {
          return res.status(404).json({ message: 'Course not found' });
      }

      // Find the course by ID
      const user = await User.findById(courseId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Add the course title to the user's enrolled courses
      course.enrolledBy.push(user.username);

      // Save the updated user
      await course.save();

      res.status(200).json({ message: 'Course enrolled successfully', user });
  } catch (error) {
      res.status(500).json({ message: 'An error occurred', error });
  }
});

app.post('/course', async (req, res) => {
  const { title } = req.body;

  if (!title) {
      return res.status(400).json({ message: 'Course title is required.' });
  }

  try {
      const course = new Course({
          title,
          description: '', // Provide default value
          thumbnail: '', // Provide default value
          tags: [], // Provide default value
          chapters: [] // Provide default value
      });

      await course.save();
      res.status(201).json({ message: 'Course title added successfully.', course });
  } catch (error) {
      console.error('Error adding course:', error);
      res.status(500).json({ message: 'An error occurred while adding the course title.' });
  }
});

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).send(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).send({ message: 'Error fetching courses', error });
  }
});

// Get a course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).send({ message: 'Course not found' });
    }
    res.status(200).send(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).send({ message: 'Error fetching course', error });
  }
});

// Update a course by ID
router.put('/:id', async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const thumbnail = req.files ? req.files.thumbnail[0].path : null;

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { title, description, thumbnail, tags },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).send({ message: 'Course not found' });
    }

    res.status(200).send(updatedCourse);
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).send({ message: 'Error updating course', error });
  }
});

// Delete a course by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);

    if (!deletedCourse) {
      return res.status(404).send({ message: 'Course not found' });
    }

    res.status(200).send({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).send({ message: 'Error deleting course', error });
  }
});

export { router as CourseRouter };
