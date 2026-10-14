export interface MenuItem {
  id: string
  name: string
  category: string
  price: number
  icon?: string
}

export interface CartItem extends MenuItem {
  qty: number
}

export interface ActiveInvoice {
  id: string
  uri: string
  amount: string
}