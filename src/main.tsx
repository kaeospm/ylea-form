import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import AdminLogin from './components/admin/AdminLogin.tsx'
import AdminDashboard from './components/admin/AdminDashboard.tsx'
import AdminDetail from './components/admin/AdminDetail.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/application/:id" element={<AdminDetail />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
