import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Sparkles, Code2, Rocket, ArrowRight, MonitorSmartphone, Wand2, Zap } from 'lucide-react';
import Scene3D from '../components/Scene3D.jsx';
import BackButton from '../components/BackButton.jsx';
import '../styles/landing.css';

function LandingPage() {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const headingText = "Turn Your Vision Into";
  const headingWords = headingText.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20, rotateX: 90 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 }
    }
  };

  return (
    <div className="landing-page">
      {/* 3D Background */}
      <div className="scene-bg-wrapper">
        <Scene3D />
        <div className="scene-overlay"></div>
      </div>

      <nav className="landing-nav glass-panel">
        <motion.div 
          className="landing-logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Code2 className="landing-logo-icon" />
          <span className="landing-logo-text">NxtBuild</span>
        </motion.div>
        
        <motion.div 
          className="landing-nav-right"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <BackButton />
          <button className="landing-nav-login" onClick={() => navigate('/login')}>
            Log In
          </button>
          <button className="landing-btn-primary" onClick={() => navigate('/login')}>
            Get Started
            <ArrowRight size={18} />
          </button>
        </motion.div>
      </nav>

      <section className="landing-hero">
        <div className="landing-hero-content">
          <motion.div 
            className="landing-badge glass-panel"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Sparkles size={16} className="text-accent" />
            <span>Premium Web Builder</span>
          </motion.div>
          
          <motion.h1 
            className="landing-hero-title"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {headingWords.map((word, index) => (
              <motion.span key={index} className="title-word" variants={wordVariants}>
                {word}&nbsp;
              </motion.span>
            ))}
            <br />
            <motion.span 
              className="text-gradient-neon"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 1 }}
            >
              Production Code
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="landing-hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            Describe what you want to build in plain English. Our advanced AI model generates clean, responsive, and beautiful web applications instantly.
          </motion.p>

          <motion.div 
            className="landing-prompt-container"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4, type: "spring" }}
          >
            <Tilt 
              tiltMaxAngleX={4} 
              tiltMaxAngleY={4} 
              perspective={1500} 
              scale={1.01} 
              transitionSpeed={2000}
              className="landing-prompt-box glass-panel"
              glareEnable={true}
              glareMaxOpacity={0.15}
              glareColor="#EAD7A6"
              glarePosition="all"
            >
              <div className="prompt-dots">
                <span></span><span></span><span></span>
              </div>
              <div className="landing-prompt-input">
                <span className="cursor-blink">|</span> Build a sleek, warm-toned portfolio website with a 3D animated hero section...
              </div>
              <button className="landing-prompt-btn" onClick={() => navigate('/login')}>
                <Wand2 size={18} />
                Generate App
              </button>
            </Tilt>
          </motion.div>

          <motion.div 
            className="landing-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <div className="landing-stat">
              <Zap className="stat-icon text-accent" />
              <div className="stat-text">
                <span className="landing-stat-number">Lightning Fast</span>
                <span className="landing-stat-label">Real-time Generation</span>
              </div>
            </div>
            <div className="landing-stat-divider"></div>
            <div className="landing-stat">
              <MonitorSmartphone className="stat-icon text-accent" />
              <div className="stat-text">
                <span className="landing-stat-number">Fully Responsive</span>
                <span className="landing-stat-label">Mobile to Desktop</span>
              </div>
            </div>
            <div className="landing-stat-divider"></div>
            <div className="landing-stat">
              <Rocket className="stat-icon text-accent" />
              <div className="stat-text">
                <span className="landing-stat-number">Deploy Ready</span>
                <span className="landing-stat-label">Export Clean Code</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="landing-features">
        <motion.div 
          className="features-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="landing-section-title">How It <span className="text-gradient">Works</span></h2>
          <p className="landing-section-subtitle">Three simple steps to bring your ideas to life</p>
        </motion.div>

        <div className="landing-features-grid">
          {[
            {
              icon: <Sparkles size={32} />,
              title: "1. Describe Your Vision",
              desc: "Type what you want to build in plain English. Our AI understands complex layouts, features, and modern design principles.",
              colorClass: ""
            },
            {
              icon: <Code2 size={32} />,
              title: "2. Watch It Build",
              desc: "See your app come to life instantly with a live interactive preview. Clean HTML, CSS, and React code generated in real-time.",
              colorClass: "accent-cyan"
            },
            {
              icon: <Rocket size={32} />,
              title: "3. Refine & Export",
              desc: "Chat with the AI to iterate on your design. When you're ready, download the complete production-ready code to deploy anywhere.",
              colorClass: "accent-purple"
            }
          ].map((feature, i) => (
            <Tilt key={i} tiltMaxAngleX={8} tiltMaxAngleY={8} perspective={1200} className="feature-card-wrapper">
              <motion.div 
                className="feature-card glass-panel"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <div className={`feature-icon-wrapper ${feature.colorClass}`}>
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </section>

      <motion.footer 
        className="landing-footer glass-panel"
        style={{ y: yBg }}
      >
        <div className="landing-footer-content">
          <div className="landing-footer-logo">
            <Code2 size={24} className="text-accent" />
            <span className="landing-logo-text">NxtBuild</span>
          </div>
          <p className="landing-footer-text">© {new Date().getFullYear()} NxtBuild. Empowering creators with AI.</p>
        </div>
      </motion.footer>
    </div>
  );
}

export default LandingPage;