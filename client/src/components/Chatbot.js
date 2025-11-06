import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { chatbotAPI } from '../services/api';
import './Chatbot.css';

const Chatbot = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: t('chatbot.greeting') }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await chatbotAPI.sendMessage(userMessage);
      setMessages(prev => [...prev, { type: 'bot', text: response.message }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: t('chatbot.error') 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
    if (isMinimized) {
      setIsMinimized(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestions = [
    t('chatbot.suggestions.cropCare'),
    t('chatbot.suggestions.pestControl'),
    t('chatbot.suggestions.fertilizer'),
    t('chatbot.suggestions.irrigation'),
    t('chatbot.suggestions.harvesting')
  ];

  if (!isOpen) {
    return (
      <div className="chatbot-toggle" onClick={() => setIsOpen(true)}>
        <div className="chatbot-icon">💬</div>
      </div>
    );
  }

  return (
    <div className={`chatbot-container ${isMinimized ? 'minimized' : ''}`}>
      <div className="chatbot-header">
        <h3>{t('chatbot.title')}</h3>
        <div className="chatbot-controls">
          <button 
            className="chatbot-btn-minimize"
            onClick={() => setIsMinimized(!isMinimized)}
            title={isMinimized ? t('chatbot.maximize') : t('chatbot.minimize')}
          >
            {isMinimized ? '▲' : '▼'}
          </button>
          <button 
            className="chatbot-btn-close"
            onClick={() => setIsOpen(false)}
            title="Close"
          >
            ×
          </button>
        </div>
      </div>
      
      {!isMinimized && (
        <>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chatbot-message ${msg.type}`}>
                <div className="message-content">{msg.text}</div>
              </div>
            ))}
            {isLoading && (
              <div className="chatbot-message bot">
                <div className="message-content">{t('chatbot.typing')}</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <div className="chatbot-suggestions">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="suggestion-btn"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          <div className="chatbot-input-container">
            <input
              ref={inputRef}
              type="text"
              className="chatbot-input"
              placeholder={t('chatbot.placeholder')}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <button
              className="chatbot-send-btn"
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
            >
              {t('chatbot.send')}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Chatbot;

