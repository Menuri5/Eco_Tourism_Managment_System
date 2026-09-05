import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';
import { StaysProvider } from './context/StaysContext';
import { GlobalDataProvider } from './context/GlobalDataContext';
import './index.css';

/**
 * Application entry point.
 * Wraps the app with:
 * - BrowserRouter for client-side routing
 * - AuthProvider for authentication state
 * - ChatProvider for global chatbot state
 * - StaysProvider for shared stays & dining data
 * - GlobalDataProvider for other entities (Destinations, Campaigns, etc)
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ChatProvider>
          <StaysProvider>
            <GlobalDataProvider>
              <App />
            </GlobalDataProvider>
          </StaysProvider>
        </ChatProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
