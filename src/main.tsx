import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import AuthentificatedLayout from '@/components/authentificated-layout.tsx'
import Dashboard from "@/app/dashboard/page.tsx"
import Payments from "@/app/payments/page.tsx"
import ComingSoon from './components/coming-soon.tsx';
import { LoginForm } from '@/components/login-form.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />}/>
          <Route path="/dashboard/" element={<AuthentificatedLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/dashboard/payments/" element={<Payments />} />
          </Route>
          <Route path="*" element={<ComingSoon />}/>
        </Routes>
    </BrowserRouter>,
  </StrictMode>
)
