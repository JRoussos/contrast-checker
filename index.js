/**
 * 
 * @param {String} parent - CSS selector for the container element - This could be an <img/> or an element containing an <img/>
 * @param {String} child - CSS selector for the element on top of the image
 * @param {Array} color - Array of colors to check the contrast against the image 
 * @param {Boolean} [debug=false] - Append the calculated average color in the DOM
 * @returns The selected color from the array that matches the criteria
 */


const compareColors = (parent, child, color, debug=false) => {    

    /**
     * 
     * @param {String} hex - A color value in hexadecimal form
     * @returns An array with the rgb channels 
     */

    const hex2rgb = hex => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    
        return [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
        ]
    }

    /**
     * 
     * @param {Array} rgb - An array with the rgb channels 
     * @returns A color value in hexadecimal form
     */

    const rgb2hex = rgb => {
        const toHex = value => {
            const hex = value.toString(16)
            return hex.length == 1 ? "0" + hex : hex
        }
    
      return "#" + toHex(rgb[0]) + toHex(rgb[1]) + toHex(rgb[2])
    }

    /**
     * 
     * @param {Array} rgb - An array with the rgb channels 
     */

    const printColor = rgb => {
        const {top} = child.getBoundingClientRect()

        const block = document.createElement('div')
        block.className = 'sample'

        block.style.top = top + 'px'
        block.style.background = rgb2hex(rgb)
        block.innerText = rgb2hex(rgb)

        document.getElementById('colors').innerHTML = ''
        document.getElementById('colors').append(block)
    }

    /**
     * 
     * @param {Array} rgb - An array with the rgb channels 
     * @returns The greyscale lumince value of the color
     */

    const luminanceValue = rgb => {
        return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2] 
    }
    
    if (typeof parent === 'string') parent = document.querySelector(parent)
    if (typeof child === 'string') child = document.querySelector(child)

    if (parent?.tagName.localeCompare('img', undefined, { sensitivity: 'accent' }) !== 0) parent = parent?.querySelector('img')

    try {
        if (color?.length <= 0) throw new Error('Empty colors array')

        const canvas = document.createElement('canvas')
        
        const c_bounds = child.getBoundingClientRect()
        const p_bounds = parent.getBoundingClientRect()
        
        canvas.width =  p_bounds.width
        canvas.height = p_bounds.height
        
        const ctx = canvas.getContext('2d')

        const left = c_bounds.left - p_bounds.left
        const top  = c_bounds.top  - p_bounds.top
    
        ctx.drawImage(parent, 0, 0, canvas.width, canvas.height)

        const imageData = ctx.getImageData(left, top, c_bounds.width, c_bounds.height)
        const data = Float32Array.from(imageData.data)

        const length = data.length/4
        const rgb_sum = [0, 0, 0]

        for (let index = 0; index < length; index++) {
            rgb_sum[0] += data[index*4+0]
            rgb_sum[1] += data[index*4+1]
            rgb_sum[2] += data[index*4+2]
        } 

        const avg = [ 
            Math.floor(rgb_sum[0]/length), 
            Math.floor(rgb_sum[1]/length), 
            Math.floor(rgb_sum[2]/length) 
        ]

        const l_avg = luminanceValue(avg)

        debug && printColor(avg)

        return color.reduce((acc, cur) => {
            const l1 = Math.abs(luminanceValue(hex2rgb(acc)) - l_avg)
            const l2 = Math.abs(luminanceValue(hex2rgb(cur)) - l_avg)

            console.log(acc, l1, cur, l2);

            return l1 > l2 ? acc : cur
        })

    } catch (error) {
        console.error(error)
        console.warn('compareColors - Returning first given color: ', color[0])

        return color[0]
    }
}

export default compareColors
