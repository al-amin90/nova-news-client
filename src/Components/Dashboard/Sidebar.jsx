import { useState } from "react";
import { GrLogout } from "react-icons/gr";
import { PiArticleMediumBold } from "react-icons/pi";
import { AiOutlineBars } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import MenuItem from "./MenuItem";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { MdWorkspacePremium } from "react-icons/md";
import { FcAbout } from "react-icons/fc";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 h-16 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer px-4 pt-2 font-bold">
            <Link to="/">
              <div className="w-full flex px-4 py-2 shadow-lg rounded-full justify-center items-center text-base md:text-xl font-bold gap-3 mx-auto">
                <img
                  // className='hidden md:block'
                  src="/nova.svg"
                  alt="logo"
                  width="24"
                  height="24"
                />
                novaNews
              </div>
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <Link to="/">
              <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-full justify-center items-center text-base md:text-xl font-bold gap-3 mx-auto">
                <img
                  // className='hidden md:block'
                  src="/nova.svg"
                  alt="logo"
                  width="35"
                  height="35"
                />
                novaNews
              </div>
            </Link>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            {/* Conditional toggle button here.. */}

            {/*  Menu Items */}
            <nav>
              {/* Statistics */}
              <MenuItem
                label={"About"}
                address="/dashboard"
                icon={FcAbout}
              ></MenuItem>
              <MenuItem
                label={"All Users"}
                address="/dashboard/allusers"
                icon={HiUserGroup}
              ></MenuItem>
              <MenuItem
                label={"All Article"}
                address="/dashboard/manageArticle"
                icon={PiArticleMediumBold}
              ></MenuItem>
              <MenuItem
                label={"Add Publisher"}
                address="/dashboard/addPublisher"
                icon={MdOutlineLibraryAdd}
              ></MenuItem>
              <hr />

              <MenuItem label={"Home"} address="/" icon={FaHome}></MenuItem>
              <MenuItem
                label={"Premium Articles"}
                address="/premiumArticles"
                icon={MdWorkspacePremium}
              ></MenuItem>
            </nav>
          </div>
        </div>

        <div>
          <button
            onClick={logOut}
            className="flex w-full items-center font-bold uppercase text-xs py-1 md:py-2 rounded-full px-3 md:px-6 bg-[#FF2400] transition-all shadow-md duration-300 border-y border-[#FF664D] hover:bg-[#ff5537] text-white"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
