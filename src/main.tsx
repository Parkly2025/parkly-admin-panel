import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from '@/app/dashboard/page.tsx'
import ComingSoon from './components/coming-soon.tsx';
import { LoginForm } from '@/components/login-form.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />}/>
          <Route path="/" element={<App />}/>
          <Route path="*" element={<ComingSoon />}/>
        </Routes>
    </BrowserRouter>,
  </StrictMode>
)
