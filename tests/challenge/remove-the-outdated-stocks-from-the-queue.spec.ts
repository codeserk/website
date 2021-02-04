interface SnapshotRow {
  readonly sym: string
  readonly cost: number
}

/**
 * Removes outdated items from the snapshot.
 * @param snapshot
 */
export function stockQueue(snapshot: SnapshotRow[]): SnapshotRow[] {
  const result: SnapshotRow[] = []
  const existingSyms: Record<string, boolean> = {}

  for (let i = snapshot.length - 1; i >= 0; i--) {
    if (existingSyms[snapshot[i].sym]) {
      continue
    }

    result.unshift(snapshot[i])
    existingSyms[snapshot[i].sym] = true
  }

  return result
}

describe('remove the outdated stocks from the queue', () => {
  test('should not do anything if the snapshot is empty', () => {
    // Arrange
    const snapshot = []

    // Act
    const result = stockQueue(snapshot)

    // Assert
    expect(result).toEqual([])
  })

  test('should not do anything if the snapshot does not contain outdated items', () => {
    // Arrange
    const snapshot = [
      { sym: 'PYPL', cost: 234 },
      { sym: 'AMZN', cost: 3213 },
      { sym: 'GME', cost: 325 },
    ]

    // Act
    const result = stockQueue(snapshot)

    // Assert
    expect(result).toEqual([
      { sym: 'PYPL', cost: 234 },
      { sym: 'AMZN', cost: 3213 },
      { sym: 'GME', cost: 325 },
    ])
  })

  test('should remove all the outdated items', () => {
    // Arrange
    const snapshot = [
      { sym: 'GME', cost: 280 },
      { sym: 'PYPL', cost: 234 },
      { sym: 'AMZN', cost: 3206 },
      { sym: 'AMZN', cost: 3213 },
      { sym: 'GME', cost: 325 },
    ]

    // Act
    const result = stockQueue(snapshot)

    // Assert
    expect(result).toEqual([
      { sym: 'PYPL', cost: 234 },
      { sym: 'AMZN', cost: 3213 },
      { sym: 'GME', cost: 325 },
    ])
  })
})
