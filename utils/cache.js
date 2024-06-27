class BrowserCache {
  constructor(maxSize = 100, maxAge = 3600000) { // maxAge default is 1 hour in milliseconds
    this.cache = new Map()
    this.maxSize = maxSize
    this.maxAge = maxAge
  }

  get(key) {
    const item = this.cache.get(key)
    if (!item) {
      return undefined
    }

    if (Date.now() - item.timestamp > this.maxAge) {
      this.cache.delete(key)
      return undefined
    }

    return item.value
  }

  set(key, value) {
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value
      this.cache.delete(oldestKey)
    }

    this.cache.set(key, { value, timestamp: Date.now() })
  }

  has(key) {
    return this.cache.has(key)
  }

  clear() {
    this.cache.clear()
  }
}

const cache = new BrowserCache()

export default cache
