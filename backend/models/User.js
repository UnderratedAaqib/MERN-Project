// backend/models/User.js
import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    position: { type: String },
    university: { type: String },
    // Add other fields like publications, projects if needed
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
