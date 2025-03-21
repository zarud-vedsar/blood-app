import axios from "axios";
import React, { useState, lazy, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PHP_API_URL } from "../../../site-components/Helper/Constant";
import secureLocalStorage from "react-secure-storage";
import {
  capitalizeFirstLetter,
  formatDate,
} from "../../../site-components/Helper/HelperFunction";
import { toast } from "react-toastify";
import {
  DeleteSweetAlert,
  SubmitRemarkSweetAlert,
} from "../../../site-components/Helper/DeleteSweetAlert";
const HeaderWithBack = lazy(() =>
  import("../../../site-components/Donor/components/HeaderWithBack")
);

const DonationDetailView = () => {
  const { id } = useParams();
  const [bloodDonationRequestDetail, setBloodDonationRequestDetail] =
    useState();
  const loguserid = secureLocalStorage.getItem("loguserid");
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
        bformData.append("data", "view_MyDonationReqById");
        bformData.append("loguserid", loguserid || "");
        bformData.append("id", id);

        const response = await axios.post(
          `${PHP_API_URL}/doner.php`,
          bformData
        );

        if (response?.data?.status === 200) {
          const data = response?.data?.data?.requestDetail;
          setBloodDonationRequestDetail(response?.data?.data);
          setFormData((prev) => ({
            ...prev,
            id: id,
            patientName: data?.patientName,
            attendeePhone: data?.attendeePhone,
            unit: data?.unit,
            requiredDate: data?.requiredDate,
            bloodGroup: data?.bloodGroup,
            additionalNote: data?.additionalNote,
            criticalStatus: data?.criticalStatus === 1 ? true : false,
            state: data?.state,
            city: data?.city,
            pincode: data?.pincode,
            address: data?.address,
          }));
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

    fetchData(); // Call the async function
  }, [id]); // Only runs when `id` changes

  const handleSubmitRemark = async (status, historyid) => {
    try {
      const deleteAlert = await SubmitRemarkSweetAlert(
        status,
        status ? "Is donation received ?" : "Are you sure to cancel donation ?"
      );
      if (deleteAlert.confirmed) {
        setIsSubmit(true);

        const bformData = new FormData();
        if (status === 0) {
          bformData.append("data", "rejectDonation_requestor");
          bformData.append("remark", deleteAlert?.remark);
        } else {
          bformData.append("data", "confirmDonation");

        }

        bformData.append("loguserid", formData?.loguserid);
        bformData.append("id", bloodDonationRequestDetail?.requestDetail?.id);
        bformData.append("historyid", historyid);
        bformData.append("type", status);

        const response = await axios.post(
          `${PHP_API_URL}/doner.php`,
          bformData
        );
        if (response?.data?.status === 201 || response?.data?.status === 200) {
          setFormData(initializeForm);
          if (response?.data?.status === 200) {
            window.location.reload();
          }
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
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "attendeePhone") {
      if (!/^\d{0,10}$/.test(value)) {
        return;
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const deleteRequest = async (id) => {
    setIsSubmit(true);

    try {
      const deleteAlert = await DeleteSweetAlert();
      if (deleteAlert) {
        const bformData = new FormData();
        bformData.append("data", "deleteDonationReq");
        bformData.append("loguserid", loguserid);
        bformData.append("id", id);

        const response = await axios.post(
          `${PHP_API_URL}/doner.php`,
          bformData
        );

        setTimeout(() => {
          window.location.reload();
        }, 300);
        if (response?.data?.status === 200) {
          setTimeout(() => {
            window.location.reload();
          }, 300);
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
      <HeaderWithBack title={"Request Detail"} />
      <div className="am-content">
        <div className="card">
          <div className="card-body px-0">
            <div className="px-3">
              <div className="row">
                <div className="col-5">
                  <strong className="f-17 fw-700">Patient Name</strong>
                </div>
                <div className="col-1">:</div>
                <div className="col-auto fw-16 fw-600">
                  {capitalizeFirstLetter(
                    bloodDonationRequestDetail?.requestDetail?.patientName
                  )}{" "}
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <strong className="f-17 fw-700">Attendee Phone</strong>
                </div>
                <div className="col-1">:</div>
                <div className="col-auto fw-16 fw-600">
                  {bloodDonationRequestDetail?.requestDetail?.attendeePhone}
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <strong className="f-17 fw-700">Requested Date</strong>
                </div>
                <div className="col-1">:</div>
                <div className="col-auto fw-16 fw-600">
                  {bloodDonationRequestDetail?.requestDetail?.request_date
                    ? formatDate(
                        bloodDonationRequestDetail?.requestDetail?.request_date
                      )
                    : "NA"}
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <strong className="f-17 fw-700">Required Date</strong>
                </div>
                <div className="col-1">:</div>
                <div className="col-auto fw-16 fw-600">
                  {bloodDonationRequestDetail?.requestDetail?.requiredDate
                    ? formatDate(
                        bloodDonationRequestDetail?.requestDetail?.requiredDate
                      )
                    : "NA"}
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <strong className="f-17 fw-700"> Blood Group </strong>
                </div>
                <div className="col-1">:</div>
                <div className="col-auto fw-16 fw-600">
                  {bloodDonationRequestDetail?.requestDetail?.bloodGroup}
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <strong className="f-17 fw-700"> Unit </strong>
                </div>
                <div className="col-1">:</div>
                <div className="col-auto fw-16 fw-600">
                  {bloodDonationRequestDetail?.requestDetail?.unit}
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <strong className="f-17 fw-700"> Pin Code </strong>
                </div>
                <div className="col-1">:</div>
                <div className="col-auto fw-16 fw-600">
                  {bloodDonationRequestDetail?.requestDetail?.pincode}
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <strong className="f-17 fw-700"> State </strong>
                </div>
                <div className="col-1">:</div>
                <div className="col-auto fw-16 fw-600">
                  {capitalizeFirstLetter(
                    bloodDonationRequestDetail?.requestDetail?.state
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <strong className="f-17 fw-700"> City </strong>
                </div>
                <div className="col-1">:</div>
                <div className="col-auto fw-16 fw-600">
                  {capitalizeFirstLetter(
                    bloodDonationRequestDetail?.requestDetail?.city
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <strong className="f-17 fw-700"> Address </strong>
                </div>
                <div className="col-1">:</div>
                <div className="col-auto fw-16 fw-600">
                  {capitalizeFirstLetter(
                    bloodDonationRequestDetail?.requestDetail?.address
                  )}
                </div>
              </div>
              {bloodDonationRequestDetail?.requestDetail?.status === 2 && (
                <div className="row">
                  <div className="col-5">
                    <strong className="f-17 fw-700"> Status </strong>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-auto fw-16 fw-600 text-success">
                    Donation received
                  </div>
                </div>
              )}
              {bloodDonationRequestDetail?.requestDetail?.approve_date && (
                <div className="row">
                  <div className="col-5">
                    <strong className="f-17 fw-700"> Donation Date </strong>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-auto fw-16 fw-600 text-success">
                    {formatDate(
                      bloodDonationRequestDetail?.requestDetail?.approve_date
                    )}
                  </div>
                </div>
              )}
             
              {bloodDonationRequestDetail?.requestDetail?.criticalStatus ===
                1 && (
                <div className="row mb-1">
                  <div className="col-12">
                    <span className="badge badge-danger mb-0">Critical</span>
                  </div>
                </div>
              )}
              <div className="row">
                <div className="col-12">
                  <strong className="f-17 fw-700"> Additional Note: </strong>
                </div>
                <div className="col-12 fw-16 fw-600">
                  {capitalizeFirstLetter(
                    bloodDonationRequestDetail?.requestDetail?.additionalNote
                  )}
                </div>
              </div>
            </div>

            {bloodDonationRequestDetail?.doner &&
              bloodDonationRequestDetail?.doner?.length > 0 && (
                <>
                  <div className="row mt-2">
                    <div className="col-12 id-donor-heading">
                      <strong className="f-18 fw-700 px-3">Donor </strong>
                    </div>
                  </div>
                  {bloodDonationRequestDetail?.doner?.map((data, index) => (
                    <div
                      className="card mb-3"
                      key={index}
                      style={{
                        background: "rgb(234 234 234 / 46%)",
                        borderRadius: "0px",
                      }}
                    >
                      <div className="card-body">
                        <div className="row ">
                          <div className="col-5">
                            <strong className="f-17 fw-700"> Name </strong>
                          </div>
                          <div className="col-1">:</div>
                          <div className="col-auto fw-16 fw-600">
                            {capitalizeFirstLetter(data?.name)}
                          </div>
                        </div>
                        <div className="row ">
                          <div className="col-5">
                            <strong className="f-17 fw-700"> User Id </strong>
                          </div>
                          <div className="col-1">:</div>
                          <div className="col-auto fw-16 fw-600">
                            {data?.uniqueId}
                          </div>
                        </div>
                        <div className="row ">
                          <div className="col-5">
                            <strong className="f-17 fw-700"> Gender </strong>
                          </div>
                          <div className="col-1">:</div>
                          <div className="col-auto fw-16 fw-600">
                            {capitalizeFirstLetter(data?.gender)}
                          </div>
                        </div>
                        <div className="row ">
                          <div className="col-5">
                            <strong className="f-17 fw-700"> Phone </strong>
                          </div>
                          <div className="col-1">:</div>
                          <div className="col-auto fw-16 fw-600">
                            {data?.phone}
                          </div>
                        </div>
                        <div className="row ">
                          <div className="col-5">
                            <strong className="f-17 fw-700"> Email </strong>
                          </div>
                          <div className="col-1">:</div>
                          <div className="col-auto fw-16 fw-600">
                            {data?.email}
                          </div>
                        </div>
                        <div className="row ">
                          <div className="col-5">
                            <strong className="f-17 fw-700"> City</strong>
                          </div>
                          <div className="col-1">:</div>
                          <div className="col-auto fw-16 fw-600">
                            {capitalizeFirstLetter(data?.city)}
                          </div>
                        </div>
                        <div className="row ">
                          <div className="col-5">
                            <strong className="f-17 fw-700"> Pin Code</strong>
                          </div>
                          <div className="col-1">:</div>
                          <div className="col-auto fw-16 fw-600">
                            {data?.pincode}
                          </div>
                        </div>
                        <div className="row ">
                          <div className="col-5">
                            <strong className="f-17 fw-700"> State</strong>
                          </div>
                          <div className="col-1">:</div>
                          <div className="col-auto fw-16 fw-600">
                            {capitalizeFirstLetter(data?.state)}
                          </div>
                        </div>
                        <div className="row ">
                          <div className="col-5">
                            <strong className="f-17 fw-700"> Address</strong>
                          </div>
                          <div className="col-1">:</div>
                          <div className="col-auto fw-16 fw-600">
                            {capitalizeFirstLetter(data?.address)}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-5">
                            <strong className="f-17 fw-700">
                              Accepted Date
                            </strong>
                          </div>
                          <div className="col-1">:</div>
                          <div className="col-auto fw-16 fw-600">
                            {data?.acceptance_date
                              ? formatDate(data?.acceptance_date)
                              : "NA"}
                          </div>
                        </div>
                        {data?.approval_date && (
                          <div className="row">
                            <div className="col-5">
                              <strong className="f-17 fw-700">
                                Donation Date
                              </strong>
                            </div>
                            <div className="col-1">:</div>
                            <div className="col-auto fw-16 fw-600 text-success">
                              {data?.approval_date
                                ? formatDate(data?.approval_date)
                                : "NA"}
                            </div>
                          </div>
                        )}
                        {data?.rejection_date && (
                          <div className="row  ">
                            <div className="col-5">
                              <strong className="f-17 fw-700">
                                {" "}
                                Rejected Date
                              </strong>
                            </div>
                            <div className="col-1">:</div>
                            <div className="col-auto fw-16 fw-600 text-danger">
                              {formatDate(data?.rejection_date)}
                            </div>
                          </div>
                        )}
                        <div className="row  ">
                          <div className="col-5">
                            <strong className="f-17 fw-700"> Status</strong>
                          </div>
                          <div className="col-1">:</div>
                          <div className="col-auto fw-16 fw-600 text-danger">
                            {data?.status === 0 && (
                              <p className="f-16 text-warning mb-0">
                                Not donated yet.
                              </p>
                            )}
                            {data?.status === 1 && (
                              <p className="f-16 text-success mb-0">
                                Donation received
                              </p>
                            )}
                            {data?.status === 2 && (
                              <p className="f-16 text-danger mb-0">
                                Rejected By
                                {loguserid == data?.rejected_by && " You"}
                                {data?.id == data?.rejected_by && " Donor"}
                              </p>
                            )}
                          </div>
                        </div>

                        {data?.rejection_reason ? (
                          <>
                            <div className="row">
                              <div className="col-12">
                                <strong className="f-17 fw-700">
                                  {" "}
                                  Rejection Reason:{" "}
                                </strong>
                              </div>
                              <div className="col-12 fw-16 fw-600">
                                {capitalizeFirstLetter(data?.rejection_reason)}
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="d-flex gap-2 mt-2">
                              <button
                                className="btn btn-danger btn-block"
                                onClick={() =>
                                  handleSubmitRemark(0, data?.historyid)
                                }
                              >
                                Reject{" "}
                                {isSubmit && (
                                  <>
                                    &nbsp; <div className="loader-circle"></div>
                                  </>
                                )}
                              </button>
                              <button
                                className="btn btn-success btn-block"
                                onClick={() =>
                                  handleSubmitRemark(1, data?.historyid)
                                }
                              >
                                Received{" "}
                                {isSubmit && (
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
                  ))}
                </>
              )}

            <div className="form-button-group transparent d-flex  align-items-center">
              {bloodDonationRequestDetail?.requestDetail?.status === 0 ||
              bloodDonationRequestDetail?.requestDetail?.status === 3 ? (
                <div className="d-flex justify-content-between  border py-1 px-2 rounded-pill w-95">
                  <Link
                    to={`/blood-donation-request/edit/${bloodDonationRequestDetail?.requestDetail?.id}`}
                  >
                    <button className="btn btn-light edit-emp">
                      <ion-icon name="create-outline"></ion-icon>
                    </button>
                  </Link>

                  <button
                    className="btn btn-light text-danger delete-spare"
                    onClick={() =>
                      deleteRequest(
                        bloodDonationRequestDetail?.requestDetail?.id
                      )
                    }
                  >
                    <ion-icon name="trash-outline"></ion-icon>
                  </button>
                </div>
              ) : bloodDonationRequestDetail?.requestDetail?.status === 1 ? (
                <div className="bg-info d-block w-100 p-1 text-center">
                  Accepted by {bloodDonationRequestDetail?.doner[0]?.name}
                </div>
              ) : (
                <div className="bg-success d-block w-100 p-1 text-center rounded">
                  Donation Received
                </div>
              )}
            </div>
          </div>
        </div>
        <style>
          {`
            .id-donor-heading {
                background: #ff396f;
    color: white;
    margin-bottom: 9px;
                 
               }


          `}
        </style>
      </div>
    </>
  );
};

export default DonationDetailView;
