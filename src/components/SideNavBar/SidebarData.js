import React from "react";
import * as CgIcons from "react-icons/cg";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";

//Compile link data
export const SidebarData = [
  {
    //Certificate function
    title: "Certificate",
    path: "/",
    icon: <FaIcons.FaCertificate />,
    cName: "nav-text",
  },
  {
    //Notifications function
    title: "Notifications",
    path: "/reports",
    icon: <IoIcons.IoIosNotifications />,
    cName: "nav-text",
  },
  {
    //Transfer function
    title: "Transfer",
    path: "/products",
    icon: <IoIcons.IoIosSend />,
    cName: "nav-text",
  },
  {
    //Profile function
    title: "Profile",
    path: "/team",
    icon: <CgIcons.CgProfile />,
    cName: "nav-text",
  },
];
