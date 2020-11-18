/**
 * Returns function that sorts by a given date field.
 *
 * @param field
 */
export function sortByDate(field: string): (a: object, b: object) => number {
  return (a: object, b: object) => new Date(b[field]).getTime() - new Date(a[field]).getTime()
}

/**
 * Sorts by `order` field
 */
export function sortByOrder(a: any, b: any): number {
  if (!a || !a.order) {
    return 1
  }
  if (!b || !b.order) {
    return -1
  }

  return a.order - b.order
}
