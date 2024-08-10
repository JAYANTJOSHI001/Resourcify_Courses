import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { User } from './models/User.js';
import { dirname } from 'path';
import { CourseRouter } from './routes/courses.js';
import { UserRouter } from './routes/user.js';
import { ChapterRouter } from './routes/chapters.js';
import { Course } from './models/Courses.js';



// Initialize environment variables
dotenv.config();
console.log(process.env.MONGODB_URL);
// Create express app
const app = express();

// Middleware

app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

// Define __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
const uri = process.env.MONGODB_URL;


// Connect to MongoDB
mongoose.connect(uri)
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

mongoose.set('debug', true);

const upload = multer({ storage });

app.post('/courses/course', async (req, res) => {
  console.log("hello, i am here");
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
const upload1 = multer({ storage: storage }).fields([
  { name: 'introVideo', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 }
]);

app.post('/auth/courses/enroll', async (req, res) => {
  const { userId, courseId } = req.body;
  console.log("Request body:", req.body);

  try {
    // Find the course by ID
    const course = await Course.findById(courseId);
    if (!course) {
      console.error("Course not found:", courseId);
      return res.status(400).json({ message: 'Course not found' });
    }
    console.log("Course found:", course);

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      console.error("User not found:", userId);
      return res.status(400).json({ message: 'User not found' });
    }
    console.log("User found:", user);

    // Add the course title to the user's enrolled courses
    if (!course.enrolledBy) {
      course.enrolledBy = []; // Initialize the array if it doesn't exist
    }
    course.enrolledBy.push(user.username);

    // Save the updated course
    await course.save();
    console.log("Course updated and saved:", course);

    res.status(200).json({ message: 'Course enrolled successfully', user });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ message: 'An error occurred', error });
  }
});


app.put('/courses', upload1, async (req, res) => {
  try {
    console.log('Received a request to /courses');
    console.log('Request body:', req.body);

    const { title, description, tags, chapters } = req.body;
    const thumbnail = req.files['thumbnail'] ? req.files['thumbnail'][0].path : null;
    const introVideo = req.files['introVideo'] ? req.files['introVideo'][0].path : null;

    // Validate required fields
    if (!title || !description) {
      console.log('Validation error: Title and description are required');
      return res.status(400).send({ message: 'Title and description are required' });
    }

    // Parse JSON strings to JavaScript objects
    const parsedTags = JSON.parse(tags);
    const parsedChapters = JSON.parse(chapters);

    // Find the course by title
    let course = await Course.findOne({ title });

    if (!course) {
      console.log('Course not found, creating a new course');
      course = new Course({
        title,
        description,
        tags: parsedTags,
        chapters: parsedChapters,
        thumbnail: thumbnail ? thumbnail.toString() : '', // Ensure thumbnail is a string
        introVideo: introVideo ? introVideo.toString() : '' // Ensure introVideo is a string
      });
    } else {
      console.log('Course found, updating existing course');
      course.description = description;
      course.tags = parsedTags;
      course.chapters = parsedChapters;
      course.thumbnail = thumbnail ? thumbnail.toString() : ''; // Ensure thumbnail is a string
      course.introVideo = introVideo ? introVideo.toString() : ''; // Ensure introVideo is a string
    }

    await course.save();

    console.log('Course saved:', course);
    res.status(200).send(course);
  } catch (error) {
    console.error('Error saving course details:', error);
    res.status(500).send({ message: 'Error saving course details' });
  }
});

// Define upload fields for courses and chapters
const avatarUpload = upload.single('avatar');
const courseUpload = upload.fields([{ name: 'thumbnail' }]);
const chapterUpload = upload.fields([{ name: 'notes' }, { name: 'video' }]);
// app.use('/courses',CourseRouter);
app.use(express.json());
app.use(cors());

app.use('/auth/courses', CourseRouter);
app.use('/courses', courseUpload, CourseRouter);
app.use('/chapters', chapterUpload, ChapterRouter);
app.use('/chapters', ChapterRouter);
app.use('/auth', UserRouter);
app.use('/auth/*', UserRouter);

// Start server on a single port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
