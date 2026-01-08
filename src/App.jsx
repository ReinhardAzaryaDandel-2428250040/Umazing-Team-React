import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./sections/Home";
import Character from "./sections/Character";
import Predict from "./sections/Predict";
import About from "./sections/About";
import Login from "./components/Login";
import Register from "./components/Register";

/* ================= AUTH GUARD ================= */
function RequireAuth() {
  const token = localStorage.getItem("auth_token");
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

/* ================= PRIVATE LAYOUT ================= */
function PrivateLayout() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-50 px-6 py-8">
        <Outlet />
      </main>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PRIVATE */}
        <Route element={<RequireAuth />}>
          <Route element={<PrivateLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/character" element={<Character />} />
            <Route path="/predict" element={<Predict />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Route>

        {/* NOT FOUND */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
