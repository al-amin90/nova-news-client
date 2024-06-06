import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";
import UpdateUserModal from "../../Components/Modal/UpateUserModal";

const Profile = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  console.log(user);
  return (
    <div className="flex justify-center pt-24 items-center h-screen">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div
        style={{
          backgroundImage: `url("https://i.ibb.co/qphhkLY/hao-wang-p-Vq6-Yhm-DPtk-unsplash.jpg")`,
        }}
        className="bg-white border shadow-lg rounded-2xl w-3/5"
      >
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl">
          <img
            alt="profile"
            src="https://i.ibb.co/qphhkLY/hao-wang-p-Vq6-Yhm-DPtk-unsplash.jpg"
            className="w-full mb-4 object-cover rounded-t-lg h-48"
          />
          <div className="flex flex-col text-white items-center justify-center p-4 -mt-20">
            <a href="#" className="relative block">
              <img
                alt="profile"
                src={user.photoURL}
                className="mx-auto object-cover rounded-full h-24 w-24  border-2 border-white "
              />
            </a>

            <p className="p-2 px-4 mt-2 text-xs text-white bg-[#FF2400] rounded-full">
              Admin
            </p>
            <p className="mt-2 text-xl font-medium  ">User Id: {user.uid}</p>
            <div className="w-full p-2 mt-4 rounded-lg">
              <div className="flex flex-wrap items-center justify-between text-sm  ">
                <p className="flex flex-col">
                  Name:---
                  <span className="font-bold  ">{user.displayName}</span>
                </p>
                <p className="flex flex-col">
                  Email:---
                  <span className="font-bold  ">{user.email}</span>
                </p>

                <div>
                  <button
                    onClick={() => setIsOpen(true)}
                    className="bg-[#E02332] px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053] block mb-1"
                  >
                    Update Profile
                  </button>
                  <UpdateUserModal
                    setIsOpen={setIsOpen}
                    isOpen={isOpen}
                    user={user}
                  ></UpdateUserModal>
                  <button className="bg-[#E02332] px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053]">
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
