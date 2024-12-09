import mongoose from 'mongoose';

// Define the schema for UserData with name, email, password, university, position, and description
const userDataSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    university: { type: String, default: null }, // university field initially null
    position: { type: String, default: null },    // position field initially null
    bio: { type: String, default: null }, // description field initially null
    publications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Publication' }],
  },
  { timestamps: true }
);

const UserData = mongoose.model('UserData', userDataSchema);

export default UserData;
