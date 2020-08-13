interface Redirect {
  from: string;
  to: string;
}

const redirects: Redirect[] = [
  { from: '/home', to: '/' },
  { from: '/home/', to: '/' }
]

export default function (req, res, next) {
  const redirect = getRedirectFromList(req.url)
  if (redirect) {
    res.writeHead(301, { Location: redirect })
    res.end()
  } else {
    next()
  }
}

function getRedirectFromList(url: string): string|undefined {
  const redirect = redirects.find(redirect => redirect.from === url)
  if (redirect) {
    return redirect.to
  }
}
