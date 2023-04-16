import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { media } from '../utilities/media';
import { fetchModels, loadModel } from '../utilities/llm_api';
import { createWebSocket } from '../utilities/llm_api';
import TerminalOutput from './TerminalOutput';

interface SidebarProps {
  onApiUrlChange: (apiUrl: string) => void;
  onTokenLengthChange: (tokenLength: number) => void;
  onThreadsChange: (threads: number) => void;
  isOpen: boolean;
}

const SidebarContainer = styled.div<{ isOpen: boolean }>`
  width: 25%;
  height: 100vh;
  border-right: 1px solid #ccc;
  padding: 0 1rem 0 1rem;
  overflow-y: auto;

  ${media.mobile`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 999;
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    padding: 1rem;
    overflow-y: auto;
  `}
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

const Dropdown = styled.select`
  width: 100%;
  margin-bottom: 1rem;
`;

const TextInput = styled.input`
  width: 100%;
  margin-bottom: 1rem;
`;

const Sidebar: React.FC<SidebarProps> = ({ onApiUrlChange, onTokenLengthChange, onThreadsChange , isOpen}) => {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(-1);
  const [tokenLength, setTokenLength] = useState(55);
  const [threads, setThreads] = useState(8);
  const [API_URL, setAPI_URL] = useState('http://localhost:5000');
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    setWebsocket(createWebSocket('ws://localhost:5000')); // TODO: Make this a value passed in

    return () => {
      websocket?.close();
    };
  }, []);

  useEffect(() => {
    const fetchApiModels = async () => {
      try {
        const models = await fetchModels(API_URL);
        console.log('Fetched models:', models);
        setModels(models);
      } catch (error) {
        console.error('Error fetching models:', error);
      }
    };

    fetchApiModels();
  }, [API_URL]);

  const handleModelChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(parseInt(e.target.value));
    await loadModel(API_URL, parseInt(e.target.value));
  };

  return (
    <SidebarContainer isOpen={isOpen}>
      <Label>API URL:</Label>
      <TextInput
        type="text"
        value={API_URL}
        onChange={(e) => {
          onApiUrlChange(e.target.value);
          setAPI_URL(e.target.value);
        }}
      />
      <Label>Model:</Label>
      <Dropdown value={selectedModel} onChange={handleModelChange}>
        <option value={-1}>Select a model</option>
        {models.map((model: { index: number; name: string }) => (
          <option key={model.index} value={model.index}>
            {model.name}
          </option>
        ))}
      </Dropdown>
      <Label>Token length:</Label>
      <TextInput
        type="number"
        value={tokenLength}
        onChange={(e) => {
          onTokenLengthChange(parseInt(e.target.value));
          setTokenLength(parseInt(e.target.value));
        }}
      />
      <Label>Threads:</Label>
      <Dropdown value={threads} onChange={(e) => {
        onThreadsChange(parseInt(e.target.value));
        setThreads(parseInt(e.target.value));
      }
      }>
        {/* Customize the number of threads as needed */}
        {[1, 2, 4, 8, 16].map((thread) => (
          <option key={thread} value={thread}>
            {thread}
          </option>
        ))}
      </Dropdown>
      <Label>Terminal Output:</Label>
      {websocket && <TerminalOutput websocket={websocket} />}
    </SidebarContainer>
  );
};

export default Sidebar;