import { MenuItem } from '@/types/pos'

export const USDT_TESTNET_ADDRESS = '0x0000000000000000000000000000000000000000' as `0x${string}`

export const MENU_ITEMS: MenuItem[] = [
  { id: '1', name: 'Margherita', category: 'PIZZA', price: 10 },
  { id: '2', name: 'Hawaii', category: 'PIZZA', price: 8 },
  { id: '3', name: '4 seasons', category: 'PIZZA', price: 10 },
  { id: '4', name: '4 cheese', category: 'PIZZA', price: 15 },
  { id: '5', name: 'Teriyaki', category: 'PIZZA', price: 10 },
  { id: '6', name: 'Chicken Ranch', category: 'PIZZA', price: 12 },
  { id: '7', name: 'Double Pepperoni', category: 'PIZZA', price: 10 },
  { id: '8', name: 'Ham & Mushrooms', category: 'PIZZA', price: 8 },
  { id: '9', name: 'Icecream Vanilla', category: 'DESSERT', price: 3 },
  { id: '10', name: 'Kopi Latte', category: 'COFFEE', price: 4.5 },
  { id: '11', name: 'Espresso Double', category: 'COFFEE', price: 2.8 },
  { id: '12', name: 'Croissant Butter', category: 'BREAKFAST', price: 3.5 },
]

export const CATEGORIES = ['All categories', 'Italian food', 'Coffee', 'Breakfast']