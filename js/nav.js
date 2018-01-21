// Keep separate from main
// (function() {
  
  // Immutable domNav References
  const domNav = {
    main: document.getElementsByTagName('main'),
    nav: document.getElementsByTagName('nav'),
    navLi: document.getElementsByClassName('nav-li'),
    navA: document.getElementsByClassName('nav-link')
  }

  domNav.navA[0].focus()
  domNav.navLi[0].classList.add('cycled')

  // (NOTE) should reset main.scrollTop, but not working

  // Handle main/menu navigation
  var nav = {
    foc: {
      side: domNav.nav[0], // Store which foc.side we're on. NAV || MAIN
    },
    links: {
      i: 0,
      // Loop through nav links & focus. direction based on arg
      cycle: function(countDir) {
        if (countDir === 'next') {
          nav.links.i++
          if (nav.links.i > domNav.navLi.length-1) {
            nav.links.i = 0
          }
        } else if (countDir === 'prev') {
          nav.links.i--
          if (nav.links.i < 0) {
            nav.links.i = domNav.navLi.length-1
          }
        }
        domNav.navA[nav.links.i].focus()
        // Clear .cycled from all
        for (var i=0; i<domNav.navLi.length; i++) {
          domNav.navLi[i].classList.remove('cycled')
        }
        // Add .cycled to keep style even when we lose focus by switching to MAIN
        domNav.navLi[nav.links.i].classList.add('cycled')
      }
    },
    navSwitch: function() {
      let n = domNav.nav[0]
      let m = domNav.main[0]
      // Toggle
      if (this.foc.side === domNav.nav[0]) { // Switch to Main
        m.classList.remove('off')
        m.classList.add('on')
        n.classList.remove('on')
        n.classList.add('off')
        n.removeAttribute('tabindex')
        m.tabIndex = '-1'
        m.focus()
      } else { // Switch to Nav
        m.classList.remove('on')
        m.classList.add('off')
        n.classList.remove('off')
        n.classList.add('on')
        n.tabIndex = '-1'
        n.focus()
        m.removeAttribute('tabindex')
        // Reset focus & .cycled to top
        // (Note) maybe should do current page index
        nav.links.i = 0
        nav.links.cycle()
        domNav.navA[nav.links.i].focus()
      }

      // Log focused foc.side
      this.foc.side = this.foc.side === domNav.nav[0] ? domNav.main[0] : domNav.nav[0]
      
      // Set focus to target element. Otherwise, document.activeElement === body
      // this.foc.side.tabIndex = '-1'
      // this.foc.side.focus()r
      
    }
  }

  document.addEventListener('keydown', function(e) {

    // Key LEFT or RIGHT
    if (e.keyCode === 37 || e.keyCode === 39) {
      // Key LEFT, switch if focused on <main>
      if (e.keyCode === 37 && nav.foc.side === domNav.main[0]) {
        nav.navSwitch()
      }
      // Key RIGHT, switch if focused on <nav>
      if (e.keyCode === 39 && nav.foc.side === domNav.nav[0]) {
        nav.navSwitch()
      }
    }

    // NAV focused
    if (nav.foc.side === domNav.nav[0]) {
      // Key UP or DOWN
      if (e.keyCode === 38 || e.keyCode === 40) {
        e.keyCode === 40 ? nav.links.cycle('next') : nav.links.cycle('prev')
      }
      // Re-configure TAB && SHIFT + TAB
      else if (e.keyCode === 9) {
        e.preventDefault()
        e.shiftKey ? nav.links.cycle('prev') : nav.links.cycle('next')
      }
    }

  })
// })()
