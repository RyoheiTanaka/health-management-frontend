export const get1weekDate = () => {
  const dates = []
  const nowDate = new Date()
  const date = new Date()

  for (let i = 7; i > 0; i--) {
    date.setDate(nowDate.getDate() - i)
    dates.push(date.toISOString().split('T')[0])
  }

  return dates
}
