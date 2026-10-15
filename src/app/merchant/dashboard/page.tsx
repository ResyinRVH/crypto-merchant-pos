'use client'

import { useState } from "react"
import MetricCards from "@/components/merchant/dashboard/MetricCards"
import TransactionTable from "@/components/merchant/dashboard/TransactionTable"
import TimeFilter from '@/components/merchant/dashboard/TimeFilter'

export default function MerchantDashboardPage() {
  const [activeFilter, setActiveFilter] = useState('Today')
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Dashboard</h1>
      </div>
      <TimeFilter activeFilter={activeFilter} onFilterChange={setActiveFilter}/>
      <MetricCards activeFilter={activeFilter}/>
      <TransactionTable activeFilter={activeFilter}/>
    </>
  )
}