import { Link, NavLink } from "react-router-dom";
import NavItem from "../../Components/Home/NavItem";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useAuth();
  //   const [cart] = useCart();
  //   const [isAdmin] = useAdmin();

  const navLinks = (
    <div className="flex flex-col lg:flex-row items-center text-sm lg:gap-4 uppercase *:cursor-pointer font-semibold">
      <li>
        <NavItem label={"Home"} address="/"></NavItem>
        <NavItem label={"Add Articles"} address="/addArticles"></NavItem>
        <NavItem label={"All Articles"} address="/allArticles"></NavItem>
        <NavItem label={"Subscription"} address="/subscription"></NavItem>
        <NavItem label={"Dashboard"} address="/dashboard"></NavItem>
        <NavItem label={"My Articles"} address="/myArticles"></NavItem>
        <NavItem
          label={"Premium Articles"}
          address="/premiumArticles"
        ></NavItem>
      </li>
    </div>
  );

  const handleLogOut = () => {
    logOut().then(() => {
      toast.success("Log Out Successfully", {
        style: {
          background: "#2B3440",
          color: "#fff",
        },
      });
    });
  };

  return (
    <div>
      <div className="navbar bg-[#1515157a] md:px-10 text-white fixed z-10">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box bg-white/20 backdrop-blur-md w-52"
            >
              {navLinks}
            </ul>
          </div>
          <div className="flex gap-3 font-extrabold  items-end">
            <img src={"/nova.svg"} className="w-8 md:block hidden" alt="" />
            <div className="">
              <p className="text-base md:text-xl">novaNews</p>
            </div>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="items-end justify-end flex px-1">{navLinks}</ul>
        </div>
        <div className="navbar-end">
          {/* <img className="" src={profile} alt="" /> */}
          {user ? (
            <>
              <button
                onClick={handleLogOut}
                className="font-bold uppercase text-xs ml-6 mr-5 py-1 md:py-2 rounded-full px-3 md:px-6 bg-[#FF2400] transition-all shadow-md duration-300 border-y border-[#FF664D] hover:bg-[#ff5537] text-white"
              >
                Log Out
              </button>
              <div className="avatar">
                <div className="w-9  rounded-full">
                  <img src={user?.photoURL} />
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="font-bold uppercase text-xs ml-6 mr-2 py-1 md:py-2 rounded-full px-3 md:px-6 bg-[#FF2400] transition-all shadow-md duration-300 border-y border-[#FF664D] hover:bg-[#ff5537] text-white">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="font-bold uppercase text-xs py-1 md:py-2 rounded-full px-3 md:px-6 bg-[#FF2400] transition-all shadow-md duration-300 border-y border-[#FF664D] hover:bg-[#ff5537] text-white">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
