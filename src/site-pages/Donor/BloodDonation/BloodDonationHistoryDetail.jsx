import axios from "axios";
import React, { useState, lazy, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import { PHP_API_URL } from "../../../site-components/Helper/Constant";
import { PHP_API_URL } from "../../../site-components/Helper/Constant";

import secureLocalStorage from "react-secure-storage";
import { formatDate } from "../../../site-components/Helper/HelperFunction";
const HeaderWithBack = lazy(() =>
  import("../../../site-components/Donor/components/HeaderWithBack")
);

const BloodDonationHistoryDetail = () => {
  const { id } = useParams();
  const [bloodDonationRequestDetail, setBloodDonationRequestDetail] =
    useState();
  const initializeForm = {
    loguserid: secureLocalStorage.getItem("loguserid"),
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
          secureLocalStorage.getItem("loguserid") || ""
        );
        bformData.append("id", id);

        const response = await axios.post(
          `${PHP_API_URL}/doner.php`,
          bformData
        );

        if (response?.data?.status === 200) {
          const data = response?.data?.data?.requestDetail;
          setBloodDonationRequestDetail(response?.data?.data[0]);

          toast.error("An error occurred. Please try again.");
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
      const bformData = new FormData();
      
      bformData.append("data", "rejectDonation_donar");
      
      bformData.append("rejection_reason", formData?.remark);
      bformData.append("loguserid", formData?.loguserid);
      bformData.append("req_id", bloodDonationRequestDetail?.req_id);
      bformData.append("historyid", id);
      

      const response = await axios.post(`${PHP_API_URL}/doner.php`, bformData);
      if (response?.data?.status === 201 || response?.data?.status === 200) {
        setTimeout(() => {
          window.location.reload();
        }, 300);
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
  const handleInputChange = (e) => {
    const { name, value } = e.target;


    setFormData({ ...formData, [name]: value });
  };

 

  return (
    <>
      <HeaderWithBack title={"Donation History Detail"} />
      <div className="am-content">
        <div className="card">
          <div className="card-body">
            <div class="row">
              <div class="col-5">
                <strong class="f-17 fw-700">Patient Name</strong>
              </div>
              <div class="col-1">:</div>
              <div class="col-auto fw-16 fw-600">
                {bloodDonationRequestDetail?.patientName}{" "}
                {bloodDonationRequestDetail?.criticalStatus && (
                  <span className="badge badge-danger mb-0">Critical</span>
                )}
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <strong class="f-17 fw-700">Attendee Phone</strong>
              </div>
              <div class="col-1">:</div>
              <div class="col-auto fw-16 fw-600">
                {bloodDonationRequestDetail?.attendeePhone}
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <strong class="f-17 fw-700">Required Date</strong>
              </div>
              <div class="col-1">:</div>
              <div class="col-auto fw-16 fw-600">
                {bloodDonationRequestDetail?.requiredDate}
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <strong class="f-17 fw-700"> Blood Group </strong>
              </div>
              <div class="col-1">:</div>
              <div class="col-auto fw-16 fw-600">
                {bloodDonationRequestDetail?.bloodGroup}
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <strong class="f-17 fw-700"> Unit </strong>
              </div>
              <div class="col-1">:</div>
              <div class="col-auto fw-16 fw-600">
                {bloodDonationRequestDetail?.unit}
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <strong class="f-17 fw-700"> PinCode </strong>
              </div>
              <div class="col-1">:</div>
              <div class="col-auto fw-16 fw-600">
                {bloodDonationRequestDetail?.pincode}
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <strong class="f-17 fw-700"> State </strong>
              </div>
              <div class="col-1">:</div>
              <div class="col-auto fw-16 fw-600">
                {bloodDonationRequestDetail?.state}
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <strong class="f-17 fw-700"> City </strong>
              </div>
              <div class="col-1">:</div>
              <div class="col-auto fw-16 fw-600">
                {bloodDonationRequestDetail?.city}
              </div>
            </div>
            <div class="row ">
              <div class="col-5">
                <strong class="f-17 fw-700"> Address </strong>
              </div>
              <div class="col-1">:</div>
              <div class="col-auto fw-16 fw-600">
                {bloodDonationRequestDetail?.address}
              </div>
            </div>
            <div class="row ">
              <div class="col-5">
                <strong class="f-17 fw-700"> Accepted Date</strong>
              </div>
              <div class="col-1">:</div>
              <div class="col-auto fw-16 fw-600">
                {formatDate(bloodDonationRequestDetail?.acceptance_date)}
              </div>
            </div>
            {bloodDonationRequestDetail?.approval_date && (
              <div class="row ">
                <div class="col-5">
                  <strong class="f-17 fw-700"> Approved Date</strong>
                </div>
                <div class="col-1">:</div>
                <div class="col-auto fw-16 fw-600 text-success">
                  {formatDate(bloodDonationRequestDetail?.approval_date)}
                </div>
              </div>
            )}
            {bloodDonationRequestDetail?.rejection_date && (
              <div class="row ">
                <div class="col-5">
                  <strong class="f-17 fw-700"> Rejected Date</strong>
                </div>
                <div class="col-1">:</div>
                <div class="col-auto fw-16 fw-600 text-danger">
                  {formatDate(bloodDonationRequestDetail?.rejection_date)}
                </div>
              </div>
            )}

            <div class="row mt-1">
              <div class="col-12">
                <strong class="f-17 fw-700"> Additional Note </strong>
              </div>
              <div class="col-auto fw-16 fw-600">
                {bloodDonationRequestDetail?.additionalNote}
              </div>
            </div>

            {bloodDonationRequestDetail?.rejection_reason ? (
                          <>
                            <div class="row">
                              <div class="col-12">
                                <strong class="f-17 fw-700"> Remark </strong>
                              </div>
                              <div class="col-auto fw-16 fw-600">
                                {bloodDonationRequestDetail?.rejection_reason}
                              </div>
                            </div>
                          </>
            ):
            <>
            <div className="form-group basic mt-1">
              <label className="label f-17 fw-700" htmlFor="remark">
                Remark <span className="text-danger">*</span> :
              </label>
              <textarea
                className="form-control"
                name="remark"
                id="remark"
                placeholder="Enter remark"
                value={formData.remark}
                onChange={handleInputChange}
              />
            </div>
            

            <div class="form-button-group transparent d-flex  align-items-center">
              <button
                className="btn btn-danger btn-block"
                onClick={() => handleSubmitRemark()}
              >
                {isSubmit ? (
                  "Submitting..."
                ) : (
                  <span className="fontsize-normal">Reject</span>
                )}
              </button>
            </div>
            </>
}
          </div>
        </div>
      </div>
    </>
  );
};

export default BloodDonationHistoryDetail;
