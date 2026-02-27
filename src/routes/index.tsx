import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import PrivateRoute from "./PrivateRoute"

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública */}
        <Route path="/" element={<Login />} />

        {/* Rota privada */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes