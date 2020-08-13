function calculateVerticalHeight() {
  const verticalHeight = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vertical-height', `${verticalHeight}px`)
}

window.addEventListener('resize', () => {
  calculateVerticalHeight()
})

calculateVerticalHeight()
