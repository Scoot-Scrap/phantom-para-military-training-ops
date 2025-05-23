






=[-import dynamic from 'next/dynamic'

const HeavyChart = dynamic(() => import('../components/HeavyChart'), {
  loading: () => <p>Loading chart…</p>,
})

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1>Dashboard</h1>
      <HeavyChart />
    </div>
  )
}-