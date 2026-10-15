'use client'

export const TIME_FILTERS = ['Today', 'Yesterday', 'Last 7 days', 'Last 30 days', 'Last 12 month']

interface TimeFilterProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
}

export default function TimeFilter({ activeFilter, onFilterChange }: TimeFilterProps) {
  return (
    <div className="flex justify-start">
      <div className="inline-flex items-center gap-1 bg-[#12141D] border border-white/10 p-1.5 rounded-2xl shadow-lg">
        {TIME_FILTERS.map((filter) => {
          const isActive = activeFilter === filter
          return (
            <button
              key={filter}
              type="button"
              onClick={() => onFilterChange(filter)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-black text-white shadow-md border border-white/10'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              {filter}
            </button>
          )
        })}
      </div>
    </div>
  )
}