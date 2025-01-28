export const getWeekDate = (num = 1) => {
  const date = []
  const nowDate = new Date()
  const targetDate = new Date()

  for (let i = num * 7; i > 0; i--) {
    targetDate.setDate(nowDate.getDate() - i)
    date.push(targetDate.toISOString().split('T')[0])
  }

  return date
}

export function convertMilliseconds(ms) {
  const hours = Math.floor(ms / (1000 * 60 * 60))
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((ms % (1000 * 60)) / 1000)

  return { hours, minutes, seconds }
}
