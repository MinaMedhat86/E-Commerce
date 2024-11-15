// src/services/authService.ts
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    GoogleAuthProvider,
  } from "firebase/auth";
  import { auth } from "./firebase";
  
  // Initialize Google Auth Provider
  const googleProvider = new GoogleAuthProvider();
  
  export const register = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  
  export const login = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  
  export const googleLogin = async () => {
    return signInWithPopup(auth, googleProvider);  // Use the initialized googleProvider
  };
  
  export const logout = async () => {
    return signOut(auth);
  };
  