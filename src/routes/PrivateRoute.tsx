import { Navigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

interface PrivateRouteProps {
  children: JSX.Element
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated } = useContext(AuthContext)

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children
}

export default PrivateRoute