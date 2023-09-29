import React from "react";

import Image from "next/image";

import {
  AiOutlineHistory,
  AiOutlineHome,
  AiOutlineMessage,
} from "react-icons/ai";

import { BiSolidHome, BiTime, BiSupport } from "react-icons/bi";

import { RiToggleLine } from "react-icons/ri";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="logo-container">
        <h2>Voyage</h2>
      </div>

      <ul className="navigations">
        <li>
          <BiSolidHome className="nav-icon" />

          <span>Home</span>
        </li>

        <li>
          <BiTime className="nav-icon" />

          <span>History</span>
        </li>

        <li>
          <BiSupport className="nav-icon" />

          <span>Support</span>
        </li>
      </ul>

      <RiToggleLine className="nav-icon" />
    </div>
  );
};

export default Sidebar;
