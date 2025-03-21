import axios from "axios";
import React, { useState, lazy, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import { PHP_API_URL } from "../../../site-components/Helper/Constant";
import { PHP_API_URL } from "../../../site-components/Helper/Constant";

import secureLocalStorage from "react-secure-storage";
import { formatDate } from "../../../site-components/Helper/HelperFunction";
import { toast } from "react-toastify";
import { DeleteSweetAlert, SubmitRemarkSweetAlert } from "../../../site-components/Helper/DeleteSweetAlert";
const HeaderWithBack = lazy(() =>
  import("../../../site-components/Donor/components/HeaderWithBack")
);

const BloodDonationHistoryDetail = () => {
  const { id } = useParams();
  const [bloodDonationRequestDetail, setBloodDonationRequestDetail] =
    useState();
    const  loguserid= secureLocalStorage.getItem("loguserid");
  const initializeForm = {
    loguserid: loguserid,
    remark: "",
  };
  const [formData, setFormData] = useState(initializeForm);

  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const bformData = new FormData();
        bformData.append("data", "view_donation_history");
        bformData.append(
          "loguserid",
          loguserid || ""
        );
        bformData.append("id", id);

        const response = await axios.post(
          `${PHP_API_URL}/doner.php`,
          bformData
        );

        if (response?.data?.status === 200) {
          const data = response?.data?.data?.requestDetail;
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

  const handleSubmitRemark = async () => {
    setIsSubmit(true);

    try {
      const deleteAlert = await SubmitRemarkSweetAlert(
             0,"Are you sure to cancel donation ?"
            );
    
      if (deleteAlert.confirmed) {
        const bformData = new FormData();

        bformData.append("data", "rejectDonation_donar");

        bformData.append("rejection_reason", deleteAlert?.remark);
        bformData.append("loguserid", formData?.loguserid);
        bformData.append("req_id", bloodDonationRequestDetail?.req_id);
        bformData.append("historyid", id);

        const response = await axios.post(
          `${PHP_API_URL}/doner.php`,
          bformData
        );
        if (response?.data?.status === 201 || response?.data?.status === 200) {
          toast.success(response?.data?.msg, {
            autoClose: 500,
            onClose:()=> window.location.reload(),
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
  

  return (
    <>
      <HeaderWithBack title={"Donation History Detail"} />
      <div className="am-content">
        <div className="card">
          <div className="card-body">
          {bloodDonationRequestDetail?.criticalStatus === 1 && (
          <div className="row">
              <div className="col-5">
              
                  <span className="badge badge-danger mb-0">Critical</span>
                    </div>
              
            </div>
             )}         
            <div className="row">
              <div className="col-5">
                <strong className="f-17 fw-700">Patient Name</strong>
              </div>
              <div className="col-1">:</div>
              <div className="col-auto fw-16 fw-600">
                {bloodDonationRequestDetail?.patientName}{" "}
                
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
                <strong className="f-17 fw-700">Requested Date</strong>
              </div>
              <div className="col-1">:</div>
              <div className="col-auto fw-16 fw-600">
                {formatDate(bloodDonationRequestDetail?.request_date)}
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <strong className="f-17 fw-700">Required Date</strong>
              </div>
              <div className="col-1">:</div>
              <div className="col-auto fw-16 fw-600">
                {formatDate(bloodDonationRequestDetail?.requiredDate)}
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
            <div className="row ">
              <div className="col-5">
                <strong className="f-17 fw-700"> Address </strong>
              </div>
              <div className="col-1">:</div>
              <div className="col-auto fw-16 fw-600">
                {bloodDonationRequestDetail?.address}
              </div>
            </div>
            <div className="row ">
              <div className="col-5">
                <strong className="f-17 fw-700"> Accepted Date</strong>
              </div>
              <div className="col-1">:</div>
              <div className="col-auto fw-16 fw-600">
                {formatDate(bloodDonationRequestDetail?.acceptance_date)}
              </div>
            </div>
            <div className="row  ">
                          <div className="col-5">
                            <strong className="f-17 fw-700"> Status</strong>
                          </div>
                          <div className="col-1">:</div>
                          <div className="col-auto fw-16 fw-600 text-danger">
                            {bloodDonationRequestDetail?.status === 0 && (
                              <p className="f-16 text-warning mb-0">
                                Not donated yet.
                              </p>
                            )}
                            {bloodDonationRequestDetail?.status === 1 && (
                              <p className="f-16 text-success mb-0">
                                Donation received
                              </p>
                            )}
                            {bloodDonationRequestDetail?.status === 2 && (
                              <p className="f-16 text-danger mb-0">
                                Rejected By
                                {loguserid == bloodDonationRequestDetail?.rejected_by && " You"}
                                {bloodDonationRequestDetail?.id == bloodDonationRequestDetail?.rejected_by && " Receiver"}
                              </p>
                            )}
                          </div>
                        </div>

            {bloodDonationRequestDetail?.approval_date && (
              <div className="row ">
                <div className="col-5">
                  <strong className="f-17 fw-700"> Approved Date</strong>
                </div>
                <div className="col-1">:</div>
                <div className="col-auto fw-16 fw-600 text-success">
                  {formatDate(bloodDonationRequestDetail?.approval_date)}
                </div>
              </div>
            )}
            {bloodDonationRequestDetail?.rejection_date && (
              <div className="row ">
                <div className="col-5">
                  <strong className="f-17 fw-700"> Rejected Date</strong>
                </div>
                <div className="col-1">:</div>
                <div className="col-auto fw-16 fw-600 text-danger">
                  {formatDate(bloodDonationRequestDetail?.rejection_date)}
                </div>
              </div>
            )}
            

            <div className="row mt-1">
              <div className="col-12">
                <strong className="f-17 fw-700"> Additional Note </strong>
              </div>
              <div className="col-auto fw-16 fw-600">
                {bloodDonationRequestDetail?.additionalNote}
              </div>
            </div>

            {bloodDonationRequestDetail?.rejection_reason ? (
              <>
                <div className="row">
                  <div className="col-12">
                    <strong className="f-17 fw-700"> Remark </strong>
                  </div>
                  <div className="col-auto fw-16 fw-600">
                    {bloodDonationRequestDetail?.rejection_reason}
                  </div>
                </div>
              </>
            ) : (
              <>
                
                <div className="form-button-group transparent d-flex  align-items-center">
                  <button
                    className="btn btn-danger btn-block btn-lg"
                    onClick={() => handleSubmitRemark()}
                  >
                   Cancel Donation  {isSubmit && (
                  <>
                    &nbsp; <div className="loader-circle"></div>
                  </>
                )}
                    
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BloodDonationHistoryDetail;
