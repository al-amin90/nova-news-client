import axios from "axios";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
const axiosPublic = useAxiosPublic();

export const baseURL = "http://localhost:5000";

const image_hoisting_key = import.meta.env.VITE_IMAGE_HOISTING_KEY;
const image_hoisting_api = `https://api.imgbb.com/1/upload?key=${image_hoisting_key}`;

export const imageUpload = async (image) => {
  // console.log(image);
  // const imageFile = { image: image };
  const fromData = new FormData();
  console.log(image);
  fromData.append("image", image);

  const { data } = await axios.post(image_hoisting_api, fromData);

  // const { data } = await axios.post(image_hoisting_api, imageFile, {
  //   headers: {
  //     "content-type": "multipart/form-data",
  //   },
  // });

  return data.data.display_url;
};

export const saveUser = async (currentUser) => {
  console.log(currentUser);
  const currentUserInfo = {
    email: currentUser?.email,
    name: currentUser?.displayName,
    photo: currentUser?.photoURL,
    isAdmin: false,
    timeStamp: new Date(),
  };
  console.log("sending db", currentUserInfo);

  try {
    const { data } = await axiosPublic.post("/users", currentUserInfo);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};
