import axios from "axios";
import React, { useState, lazy, useEffect } from "react";
import {  useParams } from "react-router-dom";
import { PHP_API_URL } from "../../../site-components/Helper/Constant";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const HeaderWithBack = lazy(() =>
  import("../../../site-components/Donor/components/HeaderWithBack")
);

const BloodDonationDetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bloodDonationRequestDetail, setBloodDonationRequestDetail] =
    useState();
  
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const bformData = new FormData();
        bformData.append("data", "view_donation_req");
        bformData.append(
          "loguserid",
          secureLocalStorage.getItem("loguserid") || ""
        );
        bformData.append("id", id);

        const response = await axios.post(
          `${PHP_API_URL}/doner.php`,
          bformData
        );

        if (response?.data?.status === 200) {
          setBloodDonationRequestDetail(response?.data?.data[0]);

          
        }
      } catch (error) {
        const status = error.response?.data?.status;
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

    fetchData(); 
  }, [id]); 

 
  const acceptRequest = async () => {
    setIsSubmit(true);
    try {
      const bformData = new FormData();
      bformData.append("data", "acceptDonationReq");
      bformData.append("loguserid", secureLocalStorage.getItem("loguserid"));
      bformData.append("id", id);

      const response = await axios.post(`${PHP_API_URL}/doner.php`, bformData);
      

      if (response?.data?.status === 200) {
        toast.success(response?.data?.msg, {
          autoClose: 500, 
          onClose: navigate("/blood-donation/history"), 
        });
        
      } else {
        toast.error("An error occurred. Please try again.");
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

  return (
    <>
      <HeaderWithBack title={"Donation Detail"} />
      <div className="am-content">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-5">
                <strong className="f-17 fw-700">Patient Name</strong>
              </div>
              <div className="col-1">:</div>
              <div className="col-auto fw-16 fw-600">
                {bloodDonationRequestDetail?.patientName}{" "}
                {bloodDonationRequestDetail?.criticalStatus && (
                  <span className="badge badge-danger mb-0">Critical</span>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <strong className="f-17 fw-700">Attendee Phone</strong>
              </div>
              <div className="col-1">:</div>
              <div className="col-auto fw-16 fw-600">
                {bloodDonationRequestDetail?.attendeePhone}
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <strong className="f-17 fw-700">Required Date</strong>
              </div>
              <div className="col-1">:</div>
              <div className="col-auto fw-16 fw-600">
                {bloodDonationRequestDetail?.requiredDate}
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <strong className="f-17 fw-700"> Blood Group </strong>
              </div>
              <div className="col-1">:</div>
              <div className="col-auto fw-16 fw-600">
                {bloodDonationRequestDetail?.bloodGroup}
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <strong className="f-17 fw-700"> Unit </strong>
              </div>
              <div className="col-1">:</div>
              <div className="col-auto fw-16 fw-600">
                {bloodDonationRequestDetail?.unit}
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <strong className="f-17 fw-700"> Pin Code </strong>
              </div>
              <div className="col-1">:</div>
              <div className="col-auto fw-16 fw-600">
                {bloodDonationRequestDetail?.pincode}
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <strong className="f-17 fw-700"> State </strong>
              </div>
              <div className="col-1">:</div>
              <div className="col-auto fw-16 fw-600">
                {bloodDonationRequestDetail?.state}
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <strong className="f-17 fw-700"> City </strong>
              </div>
              <div className="col-1">:</div>
              <div className="col-auto fw-16 fw-600">
                {bloodDonationRequestDetail?.city}
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-5">
                <strong className="f-17 fw-700"> Address </strong>
              </div>
              <div className="col-1">:</div>
              <div className="col-auto fw-16 fw-600">
                {bloodDonationRequestDetail?.address}
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <strong className="f-17 fw-700"> Additional Note </strong>
              </div>
              <div className="col-auto fw-16 fw-600">
                {bloodDonationRequestDetail?.additionalNote}
              </div>
            </div>

            

            <div className="form-button-group transparent d-flex   flex-column justify-content-center align-items-center">
              <button
                
                className="btn btn-dark btn-block btn-lg"
                onClick={acceptRequest}
              >
                {isSubmit ? (
                  "Submitting..."
                ) : (
                  <span className="fontsize-normal">Donate</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BloodDonationDetailView;
