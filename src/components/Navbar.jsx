import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(!!localStorage.getItem("auth_token"));
  }, []);

  function handleLogout() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_name");
    localStorage.removeItem("is_admin");
    setIsAuth(false);
    navigate("/login", { replace: true });
  }

  return (
    <header className="fixed w-full z-30 top-0 left-0 bg-white/30 backdrop-blur-md">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* LOGO */}
        <div className="flex items-center gap-4">
          <Link to="/" className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-400">
            Umazing Team
          </Link>
        </div>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex gap-6 items-center text-sm">
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? "nav-active" : "")}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "nav-active" : "")}>
              About Us
            </NavLink>
          </li>

          <li>
            <NavLink to="/character" className={({ isActive }) => (isActive ? "nav-active" : "")}>
              Character
            </NavLink>
          </li>

          <li>
            <NavLink to="/predict" className={({ isActive }) => (isActive ? "nav-active" : "")}>
              Predict
            </NavLink>
          </li>

          {isAuth ? (
            <li>
              <button onClick={handleLogout} className="px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 transition">
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <NavLink to="/login" className={({ isActive }) => (isActive ? "nav-active" : "")}>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className={({ isActive }) => (isActive ? "nav-active" : "")}>
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>

        {/* MOBILE */}
        <div className="md:hidden">
          <MobileMenu isAuth={isAuth} onLogout={handleLogout} />
        </div>
      </nav>
    </header>
  );
}

function MobileMenu({ isAuth, onLogout }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative">
      <button onClick={() => setOpen((v) => !v)} className="p-2 rounded bg-white/60 shadow">
        Menu
      </button>

      {open && (
        <div className="absolute right-0 mt-2 bg-white/90 rounded-lg shadow-lg w-44 py-2">
          <Link to="/" onClick={() => setOpen(false)} className="block px-4 py-2">
            Home
          </Link>

          <Link to="/about" onClick={() => setOpen(false)} className="block px-4 py-2">
            About Us
          </Link>

          <Link to="/character" onClick={() => setOpen(false)} className="block px-4 py-2">
            Character
          </Link>

          <Link to="/predict" onClick={() => setOpen(false)} className="block px-4 py-2">
            Predict
          </Link>

          {isAuth ? (
            <button
              onClick={() => {
                setOpen(false);
                onLogout && onLogout();
              }}
              className="block w-full text-left px-4 py-2 text-red-600"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)} className="block px-4 py-2">
                Login
              </Link>
              <Link to="/register" onClick={() => setOpen(false)} className="block px-4 py-2">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
