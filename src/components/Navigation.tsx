// src/components/Navigation.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { media } from '../utilities/media';
import Sidebar from './Sidebar';

const Hamburger = styled.button`
  display: none;

  ${media.mobile`
    display: block;
    position: fixed;
    top: 15px;
    right: 15px;
    z-index: 1000;
    background: none;
    border: none;
    outline: none;
    padding: 0;
  `}
`;

interface NavigationProps {
    onApiUrlChange: (apiUrl: string) => void;
    onTokenLengthChange: (tokenLength: number) => void;
    onThreadsChange: (threads: number) => void;
  }

const Navigation: React.FC<NavigationProps> = ({ onApiUrlChange, onTokenLengthChange, onThreadsChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Hamburger onClick={() => setIsOpen(!isOpen)}>
                {/* Hamburger menu icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75zM1.75 12a.75.75 0 0 0 0 1.5h12.5a.75.75 0 0 0 0-1.5H1.75z" />
                </svg>
            </Hamburger>
            <Sidebar isOpen={isOpen}
                onApiUrlChange={onApiUrlChange}
                onTokenLengthChange={onTokenLengthChange}
                onThreadsChange={onThreadsChange} />
        </>
    );
};

export default Navigation;
