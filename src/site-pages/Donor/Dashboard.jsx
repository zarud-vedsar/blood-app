import React, { useState } from "react";
import { useDonor } from "../../site-components/Donor/ContextApi/DonorContext";
import userImg from "../../site-components/common/assets/img/user.png";
import  secureLocalStorage  from  "react-secure-storage";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { donor } = useDonor();
  const [sidebar, setSidebar] = useState(false);
const navigate = useNavigate();
  const [dropdowns, setDropdowns] = useState({
    employee: false,
    spare: false,
    machine: false,
    vehicle: false,
    service: false,
    stage: false,
  });

  const toggleDropdown = (key) => {
    setDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  const logout =()=>{
    secureLocalStorage.clear();
    setTimeout(() => {
      navigate('/info')
    }, 300);
  }

  return (
    <>
      <div className="appHeader border-0">
        <div className="left">
          <img src={userImg} alt="User" className="imaged w32" />
        </div>
        <div className="right">
          <button
            className="headerButton  d-flex justify-content-center align-items-center f-16 span-grid btn"
            onClick={() => setSidebar(!sidebar)}
          >
            <ion-icon name="grid-outline" ></ion-icon>
          </button>
        </div>
      </div>

      {/* Sidebar Modal */}
      <div className={`modal fade panelbox panelbox-left ${sidebar ? "show" : ""}`} style={{ display: sidebar ? "block" : "none" }}>
        <div className="modal-dialog">
          <div className="modal-content" style={{ overflow: "hidden" }}>
            <div className="modal-body p-0">
              {/* Profile Section */}
              <div className="profileBox pt-2 pb-2">
                <div className="image-wrapper">
                  <img src={userImg} alt="User" className="imaged w36" />
                </div>
                <div className="in">
                  <strong className="fw-600 fw-16">{donor?.name || "Name"}</strong>
                  <div className="text-muted fw-500 fw-14">{donor?.email || "Email"}</div>
                </div>
                <button className="btn btn-link btn-icon sidebar-close fw-600 f-18" onClick={() => setSidebar(!sidebar)}>
                  <ion-icon name="close-outline"></ion-icon>
                </button>
              </div>

              {/* Sidebar Menu */}
              <div className="am-sidebar am-open" id="sidebar">
                <a href="./home.php" className="am-dropdown active">
                  <span>
                    <ion-icon name="home-outline"></ion-icon> Home
                  </span>
                </a>

                {/* Dropdowns */}
                {[
                  { key: "blood request", icon: "person-outline", label: "Blood Request", links: [{ link: "/blood-donation-request/add-new", text: "New Request" }, { link: "/blood-donation-request/request-list", text: "Request List" }] },
                  { key: "donation list", icon: "person-outline", label: "Donation Request", links: [{ link: "/blood-donation/list", text: "Donation List" }, { link: "/blood-donation/history", text: "Donation History" }] },
                ].map(({ key, icon, label, links }) => (
                  <div key={key}>
                    <div className={`am-dropdown ${dropdowns[key] ? "active" : ""}`} onClick={() => toggleDropdown(key)}>
                      <span>
                        <ion-icon name={icon}></ion-icon> {label}
                      </span>
                      <ion-icon name={dropdowns[key] ? "remove-outline" : "add-outline"} className="fw-600 f-18"></ion-icon>
                    </div>
                    <div className="am-dropdown-content" style={{ display: dropdowns[key] ? "block" : "none" }}>
                      {links.map((link, index) => (
                        <Link key={index} to={link.link}>{link.text}</Link>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Logout Button */}
                <div className="d-flex align-items-center id-side-logout-wrapper">
                  <ion-icon name="log-out-outline"></ion-icon>
                  <button className="btn id-side-logout-btn px-2" onClick={logout}>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
