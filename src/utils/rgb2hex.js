/**
 * Converts a number to hexadecimal format.
 * 
 * @param {number} value 
 * 
 * @returns {String} 
 */
const toHex = value => {
    const hexadecimal = parseInt(value, 10).toString(16)

    return hexadecimal.length == 1 
        ? "0" + hexadecimal : hexadecimal
}

/**
 * Converts an RGB color value to hexadecimal format.
 * 
 * @param {number[]} rgb - An array with the rgb channels 
 * 
 * @returns A color value in hexadecimal form
 */
export const rgb2hex = (rgb=[]) => {
    if (!Array.isArray(rgb) || rgb.length !== 3 || !rgb.every(v => !isNaN(v) && v >= 0 && v <= 255)) {
        throw new Error("Invalid RGB input. Expected an array of three integers between 0 and 255.")
    }

    return "#" + toHex(rgb[0]) + toHex(rgb[1]) + toHex(rgb[2])
}