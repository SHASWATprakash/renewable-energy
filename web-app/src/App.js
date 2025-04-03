import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage";
import Projects from "./pages/Projects";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="HomePage" element={<HomePage />} />
        <Route path="/" element={<Login />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </Router>
  );
}
