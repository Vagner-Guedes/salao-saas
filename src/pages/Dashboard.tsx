
import { Header } from "../components/Header"

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h2>

        <p className="text-gray-600 mt-2">
          Bem-vindo ao sistema do salão ✂️💅
        </p>
      </main>
    </div>
  )
}

export default Dashboard