import { useState } from "react"
import { LogOut, User, ChevronDown } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"


export function Header() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  function handleLogout() {
    logout()
    navigate("/login")
  }

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center text-white font-bold">
          CB
        </div>
        <span className="font-semibold text-gray-800">
          Controle Beauty
        </span>
      </div>

      {/* Usuário */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-full hover:bg-gray-200 transition"
        >
          <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white">
            <User size={16} />
          </div>
          <span className="text-sm font-medium text-gray-700">
            Administrador
          </span>
          <ChevronDown size={16} />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border overflow-hidden">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 transition"
            >
              <LogOut size={16} />
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  )
}