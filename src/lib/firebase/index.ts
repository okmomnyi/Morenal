/**
 * Firebase Library Index
 * 
 * This file exports all Firebase services and utilities for easy importing
 * throughout the application.
 */

// Firebase app and services
export { app, auth, db, storage } from "./config";

// Authentication
export {
  signUp,
  signIn,
  signOut,
  resetPassword,
  changePassword,
  updateUserProfile,
  signInWithGoogle,
  getUserRole,
  isAdminEmail,
  getCurrentUserWithRole,
  resendEmailVerification,
  type UserRole,
  type AppUser,
  type UserData,
} from "./auth";

// Firestore
export {
  collections,
  setDocument,
  getDocument,
  updateDocument,
  deleteDocument,
  queryDocuments,
  getAllDocuments,
  subscribeToDocument,
  subscribeToQuery,
  batchWrite,
  createConstraints,
  Timestamp,
  serverTimestamp,
} from "./firestore";

// Storage
export {
  uploadFile,
  uploadFileWithProgress,
  getFileURL,
  deleteFile,
  listFiles,
  getFileMetadata,
  updateFileMetadata,
  uploadMultipleFiles,
  deleteMultipleFiles,
  generateFilePath,
  storagePaths,
} from "./storage";
