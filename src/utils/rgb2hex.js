/**
 * 
 * @param {Array} rgb - An array with the rgb channels 
 * @returns A color value in hexadecimal form
 */

export const rgb2hex = rgb => {
    const toHex = value => {
        const hex = value.toString(16)
        return hex.length == 1 ? "0" + hex : hex
    }

    return "#" + toHex(rgb[0]) + toHex(rgb[1]) + toHex(rgb[2])
}