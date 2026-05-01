import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chapters from "./pages/Chapters";
import ChapterRead from "./pages/ChapterRead";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddNovel from "./pages/AddNovel";

import './App.css';
import Admin from "./pages/Admin";
function App() {
  return (
    <Routes>
      <Route path="/add-novel" element={<AddNovel />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/" element={<Home />} />
      <Route path="/novel/:id" element={<Chapters />} />
      <Route path="/chapter/:id" element={<ChapterRead />} />

      {/* 🔥 NEW */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;