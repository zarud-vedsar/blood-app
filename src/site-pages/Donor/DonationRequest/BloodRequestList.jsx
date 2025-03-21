import React, { useEffect, useState } from "react";
import { PHP_API_URL } from "../../../site-components/Helper/Constant";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { Link } from "react-router-dom";
import {
  capitalizeFirstLetter,
  formatDate,
  goBack,
} from "../../../site-components/Helper/HelperFunction";
import { toast } from "react-toastify";
import { IoChevronBackOutline } from "react-icons/io5";
import DataNotFound from "../../../site-components/common/assets/img/data-not-found.png";
import { DeleteSweetAlert } from "../../../site-components/Helper/DeleteSweetAlert";
import { FaAngleRight } from "react-icons/fa";
import { FaCircleArrowRight } from "react-icons/fa6";
import { FaAngleDoubleRight } from "react-icons/fa";
const BloodRequestList = () => {
  const [donationRequestList, setDonationRequestList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const deleteRequest = async (id) => {
    setIsSubmit(true);
    try {
      const deleteAlert = await DeleteSweetAlert();
      if (deleteAlert) {
        const bformData = new FormData();
        bformData.append("data", "deleteDonationReq");
        bformData.append("loguserid", secureLocalStorage.getItem("loguserid"));
        bformData.append("id", id);

        const response = await axios.post(
          `${PHP_API_URL}/doner.php`,
          bformData
        );

        if (response?.data?.status === 200) {
          toast.success(response?.data?.msg, {
            autoClose: 500,
            onClose: window.location.reload(),
          });
        } else {
          toast.error("An error occurred. Please try again.");
        }
      }
    } catch (error) {
      const status = error.response?.data?.status;
      if (status === 400 || status === 500 || status === 401) {
        toast.error(error.response.data.msg || "A server error occurred.");
      } else {
        toast.error(
          "An error occurred. Please check your connection or try again."
        );
      }
    } finally {
      setIsSubmit(false);
    }
  };

  const fetchDonationRequestList = async () => {
    setLoading(true);
    try {
      const bformData = new FormData();
      bformData.append("data", "fetchMyDonationReq");
      bformData.append("loguserid", secureLocalStorage.getItem("loguserid"));

      const response = await axios.post(`${PHP_API_URL}/doner.php`, bformData);

      if (response?.data?.status === 200) {
        setDonationRequestList(response.data.data || []);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } catch (error) {
      setDonationRequestList([]);
      const status = error.response?.data?.status;
      if (status === 400 || status === 500 || status === 401) {
        //toast.error(error.response.data.msg || "A server error occurred.");
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
    fetchDonationRequestList();
  }, []); // ✅ Fixed useEffect dependency

  return (
    <div>
      {/* App Header */}
      <div className="appHeader d-flex justify-content-around align-items-center">
        <div className="left left-0">
          <a href="#" className="headerButton " onClick={goBack}>
            <IoChevronBackOutline />
          </a>
        </div>
        <div className="pageTitle w-75">Blood Requested List</div>
        <div className="right ">{/* <Slider/> */}</div>
      </div>

      {/* * App Header */}

      <div id="appCapsule">
        <section className="section px-2  pb-5 mb-5">
          {loading && <div className="loader-fetch">Loading...</div>}
          {!loading && donationRequestList.length === 0 && (
            <img src={DataNotFound} alt="" className="img-fluid" />
          )}
          <ul className="listview image-listview" id="set_fecthed_data">
            {donationRequestList.map((request, index) => (
              <li key={index}>
                <div className="item d-flex justify-content-between px-0">
                  <Link
                    to={`/blood-donation-request/detail-view/${request.id}`}
                    className="text-dark"
                  >
                    <div className="d-flex ">
                      <div
                        className="d-flex justify-content-center"
                        style={{ marginRight: "10px" }}
                      >
                        <div className="blood-drop">{request?.bloodGroup}</div>
                      </div>
                      <div className="in px-2">
                        <div>
                          <p className="request-header fw-600">
                            {capitalizeFirstLetter(request?.patientName)}{" "}
                            {request?.criticalStatus === 1 && (
                              <span className="badge badge-danger mb-0">
                                Critical
                              </span>
                            )}
                          </p>
                          <header className="f-14 fw-600">{`${request.unit} Units (Blood)`}</header>
                          <footer className="f-14 id-mb">{`${request?.city} , ${request?.state}`}</footer>
                          <p className="f-16 mb-0 fw-600">
                            {formatDate(request?.requiredDate)}
                          </p>

                          {request?.status === 0 && (
                            <p className="f-16 text-warning mb-0">Pending</p>
                          )}
                          {request?.status === 1 && (
                            <p className="f-16 text-success mb-0">Accepted</p>
                          )}
                          {request?.status === 2 && (
                            <p className="f-16 text-info mb-0">Received</p>
                          )}
                          {request?.status === 3 && (
                            <p className="f-16 text-danger mb-0">Rejected</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                  
                  {/* Dropdown Button */}
                  {request.status === 0 ? (
                    <div className="d-flex align-items-center dropdown">
                      <button
                        data-bs-toggle="dropdown"
                        className="ms-1 btn"
                        onClick={() => toggleDropdown(index)}
                      >
                        <ion-icon
                          name="ellipsis-vertical-outline"
                          className="fontsize-headingLarge mt-1"
                        ></ion-icon>
                      </button>

                      {/* Dropdown Menu (Only Open for Selected Index) */}
                      <div
                        className={`dropdown-menu dropdown-menu-end w-fit p-0 dropdown-option ${
                          openDropdownIndex === index ? "show" : ""
                        }`}
                      >
                        <div className="dropdown-item p-0">
                          <Link
                            to={`/blood-donation-request/edit/${request.id}`}
                          >
                            <button className="btn btn-light edit-emp">
                              <ion-icon name="create-outline"></ion-icon>
                            </button>
                          </Link>
                        </div>
                        <div className="dropdown-item p-0">
                          <button
                            className="btn btn-light text-danger delete-spare"
                            onClick={() => deleteRequest(request.id)}
                          >
                            <ion-icon name="trash-outline"></ion-icon>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={`/blood-donation-request/detail-view/${request.id}`}
                    >
                      <span className="arrow " style={{ marginRight: "15px" }}>
                        <FaAngleRight className="icons" />
                      </span>
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <style>
        {`
          .image-listview > li:after {
            left: 0;
          }

          .image-listview > li .item .in {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            flex-wrap: wrap;
            white-space: normal;
            word-break: break-word;
          }

          .loader-fetch {
            text-align: center;
            font-size: 16px;
            padding: 10px;
            font-weight: bold;
          }

         
            .request-header{
    font-size: 18px;
    margin-bottom:6px;
            }
    .id-mb{
    margin-bottom: 6px !important;
    }
        `}
      </style>
    </div>
  );
};

export default BloodRequestList;
