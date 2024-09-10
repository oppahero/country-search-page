const body = document.querySelector('body')
const theme = document.querySelector('.nav-bar__theme')

const changeThemeColor = () => {
  console.log('aqui en change color')
  // body.classList.toggle = 'dark'

  body.className = (body.classList.contains('dark')) ? '' : 'dark'
}

theme.addEventListener('click', changeThemeColor)
