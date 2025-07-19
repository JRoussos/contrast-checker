/**
     * 
     * @param {Array} rgb - An array with the rgb channels 
     * @returns The greyscale lumince value of the color
     */

export const luminanceValue = rgb => {
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]
}