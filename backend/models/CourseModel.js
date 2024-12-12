//We are using this for Teaching Portfolio thing
import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserData',  // Reference the UserData model
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: { // Changed from syllabus to description
    type: String,
    required: true
  }
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

export default Course;
