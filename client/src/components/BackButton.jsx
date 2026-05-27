import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import '../styles/back-button.css';

function BackButton({ className = '' }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <motion.button
      className={`back-button ${className}`}
      onClick={handleBack}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title="Go back to previous page"
      type="button"
    >
      <ArrowLeft size={20} />
      <span>Back</span>
    </motion.button>
  );
}

export default BackButton;
