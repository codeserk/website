/**
 * Rotates the incoming matrix 90deg
 * @param matrix
 */
export function rotate90deg(matrix: unknown[][]): void {
  const n = matrix.length === 0 ? 0 : matrix[0].length

  for (let ring = 0; ring < Math.floor(n / 2); ring++) {
    for (let position = ring; position < n - ring - 1; position++) {
      const backupRight = matrix[position][n - ring - 1]

      // Top -> Right
      matrix[position][n - ring - 1] = matrix[ring][position]

      // Left -> Top
      matrix[ring][position] = matrix[n - position - 1][ring]

      // Bottom -> Left
      matrix[n - position - 1][ring] = matrix[n - ring - 1][n - position - 1]

      // Right -> Bottom
      matrix[n - ring - 1][n - position - 1] = backupRight
    }
  }
}

describe('test', () => {
  test('should not do anything when n=0', () => {
    // Arrange
    const matrix = []

    // Act
    rotate90deg(matrix)

    // Assert
    expect(matrix).toEqual([])
  })

  test('should not do anything when n=1', () => {
    // Arrange
    const matrix = [[5]]

    // Act
    rotate90deg(matrix)

    // Assert
    expect(matrix).toEqual([[5]])
  })

  test('should rotate the matrix when n=2', () => {
    // Arrange
    const matrix = [
      [1, 2],
      [3, 4],
    ]

    // Act
    rotate90deg(matrix)

    // Assert
    expect(matrix).toEqual([
      [3, 1],
      [4, 2],
    ])
  })

  test('should rotate the matrix when n=3', () => {
    // Arrange
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]

    // Act
    rotate90deg(matrix)

    // Assert
    expect(matrix).toEqual([
      [7, 4, 1],
      [8, 5, 2],
      [9, 6, 3],
    ])
  })

  test('should rotate the matrix when n=4', () => {
    // Arrange
    const matrix = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ]

    // Act
    rotate90deg(matrix)

    // Assert
    expect(matrix).toEqual([
      [13, 9, 5, 1],
      [14, 10, 6, 2],
      [15, 11, 7, 3],
      [16, 12, 8, 4],
    ])
  })
})
