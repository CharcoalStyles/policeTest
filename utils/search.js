// Search by keyword
// params:
//   area: array of objects
//   keys: array of {
//     key: string
//     weight?: number
//   }
//   options: N/A for now

export const keywordSearch = (area, keys, options) => {
  return (searchValue) => {
    if (!searchValue) {
      return area.map((item) => ({ item, rank: 0 }))
    }

    const results = area.map((searchItem) => {
      // Search by keyword
      const rank = keys.map(({ key, weight }) => {
        const weightValue = weight || 1

        if (searchItem[key] && typeof searchItem[key] === 'string') {
          return searchValue.split(' ').map((value) => {
            const words = searchItem[key].toLowerCase().split(' ')
            return words.filter((word) => word.includes(value.toLowerCase())).length * weightValue
          }).reduce((a, b) => a + b, 0)
        }

        return 0
      }).reduce((a, b) => a + b, 0)

      return { item: searchItem, rank }
    })

    return results.filter(
      (result) => result.rank > 0
    ).sort((a, b) => b.rank - a.rank)
  }
}
