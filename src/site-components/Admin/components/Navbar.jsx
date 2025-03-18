/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { RiMenuFold3Fill } from "react-icons/ri";
import rpnl_logo from "../../site-components/website/assets/Images/rpnl_logo.png";

import {
  FILE_API_URL,
  PHP_API_URL,
} from "../../site-components/Helper/Constant";
import {
  AiOutlineDashboard,
  AiOutlineBook,
  
  AiOutlineUserAdd,
 
  AiOutlineLogout
} from "react-icons/ai";
import {
  FaChalkboardTeacher,
  FaFileAlt,
  FaClipboardList,
  FaUserGraduate,
 
} from "react-icons/fa";
import {
  MdAssignment,
  MdQuiz,
  MdCardMembership,
} from "react-icons/md";
import {
  facultyData,
  RoleDbData,
} from "../../site-components/admin/FetchFacultyLoginData";
import { GoProject } from "react-icons/go";
import { IoIosSettings } from "react-icons/io";
import { RiMenuFold4Fill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PiChalkboardTeacher } from "react-icons/pi";
import secureLocalStorage from "react-secure-storage";
import { memo } from "react";
import { dataFetchingPost } from "../../site-components/Helper/HelperFunction";
import { NODE_API_URL } from "../../site-components/Helper/Constant";
import Select from "react-select";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";



