import { rgb2hex } from "./rgb2hex"

/**
 * 
 * @param {Array} rgb - An array with the rgb channels 
 * @param {HTMLElement} child - The child element to position the color block
 */
export const printColor = (rgb, child) => {
    const { top } = child.getBoundingClientRect()
    const block = document.createElement('div')

    block.style.top = top + 'px'
    block.style.background = rgb2hex(rgb)
    block.innerText = rgb2hex(rgb)

    child.innerHTML = ''
    child.append(block)
}