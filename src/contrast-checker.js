/**
 * @typedef ColorCheckerOptions
 * 
 * @property {String|HTMLElement|null} parent - CSS selector for the container element - This could be an <img/> or an element containing an <img/>
 * @property {String|HTMLElement|null} child  - CSS selector for the element on top of the image
 */

import { hex2rgb }        from "./utils/hex2rgb"
import { printColor }     from "./utils/printColor"
import { rgb2hex }        from "./utils/rgb2hex"
import { luminanceValue } from "./utils/luminanceValue"

/**
 *
 * @param {ColorCheckerOptions} params
 */
function ColorChecker(params) {
    try {
        this.options = {
            parent: null,
            child: null
        }

        this.canvas = document.createElement('canvas')
        
        if (params) {
            this.setComparableElements(params)
        }
    }

    catch (error) {
        console.warn('(ERROR) ColorChecker:', error)
    }
}

/**
 * Set the elements to compare and assign them to the options object.
 * Elements can be passed as a CSS selector or as an HTMLElement.
 * 
 * @param {ColorCheckerOptions} params
 * 
 * @private
 */
ColorChecker.prototype.setComparableElements = function (params) {
    if (params.child && typeof params.child === 'string') {
        this.options.child = document.querySelector(params.child)
    }

    if (params.child && params.child instanceof HTMLElement) {
        this.options.child = params.child
    }

    if (!params.child || !this.options.child) {
        throw new Error('The specified child is not found.')
    }

    if (params.child && !params.parent) {
        const element = this.options.child.closest(':has(img)')

        this.options.parent = element
            ? element.querySelector('img')
            : null
    }

    if (params.parent && params.parent instanceof HTMLElement) {
        this.options.parent = (params.parent && params.parent.tagName.toLowerCase() !== 'img')
            ? this.options.parent = params.parent.querySelector('img')
            : params.parent
    }

    if (params.parent && typeof params.parent === 'string') {
        const element = document.querySelector(params.parent)

        this.options.parent = (element && element.tagName.toLowerCase() !== 'img')
            ? this.options.parent = element.querySelector('img')
            : element
    }

    if (!this.options.parent) {
        throw new Error('Parent <img/> element for specified child is not found.')
    }

    if (!this.checkeElementsIntersection()) {
        this.options.child = null
        throw new Error('Child element is not on top of the given image.')
    }
}

/**
 * Check if the parent and child elements are intersecting.
 * 
 * @returns {Boolean}
 * 
 * @private
 */
ColorChecker.prototype.checkeElementsIntersection = function () {
    const {
        right: child_right,
        left: child_left,
        bottom: child_bottom,
        top: child_top,
    } = this.options.child.getBoundingClientRect()

    const {
        right: parent_right,
        left: parent_left,
        bottom: parent_bottom,
        top: parent_top,
    } = this.options.parent.getBoundingClientRect()

    return !(
        child_right < parent_left ||
        child_left > parent_right ||
        child_bottom < parent_top ||
        child_top > parent_bottom
    )
}

/**
 * Set the elements to compare and assign them to the options object.
 * Elements can be passed as a CSS selector or as an HTMLElement.
 * 
 * @param {ColorCheckerOptions} params
 *
 * @returns {ColorChecker} - The current instance of ColorChecker for method chaining
 */
ColorChecker.prototype.updateOptions = function (params) {
    try {
        this.options = {
            parent: null,
            child: null
        }

        this.setComparableElements(params)
        return this
    }

    catch (error) {
        console.warn('(ERROR) ColorChecker:', error)
        return this
    }
}

/**
 * @property {String[]|null} color    - Array of colors to check the contrast against the image 
 * @property {Boolean} [debug=false]  - Append the calculated average color in the DOM
 * 
 * @returns {String} - The color from the array that has the closest luminance value to the average color of the child element
 */
ColorChecker.prototype.compare = function (color = [], debug = false) {
    try {
        if (Array.isArray(color) && color.length <= 0) {
            throw new Error('Empty colors array')
        }

        if (!this.options.child || !this.options.parent) {
            throw new Error('Child or parent element is not set.')
        }

        const c_bounds = this.options.child.getBoundingClientRect()
        const p_bounds = this.options.parent.getBoundingClientRect()

        this.canvas.width = p_bounds.width
        this.canvas.height = p_bounds.height

        const ctx = this.canvas.getContext('2d', {
            willReadFrequently: true
        })

        const left = c_bounds.left - p_bounds.left
        const top = c_bounds.top - p_bounds.top

        ctx.drawImage(this.options.parent, 0, 0, this.canvas.width, this.canvas.height)

        const imageData = ctx.getImageData(left, top, c_bounds.width, c_bounds.height)
        const data = Float32Array.from(imageData.data)

        const length = data.length / 4
        const rgb_sum = [0, 0, 0]

        for (let index = 0; index < length; index++) {
            rgb_sum[0] += data[index * 4 + 0]
            rgb_sum[1] += data[index * 4 + 1]
            rgb_sum[2] += data[index * 4 + 2]
        }

        const avg = [
            Math.floor(rgb_sum[0] / length),
            Math.floor(rgb_sum[1] / length),
            Math.floor(rgb_sum[2] / length)
        ]

        const l_avg = luminanceValue(avg)
        const result = color.reduce((acc, cur) => {
            const l1 = Math.abs(luminanceValue(hex2rgb(acc)) - l_avg)
            const l2 = Math.abs(luminanceValue(hex2rgb(cur)) - l_avg)

            return l1 > l2 ? acc : cur
        })

        if (debug) {
            console.log('Child element', this.options.child)
            console.log('Parent element', this.options.parent)

            console.table({
                'Avg value':       rgb2hex(avg),
                'Avg luminance':   l_avg,
                'Result':          result,
            })

            printColor(avg, this.options.child)
        }

        return result
    } 
    
    catch (error) {
        console.warn('(ERROR) ColorChecker:', error)
        return window.getComputedStyle(this.options.child ?? document.body)['color'] || 'rgb(0, 0, 0)'
    }
}

export default ColorChecker