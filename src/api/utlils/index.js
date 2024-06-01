import axios from "axios";

const image_hoisting_key = import.meta.env.VITE_IMAGE_HOISTING_KEY;
const image_hoisting_api = `https://api.imgbb.com/1/upload?key=${image_hoisting_key}`;

export const imageUpload = async (image) => {
  const imageFile = { image: image };

  const { data } = await axios.post(image_hoisting_api, imageFile, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });

  return data.data.display_url;
};
