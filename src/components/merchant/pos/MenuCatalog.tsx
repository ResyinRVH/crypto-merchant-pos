'use client'

import { MenuItem } from '@/types/pos'

interface MenuCatalogProps {
  categories: string[]
  activeCategory: string
  onSelectCategory: (cat: string) => void
  items: MenuItem[]
  onAddToCart: (item: MenuItem) => void
}

export function MenuCatalog({
  categories,
  activeCategory,
  onSelectCategory,
  items,
  onAddToCart,
}: MenuCatalogProps) {
  return (
    <div className="lg:col-span-8 flex flex-col justify-between pr-0 lg:pr-6">
      <div>
        <div className="pb-6 flex items-center justify-between border-b border-white/10">
          <h2 className="text-2xl font-bold tracking-tight text-white capitalize">
            {activeCategory}
          </h2>
        </div>

        <div className="py-6 grid grid-cols-2 sm:grid-cols-4 gap-4 overflow-y-auto">
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onAddToCart(item)}
              className="bg-[#03000A] hover:bg-[#1E212D] border border-white/10 hover:border-[#FC5E00]/40 rounded-2xl p-5 flex flex-col justify-between aspect-square text-center transition-all duration-200 active:scale-95 group cursor-pointer shadow-md"
            >
              <span className="text-[10px] tracking-widest text-white/40 uppercase font-semibold block">
                {item.category}
              </span>

              <div className="my-auto">
                {item.icon && <span className="text-xl mb-1 block">{item.icon}</span>}
                <p className="text-sm font-semibold text-white group-hover:text-[#FC5E00] transition line-clamp-2">
                  {item.name}
                </p>
              </div>

              <span className="text-sm font-bold font-mono text-white/90 block">
                ${item.price}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-white/10 flex items-center gap-8 overflow-x-auto">
        {categories.map((cat) => {
          const isActive = activeCategory === cat
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelectCategory(cat)}
              className={`relative py-2 text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                isActive ? 'text-white' : 'text-white/40 hover:text-white/70'
              }`}
            >
              {cat}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FC5E00] rounded-full" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}