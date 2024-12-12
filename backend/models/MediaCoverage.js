import mongoose from 'mongoose';

const mediaCoverageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserData', // Reference the UserData model
      required: true,
    },
    title: {
      type: String,
      required: true, // Article title is required
      trim: true,
    },
    description: {
      type: String,
      required: true, // Description is required
      trim: true,
    },
    link: {
      type: String,
      required: true, // Link is required
      validate: {
        validator: (v) => /^(https?:\/\/)/.test(v),
        message: 'Invalid URL format',
      },
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

const MediaCoverage = mongoose.model('MediaCoverage', mediaCoverageSchema);

export default MediaCoverage;
