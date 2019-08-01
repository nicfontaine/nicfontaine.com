// (BUG) onload, main shows top. but if scrolled down - on hover it will flash to the point at which it is scrolled

const dom = {
  linker: document.getElementsByClassName('linker'),
  scroll: {
    toTop: document.getElementById('btn-to-top')
  }
}

// Page related vars & values
var page = {
  w: window.innerWidth,
  h: window.innerHeight,
  mSize: 750,
  resizeTimer: undefined,
  checkSize: function() {
    this.w = window.innerWidth
    this.h = window.innerHeight
  },
  atTop: true
}
page.checkSize()

//
// Keep track of window size, through resize
window.addEventListener('resize', function() {
  clearTimeout(page.resizeTimer)
  page.resizeTimer = setTimeout(function() {
    page.checkSize()
  }, 250)
})

// Immutable domNav References
const domNav = {
  html: document.getElementsByTagName('html')[0],
  main: document.getElementsByTagName('main'),
  nav: document.getElementsByTagName('nav'),
  navLi: document.getElementsByClassName('nav-li'),
  navA: document.getElementsByClassName('nav-link'),
  shrinkBarMain: document.getElementById("shrinkbar-main"),
  shrinkBarNav: document.getElementById("shrinkbar-nav"),
}

domNav.navA[0].focus()
// domNav.navLi[0].classList.add('cycled')
// domNav.main[0].classList.add('off')

// (NOTE) should reset main.scrollTop, but not working

// Handle main/menu navigation
var nav = {
  foc: {
    side: undefined, // Store which foc.side we're on. NAV || MAIN
  },
  // Switch focus & on/off classes btw nav & main
  toggle: function(override) {
    if (page.w > page.mSize) {
      let n = domNav.nav[0]
      let m = domNav.main[0]
      // Toggle
      function toMain() {
        nav.foc.side = domNav.main[0]
        m.classList.remove('off')
        m.classList.add('on')
        n.classList.remove('on')
        n.classList.add('off')
        n.removeAttribute('tabindex')
        m.tabIndex = '-1'
        m.focus()
      }
      function toNav() {
        nav.foc.side = domNav.nav[0]
        m.classList.remove('on')
        m.classList.add('off')
        n.classList.remove('off')
        n.classList.add('on')
        n.tabIndex = '-1'
        n.focus()
        m.removeAttribute('tabindex')
        // nav.links.cycle()
        // domNav.navA[nav.links.i].focus()
      }
      if (override !== undefined) {
        if (override === 'main') {
          toMain()
        } else if (override === 'nav') {
          toNav()
        }
      }
      //  else {
      //   if (this.foc.side === domNav.nav[0]) { // Switch to Main
      //     toMain() 
      //   } else { // Switch to Nav
      //     toNav()
      //   }
      // }
      // Log focused foc.side
      // this.foc.side = this.foc.side === domNav.nav[0] ? domNav.main[0] : domNav.nav[0]
    }
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
      nav.links.desel()
      domNav.navA[nav.links.i].focus()
      // Add .cycled to keep style even when we lose focus by switching to MAIN
      domNav.navLi[nav.links.i].classList.add('cycled')
    },
    // Clear .cycled from all
    desel: function() {
      for (var i=0; i<domNav.navLi.length; i++) {
        domNav.navLi[i].classList.remove('cycled')
      }
    }
  }
}

var expand = {
  toggle: function(side) {
    domNav.main[0].classList.toggle("expand")
    domNav.nav[0].classList.toggle("shrink")
  }
}

domNav.shrinkBarMain.addEventListener("click", function() {
  expand.toggle(domNav.nav[0])
  if ("touchstart" in window) {
  } else {
    domNav.main[0].removeEventListener('mouseenter', mouseMain)
    domNav.nav[0].removeEventListener('mouseenter', mouseNav)
  }
})

domNav.shrinkBarNav.addEventListener("click", function() {
  expand.toggle(domNav.nav[0])
  nav.toggle("nav")
  if ("touchstart" in window) {
  } else {
    domNav.main[0].addEventListener('mouseenter', mouseMain)
    domNav.nav[0].addEventListener('mouseenter', mouseNav)
  }
})

// Loop nav links
Array.from(domNav.navLi).forEach((el,i) => {
  // Keep nav links index updated via mouseover
  (function(li,ind) {
    // Grab index on load by looking for .active
    if (el.classList.contains("active")) {
      nav.links.i = ind
    }
    li.addEventListener("mouseover", function(e) {
      nav.links.i = ind
    })
  })(el,i)
})

// Swap focus on nav/main via mouseenter on each
function mouseMain() {
  // Prevent firing a million times
  if (nav.foc.side === domNav.nav[0] || nav.foc.side === undefined) {
    nav.toggle('main')
  }
}
function mouseNav() {
  if (nav.foc.side === domNav.main[0] || nav.foc.side === undefined) {
    nav.toggle('nav')
    nav.links.i = 0  // Make focus 'home' index, so it's not confusing
    nav.links.cycle()
  }
}

// Computer with touchscreen
if ("ontouchstart" in window) {
  domNav.nav[0].classList.add('on')
  domNav.nav[0].classList.remove('off')
  domNav.main[0].classList.add('on')
  domNav.main[0].classList.remove('off')
  // console.log("'ontouchstart' in window. add .on rm .off")
} else {
  domNav.main[0].addEventListener('mouseenter', mouseMain)
  domNav.nav[0].addEventListener('mouseenter', mouseNav)
  // console.log("no 'ontouchstart' in window. add mouse events")
}

// Option to disable nav transition. May want to add UI
// domNav.nav[0].classList.add('on')
// domNav.nav[0].classList.remove('off')
// domNav.main[0].classList.add('on')
// domNav.main[0].classList.remove('off')
// domNav.main[0].addEventListener('mouseenter', mouseMain)
// domNav.nav[0].addEventListener('mouseenter', mouseNav)

var cursor = {
  visible: true
}
document.addEventListener('mousemove', function() {
  if (!cursor.visible) {
    cursor.visible = true
    nav.links.desel()
    domNav.html.classList.remove('c-no')
  } 
})

document.addEventListener('keydown', function(e) {

  // Key LEFT or RIGHT
  if (e.keyCode === 37 || e.keyCode === 39) {
    cursor.visible = false
    domNav.html.classList.add('c-no')
    // Key LEFT, switch if focused on <main>
    if (e.keyCode === 37 && nav.foc.side === domNav.main[0]) {
      nav.toggle('nav')
      nav.links.cycle()
    }
    // Key RIGHT, switch if focused on <nav>
    if (e.keyCode === 39 && nav.foc.side === domNav.nav[0]) {
      nav.toggle('main')
    }
  }

  // NAV focused
  if (nav.foc.side === domNav.nav[0]) {
    // Key UP or DOWN
    if (e.keyCode === 38 || e.keyCode === 40) {
      cursor.visible = false
      domNav.html.classList.add('c-no')
      e.keyCode === 40 ? nav.links.cycle('next') : nav.links.cycle('prev')
    }
    // Re-configure TAB && SHIFT + TAB
    else if (e.keyCode === 9) {
      e.preventDefault()
      e.shiftKey ? nav.links.cycle('prev') : nav.links.cycle('next')
    }
  }

})
