import React, { useState } from 'react';
import { sendMessage } from '../services/api';

const MessageButton = ({ currentUser, receiverId, receiverType }) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setIsSending(true);
    try {
      await sendMessage({
        senderId: currentUser._id,
        senderType: currentUser.type, // 'Caretaker' or 'Patient'
        receiverId,
        receiverType,
        content: message,
      });
      setMessage('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    // <div className="message-container">
    //   <textarea
    //     value={message}
    //     onChange={(e) => setMessage(e.target.value)}
    //     placeholder="Type your message here..."
    //     rows={3}
    //   />
    //   <button
    //     onClick={handleSendMessage}
    //     disabled={isSending || !message.trim()}
    //   >
    //     {isSending ? 'Sending...' : 'Send Message'}
    //   </button>
    //   {success && (
    //     <div className="success-message">Message sent successfully!</div>
    //   )}
    // </div>

    <div className="msg-dlg-input-container-fixed">
      <textarea
        className="msg-dlg-textarea-fixed"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        rows={2} /* Reduced rows to save space */
      />
      <button
        className="msg-dlg-send-btn-fixed"
        onClick={handleSendMessage}
        disabled={!message.trim()}
      >
        Send
      </button>
    </div>
  );
};

export default MessageButton;
