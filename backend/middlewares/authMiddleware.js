import jwt from 'jsonwebtoken';

// Middleware to protect routes
export const protect = (req, res, next) => {
  let token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  token = token.split(' ')[1]; // Extract token from 'Bearer <token>'

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret_key');
    req.userId = decoded.userId; // Attach user ID to request object
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
