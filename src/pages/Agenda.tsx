import { useState } from "react"
import { Layout } from "../components/Layout"
import { Pencil, XCircle } from "lucide-react"

interface Appointment {
  id: number
  time: string
  client: string
  service: string
  professional: string
  status: "confirmado" | "cancelado"
}

function Agenda() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      time: "09:00",
      client: "Maria Silva",
      service: "Corte Feminino",
      professional: "Ana",
      status: "confirmado",
    },
    {
      id: 2,
      time: "10:30",
      client: "João Pereira",
      service: "Barba",
      professional: "Carlos",
      status: "confirmado",
    },
  ])

  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Appointment | null>(null)

  function openNew() {
    setEditing(null)
    setOpen(true)
  }

  function openEdit(item: Appointment) {
    setEditing(item)
    setOpen(true)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const data = {
      time: formData.get("time") as string,
      client: formData.get("client") as string,
      service: formData.get("service") as string,
      professional: formData.get("professional") as string,
    }

    if (editing) {
      setAppointments(prev =>
        prev.map(item =>
          item.id === editing.id ? { ...item, ...data } : item
        )
      )
    } else {
      setAppointments(prev => [
        ...prev,
        {
          id: Date.now(),
          ...data,
          status: "confirmado",
        },
      ])
    }

    setOpen(false)
    setEditing(null)
    e.currentTarget.reset()
  }

  function handleCancel(id: number) {
    setAppointments(prev =>
      prev.map(item =>
        item.id === id ? { ...item, status: "cancelado" } : item
      )
    )
  }

  return (
    <Layout>
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Agenda do Dia
          </h2>
          <p className="text-gray-600 mt-1">
            Gerencie os agendamentos
          </p>
        </div>

        <button
          onClick={openNew}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition"
        >
          Novo Agendamento
        </button>
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block mt-6 bg-white rounded-lg shadow overflow-hidden">
        {/* Header da tabela */}
        <div className="grid grid-cols-12 px-4 py-3 bg-gray-50 border-b text-sm font-semibold text-gray-600">
          <div className="col-span-2">Hora</div>
          <div className="col-span-3">Cliente</div>
          <div className="col-span-3">Serviço</div>
          <div className="col-span-2">Profissional</div>
          <div className="col-span-2 text-right">Ações</div>
        </div>

        {appointments.map(item => (
          <div
            key={item.id}
            className="grid grid-cols-12 items-center px-4 py-3 border-b last:border-b-0 hover:bg-gray-50 transition"
          >
            <div className="col-span-2 font-semibold text-purple-600">
              {item.time}
            </div>

            <div className="col-span-3">
              {item.client}
            </div>

            <div className="col-span-3 text-gray-500">
              {item.service}
            </div>

            <div className="col-span-2 text-gray-500">
              {item.professional}
            </div>

            <div className="col-span-2 flex justify-end items-center gap-2">
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  item.status === "confirmado"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {item.status}
              </span>

              {item.status === "confirmado" && (
                <>
                  {/* Editar */}
                  <button
                    onClick={() => openEdit(item)}
                    title="Editar"
                    className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                  >
                    <Pencil size={16} />
                  </button>

                  {/* Cancelar */}
                  <button
                    onClick={() => handleCancel(item.id)}
                    title="Cancelar"
                    className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition"
                  >
                    <XCircle size={16} />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden mt-6 space-y-4">
        {appointments.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow p-4"
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold text-purple-600">
                {item.time}
              </span>

              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  item.status === "confirmado"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {item.status}
              </span>
            </div>

            <div className="mt-3 text-sm space-y-1">
              <p><strong>Cliente:</strong> {item.client}</p>
              <p><strong>Serviço:</strong> {item.service}</p>
              <p><strong>Profissional:</strong> {item.professional}</p>
            </div>

            {item.status === "confirmado" && (
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => openEdit(item)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg"
                >
                  <Pencil size={16} />
                  Editar
                </button>

                <button
                  onClick={() => handleCancel(item.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg"
                >
                  <XCircle size={16} />
                  Cancelar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">
              {editing ? "Editar Agendamento" : "Novo Agendamento"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="time"
                type="time"
                defaultValue={editing?.time}
                required
                className="w-full border rounded-lg px-3 py-2"
              />

              <input
                name="client"
                placeholder="Cliente"
                defaultValue={editing?.client}
                required
                className="w-full border rounded-lg px-3 py-2"
              />

              <input
                name="service"
                placeholder="Serviço"
                defaultValue={editing?.service}
                required
                className="w-full border rounded-lg px-3 py-2"
              />

              <input
                name="professional"
                placeholder="Profissional"
                defaultValue={editing?.professional}
                required
                className="w-full border rounded-lg px-3 py-2"
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Fechar
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  )
}

export default Agenda