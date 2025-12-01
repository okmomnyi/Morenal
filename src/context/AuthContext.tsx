/**
 * Authentication Context
 * 
 * This context provides authentication state and methods throughout the app,
 * including role-based access control for admin and customer users.
 */

"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { getUserRole, UserRole, AppUser } from "@/lib/firebase/auth";
import { getDocument } from "@/lib/firebase/firestore";
import { collections } from "@/lib/firebase/firestore";
import { UserData } from "@/lib/firebase/auth";

interface AuthContextType {
  user: AppUser | null;
  userData: UserData | null;
  role: UserRole | null;
  loading: boolean;
  isAdmin: boolean;
  isCustomer: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  role: null,
  loading: true,
  isAdmin: false,
  isCustomer: false,
  isAuthenticated: false,
});

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Fetch user role from Firestore
          const userRole = await getUserRole(firebaseUser.uid, firebaseUser.email!);
          
          // Fetch complete user data
          const firestoreUserData = await getDocument<UserData>(
            collections.users,
            firebaseUser.uid
          );
          
          setUser({ ...firebaseUser, role: userRole } as AppUser);
          setUserData(firestoreUserData);
          setRole(userRole);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(firebaseUser as AppUser);
          setUserData(null);
          setRole(null);
        }
      } else {
        setUser(null);
        setUserData(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value: AuthContextType = {
    user,
    userData,
    role,
    loading,
    isAdmin: role === "admin",
    isCustomer: role === "customer",
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
