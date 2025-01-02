import express from 'express';
import { registerUser, loginUser, updateProfile,getUserProfile,addPublication,getUserPublications,updatePublication,deletePublication,addCourse,deleteCourse,getCourses,getProjects,addProject,deleteProject,addTalk,getTalks,deleteTalk,getMediaArticles,addMediaArticle,deleteMediaArticle,getSocialDetails,updateSocialDetails, getAllUserData} from '../controllers/userDataController.js';

import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Login a user
router.post('/login', loginUser);

// Update user's profile (protected route)
router.put('/profile', protect, updateProfile);

router.get('/profile', protect, getUserProfile);



// Add a new publication (protected route)
router.post('/publications', protect, addPublication);

// Get all publications for the logged-in user (protected route)
router.get('/publications', protect, getUserPublications);

// Update a publication (protected route)
router.put('/publications', protect, updatePublication);

// Delete a publication (protected route)
router.delete('/publications/:publicationId', protect, deletePublication);


//teaching portfolio
router.get('/courses', protect, getCourses); 
router.post('/courses', protect, addCourse);
router.delete('/courses/:courseId', protect, deleteCourse);




// Get all projects for the logged-in user
router.get('/projects', protect, getProjects);

// Add a new project for the logged-in user
router.post('/projects', protect, addProject);

// Delete a project by ID
router.delete('/projects/:projectId', protect, deleteProject);


router.get('/talks', protect, getTalks); // Fetch all talks for the user
router.post('/talks', protect, addTalk); // Add a new talk
router.delete('/talks/:talkId', protect, deleteTalk); 



//for mediacoverage routes
router.get('/media', protect, getMediaArticles);

// Add a new media article for the logged-in user
router.post('/media', protect, addMediaArticle);

// Delete a media article by ID
router.delete('/media/:articleId', protect, deleteMediaArticle);

//social details
router.get('/social', protect, getSocialDetails); // Fetch social details (LinkedIn, GitHub, email)
router.put('/social', protect, (req, res, next) => {
    console.log("PUT /social route hit");
    next();
  }, updateSocialDetails);
  

// Fetch all user data
router.get('/all-data', protect, getAllUserData); // New route

export default router;
