import React, { useEffect, useState } from "react";
import { PHP_API_URL } from "../../../site-components/Helper/Constant";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { Link } from "react-router-dom";
import { formatDate, goBack } from "../../../site-components/Helper/HelperFunction";
import Slider from "../../../site-components/Donor/components/Slider";
import { toast } from "react-toastify";
const BloodDonatedHistory = () => {
  const [donationRequestList, setDonationRequestList] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchDonationRequestList = async () => {
    setLoading(true);
    try {
      const bformData = new FormData();
      bformData.append("data", "fetchMyDonationHistory");
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
        toast.error(error.response.data.msg || "A server error occurred.");
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
  }, []); 

  return (
    <div>
      
      <div className="appHeader d-flex justify-content-around align-items-center">
              <div className="left left-0">
              <a href="#" class="headerButton " onClick={goBack}>
                      <ion-icon name="arrow-back-outline" role="img" class="md hydrated"
                          aria-label="arrow back outline"></ion-icon>
                  </a>
              </div>
              <div className="pageTitle w-75">Donation History</div>
              <div className="right ">
                <Slider/>
              </div>
            </div>

      

      <div id="appCapsule">
        <section className="section px-2  pb-5 mb-5">
          {loading && <div className="loader-fetch">Loading...</div>}
          {!loading && donationRequestList.length === 0 && (
            <p className="text-center pt-2">No data found.</p>
          )}

          <ul className="listview image-listview" id="set_fecthed_data">
            {donationRequestList.map((request, index) => (
              <li key={index}>
                <div className="item d-flex justify-content-between px-0">
                  <Link
                    to={`/blood-donation/history/detail/${request.historyid}`}
                    className="text-dark"
                  >
                    <div className="d-flex ">
                      <div
                        className="d-flex justify-content-center align-items-center "
                        style={{ marginRight: "10px" }}
                      >
                        <div className="blood-drop">{request?.bloodGroup}</div>
                      </div>
                      <div className="in px-2">
                        <div>
                          <p className="request-header">
                            {request?.patientName}{" "}
                            {request?.criticalStatus === 1 && (
                              <span className="badge badge-danger mb-0">
                                Critical
                              </span>
                            )}
                          </p>
                          <header className="f-14">{`${request.unit} Units (Blood)`}</header>
                          <footer className="f-14 ">{`${request?.city} , ${request?.state}`}</footer>
                          <p className="f-16 mb-0">
                            {formatDate(request?.request_date)}
                          </p>

                          {request?.status === 0 && (
                            <p className="f-16 text-warning mb-0">Pending</p>
                          )}
                          {request?.status === 1 && (
                            <p className="f-16 text-success mb-0">
                              Donated Successfully
                            </p>
                          )}
                          {request?.status === 2 && (
                            <p className="f-16 text-danger mb-0">Rejectd</p>
                          )}
                        </div>
                      </div>
                      <div></div>
                    </div>
                  </Link>
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
    font-weight: 500;
    font-size: 18px;
    margin-bottom:3px;
            }
        `}
      </style>
    </div>
  );
};

export default BloodDonatedHistory;
