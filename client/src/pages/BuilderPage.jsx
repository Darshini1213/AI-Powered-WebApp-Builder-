import { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, MonitorPlay, Code2, Edit2, Check, Sparkles, Loader2 } from 'lucide-react';
import { ToastContext } from '../context/ToastContext.jsx';
import ChatMessage from '../components/ChatMessage.jsx';
import ChatInput from '../components/ChatInput.jsx';
import CodeEditor from '../components/CodeEditor.jsx';
import LivePreview from '../components/LivePreview.jsx';
import BackButton from '../components/BackButton.jsx';
import { getProject, updateProject } from '../services/projectService.js';
import { generateCode } from '../services/generationService.js';
import '../styles/builder.css';

const EXAMPLE_PROMPTS = [
  'A personal portfolio website with a dark theme',
  'A SaaS pricing page with 3 tiers',
  'A modern weather dashboard',
  'A landing page for a coffee shop',
];

function BuilderPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useContext(ToastContext);

  const [project, setProject] = useState(null);
  const [messages, setMessages] = useState([]);
  const [code, setCode] = useState('');
  const [activeTab, setActiveTab] = useState('preview');
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const data = await getProject(projectId);
        setProject(data);
        setMessages(data.messages || []);
        setCode(data.generatedCode || '');
        setEditTitle(data.title || 'Untitled Project');
      } catch (err) {
        showToast('Project not found.', 'error');
        navigate('/dashboard');
      } finally {
        setPageLoading(false);
      }
    };
    loadProject();
  }, [projectId]);

  const handleSend = async (prompt) => {
    if (loading) return;

    const userMessage = { role: 'user', content: prompt, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const result = await generateCode(projectId, prompt);

      setMessages((prev) => [...prev, result.message]);

      if (result.generatedCode) {
        setCode(result.generatedCode);
        setActiveTab('preview');
      }

      if (project.title === 'Untitled Project') {
        const newTitle = prompt.length > 30 ? prompt.substring(0, 30) + '...' : prompt;
        setProject((prev) => ({ ...prev, title: newTitle }));
        setEditTitle(newTitle);
      }
    } catch (err) {
      const message = err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : 'Generation failed. Please try again.';
      showToast(message, 'error');
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  const handleTitleSave = async () => {
    setIsEditingTitle(false);
    if (editTitle.trim() && editTitle !== project.title) {
      try {
        await updateProject(projectId, { title: editTitle.trim() });
        setProject((prev) => ({ ...prev, title: editTitle.trim() }));
      } catch (error) {
        showToast('Failed to rename project.', 'error');
      }
    }
  };

  const handleDownload = () => {
    if (!code) return;
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${project && project.title ? project.title.replace(/\\s+/g, '-').toLowerCase() : 'nxtbuild-app'}.html`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Code downloaded!', 'success');
  };

  if (pageLoading) {
    return (
      <div className="loading-state" style={{ flex: 1 }}>
        <Loader2 className="spinner" size={48} />
        <p>Loading builder...</p>
      </div>
    );
  }

  return (
    <div className="builder">
      {/* Chat Panel */}
      <motion.div 
        className="builder-chat glass-panel"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="builder-chat-header">
          <BackButton className="builder-back-btn" />
          {isEditingTitle ? (
            <div className="builder-title-edit">
              <input
                className="builder-title-input"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onBlur={handleTitleSave}
                onKeyDown={(e) => { if (e.key === 'Enter') handleTitleSave(); }}
                autoFocus
              />
              <button className="title-save-btn" onClick={handleTitleSave}>
                <Check size={16} />
              </button>
            </div>
          ) : (
            <div className="builder-title-display">
              <h2 className="builder-chat-title">{project && project.title ? project.title : 'Untitled Project'}</h2>
              <button className="title-edit-btn" onClick={() => setIsEditingTitle(true)} title="Rename">
                <Edit2 size={14} />
              </button>
            </div>
          )}
        </div>

        <div className="builder-messages">
          {messages.length === 0 ? (
            <div className="builder-empty-chat">
              <div className="builder-empty-icon-wrapper">
                <Sparkles size={32} className="text-accent" />
              </div>
              <p className="builder-empty-title">What would you like to build?</p>
              <p className="builder-empty-subtitle">Describe your idea in detail for the best results.</p>
              <div className="builder-examples">
                {EXAMPLE_PROMPTS.map((prompt, index) => (
                  <button
                    key={index}
                    className="builder-example-chip"
                    onClick={() => handleSend(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="builder-messages-list">
              <AnimatePresence initial={false}>
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChatMessage message={msg} />
                  </motion.div>
                ))}
                {loading && (
                  <motion.div 
                    className="builder-typing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Loader2 size={16} className="spinner" />
                    <span className="builder-typing-text text-gradient">AI is writing code...</span>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <ChatInput onSend={handleSend} loading={loading} disabled={false} />
      </motion.div>

      {/* Preview Panel */}
      <motion.div 
        className="builder-preview glass-panel"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="builder-tabs">
          <div className="builder-tabs-left">
            <button
              className={`builder-tab ${activeTab === 'preview' ? 'active' : ''}`}
              onClick={() => setActiveTab('preview')}
            >
              <MonitorPlay size={16} />
              Preview
            </button>
            <button
              className={`builder-tab ${activeTab === 'code' ? 'active' : ''}`}
              onClick={() => setActiveTab('code')}
            >
              <Code2 size={16} />
              Code
            </button>
          </div>
          <div className="builder-tabs-right">
            {code && (
              <button className="builder-action-btn" onClick={handleDownload} title="Download Code">
                <Download size={16} />
                <span>Export</span>
              </button>
            )}
          </div>
        </div>

        <div className="builder-content">
          {activeTab === 'preview' ? (
            <LivePreview code={code} />
          ) : (
            <CodeEditor code={code} onChange={setCode} readOnly={false} />
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default BuilderPage;