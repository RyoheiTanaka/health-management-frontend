export const groupBy = (items, key) => {
  return items.reduce((result, item) => {
    ;(result[item[key]] = result[item[key]] || []).push(item)
    return result
  }, {})
}
