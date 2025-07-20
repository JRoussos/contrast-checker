# Contrast Checker

ColorChecker is a JavaScript utility for analyzing and comparing colors in relation to DOM elements.
It computes the average color of a DOM element’s subregion (e.g. a child element) and matches it to the closest color from a provided palette based on **luminance similarity**.

### Features

- Computes the average color of the background image within the region of a DOM element.
- Compares the average color to a given list of colors and finds the color with the most contrast.
- Debug mode appends the calculated average color to the DOM and logs the results.
- Lightweight and easy to integrate.

### Installation

You can include the script in your project by installing it from npm:

```bash
npm install @roussos/contrast-checker
```

### Usage

#### Initialization
Create a new instance of ColorChecker and set the parent and child elements.

- If you initialize the instance without the `parent` option, it will try to find the closest element containing an image.

- You can also initialize it without any options, but in that case, you must call the `updateOptions` method manually.

``` js
const checker = new ColorChecker({
    child: '#childElement',
    parent: document.querySelector('#parentElement')
})
```

#### Compare Colors
Use the `compare` method to find the closest matching color from an array of colors.

> The colors in the array **MUST** be in hexadecimal form.

```js
const closestColor = checker.compare(['#ffffff', '#d23d11', '#02004b']);
console.log('Closest Color:', closestColor);
```

#### Update Elements
Use the `updateOptions` method to change the provided element options.

```js
checker.updateOptions({
    child: '#newChildElement',
    parent: document.querySelector('#newParentElement')
})
```

#### Debug Mode
Enable debug mode to append the calculated average color to the DOM and log the results.

```js
const closestColor = checker.compare(['#ffffff', '#d23d11', '#02004b'], true);
```

### API

`ColorChecker(options)`
Creates a new instance of ColorChecker.

Parameters:

Options  |  Type               | Description                                                                                                
-------- | ------------------- | ------------------------------------------------------------------------------------------------------------
child    | HTMLElement, String | The child element whose background is analyzed.
                  
parent   | HTMLElement, String | The parent element behind the child. Must be an <img/> element or an element containing one.


---
<br>
<br>

`compare(color, debug)`
Finds the closest matching color from the provided array.

Parameters:
Options  |  Type               | Description                                                                                                
-------- | ------------------- | ------------------------------------------------------------------------------------------------------------
color    | String[]            | Array of hexadecimal colors to compare.
debug    | Boolean             | *Optional*. If true, appends the calculated average color to the DOM. Default is false.

Returns:
The color from the array that has the most contrast to the average color of the parent element.

---
<br>
<br>

`updateOptions(options)`
Updates the instance's options with new Child and Parent elements.

Parameters:
Options  |  Type               | Description                                                                                                
-------- | ------------------- | ------------------------------------------------------------------------------------------------------------
child    | HTMLElement, String | The child element whose background is analyzed.          
parent   | HTMLElement, String | The parent element behind the child. Must be an <img> element or an element containing one.

Returns:
The ColorChecker instance, allowing method chaining.

---
<br>
<br>

### Example
```js
import ColorChecker from '@roussos/contrast-checker';

const checker = new ColorChecker({
    child: '#lorem',
})

document.querySelector('#lorem').style.color = checker.compare([
    '#ffffff', 
    '#d23d11', 
    '#02004b'
])
```

### License
This project is licensed under the [MIT License](/LICENSE).