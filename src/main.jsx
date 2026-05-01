import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import API_BASE_URL from './config'

// Dynamically inject preconnect for API to boost performance without exposing it in index.html
const apiOrigin = new URL(API_BASE_URL).origin;
const link = document.createElement('link');
link.rel = 'preconnect';
link.href = apiOrigin;
link.crossOrigin = 'anonymous';
document.head.appendChild(link);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
