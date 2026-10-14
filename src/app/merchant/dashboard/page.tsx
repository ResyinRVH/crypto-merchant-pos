'use client'

import MetricCards from "@/components/merchant/dashboard/MetricCards"
import TransactionTable from "@/components/merchant/dashboard/TransactionTable"

export default function MerchantDashboardPage() {
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Dashboard</h1>
      </div>
      <MetricCards />
      <TransactionTable />
    </>
  )
}