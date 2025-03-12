import axios from "axios";
import React, { useState, lazy, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { PHP_API_URL, PINCODE_URL } from "../../../site-components/Helper/Constant";
import secureLocalStorage from "react-secure-storage";
import { bloodGroups } from "../../../site-components/Helper/BloodGroupConstant";
const HeaderWithBack = lazy(() =>
  import("../../../site-components/Donor/components/HeaderWithBack")
);

const AddNewBloodRequest = () => {
  const {id} = useParams();
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
      const response = await axios.get(
        `${PINCODE_URL}/${e.target.value}`
      );
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
        bformData.append("loguserid", secureLocalStorage.getItem("loguserid") || "");
        bformData.append("id", id);
  
        const response = await axios.post(`${PHP_API_URL}/doner.php`, bformData);
        console.log(response?.data?.data?.requestDetail);
  
        if (response?.data?.status === 200) {
          console.log(response?.data?.data?.requestDetail);

          const data = response?.data?.data?.requestDetail;
          setFormData((prev)=>({
              ...prev,
              id:id,
              patientName:data?.patientName,
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
             
          }))
          toast.error("An error occurred. Please try again.");
        }
      } catch (error) {
        const status = error.response?.data?.status;
        if ([400, 401, 500].includes(status)) {
          toast.error(error.response?.data?.msg || "A server error occurred.");
        } else {
          toast.error("An error occurred. Please check your connection or try again.");
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
      if (response?.data?.status === 200) {
        setFormData(initializeForm);
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
 
  return (
    <>
      <HeaderWithBack title={"Request for blood"} />
      <div className="am-content">
        <form onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-body">
              <div className="form-group basic">
                <label className="label" htmlFor="patientName">
                  Patient Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="patientName"
                  id="patientName"
                  placeholder="Enter patient name"
                  value={formData.patientName}
                  onChange={handleInputChange}
                />
                {error.name === "patientName" && (
                  <span className="text-danger">{error.msg}</span>
                )}
              </div>

              <div className="form-group basic">
                <label className="label" htmlFor="attendeePhone">
                  Attendee Phone
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="attendeePhone"
                  id="attendeePhone"
                  placeholder="Enter attendee phone number"
                  value={formData.attendeePhone}
                  onChange={handleInputChange}
                />
                {error.name === "attendeePhone" && (
                  <span className="text-danger">{error.msg}</span>
                )}
              </div>

              <div className="form-group basic">
                <label className="label" htmlFor="requiredDate">
                  Required Date <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="requiredDate"
                  id="requiredDate"
                  value={formData.requiredDate}
                  onChange={handleInputChange}
                />
                {error.name === "requiredDate" && (
                  <span className="text-danger">{error.msg}</span>
                )}
              </div>

              <div className="form-group basic">
                <label className="label">
                  Blood Group <span className="text-danger">*</span>
                </label>
                <Select
                  options={bloodGroups}
                  placeholder="Select Blood Group"
                  isSearchable
                  value={
                    bloodGroups.find(
                      (blood) => blood.value === formData.bloodGroup
                    ) || null
                  }
                  onChange={(selected) =>
                    setFormData({ ...formData, bloodGroup: selected.value })
                  }
                />
                {error.name === "bloodGroup" && (
                  <span className="text-danger">{error.msg}</span>
                )}
              </div>

              <div className="form-group basic">
                <label className="label" htmlFor="unit">
                  Unit <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="unit"
                  id="unit"
                  placeholder="Enter required blood unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                />
                {error.name === "unit" && (
                  <span className="text-danger">{error.msg}</span>
                )}
              </div>

              <div className="form-group basic">
                <label className="label" htmlFor="pincode">
                  PinCode <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="pincode"
                  id="pincode"
                  placeholder="Enter pincode"
                  value={formData.pincode}
                  onChange={searchPincode}
                />
                {error.name === "pincode" && (
                  <span className="text-danger">{error.msg}</span>
                )}
              </div>

              <div className="form-group basic">
                <label className="label" htmlFor="state">
                  State <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="state"
                  id="state"
                  placeholder="Enter state"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, state: e.target.value }))
                  }
                />
                {error.name === "state" && (
                  <span className="text-danger">{error.msg}</span>
                )}
              </div>
              <div className="form-group basic">
                <label className="label" htmlFor="city">
                  City <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  id="city"
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, city: e.target.value }))
                  }
                />
                {error.name === "city" && (
                  <span className="text-danger">{error.msg}</span>
                )}
              </div>
              <div className="form-group basic">
                <label className="label" htmlFor="address">
                  Address <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  id="address"
                  placeholder="Enter address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                />
                {error.name === "address" && (
                  <span className="text-danger">{error.msg}</span>
                )}
              </div>

              <div className="form-group basic">
                <label className="label" htmlFor="additionalNote">
                  Additional Note
                </label>
                <textarea
                  className="form-control"
                  name="additionalNote"
                  id="additionalNote"
                  placeholder="Enter additional detail"
                  value={formData.additionalNote}
                  onChange={handleInputChange}
                />
                {error.name === "additionalNote" && (
                  <span className="text-danger">{error.msg}</span>
                )}
              </div>
              <div className="form-group basic d-flex justify-content-between align-items-center">
                <label className="label" htmlFor="criticalStatus">
                  Critical Status
                </label>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input emp-checkbox"
                    type="checkbox"
                    id="criticalStatus"
                    checked={formData.criticalStatus}
                    onChange={()=> setFormData((prev)=>({...prev,criticalStatus:!formData?.criticalStatus}))}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`criticalStatus`}
                  ></label>
                </div>
              </div>

              <div className="form-group basic">
                <label className="label">
                  <input
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={() =>
                      setFormData({
                        ...formData,
                        termsAccepted: !formData.termsAccepted,
                      })
                    }
                    style={{ marginRight: "5px" }}
                  />
                  I agree to the{" "}
                  <a href="/terms" target="_blank">
                    Terms and Conditions
                  </a>
                </label>
                {error.name === "termsAccepted"&& (
                  <span className="text-danger">{error.msg}</span>
                )}
              </div>
              <div className="form-button-group transparent d-flex justify-content-center align-items-center">
                <button
                  type="submit"
                  className="btn btn-dark btn-block btn-lg"
                  disabled={isSubmit}
                >
                  {isSubmit ? (
                    "Submitting..."
                  ) : (
                    <span className="fontsize-normal">Submit</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNewBloodRequest;
