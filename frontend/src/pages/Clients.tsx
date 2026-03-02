import { useState } from "react"
import { Layout } from "../components/Layout"
import { Pencil, Trash2 } from "lucide-react"

interface Client {
  id: number
  name: string
  phone: string
  email: string
}

function Clients() {
  const [clients, setClients] = useState<Client[]>([
    {
      id: 1,
      name: "Maria Silva",
      phone: "(11) 99999-1111",
      email: "maria@email.com",
    },
    {
      id: 2,
      name: "João Pereira",
      phone: "(11) 98888-2222",
      email: "joao@email.com",
    },
  ])

  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Client | null>(null)

  function openNew() {
    setEditing(null)
    setOpen(true)
  }

  function openEdit(client: Client) {
    setEditing(client)
    setOpen(true)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
    }

    if (editing) {
      setClients(prev =>
        prev.map(item =>
          item.id === editing.id ? { ...item, ...data } : item
        )
      )
    } else {
      setClients(prev => [
        ...prev,
        { id: Date.now(), ...data },
      ])
    }

    setOpen(false)
    setEditing(null)
    e.currentTarget.reset()
  }

  function handleDelete(id: number) {
    if (!confirm("Deseja realmente excluir este cliente?")) return
    setClients(prev => prev.filter(item => item.id !== id))
  }

  return (
    <Layout>
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Clientes
          </h2>
          <p className="text-gray-600 mt-1">
            Gerencie seus clientes
          </p>
        </div>

        <button
          onClick={openNew}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition"
        >
          Novo Cliente
        </button>
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block mt-6 bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-12 px-4 py-3 bg-gray-50 border-b text-sm font-semibold text-gray-600">
          <div className="col-span-4">Nome</div>
          <div className="col-span-3">Telefone</div>
          <div className="col-span-3">Email</div>
          <div className="col-span-2 text-right">Ações</div>
        </div>

        {clients.map(client => (
          <div
            key={client.id}
            className="grid grid-cols-12 items-center px-4 py-3 border-b last:border-b-0 hover:bg-gray-50 transition"
          >
            <div className="col-span-4 font-medium">
              {client.name}
            </div>

            <div className="col-span-3 text-gray-500">
              {client.phone}
            </div>

            <div className="col-span-3 text-gray-500">
              {client.email}
            </div>

            <div className="col-span-2 flex justify-end gap-2">
              <button
                onClick={() => openEdit(client)}
                title="Editar"
                className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100"
              >
                <Pencil size={16} />
              </button>

              <button
                onClick={() => handleDelete(client.id)}
                title="Excluir"
                className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden mt-6 space-y-4">
        {clients.map(client => (
          <div key={client.id} className="bg-white rounded-lg shadow p-4">
            <p className="font-semibold">{client.name}</p>
            <p className="text-sm text-gray-500">{client.phone}</p>
            <p className="text-sm text-gray-500">{client.email}</p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => openEdit(client)}
                className="flex-1 flex justify-center items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg"
              >
                <Pencil size={16} />
                Editar
              </button>

              <button
                onClick={() => handleDelete(client.id)}
                className="flex-1 flex justify-center items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg"
              >
                <Trash2 size={16} />
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">
              {editing ? "Editar Cliente" : "Novo Cliente"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                placeholder="Nome"
                defaultValue={editing?.name}
                required
                className="w-full border rounded-lg px-3 py-2"
              />

              <input
                name="phone"
                placeholder="Telefone"
                defaultValue={editing?.phone}
                required
                className="w-full border rounded-lg px-3 py-2"
              />

              <input
                name="email"
                type="email"
                placeholder="Email"
                defaultValue={editing?.email}
                required
                className="w-full border rounded-lg px-3 py-2"
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Cancelar
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

export default Clients