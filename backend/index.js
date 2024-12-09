import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userDataRoutes from './routes/userDataRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)

// MongoDB connection setup
const connectDB = async () => {
  try {
    // Get MongoDB URI from environment variables
    const uri = process.env.MONGO_URI;
    if (!uri) {
      console.error('MONGODB_URI is not defined in .env');
      return;
    }

    // Connect to MongoDB (No need for `useNewUrlParser` or `useUnifiedTopology` options)
    await mongoose.connect(uri);

    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
  }
};

// Call the MongoDB connection function
connectDB();

// Use the routes for user-related API requests
app.use('/api/users', userDataRoutes); // Set route prefix

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
