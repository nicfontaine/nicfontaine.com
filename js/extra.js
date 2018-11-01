//
// Slideshow, Simple
//

if (document.getElementsByClassName('slideshow') !== undefined) {
  let cont = document.getElementsByClassName('slideshow')
  for (var i=0; i<cont.length; i++) {
    let slides = cont[i].getElementsByTagName('img')
    let s = 0;

    (function advance() {
      if (s-1 > 0) {
        slides[s-1].classList.remove('show')
      }
      s++
      if (s >= slides.length) {
        s=0
        slides[slides.length-1].classList.remove('show') // Hide last
      } else {
        slides[s].classList.add('show') // Show next
      }
      setTimeout(function() {
        advance()
      }, 4000)
    })()
  }
}

//
// Scroll to top
//

window.addEventListener('scroll', function() {
  if (domNav.html.scrollTop > 0) {
    if (page.atTop) {
      dom.scroll.toTop.classList.add('show')
      page.atTop = false
    }
  } else {
    if (!page.atTop) {
      dom.scroll.toTop.classList.remove('show')
      page.atTop = true
    }
  }
})
if (dom.scroll.toTop != undefined) {
  dom.scroll.toTop.addEventListener('click', function(e) {
    e.preventDefault()
    Velocity(document.getElementsByTagName('body')[0], 'scroll', { duration: 500, offset: -300, easing: 'easeOutCubic' } )
  })
  dom.scroll.toTop.addEventListener('touchstart', function(e) {
    e.preventDefault()
    e.stopPropagation()
    Velocity(document.getElementsByTagName('body')[0], 'scroll', { duration: 500, offset: -300, easing: 'easeOutCubic' } )
  },{passive:false})
}