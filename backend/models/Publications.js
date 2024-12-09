import mongoose from 'mongoose';

const publicationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    year: { type: Number, required: true },
    link: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserData', required: true },  // Reference to UserData
  },
  { timestamps: true }
);

const Publication = mongoose.model('Publication', publicationSchema);

export default Publication;
