import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { LoginModalProvider } from './context/LoginModalContext.tsx';
import LoginModal from './components/LoginModal.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoginModalProvider>
        <App />
        <LoginModal />
    </LoginModalProvider>
    
  </StrictMode>,
)
