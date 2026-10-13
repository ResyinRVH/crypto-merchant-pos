'use client'

import MetricCards from "../../../components/merchant/MetricCards"
import TransactionTable from "../../../components/merchant/TransactionTable"

export default function MerchantDashboardPage() {
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Merchant Portal</h1>
        <p className="text-xs text-white/50 mt-1">
          Pantau omzet harian, riwayat pembayaran faktur, dan kelola penarikan dana kasir toko.
        </p>
      </div>
      <MetricCards />
      <TransactionTable />
    </>
  )
}