import jimp from "jimp";

async function resizeImage(imagePath) {
    const image = await jimp.read(imagePath);
    await image.resize(250, 250);
    await image.writeAsync(imagePath);
  }

export default resizeImage;