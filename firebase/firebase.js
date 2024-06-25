import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  initializeAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKs2n1FnufuwChRbhvcdkeuuRaPYTh34c",
  authDomain: "cricbot-95212.firebaseapp.com",
  projectId: "cricbot-95212",
  storageBucket: "cricbot-95212.appspot.com",
  messagingSenderId: "467145513128",
  appId: "1:467145513128:web:60120d0896343dc37dca9d",
  measurementId: "G-K473T5ZQ58",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app);
const firestore = getFirestore(app);

export async function createUser(username, email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    await updateProfile(user, {
      displayName: username,
    });

    return user;
  } catch (error) {
    console.error("Error creating a user:", error);
    throw error;
  }
}

export async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
}

export async function signOutUser() {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
}

export { auth, firestore };
export default app;
