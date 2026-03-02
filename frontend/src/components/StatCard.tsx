interface Props {
  title: string
  value: string
}

export function StatCard({ title, value }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <p className="text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
    </div>
  )
}