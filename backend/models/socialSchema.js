import mongoose from 'mongoose';

// Define the schema for Social data with userId, email (referencing UserData), LinkedIn, and GitHub
const socialSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserData', required: true }, // Reference to UserData
    //  // Email field from UserData
    linkedIn: { type: String, required: false }, // LinkedIn URL
    github: { type: String, required: false }, // GitHub URL
  },
  { timestamps: true }
);

const Social = mongoose.model('Social', socialSchema);

export default Social;
