# contrast-checker
Give me an image and I give you the best color for your overlay text 

### Install 

> npm install @roussos/contrast-checker

### Example

```js
import ColorChecker from '@roussos/contrast-checker';

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
```
