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
    const trimmedSearchValue = searchValue.trim()
    if (!trimmedSearchValue) {
      return area.map((item) => ({ item, rank: 0 }))
    }

    const results = area.map((searchItem, i) => {
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

          keyValues.forEach((keyValues) => {
            if (typeof keyValues !== 'string') {
              return
            }

            if (keyValues.toLowerCase() === trimmedSearchValue.toLowerCase()) {
              rank += 10
            }

            rank += trimmedSearchValue
              .split(' ')
              .map((searchSegment) => {
                const keyValuesWords = keyValues.toLowerCase().split(' ')

                const fullWords = keyValuesWords.filter(
                  (word) => word === searchSegment.toLowerCase()
                )
                const partialWords = keyValuesWords.filter((word) =>
                  word.includes(searchSegment.toLowerCase())
                )
                return (fullWords.length + partialWords.length / 2) * weightValue
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
