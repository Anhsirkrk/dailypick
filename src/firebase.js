import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA5sLM5dARu-3_GoAjQ35eExvYSzifKyio",
  authDomain: "auth2-3164b.firebaseapp.com",
  projectId: "auth2-3164b",
  storageBucket: "auth2-3164b.appspot.com",
  messagingSenderId: "364576135010",
  appId: "1:364576135010:web:8f2e85d219583f8d7f7e3b", 
    appVerificationDisabledForTesting: false
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;