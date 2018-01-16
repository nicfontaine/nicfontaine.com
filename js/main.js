// Immutable DOM References
const dom = {
  main: document.getElementsByTagName('main'),
  nav: document.getElementsByTagName('nav')
}

window.addEventListener('load', function() {
  // dom.nav[0].classList.add('on')
  // dom.main[0].classList.add('off')
})

// Handle main/menu navigation
var nav = {
  foc: dom.nav[0],
  navSwitch: function() {
    
    // Toggle
    if (this.foc === dom.nav[0]) {
      dom.main[0].classList.remove('off')
      dom.main[0].classList.add('on')
      dom.nav[0].classList.remove('on')
      dom.nav[0].classList.add('off')
    } else {
      dom.main[0].classList.remove('on')
      dom.main[0].classList.add('off')
      dom.nav[0].classList.remove('off')
      dom.nav[0].classList.add('on')
    }

    // Log focused side
    this.foc = this.foc === dom.nav[0] ? dom.main[0] : dom.nav[0]
    // Set focus to target element. Otherwise, document.activeElement === body
    this.foc.tabIndex = '-1'
    this.foc.focus()
    
  }
}

document.addEventListener('keydown', function(e) {

  // Key LEFT or RIGHT
  if (e.keyCode === 37 || e.keyCode === 39) {
    // Key LEFT, switch if focused on <main>
    if (e.keyCode === 37 && nav.foc === dom.main[0]) {
      nav.navSwitch()
    }
    // Key RIGHT, switch if focused on <nav>
    if (e.keyCode === 39 && nav.foc === dom.nav[0]) {
      nav.navSwitch()
    }
  } else if (e.keyCode === 9) {
    // Only destroy TAB key if <nav> or <main> are focused
    if (nav.foc === dom.nav[0] || nav.foc === dom.main[0]) {
      // e.preventDefault()
      nav.navSwitch()
    }
  }

})