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
    const trimmedValue = searchValue.trim()
    if (!trimmedValue) {
      return area.map((item) => ({ item, rank: 0 }))
    }

    const results = area.map((searchItem) => {
      // Search by keyword
      const rank = keys
        .map(({ key, weight }) => {
          const weightValue = weight || 1
          let rank = 0

          const keyValues = []

          if (searchItem[key] && Array.isArray(searchItem[key])) {
            keyValues.push(...searchItem[key])
          }

          if (searchItem[key] && typeof searchItem[key] === 'string') {
            keyValues.push(searchItem[key])
          }

          keyValues.forEach((value) => {
            if (typeof value !== 'string') {
              return
            }

            if (value.toLowerCase() === trimmedValue.toLowerCase()) {
              rank += 10
            }

            rank += trimmedValue
              .split(' ')
              .map((value) => {
                const words = value.toLowerCase().split(' ')

                const fullWords = words.filter(
                  (word) => word === value.toLowerCase()
                ).length
                const partialWords = words.filter((word) =>
                  word.includes(value.toLowerCase())
                ).length / 2

                return (fullWords + partialWords) * weightValue
              })
              .reduce((a, b) => a + b, 0)
          })

          return rank
        })
        .reduce((a, b) => a + b, 0)

      return { item: searchItem, rank }
    })

    return results
      .filter((result) => result.rank > 0)
      .sort((a, b) => b.rank - a.rank)
  }
}
