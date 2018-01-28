const dom = {
  linker: document.getElementsByClassName('linker')
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
    // Totally remove nav/main on/off classes if m size
    if (this.w < this.mSize) {
      domNav.nav[0].classList.add('on')
      domNav.nav[0].classList.remove('off')
      domNav.main[0].classList.add('on')
      domNav.main[0].classList.remove('off')
    } else { // Add back starting on/off if > m size
      domNav.nav[0].classList.add('on')
      domNav.main[0].classList.add('off')
    }
  }
}
page.checkSize()

//
// Keep track of window size, through resize
//

window.addEventListener('resize', function() {
  clearTimeout(page.resizeTimer)
  page.resizeTimer = setTimeout(function() {
    page.checkSize()
  }, 250)
})

// Remove default anchor functionality for a.linker(s)
// Instead, add event to append to url so history isn't changed
// If JS is disabled, regular href will fire
if (dom.linker.length > 0) {
  Array.from(dom.linker).forEach((l,i) => {
    let href = l.getAttribute('href')
    l.addEventListener('click', function(e) {
      e.preventDefault()
      location.replace(href)
    })
    l.addEventListener('touchstart', function(e) {
      e.preventDefault()
      e.stopPropagation()
    },{passive:false})
  })
}

// Hide cursor after delay
var cursor = {
  visible: true,
  timer: undefined
}
document.addEventListener('mousemove', function() {
  let h = document.getElementsByTagName('html')[0]
  if (!cursor.visible) {
    cursor.visible = true
    h.style.cursor = 'auto'
  } else {
    clearTimeout(cursor.timer)
    cursor.visible = true
    cursor.timer = setTimeout(function() {
      h.style.cursor = 'none'
      cursor.visible = false
    }, 300)
  }  
})