import { Layout } from "../components/Layout"
import { StatCard } from "../components/StatCard"

function Dashboard() {
  return (
    <Layout>
      <h2 className="text-2xl font-bold text-gray-800">
        Dashboard
      </h2>

      <p className="text-gray-600 mt-2">
        Bem-vindo ao sistema do salão ✂️💅
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <StatCard title="Agendamentos Hoje" value="12" />
        <StatCard title="Clientes Ativos" value="86" />
        <StatCard title="Faturamento do Dia" value="R$ 1.250,00" />
      </div>
    </Layout>
  )
}

export default Dashboard