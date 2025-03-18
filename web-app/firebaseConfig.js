import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-MFA8OVhzblYCLhXedT5eMSlGal5wPEg",
  authDomain: "web-app-e3795.firebaseapp.com",
  projectId: "web-app-e3795",
  storageBucket: "web-app-e3795.firebasestorage.app",
  messagingSenderId: "177163683415",
  appId: "177163683415:web:9a1e9bf60198bad04e8512"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };