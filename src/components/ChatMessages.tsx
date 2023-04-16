// src/components/ChatMessages.tsx
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { css } from '@emotion/react';
import { BounceLoader } from 'react-spinners';


const MessagesContainer = styled.div`
  flex-grow: 1;
  padding: 1rem 1rem 0rem 1rem;
  overflow-y: auto;
`;

const spinnerCSS = css`
  display: block;
  margin: 0 auto;
`;


interface Message {
  sender: 'user' | 'app';
  content: string;
}

interface ChatMessagesProps {
  messages: Message[];
}

const Message = styled.div<{ sender: 'user' | 'app' }>`
  display: inline-block;
  max-width: 70%;
  margin: 8px 0;
  padding: 10px 15px;
  border-radius: 18px;
  background-color: ${({ sender }) => (sender === 'user' ? '#4A90E2' : '#EAEAEA')};
  color: ${({ sender }) => (sender === 'user' ? '#FFFFFF' : '#333333')};
  align-self: ${({ sender }) => (sender === 'user' ? 'flex-end' : 'flex-start')};
  word-wrap: break-word;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;


const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const isLoading = messages.length > 0 && messages[messages.length - 1].sender === 'user';

  return (
    <MessagesContainer>
      {messages.map((message, index) => (
        <Message key={index} sender={message.sender}>
          {message.content}
        </Message>
      ))}
      {isLoading && <BounceLoader color="#4A90E2" size={30} cssOverride={spinnerCSS} />}
      <div ref={messagesEndRef} />
    </MessagesContainer>
  );
};

export default ChatMessages;
