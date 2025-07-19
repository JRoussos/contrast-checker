import ColorChecker from '../../dist/index.mjs'

const checker = new ColorChecker({
    child: '#lorem',
})

document.querySelector('#lorem').style.color = checker.compare([
    '#ffffff', 
    '#f00fff', 
    '#02004b'
])

checker.updateOptions({
    child: '#lorem2'
})

document.querySelector('#lorem2').style.color = checker.compare([
    '#ffffff', 
    '#f00fff', 
    '#02004b'
])