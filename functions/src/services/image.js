const ColorThief = require("colorthief");
const { rgbToColorString, parseToRgb, toColorString } = require("polished")

const getDominantColor = async (imageUrl) => {
  let result = null;

  try {
    result = await ColorThief.getColor(imageUrl)
      .then(rgb => rgbToColorString(parseToRgb(`rgb(${rgb})`)))
  } catch (error) {
    console.error(error);
    throw error;
  }

  return result;
}

module.exports = { getDominantColor }
