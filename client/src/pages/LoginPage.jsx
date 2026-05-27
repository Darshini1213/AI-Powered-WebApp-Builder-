import { useState, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Code2, Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext.jsx';
import { ToastContext } from '../context/ToastContext.jsx';
import BackButton from '../components/BackButton.jsx';
import { register, emailLogin } from '../services/authService.js';
import '../styles/login.css';

function LoginPage() {
  const { user, login } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/dashboard" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!email || !password) {
      showToast('Please fill in all fields.', 'error');
      return;
    }
    if (isSignUp && !name) {
      showToast('Please enter your name.', 'error');
      return;
    }
    if (password.length < 6) {
      showToast('Password must be at least 6 characters.', 'error');
      return;
    }

    setLoading(true);
    try {
      const result = isSignUp
        ? await register(name, email, password)
        : await emailLogin(email, password);

      login(result.token, result.user);
      showToast(
        isSignUp ? `Welcome, ${result.user.name}!` : `Welcome back, ${result.user.name}!`,
        'success'
      );
      navigate('/dashboard');
    } catch (err) {
      const message = err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : 'Something went wrong.';
      showToast(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="login-page">
      {/* 3D Background Glows */}
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>

      <motion.div 
        className="login-brand" 
        onClick={() => navigate('/')}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Code2 className="login-brand-icon" size={28} />
        <span className="login-brand-text">NxtBuild</span>
      </motion.div>

      <div className="login-back-btn">
        <BackButton />
      </div>

      <motion.div 
        className="login-container"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Tilt 
          tiltMaxAngleX={5} 
          tiltMaxAngleY={5} 
          perspective={1000} 
          scale={1.01} 
          transitionSpeed={2000}
          glareEnable={true}
          glareMaxOpacity={0.1}
          glarePosition="all"
          className="login-card-wrapper"
        >
          <div className="login-card glass-panel">
            <div className="login-header">
              <h2 className="login-card-title">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h2>
              <p className="login-card-subtitle">
                {isSignUp
                  ? 'Start building modern web apps instantly.'
                  : 'Sign in to access your projects.'}
              </p>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              <AnimatePresence mode="popLayout">
                {isSignUp && (
                  <motion.div 
                    className="login-field"
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginBottom: 20 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className="login-label">Full Name</label>
                    <div className="input-group">
                      <User className="input-icon" size={18} />
                      <input
                        type="text"
                        className="login-input"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="login-field">
                <label className="login-label">Email Address</label>
                <div className="input-group">
                  <Mail className="input-icon" size={18} />
                  <input
                    type="email"
                    className="login-input"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="login-field">
                <label className="login-label">Password</label>
                <div className="input-group">
                  <Lock className="input-icon" size={18} />
                  <input
                    type="password"
                    className="login-input"
                    placeholder="Min. 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              
              <button type="submit" className="login-submit-btn" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="spinner-icon" size={18} />
                    Please wait...
                  </>
                ) : (
                  <>
                    {isSignUp ? 'Create Account' : 'Sign In'}
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="login-footer">
              <p className="login-toggle">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button type="button" className="login-toggle-btn text-gradient" onClick={handleToggle}>
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </div>
          </div>
        </Tilt>
      </motion.div>
    </div>
  );
}

export default LoginPage;