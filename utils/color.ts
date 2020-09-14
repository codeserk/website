/**
 * Lightens or darkens an input color
 *
 * @param color
 * @param amount
 */
export function lightenDarkenColor(color: string, amount: number): string {
  let usePound = false

  if (color[0] === '#') {
    color = color.slice(1)
    usePound = true
  }

  const num = parseInt(color, 16)

  let colorRed = (num >> 16) + amount
  if (colorRed > 255) {
    colorRed = 255
  } else if (colorRed < 0) {
    colorRed = 0
  }

  let colorBlue = ((num >> 8) & 0x00FF) + amount
  if (colorBlue > 255) {
    colorBlue = 255
  } else if (colorBlue < 0) {
    colorBlue = 0
  }

  let colorGreen = (num & 0x0000FF) + amount
  if (colorGreen > 255) {
    colorGreen = 255
  } else if (colorGreen < 0) {
    colorGreen = 0
  }

  const value = (usePound ? '' : '') + (colorGreen | (colorBlue << 8) | (colorRed << 16)).toString(16)

  return (usePound ? '#' : '') + '0'.repeat(6 - value.length) + value
}
