/**
 * Calculates the luminance value of a color based on its RGB channels.
 * 
 * @param {number[]} rgb - An array with the rgb channels 
 * @returns The greyscale lumince value of the color
 */

export const luminanceValue = (rgb=[]) => {
    if (!Array.isArray(rgb) || rgb.length !== 3 || !rgb.every(v => !isNaN(v) && v >= 0 && v <= 255)) {
        throw new Error("Invalid RGB input. Expected an array of three integers between 0 and 255.")
    }

    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]
}