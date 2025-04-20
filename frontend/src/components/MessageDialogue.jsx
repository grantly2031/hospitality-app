import React, { useState, useEffect } from 'react';
import { sendMessage, getMessages, removeCaregiver } from '../services/api';
import "../styles/MessageDialogue.css";

const MessageDialog = ({ caregiverEmail, onClose }) => {
    console.log(caregiverEmail)
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const patientEmail = localStorage.getItem('patientEmail');

  // const loadMessages = async () => {
  //   try {
  //     setIsLoading(true);
  //     const messages = await getMessages(patientEmail, caregiverEmail);
  //     console.log(messages);
  //     setConversation(messages);
  //   } catch (err) {
  //     setError('Failed to load messages');
  //     console.error(err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    loadMessages();
  }, [patientEmail, caregiverEmail]);

  // const handleSend = async () => {
  //   if (!message.trim()) return;

  //   try {
  //     const newMessage = await sendMessage(
  //       patientEmail,
  //       caregiverEmail,
  //       message
  //     );
  //     setConversation([...conversation, newMessage]);
  //     console.log(conversation);

  //     setMessage('');
  //     setError('');
  //   } catch (err) {
  //     setError('Failed to send message');
  //     console.error(err);
  //   }
  // };

  const handleRemove = async () => {
    try {
      await removeCaregiver(patientEmail, caregiverEmail);
      onClose();
    } catch (err) {
      setError('Failed to remove caregiver. Please try again.');
      console.error(err);
    }
  };
  // ... other state ...

  const loadMessages = async () => {
    try {
      setIsLoading(true);
      const messages = await getMessages(patientEmail, caregiverEmail);
      setConversation(messages); // Already normalized
    } catch (error) {
      setConversation([]); // Ensure array
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    try {
      const newMessage = await sendMessage(
        patientEmail,
        caregiverEmail,
        message
      );
      setConversation((prev) => [...prev, newMessage]); // Add to array
      setMessage('');
    } catch (error) {
      setError('Failed to send message');
      console.error(error);
      // Handle error
    }
  };

  // Render with consistent structure
  return (
    <div className="message-dialog-overlay">
      <div className="message-dialog-container">
        <div className="message-dialog-header">
          <h3>Message to {caregiverEmail}</h3>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}
        <div className="message-content">
          {conversation.map((msg) => (
            <div
              key={msg._id}
              className={`message ${
                msg.patientEmail === patientEmail ? 'sent' : 'received'
              }`}
            >
              <p>{msg.content}</p>
              <small>{new Date(msg.timestamp).toLocaleString()}</small>
            </div>
          ))}
        </div>
        <div className="message-input">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            rows={3}
          />
        </div>
          <button onClick={handleSend}>Send</button>

        <button className="remove-button-msg" onClick={handleRemove}>
          Remove Caregiver
        </button>
      </div>
    </div>

  );
};

export default MessageDialog;



// import React, { useState, useEffect } from 'react';
// import { sendMessage, getMessages, removeCaregiver } from '../services/api';
// import '../styles/MessageDialogue.css'; // Importing CSS for styling
// // import './MessageDialog.css';

// const MessageDialog = ({ caregiverEmail, onClose }) => {
//   const [message, setMessage] = useState('');
//   const [conversation, setConversation] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const patientEmail = localStorage.getItem('patientEmail');

//   const loadMessages = async () => {
//     try {
//       setIsLoading(true);
//       const messages = await getMessages(patientEmail, caregiverEmail);
//       console.log(messages);
//       setConversation(messages);
//     } catch (err) {
//       setError('Failed to load messages');
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadMessages();
//   }, [patientEmail, caregiverEmail]);

//   const handleSend = async () => {
//     if (!message.trim()) return;

//     try {
//       const newMessage = await sendMessage(
//         patientEmail,
//         caregiverEmail,
//         message
//       );
//       setConversation([...conversation, newMessage]);
//       console.log(conversation);

//       setMessage('');
//       setError('');
//     } catch (err) {
//       setError('Failed to send message');
//       console.error(err);
//     }
//   };

//   const handleRemove = async () => {
//     try {
//       await removeCaregiver(patientEmail, caregiverEmail);
//       onClose();
//     } catch (err) {
//       setError('Failed to remove caregiver. Please try again.');
//       console.error(err);
//     }
//   };
//   return (
//     <div className="message-dialog-overlay">
//       <div className="message-dialog-container">
//         <div className="message-dialog-header">
//           <h3>Message to {caregiverEmail}</h3>
//           <button className="close-button" onClick={onClose}>
//             ×
//           </button>
//         </div>

//         {error && <div className="error-message">{error}</div>}

//         <div className="message-content">
//           {isLoading ? (
//             <p>Loading messages...</p>
//           ) : (
//             conversation.map((msg) => (
//               <div
//                 key={msg._id}
//                 className={`message ${
//                   msg.patientEmail === patientEmail ? 'sent' : 'received'
//                 }`}
//               >
//                 <p>{msg.content}</p>
//                 <small>{new Date(msg.timestamp).toLocaleString()}</small>
//               </div>
//             ))
//           )}
//         </div>

//         <div className="message-input">
//           <textarea
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Type your message..."
//             rows={3}
//           />
//           <button onClick={handleSend}>Send</button>
//         </div>

//         <button className="remove-button" onClick={handleRemove}>
//           Remove Caregiver
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MessageDialog;
