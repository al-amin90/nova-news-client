import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import useAxiosPublic, { axiosPublic } from "../Hooks/useAxiosPublic";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subPrice, setSubPrice] = useState(0.0);
  const axiosPublic = useAxiosPublic();

  // crate user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logInUser = (email, password) => {
    console.log(email, password);
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    console.log(name, photo);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        // get the token from client side
        axiosPublic.post("/jwt", { email: currentUser?.email }).then((res) => {
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
            setLoading(false);
          }
        });
      } else {
        //   remove token from the client side
        localStorage.removeItem("access-token");
        setLoading(false);
      }
      console.log("currentUser --->", currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    updateUserProfile,
    resetPassword,
    logInWithGoogle,
    createUser,
    logInUser,
    user,
    setUser,
    loading,
    setLoading,
    subPrice,
    setSubPrice,
    logOut,
  };
  return (
    <AuthContext.Provider value={authInfo}> {children} </AuthContext.Provider>
  );
};

export default AuthProvider;
