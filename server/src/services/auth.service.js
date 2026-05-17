import bcrypt from 'bcryptjs';
import db from '../config/firebase.config.js';
import { generateToken } from '../utils/jwt.utils.js';

export const register = async (name, email, password) => {

  // Check existing user
  const existingSnapshot = await db
    .collection('users')
    .where('email', '==', email)
    .get();

  if (!existingSnapshot.empty) {
    const error = new Error('Email already registered.');
    error.statusCode = 409;
    throw error;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const userRef = await db.collection('users').add({
    name,
    email,
    password: hashedPassword,
    createdAt: new Date(),
    lastLogin: new Date(),
  });

  const user = {
    id: userRef.id,
    name,
    email,
  };

  // Generate JWT
  const token = generateToken(user);

  return {
    token,
    user,
  };
};

export const emailLogin = async (email, password) => {

  // Find user
  const snapshot = await db
    .collection('users')
    .where('email', '==', email)
    .get();

  if (snapshot.empty) {
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    throw error;
  }

  const doc = snapshot.docs[0];

  const userData = doc.data();

  // Compare password
  const isMatch = await bcrypt.compare(password, userData.password);

  if (!isMatch) {
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    throw error;
  }

  // Update last login
  await db.collection('users').doc(doc.id).update({
    lastLogin: new Date(),
  });

  const user = {
    id: doc.id,
    email: userData.email,
    name: userData.name,
  };

  const token = generateToken(user);

  return {
    token,
    user,
  };
};

export const getUserProfile = async (userId) => {

  const doc = await db.collection('users').doc(userId).get();

  if (!doc.exists) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  const userData = doc.data();

  return {
    id: doc.id,
    email: userData.email,
    name: userData.name,
    createdAt: userData.createdAt,
    lastLogin: userData.lastLogin,
  };
};