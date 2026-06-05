import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, LayoutTemplate } from 'lucide-react';
import { ToastContext } from '../context/ToastContext.jsx';
import BackButton from '../components/BackButton.jsx';
import ProjectCard from '../components/projectCard.jsx';
import { DashboardSkeleton } from '../components/SkeletonLoader.jsx';
import api from '../services/api.js';
import { getProjects, createProject, deleteProject } from '../services/projectService.js';
import '../styles/dashboard.css';

function DashboardPage() {
  const navigate = useNavigate();
  const { showToast } = useContext(ToastContext);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        showToast(api.getErrorMessage(err) || 'Failed to load projects.', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleNewProject = async () => {
    try {
      const project = await createProject();
      navigate(`/builder/${project.id}`);
    } catch (err) {
      showToast(api.getErrorMessage(err) || 'Failed to create project.', 'error');
    }
  };

  const handleOpen = (id) => {
    navigate(`/builder/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      setProjects(projects.filter((p) => p.id !== id));
      showToast('Project deleted.', 'success');
    } catch (err) {
      showToast('Failed to delete project.', 'error');
    }
  };

  if (loading) {
    return (
      <div className="dashboard">
        <DashboardSkeleton />
      </div>
    );
  }

  return (
    <div className="dashboard">
      <motion.div 
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="dashboard-title">Your Projects</h1>
          <p className="dashboard-subtitle">
            {projects.length} project{projects.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="dashboard-header-actions">
          <BackButton />
          <button className="dashboard-new-btn" onClick={handleNewProject}>
            <Plus size={18} />
            New Project
          </button>
        </div>
      </motion.div>

      {projects.length === 0 ? (
        <motion.div 
          className="dashboard-empty glass-panel"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="dashboard-empty-icon-wrapper">
            <LayoutTemplate size={48} className="text-accent" />
          </div>
          <h2 className="dashboard-empty-title">No projects yet</h2>
          <p className="dashboard-empty-subtitle">Create your first project and start building with AI.</p>
          <button className="dashboard-new-btn" onClick={handleNewProject}>
            <Plus size={18} />
            Create First Project
          </button>
        </motion.div>
      ) : (
        <motion.div 
          className="dashboard-grid"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          <AnimatePresence>
            {projects.map((project) => (
              <motion.div
                key={project.id}
                layout
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
                }}
              >
                <ProjectCard
                  project={project}
                  onOpen={handleOpen}
                  onDelete={handleDelete}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

export default DashboardPage;