import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Chapters from "./pages/Chapters";
import ChapterRead from "./pages/ChapterRead";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddNovel from "./pages/AddNovel";
import AddChapter from "./pages/AddChapter";
import Admin from "./pages/Admin";

import Header from "./components/Header";

import "./App.css";

function App() {
  return (
    <>
      {/* 🔥 GLOBAL HEADER */}
      <Header />

      {/* 🔥 ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/novel/:id" element={<Chapters />} />
        <Route path="/chapter/:id" element={<ChapterRead />} />

        <Route path="/add-novel" element={<AddNovel />} />
        <Route path="/add-chapter/:id" element={<AddChapter />} />
        <Route path="/admin" element={<Admin />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;