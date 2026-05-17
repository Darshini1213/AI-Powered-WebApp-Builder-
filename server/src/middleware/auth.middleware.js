import { verifyToken } from '../utils/jwt.utils.js';
import db from '../config/firebase.config.js';

const authenticate = async (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Please log in to access this route.',
      });
    }

    const token = authHeader.split(' ')[1];

    const decoded = verifyToken(token);

    // Get user from Firestore
    const userDoc = await db
      .collection('users')
      .doc(decoded.id)
      .get();

    if (!userDoc.exists) {
      return res.status(401).json({
        success: false,
        message: 'User not found. Please log in again.',
      });
    }

    req.user = {
      id: userDoc.id,
      ...userDoc.data(),
    };

    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token. Please log in again.',
    });

  }
};

export default authenticate;