const express = require('express')

const imageService = require("src/services/image");
const utils = require("src/utils");

const router = express.Router()

router.get('/dominant-color', async (req, res, next) => {
  const { "image-url": imageUrl } = req.query;

  try {
    const dominantColor = await imageService.getDominantColor(imageUrl);
    const result = {
      "dominant-color": dominantColor
    }
  
    res
      .status(200)
      .send(utils.buildResponse(result, true));    
  } catch (error) {
    return next(error)
  }

  return null
})

module.exports = router;
