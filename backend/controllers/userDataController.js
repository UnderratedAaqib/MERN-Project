import bcrypt from 'bcryptjs'; // bcryptjs for hashing passwords
import jwt from 'jsonwebtoken'; // JWT for creating tokens
import UserData from '../models/UserData.js';
import Publication from '../models/Publications.js'
import Course from '../models/CourseModel.js';
import Project from '../models/ProjectModel.js';
import Talk from "../models/Talk.js";
import MediaCoverage from '../models/MediaCoverage.js';
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




  export const addCourse = async (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required." });
    }
    try {
      const newCourse = new Course({
        userId: req.userId, // assuming req.user is populated from the auth middleware
        title,
        description
      });
      const savedCourse = await newCourse.save();
      res.status(201).json(savedCourse);
    } catch (error) {
      console.error("Error when adding course:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  };
  
export const deleteCourse = async (req, res) => {
  const { courseId } = req.params;
  try {
    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// File: controllers/CourseController.js
export const getCourses = async (req, res) => {
  try {
      const courses = await Course.find({ userId: req.userId });
      res.status(200).json(courses);
  } catch (error) {
      res.status(500).json({ message: "Failed to retrieve courses", error: error.message });
  }
};

//for projects

// Get All Projects for a User
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.userId }); // Find projects by userId
    res.status(200).json(projects); // Return the projects
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve projects', error: error.message });
  }
};

// Add a New Project
export const addProject = async (req, res) => {
  const { name, affiliation, description } = req.body;

  // Validate required fields
  if (!name || !affiliation || !description) {
    return res.status(400).json({ message: 'Name, affiliation, and description are required.' });
  }

  try {
    const newProject = new Project({
      userId: req.userId, // Populate userId from the auth middleware
      name,
      affiliation,
      description,
    });

    const savedProject = await newProject.save(); // Save the project to the database
    res.status(201).json(savedProject); // Return the saved project
  } catch (error) {
    res.status(500).json({ message: 'Failed to add project', error: error.message });
  }
};

// Delete a Project
export const deleteProject = async (req, res) => {
  const { projectId } = req.params; // Get projectId from route parameters

  try {
    const deletedProject = await Project.findByIdAndDelete(projectId); // Delete the project by ID
    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete project', error: error.message });
  }
};


//For conferences and talks
export const getTalks = async (req, res) => {
  try {
    const talks = await Talk.find({ userId: req.userId }); // Fetch talks for the logged-in user
    res.status(200).json(talks);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve talks", error: error.message });
  }
};

export const addTalk = async (req, res) => {
  const { title, description, videoUrl } = req.body;

  if (!title || !description || !videoUrl) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newTalk = new Talk({
      userId: req.userId, // Use the logged-in user's ID
      title,
      description,
      videoUrl,
    });

    const savedTalk = await newTalk.save();
    res.status(201).json(savedTalk);
  } catch (error) {
    res.status(500).json({ message: "Failed to add talk", error: error.message });
  }
};

export const deleteTalk = async (req, res) => {
  const { talkId } = req.params;

  try {
    const deletedTalk = await Talk.findOneAndDelete({ _id: talkId, userId: req.userId });

    if (!deletedTalk) {
      return res.status(404).json({ message: "Talk not found or not authorized to delete" });
    }

    res.status(200).json({ message: "Talk deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete talk", error: error.message });
  }
};
//for media coverage


// Get all media coverage articles for the logged-in user
export const getMediaArticles = async (req, res) => {
  try {
    const articles = await MediaCoverage.find({ userId: req.userId });
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve media articles', error: error.message });
  }
};

// Add a new media coverage article for the logged-in user
export const addMediaArticle = async (req, res) => {
  const { title, description, link } = req.body;
  try {
    const newArticle = new MediaCoverage({
      userId: req.userId, // From auth middleware
      title,
      description,
      link,
    });
    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (error) {
    res.status(400).json({ message: 'Failed to add media article', error: error.message });
  }
};

// Delete a media coverage article by ID
export const deleteMediaArticle = async (req, res) => {
  const { articleId } = req.params;
  try {
    const deletedArticle = await MediaCoverage.findByIdAndDelete(articleId);
    if (!deletedArticle) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete media article', error: error.message });
  }
};
