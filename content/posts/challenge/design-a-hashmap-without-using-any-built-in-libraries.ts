export interface MapItem<T> {
  readonly key: string
  value: T
}

export class ArrayHashMap<T> {
  protected readonly data: MapItem<T>[][] = []
  constructor(protected readonly bucketSize: number = 10) {}

  get(key: string): T | -1 {
    const bucket = this.getBucket(key)
    const item = bucket.find(item => item.key === key)

    return item !== undefined ? item.value : -1
  }

  put(key: string, value: T): void {
    const index = this.getBucketIndex(key)
    const bucket = this.getBucket(key)

    for (const item of bucket) {
      if (item.key === key) {
        item.value = value
        return
      }
    }

    bucket.push({ key, value })
    this.data[index] = bucket
  }

  delete(key: string): void {
    const index = this.getBucketIndex(key)
    const updatedBucket = this.getBucket(key).filter(item => item.key !== key)

    this.data[index] = updatedBucket
  }

  protected getBucket(key: string): MapItem<T>[] {
    const index = this.getHash(key) % this.bucketSize

    return this.data[index] || []
  }

  protected getBucketIndex(key: string): number {
    return this.getHash(key) % this.bucketSize
  }

  /**
   * Unsurprisingly, I took this from Stack-overflow (:
   */
  protected getHash(key: string): number {
    return key.split('').reduce((result: number, char: string) => {
      result = (result << 5) - result + char.charCodeAt(0)

      return result & result
    }, 0)
  }
}

export const extra = {
  sourceTwitter: 'https://twitter.com/cassidoo/status/1351082791165980673',
  gist: 'https://gist.github.com/codeserk/253b6b61cc689e40160fa3bb041bdb45',
  tests: [
    {
      description: 'should return -1 if the map is empty',
      valid: (() => {
        const map = new ArrayHashMap(10)

        return map.get('not-found') === -1
      })(),
    },
    {
      description: 'should return the value if it was previously inserted',
      valid: (() => {
        const map = new ArrayHashMap(10)
        map.put('key', 5)

        return map.get('key') === 5
      })(),
    },
    {
      description: 'should return the new value if put is called again',
      valid: (() => {
        const map = new ArrayHashMap(10)
        map.put('key', 5)
        map.put('key', 10)

        return map.get('key') === 10
      })(),
    },
    {
      description: 'should return -1 if a key is removed',
      valid: (() => {
        const map = new ArrayHashMap(10)
        map.put('key', 5)
        map.delete('key')

        return map.get('key') === -1
      })(),
    },
    {
      description: 'should not :boom: if we try to remove an already removed key',
      valid: (() => {
        const map = new ArrayHashMap(10)
        map.put('key', 5)

        map.delete('not-found')
        map.delete('key')
        map.delete('key')

        return true
      })(),
    },
  ],
}
