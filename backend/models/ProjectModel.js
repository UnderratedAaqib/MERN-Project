import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserData', // Reference the UserData model
      required: true,
    },
    name: {
      type: String,
      required: true, // Project name is required
      trim: true,
    },
    affiliation: {
      type: String,
      required: true, // Affiliation is required
      trim: true,
    },
    description: {
      type: String,
      required: true, // Description is required
      trim: true,
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
