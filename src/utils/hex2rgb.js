/**
 * Converts a hexadecimal color value to an RGB array.
 * 
 * @param {String} hex - A color value in hexadecimal form
 * @returns An array with the rgb channels 
 */
export const hex2rgb = hex => {
<<<<<<< HEAD
=======
    // const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

>>>>>>> 974f55edb744740f3b314a38d7eab43a1abef35d
    const result = /^#?([a-f\d]{1,2})([a-f\d]{1,2})([a-f\d]{1,2})$/i.exec(hex);
    
    if (!result) {
        throw new Error("Invalid hex color format. Expected a 3- or 6-character hex string.");
    }

    return [
        parseInt(result[1].length === 1 ? result[1] + result[1] : result[1], 16),
        parseInt(result[2].length === 1 ? result[2] + result[2] : result[2], 16),
        parseInt(result[3].length === 1 ? result[3] + result[3] : result[3], 16)
    ]
}