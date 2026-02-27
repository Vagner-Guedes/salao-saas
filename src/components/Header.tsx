import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"

export function Header() {
  const { signOut } = useContext(AuthContext)
  const navigate = useNavigate()

  function handleLogout() {
    signOut()
    navigate("/login")
  }

  return (
    <header className="w-full h-16 bg-purple-600 flex items-center justify-between px-6">
      <h1 className="text-white font-bold text-lg">
        Controle Beauty
      </h1>

      <button
        onClick={handleLogout}
        className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
      >
        Sair
      </button>
    </header>
  )
}

export default Header