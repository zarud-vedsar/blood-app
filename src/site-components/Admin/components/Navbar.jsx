/* eslint-disable no-unused-vars */
import React, { useEffect, useState, memo } from "react";
import { RiMenuFold3Fill, RiMenuFold4Fill } from "react-icons/ri";
import logo from "../../../site-components/common/assets/img/logo-donation.avif";
import userImg from "../../../site-components/common/assets/img/user.png";
import { useAdminContext } from "../../../site-components/Admin/ContextApi/AdminContext"
import {
  AiOutlineDashboard,
  AiOutlineBook,
  AiOutlineLogout,
} from "react-icons/ai";
import {
  FaChalkboardTeacher,
  FaFileAlt,
  FaClipboardList,
  FaUserGraduate,
} from "react-icons/fa";
import { MdAssignment, MdQuiz, MdCardMembership } from "react-icons/md";

import { Link, useLocation, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const Navbar = ({ toggleExpand, toggleFolded }) => {
  const [activeSidebarMenu, setActiveSidebarMenu] = useState(null);
  const [activeSubSidebarMenu, setActiveSubSidebarMenu] = useState(null);
  const [expand, setExpand] = useState(false);
  const [folded, setFolded] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();
  const { adminDetail} = useAdminContext(); 

  const sideBarMenu = [
    {
      title: "Dashboard",
      icon: <AiOutlineDashboard />,
      url: "dashboard",
      dropdownMenus: [
      ],
    },
    {
      title: "Donor List",
      icon: <AiOutlineDashboard />,
      url: "donor/list",
      dropdownMenus: [
      ],
    },
    {
      title: "Blood Request List",
      icon: <AiOutlineBook />,
      url: "blood-request/list",
      dropdownMenus: [
        
      ],
    },
    {
      title: "Donatation List",
      icon: <AiOutlineBook />,
      url: "donation/list",
      dropdownMenus: [
        
      ],
    },
    
  ];

  useEffect(() => {
    setExpand(false);
    toggleExpand(false);
  }, [location.pathname]);

  function toggleSidebar() {
    setExpand(!expand);
    toggleExpand(!expand);
  }

  const logOut = () => {
    secureLocalStorage.clear();
    window.location.reload();
  };

  function toggleSidebarFolded() {
    setFolded(!folded);
    toggleFolded(!folded);
  }
  

  return (
    <>
      <div className="header bg-white border-none shadow-head-sm">
        <div className="logo logo-dark d-flex justify-content-center align-items-center">
          <Link to="/admin/home">
            <img style={{ width: "35%" }} src={logo} alt="Logo" />
            <img style={{ width: "35%" }} className="logo-fold" src={logo} alt="Logo Folded" />
          </Link>
          <div className="desktop-toggle mr-3" onClick={toggleSidebarFolded}>
            <RiMenuFold3Fill />
          </div>
          
        </div>
        <div className="nav-wrap">
        <ul className="nav-left">
            <li className="mobile-toggle mr-3" onClick={toggleSidebar}>
              <RiMenuFold4Fill />
            </li>
            
          </ul>
          <ul className="nav-right">
            <li className="dropdown dropdown-animated scale-left">
              <div className="pointer" onClick={() => setShowPopup(!showPopup)}>
                <div className="avatar avatar-image m-h-10 m-r-15">
                  <img src={userImg} alt="User Avatar" />
                </div>
              </div>
              {showPopup && (
                <div className="dropdown-menu pop-profile show">
                  <div className="p-h-20 p-b-15 m-b-10 border-bottom">
                    <div className="d-flex">
                      <img src={userImg} style={{ width: "50px", height: "50px" }} className="rounded-circle" alt="User" />
                      <div className="m-l-10">
                        <p className="m-b-0 text-dark font-weight-semibold">{adminDetail?.u_name}</p>
                        <p className="m-b-0 opacity-07">{adminDetail?.u_email}</p>
                      </div>
                    </div>
                  </div>
                  <a className="dropdown-item d-block p-h-15 p-v-10" onClick={logOut} style={{ cursor: "pointer" }}>
                    <AiOutlineLogout />
                    <span className="m-l-10">Logout</span>
                  </a>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>

      <div className={`side-nav ${expand ? "expanded" : ""}`}>
        <div className="side-nav-inner">
          <ul className="side-nav-menu scrollable">
            {sideBarMenu.map((option, index) => {
              const url = location?.pathname?.split("/admin/");
              let activeClass = Array.isArray(url) && url.length > 1 ? url[1] : false;

              if (option.url) {
                return (
                  <li key={index} className={`nav-item dropdown cursor ${activeClass === option.url ? "mactive" : ""}`}>
                    <Link to={`/admin/${option.url}`}>
                      <span className="icon-holder">{option.icon}</span>
                      <span className="title font-14">{option.title}</span>
                    </Link>
                  </li>
                );
              }

              let addClass = option.dropdownMenus.some((item) => activeClass === item.url);

              return (
                <li key={index} className={`nav-item dropdown cursor ${activeSidebarMenu === index || addClass ? "open" : ""}`} onClick={() => setActiveSidebarMenu(activeSidebarMenu === index ? null : index)}>
                  <a className="dropdown-toggle">
                    <span className="icon-holder">{option.icon}</span>
                    <span className="title font-14">{option.title}</span>
                    <span className="arrow">
                      <i className="arrow-icon"></i>
                    </span>
                  </a>
                  <ul className="dropdown-menu">
                    {option.dropdownMenus.map((subOption, subIndex) => (
                      <li key={subIndex} className={`${activeSubSidebarMenu === subIndex ? "active" : ""} font-14`} onClick={() => setActiveSubSidebarMenu(subIndex)}>
                        <Link to={`/admin/${subOption.url}`} className="font-14">
                          <span className="icon-holder">{subOption.icon}</span>
                          <span className="ml-1 font-14">{subOption.subtitle}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default memo(Navbar);
