'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '@/types';
import {
  auth,
  googleProvider,
  isFirebaseConfigured,
} from '@/lib/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as fbSignOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  DEFAULT_USER_PROFILE,
  STORAGE_KEYS,
  getStoredData,
  setStoredData,
} from '@/lib/storage';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  signInWithEmail: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signUpWithEmail: (email: string, pass: string, name: string) => Promise<{ success: boolean; error?: string }>;
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  signInAsDemo: (asAdmin?: boolean) => void;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; message: string; error?: string }>;
  updateProfile: (updatedData: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check if user is stored locally
    const storedUser = getStoredData<UserProfile | null>(STORAGE_KEYS.USER_PROFILE, null);

    if (isFirebaseConfigured() && auth) {
      const unsubscribe = onAuthStateChanged(auth, (fbUser: FirebaseUser | null) => {
        if (fbUser) {
          const profile: UserProfile = storedUser || {
            ...DEFAULT_USER_PROFILE,
            uid: fbUser.uid,
            email: fbUser.email || '',
            displayName: fbUser.displayName || 'VitaFit Member',
            photoURL: fbUser.photoURL || DEFAULT_USER_PROFILE.photoURL,
          };
          setUser(profile);
          setStoredData(STORAGE_KEYS.USER_PROFILE, profile);
        } else {
          // If no active Firebase user, check if we had demo user logged in
          setUser(storedUser);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      // In offline/standalone mode, load stored user or null
      setUser(storedUser || DEFAULT_USER_PROFILE);
      setLoading(false);
    }
  }, []);

  const signInWithEmail = async (email: string, pass: string) => {
    try {
      if (isFirebaseConfigured() && auth) {
        const cred = await signInWithEmailAndPassword(auth, email, pass);
        const profile: UserProfile = {
          ...DEFAULT_USER_PROFILE,
          uid: cred.user.uid,
          email: cred.user.email || email,
          displayName: cred.user.displayName || email.split('@')[0],
        };
        setUser(profile);
        setStoredData(STORAGE_KEYS.USER_PROFILE, profile);
        return { success: true };
      } else {
        // Standalone mock login
        const profile: UserProfile = {
          ...DEFAULT_USER_PROFILE,
          email,
          displayName: email.split('@')[0],
          role: email.includes('admin') ? 'admin' : 'user',
        };
        setUser(profile);
        setStoredData(STORAGE_KEYS.USER_PROFILE, profile);
        return { success: true };
      }
    } catch (err: any) {
      return { success: false, error: err.message || 'Login failed' };
    }
  };

  const signUpWithEmail = async (email: string, pass: string, name: string) => {
    try {
      if (isFirebaseConfigured() && auth) {
        const cred = await createUserWithEmailAndPassword(auth, email, pass);
        const profile: UserProfile = {
          ...DEFAULT_USER_PROFILE,
          uid: cred.user.uid,
          email: cred.user.email || email,
          displayName: name,
          onboardingCompleted: false, // Must go through onboarding
        };
        setUser(profile);
        setStoredData(STORAGE_KEYS.USER_PROFILE, profile);
        return { success: true };
      } else {
        const profile: UserProfile = {
          ...DEFAULT_USER_PROFILE,
          uid: 'user-' + Date.now(),
          email,
          displayName: name,
          onboardingCompleted: false,
        };
        setUser(profile);
        setStoredData(STORAGE_KEYS.USER_PROFILE, profile);
        return { success: true };
      }
    } catch (err: any) {
      return { success: false, error: err.message || 'Registration failed' };
    }
  };

  const signInWithGoogle = async () => {
    try {
      if (isFirebaseConfigured() && auth && googleProvider) {
        const cred = await signInWithPopup(auth, googleProvider);
        const profile: UserProfile = {
          ...DEFAULT_USER_PROFILE,
          uid: cred.user.uid,
          email: cred.user.email || '',
          displayName: cred.user.displayName || 'Google User',
          photoURL: cred.user.photoURL || DEFAULT_USER_PROFILE.photoURL,
        };
        setUser(profile);
        setStoredData(STORAGE_KEYS.USER_PROFILE, profile);
        return { success: true };
      } else {
        // Fallback demo Google sign in
        const profile: UserProfile = {
          ...DEFAULT_USER_PROFILE,
          displayName: 'Google VitaFit User',
          email: 'google.user@vitafit.ai',
        };
        setUser(profile);
        setStoredData(STORAGE_KEYS.USER_PROFILE, profile);
        return { success: true };
      }
    } catch (err: any) {
      return { success: false, error: err.message || 'Google authentication failed' };
    }
  };

  const signInAsDemo = (asAdmin = false) => {
    const profile: UserProfile = {
      ...DEFAULT_USER_PROFILE,
      role: asAdmin ? 'admin' : 'user',
      displayName: asAdmin ? 'Dr. Priya V. (Admin)' : 'Arjun Sharma (Member)',
      email: asAdmin ? 'admin@vitafit.ai' : 'arjun.sharma@example.com',
    };
    setUser(profile);
    setStoredData(STORAGE_KEYS.USER_PROFILE, profile);
  };

  const signOut = async () => {
    if (isFirebaseConfigured() && auth) {
      try {
        await fbSignOut(auth);
      } catch (e) {
        console.error(e);
      }
    }
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      if (isFirebaseConfigured() && auth) {
        await sendPasswordResetEmail(auth, email);
      }
      return {
        success: true,
        message: `Password reset instructions dispatched to ${email}. Check your inbox.`,
      };
    } catch (err: any) {
      return {
        success: false,
        message: '',
        error: err.message || 'Could not send reset link.',
      };
    }
  };

  const updateProfile = (updatedData: Partial<UserProfile>) => {
    if (!user) return;
    const updated: UserProfile = {
      ...user,
      ...updatedData,
      updatedAt: new Date().toISOString(),
    };
    setUser(updated);
    setStoredData(STORAGE_KEYS.USER_PROFILE, updated);
  };

  const isAdmin = user?.role === 'admin' || user?.email?.toLowerCase().includes('admin') === true;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signInAsDemo,
        signOut,
        resetPassword,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
