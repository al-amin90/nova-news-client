import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Dashboard/Sidebar";

const Dashboard = () => {
  return (
    <div className=" relative min-h-screen">
      <Sidebar></Sidebar>
      <div className="flex-1 p-5 md:ml-64">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
