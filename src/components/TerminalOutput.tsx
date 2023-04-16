// src/components/TerminalOutput.tsx
import React, { useState, useEffect } from 'react';

interface TerminalOutputProps {
  websocket: WebSocket;
}

const TerminalOutput: React.FC<TerminalOutputProps> = ({ websocket }) => {
  const [terminalOutput, setTerminalOutput] = useState('');

  useEffect(() => {
    websocket.onmessage = (event) => {
      setTerminalOutput((prevOutput) => prevOutput + event.data);
    };
  }, [websocket]);

  return (
    <textarea
      readOnly
      value={terminalOutput}
      style={{ width: '100%', height: '200px', marginBottom: '1rem' }}
    />
  );
};

export default TerminalOutput;
