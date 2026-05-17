import db from '../config/firebase.config.js';

export const getUserProjects = async (userId) => {

  const snapshot = await db
    .collection('projects')
    .where('userId', '==', userId)
    .get();

  const projects = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  // Sort latest first
  projects.sort((a, b) =>
    new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  return projects;
};

export const getProjectById = async (projectId, userId) => {

  const doc = await db.collection('projects').doc(projectId).get();

  if (!doc.exists) {
    const error = new Error('Project not found.');
    error.statusCode = 404;
    throw error;
  }

  const project = {
    id: doc.id,
    ...doc.data(),
  };

  if (project.userId !== userId) {
    const error = new Error('Unauthorized access.');
    error.statusCode = 403;
    throw error;
  }

  return project;
};

export const createProject = async (userId, title) => {

  const projectData = {
    userId,
    title: title || 'Untitled Project',
    messages: [],
    generatedCode: '',
    versions: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const docRef = await db.collection('projects').add(projectData);

  return {
    id: docRef.id,
    ...projectData,
  };
};

export const updateProject = async (projectId, userId, updates) => {

  const docRef = db.collection('projects').doc(projectId);

  const doc = await docRef.get();

  if (!doc.exists) {
    const error = new Error('Project not found.');
    error.statusCode = 404;
    throw error;
  }

  const project = doc.data();

  if (project.userId !== userId) {
    const error = new Error('Unauthorized access.');
    error.statusCode = 403;
    throw error;
  }

  const updatedData = {
    ...updates,
    updatedAt: new Date(),
  };

  await docRef.update(updatedData);

  return {
    id: projectId,
    ...project,
    ...updatedData,
  };
};

export const deleteProject = async (projectId, userId) => {

  const docRef = db.collection('projects').doc(projectId);

  const doc = await docRef.get();

  if (!doc.exists) {
    const error = new Error('Project not found.');
    error.statusCode = 404;
    throw error;
  }

  const project = doc.data();

  if (project.userId !== userId) {
    const error = new Error('Unauthorized access.');
    error.statusCode = 403;
    throw error;
  }

  await docRef.delete();

  return {
    message: 'Project deleted successfully.',
  };
};