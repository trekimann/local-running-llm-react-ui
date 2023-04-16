import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import ChatInput from './components/ChatInput';
import ChatMessages from './components/ChatMessages';
import Navigation from './components/Navigation';
import { generateText } from './utilities/llm_api';

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
`;

interface Message {
  sender: 'user' | 'app';
  content: string;
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [API_URL, setAPI_URL] = useState('http://localhost:5000');
  const [tokenLength, setTokenLength] = useState(55);
  const [threads, setThreads] = useState(8);
  
  const handleUserMessage = async (message: string) => {
    // Add user message to chat
    setMessages((prevMessages) => [...prevMessages, { sender: 'user', content: message }]);

    // Call Python backend and add the response to the chat
    try {
      const generatedText = await generateText(API_URL, message, tokenLength, threads);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'app', content: generatedText },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
       <Navigation
        onApiUrlChange={setAPI_URL}
        onTokenLengthChange={setTokenLength}
        onThreadsChange={setThreads}
      />
      <ChatContainer>
        <ChatMessages messages={messages} />
        <ChatInput onSubmit={handleUserMessage} />
      </ChatContainer>
    </Container>
  );
};

export default App;
