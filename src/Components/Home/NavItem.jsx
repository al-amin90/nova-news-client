import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ address, label }) => {
  return (
    <NavLink
      to={address}
      className={({ isActive }) =>
        `text-white rounded-full hover:border hover:border-[#E46752]  transition-all duration-300 text-xs 2xl:text-sm transform font-bold ${
          isActive ? "bg-[#FF2400]" : ""
        } px-4 py-px`
      }
    >
      {label}
    </NavLink>
  );
};

export default NavItem;
