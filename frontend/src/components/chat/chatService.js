// src/components/chat/chatService.js
const messages = {};

export const sendMessage = async ({ chatId, senderId, text, timestamp }) => {
  if (!messages[chatId]) messages[chatId] = [];
  const newMessage = {
    id: `${chatId}_${Date.now()}`,
    senderId,
    text,
    timestamp
  };
  messages[chatId].push(newMessage);
  localStorage.setItem(`chat_${chatId}`, JSON.stringify(messages[chatId]));
};

export const subscribeToMessages = (chatId, callback) => {
  const loadMessages = () => {
    const stored = localStorage.getItem(`chat_${chatId}`);
    messages[chatId] = stored ? JSON.parse(stored) : [];
    callback(messages[chatId]);
  };
  
  loadMessages();
  const interval = setInterval(loadMessages, 1000);
  
  return () => clearInterval(interval);
};