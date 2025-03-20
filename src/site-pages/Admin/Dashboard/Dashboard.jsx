import React, { useEffect, useState } from "react";
import { useAdminContext } from "../../../site-components/Admin/ContextApi/AdminContext";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import { PHP_API_URL } from "../../../site-components/Helper/Constant";
import { toast } from "react-toastify"; // Ensure toast is imported
import { FaCalendar } from "react-icons/fa";
import { Link } from "react-router-dom";
import bg from "../../../site-components/Admin/assets/images/dashboard/bgimage.png";
import banners2 from "../../../site-components/Admin/assets/images/dashboard/shape-02.png";
import banners4 from "../../../site-components/Admin/assets/images/dashboard/shape-04.png";
import totalDonation from "../../../site-components/Admin/assets/images/dashboard/blood-donation.png"
import pendingDonation from "../../../site-components/Admin/assets/images/dashboard/pendingdonation.png"
import acceptedDonation from "../../../site-components/Admin/assets/images/dashboard/accepteddonation.png"
import rejectedDonation from "../../../site-components/Admin/assets/images/dashboard/remove.png"


const Dashboard = () => {
  const { adminDetail } = useAdminContext();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  console.log(adminDetail)

  const fetchDashboardData = async () => {
    setLoading(true);
    const logUserId = secureLocalStorage.getItem("loguserid");

    try {
      const bformData = new FormData();
      bformData.append("data", "load_donation_overview");
      bformData.append("loguserid", logUserId);

      const response = await axios.post(`${PHP_API_URL}/admin.php`, bformData);

      if (response?.data?.status === 200) {
        setData(response?.data?.data[0]);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } catch (error) {
      setData({});
      const status = error.response?.status;

      if ([400, 401, 500].includes(status)) {
        toast.error(error.response?.data?.msg || "A server error occurred.");
      } else {
        toast.error(
          "An error occurred. Please check your connection or try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminDetail) fetchDashboardData();
  }, [adminDetail]);

  const [greeting, setGreeting] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  useEffect(() => {
    // Function to update greeting based on time
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) {
        setGreeting("Good Morning");
      } else if (hour < 17) {
        setGreeting("Good Afternoon");
      } else if (hour < 20) {
        setGreeting("Good Evening");
      } else {
        setGreeting("Good Night");
      }
    };
    // Function to update current date
    const updateDate = () => {
      const today = new Date();
      // Format Date (e.g., "15 Jun 2024")
      const dateOptions = { day: "2-digit", month: "short", year: "numeric" };
      const formattedDate = today.toLocaleDateString("en-GB", dateOptions);
      // Format Time (e.g., "10:30:45 AM")
      const timeOptions = { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true };
      const formattedTime = today.toLocaleTimeString("en-US", timeOptions);
      // Combine Date & Time
      setCurrentDate(`${formattedDate}, ${formattedTime}`);
    };
    updateGreeting();
    updateDate(); // Initial call
    const interval = setInterval(updateDate, 1000); // Updates every second
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="page-container">
      <div className="main-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-12">
                  <div
                    className="text-white py-4 px-3 mb-3 border_10"
                    style={{ background: "rgb(212 45 45)", overflow: "hidden" }}
                  >
                    <div
                      className="banneradmins"
                      style={{
                        backgroundImage: `url(${bg})`,
                        backgroundPosition: "right center",
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      <div>
                        <div className="banerheadings mt-3 h5_new font-18">
                          <span className="text-white">
                            Hello, {adminDetail?.u_name}{" "}
                            
                          </span>
                        </div>
                        <div className="h6_new font-15 mt-2">
                          <span className="text-white">{greeting}!</span>
                        </div>
                        <div className="mt-2 font-14">
                          <FaCalendar /> {currentDate}
                        </div>
                      </div>
                    </div>
                    <img
                      src={banners2}
                      alt="icon"
                      width="50"
                      height="70"
                      className="img-fluid shape-02"
                    />
                    <img
                      src={banners4}
                      alt="icon"
                      width="25"
                      height="25"
                      className="img-fluid shape-04"
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-3 col-lg-3 col-sm-6 col-12">
                      <Link to="/admin/student-management/student-list">
                        <div className="card" style={{ background: "#7889DA" }}>
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <p className="m-b-0 text-white font-12 font-weight-semibold">
                                  Total Donation
                                </p>
                                <h6 className="m-b-0 h6_new">
                                  <span className="text-white">
                                    {data?.approved}
                                  </span>
                                </h6>
                              </div>
                              <div
                                className="avatar avatar-lg avatar-image p-2"
                                style={{ background: "#fff" }}
                              >
                                <img src={totalDonation} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="col-md-3 col-lg-3 col-sm-6 col-12">
                      <Link to="/admin/course">
                        <div className="card" style={{ background:"#ffc107" }}>
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <p className="m-b-0 text-white font-12 font-weight-semibold">
                                  Total Blood Request Pending
                                </p>
                                <h6 className="m-b-0 h6_new">
                                  <span className="text-white">
                                    {data?.pending}
                                  </span>
                                </h6>
                              </div>
                              <div
                                className="avatar avatar-lg avatar-image p-2"
                                style={{ background: "#fff" }}
                              >
                                <img src={pendingDonation} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="col-md-3 col-lg-3 col-sm-6 col-12">
                      <Link to="/admin/faculty-list">
                        <div className="card" style={{ background:  "#21B6C8" }}>
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <p className="m-b-0 text-white font-12 font-weight-semibold">
                                  Total Accepted Request
                                </p>
                                <h6 className="m-b-0 h6_new">
                                  <span className="text-white">
                                    {data?.accepted}
                                  </span>
                                </h6>
                              </div>
                              <div
                                className="avatar avatar-lg avatar-image p-2"
                                style={{ background: "#fff" }}
                              >
                                <img src={acceptedDonation} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                    
                    <div className="col-md-3 col-lg-3 col-sm-6 col-12">
                      <Link to="/admin/faculty-list">
                        <div className="card" style={{ background: "rgb(227 72 35)" }}>
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <p className="m-b-0 text-white font-12 font-weight-semibold">
                                  Total Rejected Request
                                </p>
                                <h6 className="m-b-0 h6_new">
                                  <span className="text-white">
                                    {data?.rejected}
                                  </span>
                                </h6>
                              </div>
                              <div
                                className="avatar avatar-lg avatar-image p-2"
                                style={{ background: "#fff" }}
                              >
                                <img src={rejectedDonation} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
