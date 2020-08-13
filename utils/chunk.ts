export function chunk(arr, n) {
  return arr.slice(0, (arr.length + n - 1) / n | 0)
    .map(function(c, i) { return arr.slice(n * i, n * i + n) })
}
