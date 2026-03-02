import { NavLink } from "react-router-dom"
import {
  LayoutDashboard,
  Calendar,
  Users,
  Scissors,
  Briefcase
} from "lucide-react"

const menu = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
  { label: "Agenda", icon: Calendar, to: "/agenda" },
  { label: "Clientes", icon: Users, to: "/clients" },
  { label: "Profissionais", icon: Briefcase, to: "/professionals" },
  { label: "Serviços", icon: Scissors, to: "/services" },
]

export function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r min-h-screen">
      <nav className="p-4 space-y-1">
        {menu.map(item => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition
              ${
                isActive
                  ? "bg-purple-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}