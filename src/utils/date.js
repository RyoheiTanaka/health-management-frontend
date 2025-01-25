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

export function convertMilliseconds(ms) {
  const hours = Math.floor(ms / (1000 * 60 * 60)) // 1時間は1000ミリ秒 * 60秒 * 60分
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60)) // 残りのミリ秒を分に変換
  const seconds = Math.floor((ms % (1000 * 60)) / 1000) // 残りのミリ秒を秒に変換

  return { hours, minutes, seconds }
}
