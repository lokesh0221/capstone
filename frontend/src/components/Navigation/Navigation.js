import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Navigation.css';

const Navigation = () => {
  const { user, logout, isTeacher, isStudent } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  if (!user) {
    return null; // Don't show navigation if not authenticated
  }

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to={isTeacher ? "/teacher/dashboard" : "/student/dashboard"} className="brand-link">
            <span className="brand-icon">📚</span>
            <span className="brand-text">EduPlatform</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation menu */}
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <div className="nav-links">
            {isTeacher && (
              <>
                <Link 
                  to="/teacher/dashboard" 
                  className={`nav-link ${isActivePath('/teacher/dashboard') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  <span className="nav-icon">🏠</span>
                  Dashboard
                </Link>
                <Link 
                  to="/teacher/generate" 
                  className={`nav-link ${isActivePath('/teacher/generate') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  <span className="nav-icon">📝</span>
                  Generate Papers
                </Link>
                <Link 
                  to="/teacher/history" 
                  className={`nav-link ${isActivePath('/teacher/history') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  <span className="nav-icon">📋</span>
                  History
                </Link>
              </>
            )}

            {isStudent && (
              <>
                <Link 
                  to="/student/dashboard" 
                  className={`nav-link ${isActivePath('/student/dashboard') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  <span className="nav-icon">🏠</span>
                  Dashboard
                </Link>
                <Link 
                  to="/student/learn" 
                  className={`nav-link ${isActivePath('/student/learn') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  <span className="nav-icon">🧠</span>
                  Ask Questions
                </Link>
                <Link 
                  to="/student/history" 
                  className={`nav-link ${isActivePath('/student/history') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  <span className="nav-icon">📚</span>
                  My Questions
                </Link>
              </>
            )}
          </div>

          {/* User menu */}
          <div className="nav-user">
            <div className="user-info">
              <div className="user-avatar">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div className="user-details">
                <span className="user-name">{user.username}</span>
                <span className="user-role">{user.role.toLowerCase()}</span>
              </div>
            </div>
            <button 
              className="logout-btn"
              onClick={handleLogout}
              title="Logout"
            >
              <span className="logout-icon">🚪</span>
              <span className="logout-text">Logout</span>
            </button>
          </div>
        </div>

        {/* Overlay for mobile menu */}
        {isMenuOpen && <div className="nav-overlay" onClick={closeMenu}></div>}
      </div>
    </nav>
  );
};

export default Navigation;