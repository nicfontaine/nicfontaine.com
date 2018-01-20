const loader = {
  cont: document.getElementById('loader'),
  offset: 500,
  kill: function() {
    setTimeout(function() {
      loader.cont.classList.remove('show')
      window.removeEventListener('load', loader.kill)
      // setTimeout(function() {
        // domNav.navA[0].focus()
        // domNav.navLi[0].classList.add('cycled')
      // },100)
    },loader.offset)
  }
}

window.addEventListener('load', loader.kill)
