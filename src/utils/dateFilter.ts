export function isDateInFilterRange(dateString: string, filter: string): boolean {
  const itemDate = new Date(dateString)
  const now = new Date()
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  const itemTime = itemDate.getTime()

  const oneDayMs = 24 * 60 * 60 * 1000

  switch (filter) {
    case 'Today': {
      const Today = todayStart 
      return itemTime >= Today
    }
    case 'Yesterday': {
      const yesterdayStart = todayStart - oneDayMs
      return itemTime >= yesterdayStart
    }
    case 'Last 7 days': {
      const sevenDaysAgo = todayStart - 7 * oneDayMs
      return itemTime >= sevenDaysAgo
    }
    case 'Last 30 days': {
      const thirtyDaysAgo = todayStart - 30 * oneDayMs
      return itemTime >= thirtyDaysAgo
    }
    case 'Last 12 month': {
      const oneYearAgo = new Date(now)
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
      return itemTime >= oneYearAgo.getTime()
    }
    default:
      return true
  }
}