const Navbar = ({ toggleExpand, toggleFolded }) => {
  const [activeSidebarMenu, setActiveSidebarMenu] = useState(null);
  const [activeSubSidebarMenu, setActiveSubSidebarMenu] = useState(null);
  const [expand, setExpand] = useState(false);
  const [folded, setFolded] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [modalShow, setModalShow] = useState(false);
  const [sessionTitle, setSessionTitle] = useState("");
  const [facultyDataList, setFacultyDataList] = useState([]);
  const [RolePermission, setRolePermission] = useState([]);
  const login_id = secureLocalStorage.getItem("login_id");
  const loginType = secureLocalStorage.getItem("loginType");
  const role_id = secureLocalStorage.getItem("role_id");
  const ftchFac = async (dbId) => {
    const resp = await facultyData(dbId);
    setFacultyDataList(resp);
  };
 
  useEffect(() => {
    ftchFac(login_id);
  }, [login_id]);
  useEffect(() => {
    fetchRolePermsn(role_id);
  }, [role_id]);
  useEffect(() => {
    getSessionTitle();
  }, []);
  const getCurrentSession = async () => {
    try {
      const bformData = new FormData();
      bformData.append("data", "get_currentsession");

      const response = await axios.post(
        `${PHP_API_URL}/sitesetting.php`,
        bformData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status === 200) {
        localStorage.setItem(
          "session",
          response?.data?.data[0]?.currentsession
        );
        localStorage.setItem("sessionTitle", response?.data?.data[0]?.dtitle);
        setSessionTitle(response?.data?.data[0]?.dtitle);
      }
    } catch (error) {
      const status = error.response?.data?.status;
      if (status === 400 || status === 500) {
        toast.error(error.response.data.msg || "A server error occurred.");
      } else {
        toast.error(
          "An error occurred. Please check your connection or try again."
        );
      }
    }
  };

  const getSessionTitle = () => {
    const title = localStorage.getItem("sessionTitle");
    if (title) {
      setSessionTitle(title);
    } else {
      getCurrentSession();
      setSessionTitle("Select Session");
    }
  };

  const sideBarMenu = [
    {
      title: "Dashboard",
      icon: <AiOutlineDashboard />, // General dashboard icon
      url: "",
      dropdownMenus: [
        { subtitle: "Home", url: "home", icon: <FaUserGraduate /> },
        { subtitle: "Admin", url: "admin-dashboard", icon: <FaUserGraduate /> },
        { subtitle: "Faculty", url: "faculty-dashboard", icon: <FaChalkboardTeacher /> },
        { subtitle: "User Log", url: "user-log", icon: <FaChalkboardTeacher /> },
      ],
    },
    {
      title: "Exam Management",
      icon: <AiOutlineBook />, // Books represent learning/exams
      url: "",
      dropdownMenus: [
        {
          subtitle: "Add Exam Paper",
          url: "exam-paper/add-update",
          icon: <FaFileAlt />,
        }, // Document icon for papers
        {
          subtitle: "Exam Paper List",
          url: "exam-paper/list",
          icon: <FaClipboardList />,
        }, // List icon for multiple papers
        {
          subtitle: "Admit Card",
          url: "exam-paper/admit-card",
          icon: <MdCardMembership />,
        }, // Card icon for admit cards
        { subtitle: "Assignment", url: "assignment", icon: <MdAssignment /> }, // Assignment-related icon
        {
          subtitle: "Assignment Response",
          url: "assignment-response",
          icon: <FaClipboardList />,
        }, // Clipboard for response tracking
        { subtitle: "Quiz", url: "quiz", icon: <MdQuiz /> }, // Quiz-related icon
        {
          subtitle: "Quiz Response",
          url: "quiz-response",
          icon: <FaClipboardList />,
        }, // Similar to assignment response
      ],
    },
  
    {
      title: "Reports",
      icon: <AiOutlineUserAdd />, // Icon for reports (user-related)
      url: "reports",
      dropdownMenus: [],
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
    navigate("/admin/");
    window.location.reload(); // This will force a page reload
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
            <img style={{ width: "35%" }} src={rpnl_logo} alt="Logo" />
            <img
              style={{ width: "35%" }}
              className="logo-fold"
              src={rpnl_logo}
              alt="Logo Folded"
            />
          </Link>
          <div className="desktop-toggle mr-3" onClick={toggleSidebarFolded}>
            <RiMenuFold3Fill />
          </div>
        </div>
        <div className="logo logo-white">
          <Link href="/admin/home">
            <img style={{ width: "35%" }} src={rpnl_logo} alt="Logo White" />
            <img
              style={{ width: "35%" }}
              className="logo-fold"
              src={rpnl_logo}
              alt="Logo Folded White"
            />
          </Link>
        </div>
        <div className="nav-wrap">
          <ul className="nav-left">
            <li className="mobile-toggle mr-3" onClick={toggleSidebar}>
              <RiMenuFold4Fill />
            </li>
            <li
              className="bg_light text-dark d-flex justify-content-center align-items-center "
              style={{
                padding: "10px 18px",
                borderRadius: "20px",
                cursor: "pointer",
              }}
              onClick={() => setModalShow(true)}
            >
              <i className="fa-solid fa-calendar-days text-primary mr-3"></i>
              <div className="">{sessionTitle}</div>
            </li>
          </ul>
          <ul className="nav-right">
            <li className="dropdown dropdown-animated scale-left">
              <div className="pointer" onClick={() => setShowPopup(!showPopup)}>
                <div className="avatar avatar-image m-h-10 m-r-15">
                  <img
                    src={`${FILE_API_URL}/user/${facultyDataList?.uid}/${facultyDataList?.avtar}`}
                    alt="User Avatar"
                  />
                </div>
              </div>
              {showPopup && (
                <div className="dropdown-menu pop-profile show">
                  <div className="p-h-20 p-b-15 m-b-10 border-bottom">
                    <div className="d-flex">
                      <img
                        src={`${FILE_API_URL}/user/${facultyDataList?.uid}/${facultyDataList?.avtar}`}
                        style={{ width: "50px", height: "50px" }}
                        className="rounded-circle"
                        alt="User"
                      />
                      <div className="m-l-10">
                        <p className="m-b-0 text-dark font-weight-semibold">
                          {facultyDataList?.first_name}{" "}
                          {facultyDataList?.middle_name}{" "}
                          {facultyDataList?.last_name}
                        </p>
                        <p className="m-b-0 opacity-07">
                          {facultyDataList?.u_email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <a
                    className="dropdown-item d-block p-h-15 p-v-10"
                    onClick={logOut}
                    style={{ cursor: "pointer" }}
                  >
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
              let activeClass =
                Array.isArray(url) && url.length > 1 ? url[1] : false;
              let showMenu = true;
              console.log(RolePermission)
              if (RolePermission && RolePermission.length > 0) {
                let resp = RolePermission.map((rData) => Object.keys(rData)[0]);

                showMenu = resp.length > 0 && resp.includes(option.title);
               
              }
              if (option.url && (showMenu || loginType === "superadmin")) {
                return (
                  <li
                    key={index}
                    className={`nav-item dropdown cursor ${activeClass == option.url ? "mactive" : ""
                      }`}
                  >
                    <Link to={`/admin/${option.url}`}>
                      <span className="icon-holder">{option.icon}</span>
                      <span className="title font-14">{option.title}</span>
                    </Link>
                  </li>
                );
              }
              let addClass = option.dropdownMenus.some(
                (item) => activeClass == item.url
              );
              // If the menu has dropdown items and should be shown
              if (!option.url && (showMenu || loginType === "superadmin")) {
                return (
                  <li
                    key={index}
                    className={`nav-item dropdown cursor ${activeSidebarMenu === index || addClass ? "open" : ""
                      }`}
                    onClick={() =>
                      setActiveSidebarMenu(
                        activeSidebarMenu === index ? null : index
                      )
                    }
                  >
                    <a className="dropdown-toggle">
                      <span className="icon-holder">{option.icon}</span>
                      <span className="title font-14">{option.title}</span>
                      <span className="arrow">
                        <i className="arrow-icon"></i>
                      </span>
                    </a>
                    <ul className="dropdown-menu">
                      {option.dropdownMenus?.map((subOption, subIndex) => {
                        let showSubMenu = RolePermission?.some((rData) => {
                          let arr = rData[Object.keys(rData)[0]]; // Get the array of roles
                          return arr?.some(
                            (item) =>
                              item.subRole === subOption.subtitle &&
                              item.crud.length > 0
                          );
                        });

                        if (showSubMenu || loginType === "superadmin") {
                          return (
                            <li
                              key={subIndex}
                              className={`${activeSubSidebarMenu === subIndex
                                ? "active"
                                : ""
                                } font-14`}
                              onClick={() => setActiveSubSidebarMenu(subIndex)}
                            >
                              <Link
                                to={`/admin/${subOption.url}`}
                                className="font-14"
                              >
                                <span className="icon-holder">
                                  {subOption.icon}
                                </span>
                                <span className="ml-1 font-14">
                                  {subOption.subtitle}
                                </span>
                              </Link>
                            </li>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </ul>
                  </li>
                );
              }
              return null; // Ensure that something is returned in all cases
            })}
          </ul>
        </div>
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        submit={() => {
          setModalShow(false);
          window.location.reload();
        }}
      />
    </>
  );
};

export default memo(Navbar);
