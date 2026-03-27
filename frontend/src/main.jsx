import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import axios from 'axios';

if (import.meta.env.MODE === 'production') {
  axios.defaults.baseURL = 'https://empowerher-48y3.onrender.com';
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
