import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../firebase";
import { faL } from "@fortawesome/free-solid-svg-icons";

const userAuthContext = createContext();
const googleProvider = new GoogleAuthProvider();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [number, setNumber] = useState("");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, password) {
    //alert("createuserwithemailand pass word hitted i fb ");
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    setIsUserLoggedIn(false);
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  const setUpRecaptha = async (number) => {
    const recaptchaVerifier = new RecaptchaVerifier(auth,
      "recaptcha-container",
      {}
    );
    recaptchaVerifier.render();
    setNumber(number);
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsUserLoggedIn(true);
      } else {
        setIsUserLoggedIn(false);
      }
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    console.log(" user context isUserLoggedIn has changed:", isUserLoggedIn);
  }, [isUserLoggedIn]);


  useEffect(() => {
    console.log(" user conetxt isUserLoggedIn has changed:", isUserLoggedIn);
  }, [isUserLoggedIn]);

  return (
    <userAuthContext.Provider
      value={{
        user,
        isUserLoggedIn,
        logIn,
        signUp,
        logOut,
        googleSignIn,
        setUpRecaptha,
        number,
        setIsUserLoggedIn,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
