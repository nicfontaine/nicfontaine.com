const dom = {
  linker: document.getElementsByClassName('linker')
}

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