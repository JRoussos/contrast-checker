/**
 * 
 * @param {String} hex - A color value in hexadecimal form
 * @returns An array with the rgb channels 
 */

export const hex2rgb = hex => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

    return [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ]
}