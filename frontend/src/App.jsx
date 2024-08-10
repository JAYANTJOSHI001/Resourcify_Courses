import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes
} from 'react-router-dom'

// layouts and pages
import RootLayout from './layouts/RootLayout'
import Home from './pages/home/Home'
import About from './pages/about/About'
import Pricingpage from './pages/pricing/Pricing'
import Contact from './pages/contact/Contact'
import Course from './pages/courses/Courses'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup';
import Coursedetails from './pages/courses/details/Coursedetails';
import Forgotpassword from './pages/login/Forgotpassword';
import Resetpassword from './pages/login/ResetPassword';
import ErrPage from './pages/404/404'
import CourseEditor from './pages/Dashboard/CourseEditor';
import CChapterEditor from './pages/Dashboard/CChapterEditor';
import CCourses from './pages/Dashboard/CCourses';
import CAnalytics from './pages/Dashboard/CAnalytics';
import SECourses from './pages/Dashboard/SECourses';
import SCompCourses from './pages/Dashboard/SCompCourses'
import SBrowse from './pages/Dashboard/SBrowse';
import CourseView from './pages/courses/CourseView/CourseView';
import ChapterView from './pages/courses/CourseView/ChapterView';
import Profile from './pages/profile/Profile';
import Educator1 from './pages/educator/educator1';
import CourseEStart from './pages/Dashboard/CourseEStart';
import CMCourses from './pages/Dashboard/CMCourses';
import CCourseView from './pages/courses/CourseView/CCourseView';
import CChapterView from './pages/courses/CourseView/CChapterView';

// router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="pricing" element={<Pricingpage />} />
      <Route path="courses" element={<Course />} />
      <Route path="courses/:id" element={<Coursedetails />}/>
      <Route path="contact" element={<Contact />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path='forgotPassword' element={<Forgotpassword />} />
      <Route path='resetPassword/:token' element={<Resetpassword />} />
      <Route path="*" element={<ErrPage />} />
      <Route path='edit-course/:id' element={<CourseEStart/>} />
      <Route path='dashboard/:id' element={<CMCourses/>} />        
      <Route path="edit-course/:id/:title" element={<CourseEditor />} />
      <Route path="edit-course/:id/:title/chapter/" element={<CChapterEditor />}/>
      <Route path="chapter-courses" elemtnt={<CCourses />} />
      <Route path="user-analytics/:id" element={<CAnalytics />} />
      <Route path="student-courses/:uid/enrolled" element={<SECourses />}  />
      <Route path="student-courses/:uid/completed" element={<SCompCourses />} />
      <Route path=":uid/student-browse" element={<SBrowse />}  />
      <Route path='course/:uid/:cid' element={<CourseView/>} />
      <Route path='see-course/:uid/:cid' element={<CCourseView/>} />
      <Route path='see-course/:uid/:cid/:chid' element={<CChapterView/>} />
      <Route path='course/:uid/:cid/:chid' element={<ChapterView/>} />
      <Route path='profile/:uid' element={<Profile/>} />
      <Route path='educator' element={<Educator1/>} /> 
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
