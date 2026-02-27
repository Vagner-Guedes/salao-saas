import { createContext, useState } from "react"

interface AuthContextData {
  isAuthenticated: boolean
  signIn: () => void
  signOut: () => void
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("auth") === "true"
  })

  function signIn() {
    localStorage.setItem("auth", "true")
    setIsAuthenticated(true)
  }

  function signOut() {
    localStorage.removeItem("auth")
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}