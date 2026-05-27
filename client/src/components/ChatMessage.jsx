import { Code2, User } from 'lucide-react';

function ChatMessage({ message }) {
  const isUser = message.role === 'user';

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const minutesStr = minutes < 10 ? '0' + minutes : '' + minutes;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutesStr} ${ampm}`;
  };

  return (
    <div className={`chat-message ${isUser ? 'user' : 'ai'}`}>
      <div className="chat-avatar">
        {isUser ? <User size={16} /> : <Code2 size={16} className="text-accent" />}
      </div>
      <div className="chat-message-content">
        <div className={`chat-bubble ${isUser ? 'user-bubble' : 'ai-bubble'}`}>
          <p className="chat-bubble-text">{message.content}</p>
        </div>
        {message.timestamp && (
          <span className="chat-timestamp">{formatTime(message.timestamp)}</span>
        )}
      </div>
    </div>
  );
}

export default ChatMessage;