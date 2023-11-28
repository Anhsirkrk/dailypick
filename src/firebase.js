import { initializeApp } from "firebase/app";
import { getAuth ,GoogleAuthProvider} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyC36daDP3UYMj5n1q91DL-9G964nEEzf8c",
  authDomain: "dailylife-85ddf.firebaseapp.com",
  projectId: "dailylife-85ddf",
  storageBucket: "dailylife-85ddf.appspot.com",
  messagingSenderId: "569950165342",
  appId: "1:569950165342:web:eca6c3d9e1b6cc3e8017cf", 
  measurementId: "G-D54PYTDDEP",
    appVerificationDisabledForTesting: false
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export default app;






