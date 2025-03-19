import React, { useEffect, useState } from "react";
import { useAdminContext } from "../../../site-components/Admin/ContextApi/AdminContext";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import { PHP_API_URL } from "../../../site-components/Helper/Constant";
import { toast } from "react-toastify"; // Ensure toast is imported
import { useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { bloodGroups } from "../../../site-components/Helper/BloodGroupConstant";

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
                      <h6 className="title">Patient Detail</h6>
                      <div className="row ">
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
                                    {data?.donation?.criticalStatus === 1 && (
                                      <span className="badge badge-danger ml-2">
                                        Critical
                                      </span>
                                    )}
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
                                <li className="row">
                                  <p className="col-sm-4 px-0 font-13 col-4 font-weight-semibold text-dark m-b-5">
                                    <i
                                      className="fa-solid fa-user m-r-10 "
                                      style={{ color: "#3f87f5" }}
                                    ></i>
                                    <span>Status:</span>
                                  </p>
                                  <p className="col font-12 font-weight-semibold">
                                    {data?.donation?.status === 0 && (
                                      <span className="f-16 badge badge-warning mb-0">
                                        Pending
                                      </span>
                                    )}
                                    {data?.donation?.status === 1 && (
                                      <span className="f-16 badge badge-success mb-0">
                                        Accepted
                                      </span>
                                    )}
                                    {data?.donation?.status === 2 && (
                                      <span className="f-16 badge badge-info mb-0">
                                        Received
                                      </span>
                                    )}
                                    {data?.donation?.status === 3 && (
                                      <span className="f-16 badge badge-danger mb-0">
                                        Rejected
                                      </span>
                                    )}
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
                                    <span>State:</span>
                                  </p>
                                  <p className="col font-12 font-weight-semibold">
                                    {data?.donation?.state || "N/A"}
                                  </p>
                                </li>
                                <li className="row">
                                  <p className="col-sm-4 px-0 font-13 col-4 font-weight-semibold text-dark m-b-5">
                                    <i
                                      className="fa-solid fa-mobile m-r-10 "
                                      style={{ color: "#3f87f5" }}
                                    ></i>
                                    <span>City:</span>
                                  </p>
                                  <p className="col font-12 font-weight-semibold">
                                    {data?.donation?.city || "N/A"}
                                  </p>
                                </li>
                                <li className="row">
                                  <p className="col-sm-4 px-0 font-13 col-4 font-weight-semibold text-dark m-b-5">
                                    <i
                                      className="fa-solid fa-mobile m-r-10 "
                                      style={{ color: "#3f87f5" }}
                                    ></i>
                                    <span>Pincode:</span>
                                  </p>
                                  <p className="col font-12 font-weight-semibold">
                                    {data?.donation?.pincode || "N/A"}
                                  </p>
                                </li>
                                <li className="row">
                                  <p className="col-sm-4 px-0 font-13 col-4 font-weight-semibold text-dark m-b-5">
                                    <i
                                      className="fa-solid fa-mobile m-r-10 "
                                      style={{ color: "#3f87f5" }}
                                    ></i>
                                    <span>Address :</span>
                                  </p>
                                  <p className="col font-12 font-weight-semibold">
                                    {data?.donation?.address || "N/A"}
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
                                    <span>Unit Required:</span>
                                  </p>
                                  <p className="col font-12 font-weight-semibold">
                                    {data?.donation?.unit || "N/A"}
                                  </p>
                                </li>
                                <li className="row">
                                  <p className="col-sm-4 px-0 font-13 col-4 font-weight-semibold text-dark m-b-5">
                                    <i
                                      className="fa-solid fa-mobile m-r-10 "
                                      style={{ color: "#3f87f5" }}
                                    ></i>
                                    <span>Required Date:</span>
                                  </p>
                                  <p className="col font-12 font-weight-semibold">
                                    {data?.donation?.requiredDate || "N/A"}
                                  </p>
                                </li>
                                <li className="row">
                                  <p className="col-sm-4 px-0 font-13 col-4 font-weight-semibold text-dark m-b-5">
                                    <i
                                      className="fa-solid fa-mobile m-r-10 "
                                      style={{ color: "#3f87f5" }}
                                    ></i>
                                    <span>Request Date:</span>
                                  </p>
                                  <p className="col font-12 font-weight-semibold">
                                    {data?.donation?.request_date || "N/A"}
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
            <div className="row ant-card-body ">
              <div className="col-md-12 align-items-center ng-star-inserted">
                {loading ? (
                  <div className="text-center">Loading...</div>
                ) : data?.donation ? (
                  <div className="card">
                    <div className="card-body py-3">
                      <h6 className="title">Requestor Detail</h6>

                      <div className="row ">
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
                                    <span>Requestor Name:</span>
                                  </p>
                                  <p className="col font-12 font-weight-semibold">
                                    {data?.donation?.req_name || "N/A"}
                                  </p>
                                </li>
                                <li className="row">
                                  <p className="col-sm-4 px-0 font-13 col-4 font-weight-semibold text-dark m-b-5">
                                    <i
                                      className="fa-solid fa-user m-r-10 "
                                      style={{ color: "#3f87f5" }}
                                    ></i>
                                    <span>User Id:</span>
                                  </p>
                                  <p className="col font-12 font-weight-semibold">
                                    {data?.donation?.req_uniqueId || "N/A"}
                                  </p>
                                </li>
                                <li className="row">
                                  <p className="col-sm-4 px-0 font-13 col-4 font-weight-semibold text-dark m-b-5">
                                    <i
                                      className="fa-solid fa-user m-r-10 "
                                      style={{ color: "#3f87f5" }}
                                    ></i>
                                    <span> Phone Number:</span>
                                  </p>
                                  <p className="col font-12 font-weight-semibold">
                                    {data?.donation?.req_phone || "N/A"}
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
                                    <span>State:</span>
                                  </p>
                                  <p className="col font-12 font-weight-semibold">
                                    {data?.donation?.req_state || "N/A"}
                                  </p>
                                </li>
                                <li className="row">
                                  <p className="col-sm-4 px-0 font-13 col-4 font-weight-semibold text-dark m-b-5">
                                    <i
                                      className="fa-solid fa-mobile m-r-10 "
                                      style={{ color: "#3f87f5" }}
                                    ></i>
                                    <span>City:</span>
                                  </p>
                                  <p className="col font-12 font-weight-semibold">
                                    {data?.donation?.req_city || "N/A"}
                                  </p>
                                </li>
                                <li className="row">
                                  <p className="col-sm-4 px-0 font-13 col-4 font-weight-semibold text-dark m-b-5">
                                    <i
                                      className="fa-solid fa-mobile m-r-10 "
                                      style={{ color: "#3f87f5" }}
                                    ></i>
                                    <span>Pincode:</span>
                                  </p>
                                  <p className="col font-12 font-weight-semibold">
                                    {data?.donation?.req_pincode || "N/A"}
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
                                      className="fa-solid fa-mobile m-r-10 "
                                      style={{ color: "#3f87f5" }}
                                    ></i>
                                    <span>Email :</span>
                                  </p>
                                  <p className="col font-12 font-weight-semibold">
                                    {data?.donation?.req_email || "N/A"}
                                  </p>
                                </li>
                                <li className="row">
                                  <p className="col-sm-4 px-0 font-13 col-4 font-weight-semibold text-dark m-b-5">
                                    <i
                                      className="fa-solid fa-mobile m-r-10 "
                                      style={{ color: "#3f87f5" }}
                                    ></i>
                                    <span>Address :</span>
                                  </p>
                                  <p className="col font-12 font-weight-semibold">
                                    {data?.donation?.req_address || "N/A"}
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
            <div className="row ant-card-body">
              <div className="col-md-12 align-items-center ng-star-inserted">
                {loading ? (
                  <div className="text-center">Loading...</div>
                ) : data?.acceptance && data?.acceptance.length > 0 ? (
                  data?.acceptance.map((item, index) => (
                    <div key={index} className="card">
                      <div className="card-body py-3">
                        <h6 className="title">Requestor Detail</h6>

                        <div className="row">
                          {/* Column 1 */}
                          <div className="col-md-4">
                            <div className="row">
                              <div className="d-md-block d-none border-left col-1"></div>
                              <div className="col p-0">
                                <ul className="list-unstyled m-t-10">
                                  <li className="row">
                                    <p className="col-4 font-13 font-weight-semibold text-dark m-b-5">
                                      <i
                                        className="fa-solid fa-user m-r-10"
                                        style={{ color: "#3f87f5" }}
                                      ></i>
                                      Name:
                                    </p>
                                    <p className="col font-12 font-weight-semibold">
                                      {item?.donorName || "N/A"}
                                    </p>
                                  </li>
                                  <li className="row">
                                    <p className="col-4 font-13 font-weight-semibold text-dark m-b-5">
                                      <i
                                        className="fa-solid fa-id-card m-r-10"
                                        style={{ color: "#3f87f5" }}
                                      ></i>
                                      User Id:
                                    </p>
                                    <p className="col font-12 font-weight-semibold">
                                      {item?.req_uniqueId || "N/A"}
                                    </p>
                                  </li>
                                  <li className="row">
                                    <p className="col-4 font-13 font-weight-semibold text-dark m-b-5">
                                      <i
                                        className="fa-solid fa-phone m-r-10"
                                        style={{ color: "#3f87f5" }}
                                      ></i>
                                      Phone Number:
                                    </p>
                                    <p className="col font-12 font-weight-semibold">
                                      {item?.donorPhone || "N/A"}
                                    </p>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          {/* Column 2 */}
                          <div className="col-md-4">
                            <div className="row">
                              <div className="d-md-block d-none border-left col-1"></div>
                              <div className="col p-0">
                                <ul className="list-unstyled m-t-10">
                                  <li className="row">
                                    <p className="col-4 font-13 font-weight-semibold text-dark m-b-5">
                                      <i
                                        className="fa-solid fa-map m-r-10"
                                        style={{ color: "#3f87f5" }}
                                      ></i>
                                      State:
                                    </p>
                                    <p className="col font-12 font-weight-semibold">
                                      {item?.req_state || "N/A"}
                                    </p>
                                  </li>
                                  <li className="row">
                                    <p className="col-4 font-13 font-weight-semibold text-dark m-b-5">
                                      <i
                                        className="fa-solid fa-city m-r-10"
                                        style={{ color: "#3f87f5" }}
                                      ></i>
                                      City:
                                    </p>
                                    <p className="col font-12 font-weight-semibold">
                                      {item?.req_city || "N/A"}
                                    </p>
                                  </li>
                                  <li className="row">
                                    <p className="col-4 font-13 font-weight-semibold text-dark m-b-5">
                                      <i
                                        className="fa-solid fa-map-pin m-r-10"
                                        style={{ color: "#3f87f5" }}
                                      ></i>
                                      Pincode:
                                    </p>
                                    <p className="col font-12 font-weight-semibold">
                                      {item?.req_pincode || "N/A"}
                                    </p>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          {/* Column 3 */}
                          <div className="col-md-4">
                            <div className="row">
                              <div className="d-md-block d-none border-left col-1"></div>
                              <div className="col p-0">
                                <ul className="list-unstyled m-t-10">
                                  <li className="row">
                                    <p className="col-4 font-13 font-weight-semibold text-dark m-b-5">
                                      <i
                                        className="fa-solid fa-envelope m-r-10"
                                        style={{ color: "#3f87f5" }}
                                      ></i>
                                      Email:
                                    </p>
                                    <p className="col font-12 font-weight-semibold">
                                      {item?.req_email || "N/A"}
                                    </p>
                                  </li>
                                  <li className="row">
                                    <p className="col-4 font-13 font-weight-semibold text-dark m-b-5">
                                      <i
                                        className="fa-solid fa-home m-r-10"
                                        style={{ color: "#3f87f5" }}
                                      ></i>
                                      Address:
                                    </p>
                                    <p className="col font-12 font-weight-semibold">
                                      {item?.req_address || "N/A"}
                                    </p>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
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
