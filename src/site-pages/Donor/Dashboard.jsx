import React, { useState } from "react";
import { useDonor } from "../../site-components/Donor/ContextApi/DonorContext";
import userImg from "../../site-components/common/assets/img/user.png";

const Dashboard = () => {
  const { donor } = useDonor();
  const [sidebar, setSidebar] = useState(false);

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

  return (
    <>
      <div className="appHeader border-0">
        <div className="left">
          <img src={userImg} alt="User" className="imaged w32" />
        </div>
        <div className="right">
          <button
            className="headerButton border d-flex justify-content-center align-items-center f-16 span-grid"
            onClick={() => setSidebar(!sidebar)}
          >
            <ion-icon name="grid-outline"></ion-icon>
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
                  { key: "employee", icon: "person-outline", label: "Employee", links: [{ href: "./add-employee.php", text: "New Employee" }, { href: "./employee-list.php", text: "Employees" }] },
                  { key: "stage", icon: "car-outline", label: "Stages", links: [{ href: "./stage1.php", text: "Stage 1" }, { href: "./stage2.php", text: "Stage 2" }, { href: "./stage3.php", text: "Stage 3" }, { href: "./stage4.php", text: "Stage 4" }, { href: "./stage5.php", text: "Stage 5" }, { href: "./stage6.php", text: "Stage 6" }] },
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
                        <a key={index} href={link.href}>{link.text}</a>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Logout Button */}
                <div className="d-flex align-items-center id-side-logout-wrapper">
                  <ion-icon name="log-out-outline"></ion-icon>
                  <button className="id-side-logout-btn px-2" onClick={() => console.log("Logging out...")}>
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
