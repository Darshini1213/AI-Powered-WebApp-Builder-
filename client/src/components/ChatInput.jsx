import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';

function ChatInput({ onSend, loading, disabled }) {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSubmit = () => {
    if (!input.trim() || loading || disabled) return;
    onSend(input.trim());
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="chat-input-wrapper">
      <div className="chat-input-container glass-panel">
        <textarea
          ref={textareaRef}
          className="chat-input-textarea"
          placeholder="Describe what you want to build..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading || disabled}
          rows={1}
        />
        <button
          className="chat-send-btn"
          onClick={handleSubmit}
          disabled={!input.trim() || loading || disabled}
          title="Generate Code"
        >
          {loading ? (
            <Sparkles size={18} className="spinner" />
          ) : (
            <Send size={18} />
          )}
        </button>
      </div>
      <div className="chat-input-footer">
        Powered by Gemini AI. Press Enter to send, Shift + Enter for new line.
      </div>
    </div>
  );
}

export default ChatInput;