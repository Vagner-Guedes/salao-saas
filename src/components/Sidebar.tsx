import { Link } from "react-router-dom"

function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r">
      <div className="p-6 font-bold text-lg">
        Salão SaaS
      </div>

      <nav className="px-4 space-y-2">
        <Link className="block p-2 rounded hover:bg-gray-100" to="/dashboard">
          Dashboard
        </Link>
        <Link className="block p-2 rounded hover:bg-gray-100" to="/agenda">
          Agenda
        </Link>
        <Link className="block p-2 rounded hover:bg-gray-100" to="/clients">
          Clientes
        </Link>
        <Link className="block p-2 rounded hover:bg-gray-100" to="/professionals">
          Profissionais
        </Link>
        <Link className="block p-2 rounded hover:bg-gray-100" to="/services">
          Serviços
        </Link>
      </nav>
    </aside>
  )
}

export default Sidebar