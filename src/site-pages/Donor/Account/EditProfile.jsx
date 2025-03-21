import axios from "axios";
import React, { useState, lazy, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  PHP_API_URL,
  PINCODE_URL,
} from "../../../site-components/Helper/Constant";
import { bloodGroups } from "../../../site-components/Helper/BloodGroupConstant";
import { FaCalendarAlt } from "react-icons/fa";
import { useDonor } from "../../../site-components/Donor/ContextApi/DonorContext";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";

const HeaderWithBack = lazy(() =>
  import("../../../site-components/Donor/components/HeaderWithBack")
);

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const EditProfile = () => {
  const { donor, setDonor } = useDonor();
  const [loading, setLoading] = useState();
  const loguserid = secureLocalStorage.getItem("loguserid");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    state: null,
    city: null,
    pincode: null,
    address: null,
    latitude: null,
    longitude: null,
  });
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      name: donor?.name,
      email: donor?.email,

      dob: donor?.dob,
      gender: donor?.gender,
      bloodGroup: donor?.bloodGroup,
      state: donor?.state,
      city: donor?.city,
      pincode: donor?.pincode,
      address: donor?.address,
    }));
  //getLocation();
  }, [donor]);

  const searchPincode = async (e) => {
    if (!/^\d{0,6}$/.test(e.target.value)) {
      markError("pincode", "Pin Code must be a 6-digit number");
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
        markError("pincode", "Please provide valid pin code.");

        setFormData((prev) => ({ ...prev, state: "", city: "" }));
        toast.error("Please provide valid pin code.");
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

  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState({});

  const markError = (name, msg) => {
    setError({ name: name, msg: msg });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);

    if (!formData.name) {
      markError("name", "Name is required.");
      return setIsSubmit(false);
    }

    if (!formData.email) {
      markError("email", "Email is required.");
      return setIsSubmit(false);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      markError("email", "Invalid email address.");
      return setIsSubmit(false);
    }

    if (!formData.dob) {
      markError("dob", "Date of Birth is required.");
      return setIsSubmit(false);
    }

    if (formData?.dob) {
      const today = new Date();
      const selectedDate = new Date(formData?.dob);
      const age = today.getFullYear() - selectedDate.getFullYear();
      const monthDiff = today.getMonth() - selectedDate.getMonth();
      const dayDiff = today.getDate() - selectedDate.getDate();

      const actualAge =
        monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0) ? age : age - 1;
      if (actualAge < 16) {
        markError("dob", "Age is must be greater than 16.");
        return setIsSubmit(false);
      }
    }

    if (!formData.gender) {
      markError("gender", "Gender is required");
      return setIsSubmit(false);
    }
    if (!formData.bloodGroup) {
      markError("bloodGroup", "Blood group is required");
      return setIsSubmit(false);
    }

    if (!formData?.pincode) {
      markError("pincode", "Vaild pin code is required");

      return setIsSubmit(false);
    }
    if (formData?.pincode && formData?.pincode?.length < 6) {
      markError("pincode", "Pin Code must be a 6-digit number");
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

    try {
      const bformData = new FormData();
      bformData.append("data", "edit_profile");
      bformData.append("loguserid", loguserid);
      Object.keys(formData).forEach((key) => {
        bformData.append(`${key}`, formData[key]);
      });
      const response = await axios.post(`${PHP_API_URL}/doner.php`, bformData);
      if (response?.data?.status === 200) {
        toast.success(response?.data?.msg, { autoClose: 300 });
        setDonor((prev) => ({
          ...prev,
          name: formData?.name,
          email: formData?.email,
          dob: formData?.dob,
          gender: formData?.gender,
          bloodGroup: formData?.bloodGroup,
          state: formData?.state,
          city: formData?.city,
          pincode: formData?.pincode,
          address: formData?.address,
          latitude: formData?.latitude,
          longitude: formData?.longitude,
        }));
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

    if (name === "dob") {
      const today = new Date();
      const selectedDate = new Date(value);
      const age = today.getFullYear() - selectedDate.getFullYear();
      const monthDiff = today.getMonth() - selectedDate.getMonth();
      const dayDiff = today.getDate() - selectedDate.getDate();

      const actualAge =
        monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0) ? age : age - 1;
      setTimeout(() => {
        if (actualAge < 16) {
          markError("dob", "Age is must be greater than 16.");
        } else {
          markError("", "");
        }
      }, 1000);
    }

    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <HeaderWithBack title={"Edit Profile"} />
      <div className="am-content">
        <form onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-body">
              <div className="form-group basic">
                <label className="label" htmlFor="name">
                  Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  id="name"
                  placeholder="Enter Name"
                  value={formData?.name}
                  onChange={handleInputChange}
                />
                {error.name === "name" && (
                  <span className="text-danger">{error.msg}</span>
                )}
              </div>

              <div className="form-group basic">
                <label className="label" htmlFor="email">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="Enter Email"
                  value={formData?.email}
                  onChange={handleInputChange}
                />
                {error.name === "email" && (
                  <span className="text-danger">{error.msg}</span>
                )}
              </div>

              <div className="form-group basic">
                <label className="label" htmlFor="dob">
                  Date Of Birth <span className="text-danger">*</span>
                </label>
                <div className="d-flex">
                  <input
                    type="date"
                    className="form-control"
                    name="dob"
                    id="dob"
                    value={formData?.dob}
                    onChange={handleInputChange}
                  />
                  <span style={{ marginLeft: "-20px" }}>
                    {" "}
                    <FaCalendarAlt />
                  </span>
                </div>

                {error.name === "dob" && (
                  <span className="text-danger">{error.msg}</span>
                )}
              </div>

              <div className="form-group basic">
                <label className="label">
                  Gender <span className="text-danger">*</span>{" "}
                </label>
                <Select
                  options={genderOptions}
                  placeholder="Select Your Gender"
                  isSearchable
                  value={
                    genderOptions.find(
                      (gender) => gender.value === formData?.gender
                    ) || null
                  }
                  onChange={(selected) =>
                    setFormData({ ...formData, gender: selected.value })
                  }
                />

                {error.name === "gender" && (
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
                      (blood) => blood.value === formData?.bloodGroup
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
                <label className="label" htmlFor="pincode">
                  Pin Code <span className="text-danger">*</span>
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="pincode"
                  id="pincode"
                  placeholder="Enter Pin Code"
                  value={formData?.pincode}
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
                {loading ? (
                  <div className="loader-circle"></div>
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    name="state"
                    id="state"
                    placeholder="Enter state"
                    value={formData?.state}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        state: e.target.value,
                      }))
                    }
                  />
                )}
                {error.name === "state" && (
                  <span className="text-danger">{error.msg}</span>
                )}
              </div>

              <div className="form-group basic">
                <label className="label" htmlFor="city">
                  City <span className="text-danger">*</span>
                </label>
                {loading ? (
                  <div className="loader-circle"></div>
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    id="city"
                    placeholder="Enter city"
                    value={formData?.city}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, city: e.target.value }))
                    }
                  />
                )}
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
                  value={formData?.address}
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

              <div className="form-button-group transparent d-flex justify-content-center align-items-center">
                <button
                  type="submit"
                  className="btn btn-dark btn-block btn-lg"
                  disabled={isSubmit}
                >
                  Submit{" "}
                  {isSubmit && (
                    <>
                      &nbsp; <div className="loader-circle"></div>
                    </>
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

export default EditProfile;
