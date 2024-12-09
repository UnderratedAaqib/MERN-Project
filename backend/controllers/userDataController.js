import bcrypt from 'bcryptjs'; // bcryptjs for hashing passwords
import jwt from 'jsonwebtoken'; // JWT for creating tokens
import UserData from '../models/UserData.js';
import Publication from '../models/Publications.js'
// Register a new user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await UserData.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with null university, position, and description
    const newUser = new UserData({
      name,
      email,
      password: hashedPassword,
      university: null, // Default value is null
      position: null,   // Default value is null
      description: null // Default value is null
    });

    // Save user to the database
    await newUser.save();

    // Return a response
    res.status(201).json({
      message: 'User registered successfully',
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// User login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await UserData.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret_key', {
      expiresIn: '1h', // Token expiration time (1 hour)
    });

    // Return response with token and user info
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        university: user.university, // Include university field
        position: user.position,     // Include position field
        description: user.description // Include description field
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update user's profile (university, position, description)
export const updateProfile = async (req, res) => {
  const { university, position, bio } = req.body;
  const userId = req.userId; // Assuming userId is provided via JWT token middleware

  try {
    // Find the user by their ID
    const user = await UserData.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Update the fields
    user.university = university || user.university;
    user.position = position || user.position;
    user.bio = bio || user.bio; 

    // Save the updated user
    await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        university: user.university,
        position: user.position,
        bio: user.bio,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getUserProfile = async (req, res) => {
    const userId = req.userId; // userId should come from the JWT token
  
    try {
      // Find the user by their ID
      const user = await UserData.findById(userId);
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      // Return the user profile (you can exclude the password field if needed)
      res.status(200).json({
        message: 'Profile fetched successfully',
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          university: user.university,
          position: user.position,
          bio: user.bio,
        },
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  export const addPublication = async (req, res) => {
    const { title, year, link } = req.body;
    const userId = req.userId;
  
    if (!title || !year || !link) {
      return res.status(400).json({ message: 'Title, Year, and Link are required' });
    }
  
    try {
      const newPublication = new Publication({
        title,
        year,
        link,
        user: userId,
      });
  
      const savedPublication = await newPublication.save();
      await UserData.findByIdAndUpdate(userId, {
        $push: { publications: savedPublication._id },
      });
  
      res.status(201).json({
        message: 'Publication added successfully',
        publication: savedPublication,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  // Get User Publications
  export const getUserPublications = async (req, res) => {
    const userId = req.userId;
  
    try {
      const user = await UserData.findById(userId).populate('publications');
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      res.status(200).json({
        message: 'Publications fetched successfully',
        publications: user.publications,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  // Update Publication
  export const updatePublication = async (req, res) => {
    const { publicationId, title, year, link } = req.body;
    const userId = req.userId;
  
    try {
      const publication = await Publication.findOne({ _id: publicationId, user: userId });
      if (!publication) {
        return res.status(400).json({ message: 'Publication not found or you do not have permission' });
      }
  
      publication.title = title || publication.title;
      publication.year = year || publication.year;
      publication.link = link || publication.link;
  
      await publication.save();
  
      res.status(200).json({
        message: 'Publication updated successfully',
        publication,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  // Delete Publication
  export const deletePublication = async (req, res) => {
    const { publicationId } = req.params;
    const userId = req.userId;
  
    try {
      const publication = await Publication.findOneAndDelete({ _id: publicationId, user: userId });
      if (!publication) {
        return res.status(400).json({ message: 'Publication not found or you do not have permission' });
      }
  
      await UserData.findByIdAndUpdate(userId, {
        $pull: { publications: publicationId },
      });
  
      res.status(200).json({
        message: 'Publication deleted successfully',
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };