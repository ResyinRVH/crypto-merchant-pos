'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { generateERC681URI } from '@/utils/Inovice.ts'
import { ActiveInvoice } from '@/types/pos'
import { MENU_ITEMS, CATEGORIES, USDT_TESTNET_ADDRESS } from '@/constants/pos'
import { usePosCart } from '@/hooks/usePosCart'
import { MenuCatalog } from '@/components/merchant/pos/MenuCatalog'
import { CartReceiptPanel } from '@/components/merchant/pos/CartReceiptPanel'
import { QrPayment } from '@/components/merchant/pos/QrPayment'

export default function PosTerminalPage() {
  const { address: merchantAddress, isConnected } = useAccount()
  const [mounted, setMounted] = useState(false)
  const [tableNumber, setTableNumber] = useState('A12')
  const [customerName, setCustomerName] = useState('Ivan Dragunov')
  const [activeCategory, setActiveCategory] = useState('Italian food')
  const [isQrOpen, setIsQrOpen] = useState(false)
  const [activeInvoice, setActiveInvoice] = useState<ActiveInvoice | null>(null)

  const { cart, totalAmount, handleAddToCart, handleUpdateQty, clearCart } = usePosCart()

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredItems =
    activeCategory === 'All categories'
      ? MENU_ITEMS
      : activeCategory === 'Italian food'
      ? MENU_ITEMS.filter((i) => i.category === 'PIZZA')
      : activeCategory === 'Coffee'
      ? MENU_ITEMS.filter((i) => i.category === 'COFFEE')
      : MENU_ITEMS.filter((i) => i.category === 'BREAKFAST' || i.category === 'DESSERT')

  const handleGenerateInvoice = () => {
    if (!merchantAddress || Number(totalAmount) <= 0) return

    const uri = generateERC681URI({
      merchantAddress,
      usdtAmount: totalAmount,
      chainId: 84532,
      usdtContractAddress: USDT_TESTNET_ADDRESS,
    })

    const invoiceId = `INV-${Date.now().toString().slice(-4)}`
    const newInvoice = {
      id: invoiceId,
      customerName: customerName.trim() || 'Guest',
      tableNumber: tableNumber.trim() || '-',
      items: cart,
      amount: totalAmount,
      uri,
      status: 'Ready',
      createdAt: new Date().toISOString(),
    }

    const history = JSON.parse(localStorage.getItem('pos_invoices') || '[]')
    localStorage.setItem('pos_invoices', JSON.stringify([newInvoice, ...history]))

    setActiveInvoice({ id: invoiceId, uri, amount: totalAmount })
    setIsQrOpen(true)
  }

  const handleClose = () => {
    setIsQrOpen(false)
    clearCart()
  }

  return (
    <>
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-5rem)]">
        <MenuCatalog
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          items={filteredItems}
          onAddToCart={handleAddToCart}
        />

        <CartReceiptPanel
          tableNumber={tableNumber}
          setTableNumber={setTableNumber}
          customerName={customerName}
          setCustomerName={setCustomerName}
          cart={cart}
          onUpdateQty={handleUpdateQty}
          totalAmount={totalAmount}
          canPay={mounted && isConnected && Number(totalAmount) > 0}
          onPay={handleGenerateInvoice}
        />
      </div>

      <QrPayment
        isOpen={isQrOpen}
        onClose={handleClose}
        activeInvoice={activeInvoice}
      />
    </>
  )
}