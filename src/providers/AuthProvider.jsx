/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import { clearToken } from "../api/utils";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);
const auth = getAuth(app);

// Set persistence to LOCAL (survives browser close)
setPersistence(auth, browserLocalPersistence).then(() => {
  console.log('🔐 Auth persistence set to LOCAL');
}).catch((error) => {
  console.error('❌ Error setting persistence:', error);
});

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = async () => {
    setLoading(true);
    // Clear JWT token from backend
    await clearToken();
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };


 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
      console.log('🔐 Auth State Changed -->', currentUser?.email || 'No user')
      
      // Set user state first
      setUser(currentUser)
      
      if (currentUser?.email) {
        // JWT token endpoint not available in current backend
        // Firebase handles authentication tokens internally
        console.log('✅ User authenticated:', currentUser.email)
      } else {
        // Backend logout endpoint not available - Firebase handles logout locally
        console.log('⚠️ No user found')
      }
      
      // Set loading to false after user state is set
      setLoading(false)
    })
    
    return () => {
      unsubscribe()
    }
  }, [])


  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
