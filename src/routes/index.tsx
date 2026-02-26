import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import Agenda from "../pages/Agenda"
import Clients from "../pages/Clients"
import Professionals from "../pages/Professionals"
import Services from "../pages/Services"

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/professionals" element={<Professionals />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes