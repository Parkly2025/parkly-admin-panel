import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import AuthentificatedLayout from '@/components/layout/authentificated-layout.tsx'
import Dashboard from "@/app/dashboard/page.tsx"
// import Payments from "@/app/payments/page.tsx"
import ComingSoon from './components/coming-soon.tsx'
import { LoginForm } from '@/components/login-form.tsx'
import NotFoundError from '@/features/errors/not-found-error'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
          <Route index element={<ComingSoon />}/>
          <Route path="/login" element={<LoginForm />}/>
          <Route path="/dashboard/" element={<AuthentificatedLayout />}>
            <Route index element={<Dashboard />} />
            {/* <Route path="/dashboard/payments/" element={<Payments />} /> */}
          </Route>
          <Route path="*" element={<NotFoundError/>}/>
        </Routes>
    </BrowserRouter>
  </StrictMode>
)
