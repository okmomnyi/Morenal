/**
 * Custom Firebase Authentication Hooks
 * 
 * This file provides custom hooks for common authentication operations,
 * making it easier to use Firebase auth throughout the application.
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signUp,
  signIn,
  signOut,
  resetPassword,
  changePassword,
  updateUserProfile,
  signInWithGoogle,
} from "@/lib/firebase/auth";
import { useAuth } from "@/context/AuthContext";

export interface AuthError {
  code: string;
  message: string;
}

/**
 * Hook for sign-up functionality
 */
export function useSignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);
  const router = useRouter();

  const handleSignUp = async (
    email: string,
    password: string,
    displayName?: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      await signUp(email, password, displayName);
      router.push("/"); // Redirect to home after successful sign-up
      return { success: true };
    } catch (err: any) {
      const authError: AuthError = {
        code: err.code || "unknown",
        message: getErrorMessage(err.code),
      };
      setError(authError);
      return { success: false, error: authError };
    } finally {
      setLoading(false);
    }
  };

  return { signUp: handleSignUp, loading, error };
}

/**
 * Hook for sign-in functionality
 */
export function useSignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);
  const router = useRouter();
  const { role } = useAuth();

  const handleSignIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      await signIn(email, password);
      
      // Redirect based on role (will be updated after auth state changes)
      setTimeout(() => {
        if (role === "admin") {
          router.push("/admin");
        } else {
          router.push("/");
        }
      }, 500);
      
      return { success: true };
    } catch (err: any) {
      const authError: AuthError = {
        code: err.code || "unknown",
        message: getErrorMessage(err.code),
      };
      setError(authError);
      return { success: false, error: authError };
    } finally {
      setLoading(false);
    }
  };

  return { signIn: handleSignIn, loading, error };
}

/**
 * Hook for Google sign-in functionality
 */
export function useGoogleSignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      await signInWithGoogle();
      router.push("/"); // Redirect to home after successful sign-in
      return { success: true };
    } catch (err: any) {
      const authError: AuthError = {
        code: err.code || "unknown",
        message: getErrorMessage(err.code),
      };
      setError(authError);
      return { success: false, error: authError };
    } finally {
      setLoading(false);
    }
  };

  return { signInWithGoogle: handleGoogleSignIn, loading, error };
}

/**
 * Hook for sign-out functionality
 */
export function useSignOut() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setLoading(true);

    try {
      await signOut();
      router.push("/auth/signin");
      return { success: true };
    } catch (err: any) {
      console.error("Error signing out:", err);
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  return { signOut: handleSignOut, loading };
}

/**
 * Hook for password reset functionality
 */
export function usePasswordReset() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);
  const [success, setSuccess] = useState(false);

  const handlePasswordReset = async (email: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await resetPassword(email);
      setSuccess(true);
      return { success: true };
    } catch (err: any) {
      const authError: AuthError = {
        code: err.code || "unknown",
        message: getErrorMessage(err.code),
      };
      setError(authError);
      return { success: false, error: authError };
    } finally {
      setLoading(false);
    }
  };

  return { resetPassword: handlePasswordReset, loading, error, success };
}

/**
 * Hook for changing password
 */
export function useChangePassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChangePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await changePassword(currentPassword, newPassword);
      setSuccess(true);
      return { success: true };
    } catch (err: any) {
      const authError: AuthError = {
        code: err.code || "unknown",
        message: getErrorMessage(err.code),
      };
      setError(authError);
      return { success: false, error: authError };
    } finally {
      setLoading(false);
    }
  };

  return { changePassword: handleChangePassword, loading, error, success };
}

/**
 * Hook for updating user profile
 */
export function useUpdateProfile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AuthError | null>(null);
  const [success, setSuccess] = useState(false);

  const handleUpdateProfile = async (updates: {
    displayName?: string;
    photoURL?: string;
  }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await updateUserProfile(updates);
      setSuccess(true);
      return { success: true };
    } catch (err: any) {
      const authError: AuthError = {
        code: err.code || "unknown",
        message: getErrorMessage(err.code),
      };
      setError(authError);
      return { success: false, error: authError };
    } finally {
      setLoading(false);
    }
  };

  return { updateProfile: handleUpdateProfile, loading, error, success };
}

/**
 * Get user-friendly error messages
 */
function getErrorMessage(code: string): string {
  const errorMessages: Record<string, string> = {
    "auth/email-already-in-use": "This email is already registered.",
    "auth/invalid-email": "Invalid email address.",
    "auth/operation-not-allowed": "Operation not allowed.",
    "auth/weak-password": "Password is too weak. Use at least 6 characters.",
    "auth/user-disabled": "This account has been disabled.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password.",
    "auth/invalid-credential": "Invalid email or password.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/network-request-failed": "Network error. Please check your connection.",
    "auth/popup-closed-by-user": "Sign-in popup was closed.",
    "auth/cancelled-popup-request": "Only one popup request is allowed at a time.",
    "auth/requires-recent-login": "Please sign in again to perform this action.",
  };

  return errorMessages[code] || "An unexpected error occurred. Please try again.";
}
