export function parseLink(url: string): string {
  return url
}

export function beautifyLink(url: string): string {
  if (!url) {
    return url
  }

  return url.replace('http://', '').replace('https://', '')
}
