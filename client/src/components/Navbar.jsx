import { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Code2, LayoutDashboard, Moon, Sun } from 'lucide-react';
import { AuthContext } from '../context/AuthContext.jsx';
import { ToastContext } from '../context/ToastContext.jsx';
import { ThemeContext } from '../context/ThemeContext.jsx';
import { logout as logoutAPI } from '../services/authService.js';
import '../styles/navbar.css';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try { await logoutAPI(); } catch (error) { /* optional */ }
    logout();
    showToast('Logged out successfully', 'success');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <motion.nav 
      className="navbar glass-panel"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="navbar-left">
        <Link to="/dashboard" className="navbar-brand">
          <Code2 className="navbar-brand-icon" />
          <span className="navbar-brand-text">NxtBuild</span>
        </Link>
        <div className="navbar-links">
          <Link to="/dashboard" className={`navbar-link ${isActive('/dashboard') ? 'active' : ''}`}>
            <LayoutDashboard size={18} />
            My Projects
          </Link>
        </div>
      </div>
      <div className="navbar-right">
        <button 
          className="navbar-theme-toggle" 
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <div className="navbar-user">
          <div className="navbar-user-badge">
            {user && user.name ? user.name.charAt(0).toUpperCase() : '?'}
          </div>
          <span className="navbar-username">{user && user.name ? user.name : ''}</span>
        </div>
        <button className="navbar-logout" onClick={handleLogout} title="Log out">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </motion.nav>
  );
}

export default Navbar;