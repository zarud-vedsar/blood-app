import axios from "axios";
import React, { useState, lazy, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import {
  PHP_API_URL,
  PINCODE_URL,
} from "../../../site-components/Helper/Constant";
import secureLocalStorage from "react-secure-storage";
import { bloodGroups } from "../../../site-components/Helper/BloodGroupConstant";
const HeaderWithBack = lazy(() =>
  import("../../../site-components/Donor/components/HeaderWithBack")
);

const DonationDetailView = () => {
  const { id } = useParams();
  const [bloodDonationRequestDetail,setBloodDonationRequestDetail] = useState();
  const initializeForm = {
    loguserid: secureLocalStorage.getItem("loguserid"),
    patientName: "",
    attendeePhone: "",
    unit: "",
    requiredDate: "",
    bloodGroup: "",
    additionalNote: "",
    criticalStatus: false,
    termsAccepted: false,
    state: "",
    city: "",
    pincode: "",
    address: "",
    latitude: "",
    longitude: "",
  };
  const [formData, setFormData] = useState(initializeForm);

  const navigate = useNavigate();

  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const markError = (name, msg) => {
    setError({ name: name, msg: msg });
  };

  const searchPincode = async (e) => {
    if (!/^\d{0,6}$/.test(e.target.value)) {
      markError("pincode", "Pincode must be a 6-digit number");
      return;
    } else {
      setFormData({ ...formData, pincode: e.target.value });
    }

    if (e.target.value.length < 6) return;
    setLoading(true);
    try {
      const response = await axios.get(`${PINCODE_URL}/${e.target.value}`);
      if (
        response?.data[0]?.Status === "Success" &&
        response?.data[0]?.PostOffice[0]?.Country === "India"
      ) {
        setFormData((prev) => ({
          ...prev,
          state: response?.data[0]?.PostOffice[0]?.State,
          city: response?.data[0]?.PostOffice[0]?.District,
        }));
      } else {
        markError("pincode", "Please provide valid pincode");

        setFormData((prev) => ({ ...prev, state: "", city: "" }));
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
      markError("", "");

      setLoading(false);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
        },
        (err) => {
          console.log(err.message);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => getLocation(), []);

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
        console.log(response?.data?.data?.requestDetail);

        if (response?.data?.status === 200) {
          console.log(response?.data?.data?.requestDetail);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);

    if (!formData.patientName) {
      markError("patientName", "Name is required");
      return setIsSubmit(false);
    }

    if (!/^\d{10}$/.test(formData.attendeePhone)) {
      markError("phone", "Phone number must be exactly 10 digits");
      return setIsSubmit(false);
    }

    if (!formData.requiredDate) {
      markError("requiredDate", "Date is required");
      return setIsSubmit(false);
    }
    if (!formData.bloodGroup) {
      markError("bloodGroup", "Blood group is required");
      return setIsSubmit(false);
    }

    if (!formData.unit) {
      markError("unit", "Unit is required");
      return setIsSubmit(false);
    }

    if (!formData?.pincode) {
      markError("pincode", "Vaild Pincode is required");

      return setIsSubmit(false);
    }

    if (formData?.pincode && formData?.pincode?.length < 6) {
      markError("pincode", "Pincode must be a 6-digit number");
      return setIsSubmit(false);
    }
    if (!formData?.state) {
      markError("state", "State is required");

      return setIsSubmit(false);
    }
    if (!formData?.city) {
      markError("city", "City is required");

      return setIsSubmit(false);
    }
    if (!formData?.address) {
      markError("address", "Address is required");

      return setIsSubmit(false);
    }
    if (!formData.termsAccepted) {
      markError("termsAccepted", "You must accept the terms");
      return setIsSubmit(false);
    }

    markError("", "");

    try {
      const bformData = new FormData();
      bformData.append("data", "newDonationReq");
      Object.keys(formData).forEach((key) => {
        bformData.append(`${key}`, formData[key]);
      });
      const response = await axios.post(`${PHP_API_URL}/doner.php`, bformData);
      if (response?.data?.status === 201 || response?.data?.status === 200) {
        setFormData(initializeForm);
        if (response?.data?.status === 200) {
          window.history.back();
        }
        getLocation();
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
      console.log(response);
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
              <div class="col-auto fw-16 fw-600">{bloodDonationRequestDetail?.requestDetail?.attendeePhone}</div>
            </div>
            <div class="row">
              <div class="col-5">
                <strong class="f-17 fw-700">Required Date</strong>
              </div>
              <div class="col-1">:</div>
              <div class="col-auto fw-16 fw-600">{bloodDonationRequestDetail?.requestDetail?.requiredDate}</div>
            </div>
            <div class="row">
              <div class="col-5">
                <strong class="f-17 fw-700"> Blood Group </strong>
              </div>
              <div class="col-1">:</div>
              <div class="col-auto fw-16 fw-600">{bloodDonationRequestDetail?.requestDetail?.bloodGroup}</div>
            </div>
            <div class="row">
              <div class="col-5">
                <strong class="f-17 fw-700"> Unit </strong>
              </div>
              <div class="col-1">:</div>
              <div class="col-auto fw-16 fw-600">{bloodDonationRequestDetail?.requestDetail?.unit}</div>
            </div>
            <div class="row">
              <div class="col-5">
                <strong class="f-17 fw-700"> PinCode </strong>
              </div>
              <div class="col-1">:</div>
              <div class="col-auto fw-16 fw-600">{bloodDonationRequestDetail?.requestDetail?.pincode}</div>
            </div>
            <div class="row">
              <div class="col-5">
                <strong class="f-17 fw-700"> State </strong>
              </div>
              <div class="col-1">:</div>
              <div class="col-auto fw-16 fw-600">{bloodDonationRequestDetail?.requestDetail?.state}</div>
            </div>
            <div class="row">
              <div class="col-5">
                <strong class="f-17 fw-700"> City </strong>
              </div>
              <div class="col-1">:</div>
              <div class="col-auto fw-16 fw-600">{bloodDonationRequestDetail?.requestDetail?.city}</div>
            </div>
            <div class="row mb-2">
              <div class="col-5">
                <strong class="f-17 fw-700"> Address </strong>
              </div>
              <div class="col-1">:</div>
              <div class="col-auto fw-16 fw-600">{bloodDonationRequestDetail?.requestDetail?.address}</div>
            </div>
            <div class="row">
              <div class="col-12">
                <strong class="f-17 fw-700"> Additional Note </strong>
              </div>
              <div class="col-auto fw-16 fw-600">{bloodDonationRequestDetail?.requestDetail?.additionalNote}</div>
            </div>

            {bloodDonationRequestDetail?.doner && bloodDonationRequestDetail?.doner?.length > 0 && (
              <>
              </>
            )}

            <div class="form-button-group transparent d-flex  align-items-center">
                
                {bloodDonationRequestDetail?.requestDetail?.status === 0 ? 
              <div class="d-flex justify-content-between  border py-1 px-2 rounded-pill w-95">
                <Link to={`/blood-donation-request/edit/${bloodDonationRequestDetail?.requestDetail?.id}`}>
                  <button className="btn btn-light edit-emp">
                    <ion-icon name="create-outline"></ion-icon>
                  </button>
                </Link>

                <button
                        className="btn btn-light text-danger delete-spare"
                          onClick={()=>deleteRequest(bloodDonationRequestDetail?.requestDetail?.id)}
                        >
                          <ion-icon name="trash-outline"></ion-icon>
                        </button>
              </div> : <div className="bg-success d-block w-100 p-1 text-center">
                Received
                </div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonationDetailView;
