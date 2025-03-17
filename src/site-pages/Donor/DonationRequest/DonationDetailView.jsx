import axios from "axios";
import React, { useState, lazy, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PHP_API_URL } from "../../../site-components/Helper/Constant";
import secureLocalStorage from "react-secure-storage";
const HeaderWithBack = lazy(() =>
  import("../../../site-components/Donor/components/HeaderWithBack")
);

const DonationDetailView = () => {
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
        bformData.append("data", "view_MyDonationReqById");
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

    fetchData(); // Call the async function
  }, [id]); // Only runs when `id` changes

  const handleSubmitRemark = async (status, historyid) => {
    setIsSubmit(true);

    try {
      const bformData = new FormData();
      if (status === 0) {
        bformData.append("data", "rejectDonation_requestor");
      } else {
        bformData.append("data", "confirmDonation");
      }
      bformData.append("remark", formData?.remark);
      bformData.append("loguserid", formData?.loguserid);
      bformData.append("id", bloodDonationRequestDetail?.requestDetail?.id);
      bformData.append("historyid", historyid);
      bformData.append("type", status);

      const response = await axios.post(`${PHP_API_URL}/doner.php`, bformData);
      if (response?.data?.status === 201 || response?.data?.status === 200) {
        setFormData(initializeForm);
        if (response?.data?.status === 200) {
         // window.location.reload();
        }
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
      const bformData = new FormData();
      bformData.append("data", "deleteDonationReq");
      bformData.append("loguserid", secureLocalStorage.getItem("loguserid"));
      bformData.append("id", id);

      const response = await axios.post(`${PHP_API_URL}/doner.php`, bformData);

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
          <div className="card-body">
            <div class="row">
              <div class="col-5">
                <strong class="f-17 fw-700">Patient Name</strong>
              </div>
              <div class="col-1">:</div>
              <div class="col-auto fw-16 fw-600">
                {bloodDonationRequestDetail?.requestDetail?.patientName}{" "}
                {bloodDonationRequestDetail?.requestDetail?.criticalStatus && (
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
                {bloodDonationRequestDetail?.requestDetail?.attendeePhone}
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <strong class="f-17 fw-700">Required Date</strong>
              </div>
              <div class="col-1">:</div>
              <div class="col-auto fw-16 fw-600">
                {bloodDonationRequestDetail?.requestDetail?.requiredDate}
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <strong class="f-17 fw-700"> Blood Group </strong>
              </div>
              <div class="col-1">:</div>
              <div class="col-auto fw-16 fw-600">
                {bloodDonationRequestDetail?.requestDetail?.bloodGroup}
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <strong class="f-17 fw-700"> Unit </strong>
              </div>
              <div class="col-1">:</div>
              <div class="col-auto fw-16 fw-600">
                {bloodDonationRequestDetail?.requestDetail?.unit}
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <strong class="f-17 fw-700"> PinCode </strong>
              </div>
              <div class="col-1">:</div>
              <div class="col-auto fw-16 fw-600">
                {bloodDonationRequestDetail?.requestDetail?.pincode}
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <strong class="f-17 fw-700"> State </strong>
              </div>
              <div class="col-1">:</div>
              <div class="col-auto fw-16 fw-600">
                {bloodDonationRequestDetail?.requestDetail?.state}
              </div>
            </div>
            <div class="row">
              <div class="col-5">
                <strong class="f-17 fw-700"> City </strong>
              </div>
              <div class="col-1">:</div>
              <div class="col-auto fw-16 fw-600">
                {bloodDonationRequestDetail?.requestDetail?.city}
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-5">
                <strong class="f-17 fw-700"> Address </strong>
              </div>
              <div class="col-1">:</div>
              <div class="col-auto fw-16 fw-600">
                {bloodDonationRequestDetail?.requestDetail?.address}
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <strong class="f-17 fw-700"> Additional Note </strong>
              </div>
              <div class="col-auto fw-16 fw-600">
                {bloodDonationRequestDetail?.requestDetail?.additionalNote}
              </div>
            </div>

            {bloodDonationRequestDetail?.doner &&
              bloodDonationRequestDetail?.doner?.length > 0 && (
                <>
                  <div class="row mt-2">
                    <div class="col-12">
                      <strong class="f-17 fw-700">Donor </strong>
                    </div>
                  </div>
                  {bloodDonationRequestDetail?.doner?.map((data, index) => (
                    <div
                      className="card mb-3"
                      key={index}
                      style={{ background: "#eaeaea" }}
                    >
                      <div className="card-body">
                        <div class="row ">
                          <div class="col-4">
                            <strong class="f-17 fw-700"> Name </strong>
                          </div>
                          <div class="col-1">:</div>
                          <div class="col-auto fw-16 fw-600">{data?.name}</div>
                        </div>
                        <div class="row ">
                          <div class="col-4">
                            <strong class="f-17 fw-700"> Gender </strong>
                          </div>
                          <div class="col-1">:</div>
                          <div class="col-auto fw-16 fw-600">
                            {data?.gender}
                          </div>
                        </div>
                        <div class="row ">
                          <div class="col-4">
                            <strong class="f-17 fw-700"> Phone </strong>
                          </div>
                          <div class="col-1">:</div>
                          <div class="col-auto fw-16 fw-600">{data?.phone}</div>
                        </div>
                        <div class="row ">
                          <div class="col-4">
                            <strong class="f-17 fw-700"> Email </strong>
                          </div>
                          <div class="col-1">:</div>
                          <div class="col-auto fw-16 fw-600">{data?.email}</div>
                        </div>
                        <div class="row ">
                          <div class="col-4">
                            <strong class="f-17 fw-700"> City</strong>
                          </div>
                          <div class="col-1">:</div>
                          <div class="col-auto fw-16 fw-600">{data?.city}</div>
                        </div>
                        <div class="row ">
                          <div class="col-4">
                            <strong class="f-17 fw-700"> PinCode</strong>
                          </div>
                          <div class="col-1">:</div>
                          <div class="col-auto fw-16 fw-600">
                            {data?.pincode}
                          </div>
                        </div>
                        <div class="row ">
                          <div class="col-4">
                            <strong class="f-17 fw-700"> State</strong>
                          </div>
                          <div class="col-1">:</div>
                          <div class="col-auto fw-16 fw-600">{data?.state}</div>
                        </div>
                        <div class="row ">
                          <div class="col-4">
                            <strong class="f-17 fw-700"> Address</strong>
                          </div>
                          <div class="col-1">:</div>
                          <div class="col-auto fw-16 fw-600">
                            {data?.address}
                          </div>
                        </div>

                        {data?.rejection_reason ? (
                          <>
                            <div class="row">
                              <div class="col-12">
                                <strong class="f-17 fw-700"> Remark </strong>
                              </div>
                              <div class="col-auto fw-16 fw-600">
                                {data?.rejection_reason}
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="form-group basic">
                              <label
                                className="label f-17 fw-700"
                                htmlFor="remark"
                              >
                                Remark :
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
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-danger btn-block"
                                onClick={() =>
                                  handleSubmitRemark(0, data?.historyid)
                                }
                              >
                                {isSubmit ? (
                                  "Submitting..."
                                ) : (
                                  <span className="fontsize-normal">
                                    Reject
                                  </span>
                                )}
                              </button>
                              <button
                                className="btn btn-success btn-block"
                                onClick={() =>
                                  handleSubmitRemark(1, data?.historyid)
                                }
                              >
                                {isSubmit ? (
                                  "Submitting..."
                                ) : (
                                  <span className="fontsize-normal">
                                    Received
                                  </span>
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

            <div class="form-button-group transparent d-flex  align-items-center">
              {bloodDonationRequestDetail?.requestDetail?.status === 0 ||
              bloodDonationRequestDetail?.requestDetail?.status === 3 ? (
                <div class="d-flex justify-content-between  border py-1 px-2 rounded-pill w-95">
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
                  Accepted By Someone
                </div>
              ) : (
                <div className="bg-success d-block w-100 p-1 text-center rounded">
                  Approved
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonationDetailView;
