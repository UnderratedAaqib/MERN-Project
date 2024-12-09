import express from 'express';
import { registerUser, loginUser, updateProfile,getUserProfile,addPublication,getUserPublications,updatePublication,deletePublication } from '../controllers/userDataController.js';
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
export default router;
