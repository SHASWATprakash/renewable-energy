import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize navigation

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login Successful!");
      navigate("/projects"); // Redirect to Projects page
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ backgroundColor: 'yellow' }} className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Login</h1>
      <input
        className="border p-2 mt-2 rounded-lg bg-white placeholder-gray-500"
        type="email"
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 mt-2 rounded-lg bg-white placeholder-gray-500"
        type="password"
        placeholder="Enter your password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

export default Login;