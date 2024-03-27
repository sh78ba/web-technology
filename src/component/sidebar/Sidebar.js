import "./sidebar.css";

import React from "react";
import { BiSolidSchool } from "react-icons/bi";
import { IoMdHome } from "react-icons/io";
import { FaBuilding } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate=useNavigate();
  return (
    <div className="sidebar">
      <ul>
        <li><BiSolidSchool />
          Staff Housing
          <p>National Institute of Technology,Warangal</p>
        </li>
        <li onClick={()=>navigate("/user/dashboard")}><IoMdHome/>Dashboard</li>
        <li onClick={()=>navigate("/user/myquarters")}><FaBuilding />Your Quarters</li>
        <li onClick={()=>navigate("/user/requests")}><MdEmail />Requests</li>
      </ul>
    </div>
  );
};

export default Sidebar;
