import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/authServices';
import style from './Navbar.module.css';
import { Login } from '@mui/icons-material';
import Button from '@mui/material/Button';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in (you can use your own logic for this)
  useEffect(() => {
    // Here you can check if the user is authenticated, for example:
    const user = localStorage.getItem('user'); // Or use any state management to check auth
    setIsLoggedIn(!!user); // Set login state based on the presence of the user
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsLoggedIn(false); // Update state on logout
    navigate("/e-commerce");
  };

  return (
    <>
      <nav className={`${style.navColor} navbar navbar-expand-lg navbar-dark`}>
        <div className="container">
          <a className="navbar-brand fs-3" href="/e-commerce">
            E-commerce
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink
                  to="/e-commerce/products"
                  className={({ isActive }) =>
                    `${style.itemColor} nav-link fs-4 ${isActive ? style.activeLink : ''}`
                  }
                >
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/e-commerce/cart"
                  className={({ isActive }) =>
                    `${style.itemColor} nav-link fs-4 ${isActive ? style.activeLink : ''}`
                  }
                >
                  Cart
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/e-commerce/profile"
                  className={({ isActive }) =>
                    `${style.itemColor} nav-link fs-4 ${isActive ? style.activeLink : ''}`
                  }
                >
                  Profile
                </NavLink>
              </li>
              {!isLoggedIn ? (
                <li className="nav-item">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `${style.itemColor} nav-link fs-4 ${isActive ? style.activeLink : ''}`
                    }
                  >
                    <Login /> Login
                  </NavLink>
                </li>
              ) : (
                <li className="nav-item">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
