const uploadImage = async (imageBuffer, cloudinary) => {
  try {
    const result = await cloudinary.uploader.upload(imageBuffer);

    // The result object contains information about the uploaded image
    console.log('Image uploaded to Cloudinary:', result);

    return result;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw error;
  }
};

module.exports  = uploadImage;
  