import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDSetpnKCLfG48xWqJHuHz8cvHLpdmyxmg",
  authDomain: "gdg123-c3d1e.firebaseapp.com",
  projectId: "gdg123-c3d1e",
  storageBucket: "gdg123-c3d1e.firebasestorage.app",
  messagingSenderId: "1038485464886",
  appId: "1:1038485464886:web:ea965b7db527aea6ab3597",
  measurementId: "G-3Q8RMRYN1K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Auth functions
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { user: result.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export { auth, googleProvider }; 