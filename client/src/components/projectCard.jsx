import Tilt from 'react-parallax-tilt';
import { ExternalLink, Trash2, Clock } from 'lucide-react';

function ProjectCard({ project, onOpen, onDelete }) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <Tilt 
      tiltMaxAngleX={8} 
      tiltMaxAngleY={8} 
      perspective={1000} 
      scale={1.02} 
      transitionSpeed={1500}
      className="project-card-wrapper"
    >
      <div className="project-card glass-panel">
        <div className="project-card-preview" onClick={() => onOpen(project.id)}>
          {project.generatedCode ? (
            <>
              <iframe
                srcDoc={project.generatedCode}
                sandbox=""
                title={project.title}
                className="project-card-iframe"
                tabIndex="-1"
              />
              <div className="project-card-overlay">
                <ExternalLink size={32} className="overlay-icon" />
              </div>
            </>
          ) : (
            <div className="project-card-empty-preview">
              <span className="text-gradient">No preview yet</span>
            </div>
          )}
        </div>
        <div className="project-card-content">
          <div className="project-card-info">
            <h3 className="project-card-title">{project.title}</h3>
            <p className="project-card-date">
              <Clock size={12} />
              Updated {formatDate(project.updatedAt)}
            </p>
          </div>
          <div className="project-card-actions">
            <button className="project-card-btn primary" onClick={() => onOpen(project.id)}>
              Open
            </button>
            <button 
              className="project-card-btn danger" 
              onClick={(e) => {
                e.stopPropagation();
                if(window.confirm('Are you sure you want to delete this project?')) {
                  onDelete(project.id);
                }
              }}
              title="Delete Project"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </Tilt>
  );
}

export default ProjectCard;