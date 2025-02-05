export const getWeekDate = (num = 1) => {
  const date = []
  const nowDate = new Date()
  const targetDate = new Date()
  const prevMonthDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), 0)
  const targetPrevMonthDate = new Date(nowDate.getFullYear(), nowDate.getMonth(), 0)

  for (let i = num * 7; i > 0; i--) {
    if (nowDate.getDate() - i <= 0) {
      targetPrevMonthDate.setDate(prevMonthDate.getDate() + (nowDate.getDate() - i))
      date.push(joinDateString(targetPrevMonthDate))
    } else {
      targetDate.setDate(nowDate.getDate() - i)
      date.push(joinDateString(targetDate))
    }
  }
  return date
}

export function convertMilliseconds(ms) {
  const hours = Math.floor(ms / (1000 * 60 * 60))
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((ms % (1000 * 60)) / 1000)

  return { hours, minutes, seconds }
}

function joinDateString(date) {
  return [
    date.getFullYear(),
    (date.getMonth() + 1).toString().padStart(2, '0'),
    date.getDate().toString().padStart(2, '0'),
  ].join('-')
}
