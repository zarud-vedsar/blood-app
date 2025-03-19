import React, { useEffect, useState } from "react";
import { useAdminContext } from "../../../site-components/Admin/ContextApi/AdminContext";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import { PHP_API_URL } from "../../../site-components/Helper/Constant";
import { toast } from "react-toastify"; // Ensure toast is imported
import { useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const BloodRequestViewDetail = () => {
  const { adminDetail } = useAdminContext();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const { id } = useParams();
  const fetchDashboardData = async () => {
    setLoading(true);
    const logUserId = secureLocalStorage.getItem("loguserid");

    try {
      const bformData = new FormData();
      bformData.append("data", "view_donation");
      bformData.append("loguserid", logUserId);
      bformData.append("donation_id", id);

      const response = await axios.post(`${PHP_API_URL}/admin.php`, bformData);

      if (response?.data?.status === 200) {
        setData(response?.data?.data);
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
  return (
    <>
      <div className="page-container">
        <div className="main-content">
          <div className="container-fluid">
            <div className="">
              <nav className="breadcrumb breadcrumb-dash">
                <a href="/" className="breadcrumb-item">
                  Dashboard
                </a>

                <a className="breadcrumb-item ">Blood Request</a>
                <span className="breadcrumb-item active">View</span>
              </nav>
            </div>

            <div className="card bg-transparent mb-2">
              <div className="card-header d-flex justify-content-between align-items-center px-0">
                <h5 className="card-title h6_new">View</h5>
                <div className="ml-auto">
                  <button
                    className="mb-2 mb-md-0 btn"
                    onClick={() => window.history.back()}
                  >
                    <i className="fas">
                      <FaArrowLeft />
                    </i>{" "}
                    Go Back
                  </button>
                </div>
              </div>
            </div>

       
            <div className="row ant-card-body ">
              <div className="col-md-12 align-items-center ng-star-inserted">
                {loading ? (
                  <div className="text-center">Loading...</div>
                ) : data?.donation ? (
                  <div className="card">
                    <div className="card-body py-3">
                      <div className="row align-items-center">
                       
                        <div className="col-md-4">
                          <div className="row">
                            <div className="d-md-block d-none border-left col-1"></div>
                            <div className="col p-0">
                              <ul className="list-unstyled m-t-10">
                                <li className="row">
                                  <p className="col-sm-4 px-0 font-13 col-4 font-weight-semibold text-dark m-b-5">
                                    <i
                                      className="fa-solid fa-user m-r-10 "
                                      style={{ color: "#3f87f5" }}
                                    ></i>
                                    <span>Patient Name:</span>
                                  </p>
                                  <p className="col font-12 font-weight-semibold">
                                    {data?.donation?.patientName || "N/A"}
                                  </p>
                                </li>
                                <li className="row">
                                  <p className="col-sm-4 px-0 font-13 col-4 font-weight-semibold text-dark m-b-5">
                                    <i
                                      className="fa-solid fa-user m-r-10 "
                                      style={{ color: "#3f87f5" }}
                                    ></i>
                                    <span>Blood Group:</span>
                                  </p>
                                  <p className="col font-12 font-weight-semibold">
                                    {data?.donation?.bloodGroup || "N/A"}
                                  </p>
                                </li>
                                <li className="row">
                                  <p className="col-sm-4 px-0 font-13 col-4 font-weight-semibold text-dark m-b-5">
                                    <i
                                      className="fa-solid fa-user m-r-10 "
                                      style={{ color: "#3f87f5" }}
                                    ></i>
                                    <span>Attendee Phone:</span>
                                  </p>
                                  <p className="col font-12 font-weight-semibold">
                                    {data?.donation?.attendeePhone || "N/A"}
                                  </p>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="row">
                            <div className="d-md-block d-none border-left col-1"></div>
                            <div className="col p-0">
                              <ul className="list-unstyled m-t-10">
                                <li className="row">
                                  <p className="col-sm-4 px-0 font-13 col-4 font-weight-semibold text-dark m-b-5">
                                    <i
                                      className="fa fa-envelope m-r-10 "
                                      style={{ color: "#3f87f5" }}
                                    ></i>
                                    <span>Email:</span>
                                  </p>
                                  <p className="col font-12 font-weight-semibold">
                                    {data?.donation?.email || "N/A"}
                                  </p>
                                </li>
                                <li className="row">
                                  <p className="col-sm-4 px-0 font-13 col-4 font-weight-semibold text-dark m-b-5">
                                    <i
                                      className="fa-solid fa-mobile m-r-10 "
                                      style={{ color: "#3f87f5" }}
                                    ></i>
                                    <span>Phone:</span>
                                  </p>
                                  <p className="col font-12 font-weight-semibold">
                                    {data?.donation?.phone || "N/A"}
                                  </p>
                                </li>
                                <li className="row">
                                  <p className="col-sm-4 px-0 font-13 col-4 font-weight-semibold text-dark m-b-5">
                                    <i
                                      className="fa-solid fa-mobile m-r-10 "
                                      style={{ color: "#3f87f5" }}
                                    ></i>
                                    <span>Alternative Phone:</span>
                                  </p>
                                  <p className="col font-12 font-weight-semibold">
                                    {data?.donation?.alternatePhone || "N/A"}
                                  </p>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    No application details available.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BloodRequestViewDetail;
