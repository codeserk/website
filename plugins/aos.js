import AOS from 'aos'

import 'aos/dist/aos.css'

export default ({ app }) => {
  setTimeout(() => {
    // eslint-disable-next-line new-cap
    app.AOS = new AOS.init({
      once: true,
      offset: 5,
      anchorPlacement: 'top-center',
    })
  }, 1000)
}
