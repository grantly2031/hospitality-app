import React, { useState, useEffect } from 'react';
import { FaPaperPlane, FaTimes } from 'react-icons/fa';




const ChatBox = ({ patientId, caregiverId, caregiverName, onClose, onNewMessage }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  

  useEffect(() => {
    const loadMessages = () => {
      const allMessages = JSON.parse(localStorage.getItem('caregiverMessages') || []);
      const filteredMessages = allMessages.filter(msg => 
        msg.caregiverId === caregiverId && msg.patientId === patientId
      );
      setMessages(filteredMessages);
    };

    loadMessages();
    window.addEventListener('storage', loadMessages);
    return () => window.removeEventListener('storage', loadMessages);
  }, [caregiverId, patientId]);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      patientId,
      caregiverId,
      caregiverName,
      content: message,
      timestamp: new Date().toISOString(),
      sender: 'patient'
    };

    const updatedMessages = [...messages, newMessage];
    localStorage.setItem('caregiverMessages', JSON.stringify(updatedMessages));
    setMessages(updatedMessages);
    onNewMessage?.(newMessage);
    setMessage('');
  };

  return (
    <div className="chat-box">
      <div className="chat-header">
        <h3>Chat with {caregiverName}</h3>
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>
      </div>

      <div className="chat-messages">
        {messages.map(msg => (
          <div 
            key={msg.id}
            className={`message ${msg.sender === 'patient' ? 'sent' : 'received'}`}
          >
            <div className="message-content">{msg.content}</div>
            <div className="message-time">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;