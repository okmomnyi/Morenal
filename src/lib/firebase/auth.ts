/**
 * Firebase Authentication Helper Functions
 * 
 * This file contains utility functions for authentication operations,
 * including sign-in, sign-up, sign-out, and password management.
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  User,
  UserCredential,
  sendEmailVerification,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./config";
import { setDocument, getDocument } from "./firestore";
import { collections } from "./firestore";

// User role types
export type UserRole = "admin" | "customer";

// Extended user interface with role
export interface AppUser extends User {
  role?: UserRole;
}

// User data stored in Firestore
export interface UserData {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
  emailVerified: boolean;
}

/**
 * Check if a user is an admin based on email
 */
export function isAdminEmail(email: string): boolean {
  const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',').map(e => e.trim()) || [];
  return adminEmails.includes(email);
}

/**
 * Get user role from Firestore or determine from email
 */
export async function getUserRole(userId: string, email: string): Promise<UserRole> {
  try {
    const userData = await getDocument<UserData>(collections.users, userId);
    
    if (userData?.role) {
      return userData.role;
    }
    
    // Fallback to email check
    return isAdminEmail(email) ? "admin" : "customer";
  } catch (error) {
    console.error("Error getting user role:", error);
    return isAdminEmail(email) ? "admin" : "customer";
  }
}

/**
 * Create user document in Firestore
 */
async function createUserDocument(user: User, role: UserRole): Promise<void> {
  const userData: Omit<UserData, 'id'> = {
    email: user.email!,
    displayName: user.displayName || user.email!.split('@')[0],
    role,
    photoURL: user.photoURL || undefined,
    createdAt: new Date(),
    updatedAt: new Date(),
    emailVerified: user.emailVerified,
  };

  await setDocument(collections.users, user.uid, userData);
}

/**
 * Sign up a new user with email and password
 */
export async function signUp(
  email: string,
  password: string,
  displayName?: string
): Promise<UserCredential> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update profile with display name if provided
    if (displayName) {
      await updateProfile(userCredential.user, { displayName });
    }
    
    // Send email verification
    await sendEmailVerification(userCredential.user);
    
    // Determine user role
    const role = isAdminEmail(email) ? "admin" : "customer";
    
    // Create user document in Firestore
    await createUserDocument(userCredential.user, role);
    
    return userCredential;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
}

/**
 * Sign in with email and password
 */
export async function signIn(
  email: string,
  password: string
): Promise<UserCredential> {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
}

/**
 * Sign in with Google
 */
export async function signInWithGoogle(): Promise<UserCredential> {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    
    // Check if user document exists, create if not
    const existingUser = await getDocument<UserData>(collections.users, userCredential.user.uid);
    
    if (!existingUser) {
      const role = isAdminEmail(userCredential.user.email!) ? "admin" : "customer";
      await createUserDocument(userCredential.user, role);
    }
    
    return userCredential;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
}

/**
 * Sign out the current user
 */
export async function signOut(): Promise<void> {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
}

/**
 * Send password reset email
 */
export async function resetPassword(email: string): Promise<void> {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
}

/**
 * Update user password
 */
export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<void> {
  try {
    const user = auth.currentUser;
    if (!user || !user.email) {
      throw new Error("No user is currently signed in");
    }
    
    // Re-authenticate user
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    
    // Update password
    await updatePassword(user, newPassword);
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(updates: {
  displayName?: string;
  photoURL?: string;
}): Promise<void> {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("No user is currently signed in");
    }
    
    await updateProfile(user, updates);
    
    // Update Firestore document
    await setDocument(collections.users, user.uid, {
      ...updates,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
}

/**
 * Resend email verification
 */
export async function resendEmailVerification(): Promise<void> {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("No user is currently signed in");
    }
    
    await sendEmailVerification(user);
  } catch (error) {
    console.error("Error resending email verification:", error);
    throw error;
  }
}

/**
 * Get current user with role information
 */
export async function getCurrentUserWithRole(): Promise<(AppUser & { userData?: UserData }) | null> {
  const user = auth.currentUser;
  if (!user) return null;
  
  try {
    const userData = await getDocument<UserData>(collections.users, user.uid);
    return {
      ...user,
      role: userData?.role || (isAdminEmail(user.email!) ? "admin" : "customer"),
      userData,
    } as AppUser & { userData?: UserData };
  } catch (error) {
    console.error("Error getting current user with role:", error);
    return {
      ...user,
      role: isAdminEmail(user.email!) ? "admin" : "customer",
    } as AppUser;
  }
}
