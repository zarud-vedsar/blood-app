import axios from "axios";
import React, { useState, lazy, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { PHP_API_URL } from "../../../site-components/Helper/Constant";
import IsDonorLoggedIn from "../IsDonorLoggedIn";
import { bloodGroups } from "../../../site-components/Helper/BloodGroupConstant";
import { FaCalendarAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const HeaderWithBack = lazy(() =>
  import("../../../site-components/Donor/components/HeaderWithBack")
);

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    termsAccepted: false,
    password: "",
    cpassword: "",
  });

  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState({});

  const markError = (name, msg) => {
    setError({ name: name, msg: msg });
  };

  useEffect(() => {
    if (IsDonorLoggedIn()) {
      navigate("/dashboard");
    }
  }, []);

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
    if (!formData.phone) {
      markError("phone", "Phone Number is required.");
      return setIsSubmit(false);
    }
    
    if (!/^\d{10}$/.test(formData.phone)) {
      markError("phone", "Phone number must be exactly 10 digits.");
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
      if (actualAge <= 16) {
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
    if (!formData.password) {
      markError("password", "Password is required.");
      return setIsSubmit(false);
    }
    if (!formData.cpassword) {
      markError("cpassword", "Confirm password is required.");
      return setIsSubmit(false);
    }

    if (formData.password !== formData.cpassword) {
      markError("cpassword", "Confirm password must be same as password.");
      return setIsSubmit(false);
    }
    markError("", "");

    if (!formData.termsAccepted) {
      markError("termsAccepted", "You must accept the terms");
      return setIsSubmit(false);
    }

    try {
      const bformData = new FormData();
      bformData.append("data", "register");
      Object.keys(formData).forEach((key) => {
        bformData.append(`${key}`, formData[key]);
      });
      const response = await axios.post(`${PHP_API_URL}/doner.php`, bformData);
      if (response?.data?.status === 200) {

         toast.success(response?.data?.msg, {
                  autoClose: 300, 
                  onClose: () => navigate(`/otp-verification/${response?.data?.data?.id}`), 
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      if (!/^\d{0,10}$/.test(value)) {
        return;
      }
    }

    if (name === "dob") {
      const today = new Date();
      const selectedDate = new Date(value);
      const age = today.getFullYear() - selectedDate.getFullYear();
      const monthDiff = today.getMonth() - selectedDate.getMonth();
      const dayDiff = today.getDate() - selectedDate.getDate();

      const actualAge =
        monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0) ? age : age - 1;
      if (actualAge <= 16) {
        markError("dob", "Age is must be greater than 16.");
      } else {
        markError("", "");
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <HeaderWithBack title={"Registration"} />
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
                  value={formData.name}
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
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {error.name === "email" && (
                  <span className="text-danger">{error.msg}</span>
                )}
              </div>

              <div className="form-group basic">
                <label className="label" htmlFor="phone">
                  Phone Number<span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="phone"
                  id="phone"
                  placeholder="Enter Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                {error.name === "phone" && (
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
                    value={formData.dob}
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
                      (gender) => gender.value === formData.gender
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
                <label className="label" htmlFor="password">
                  Password <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                {error.name === "password" && (
                  <span className="text-danger">{error.msg}</span>
                )}
              </div>

              <div className="form-group basic">
                <label className="label" htmlFor="cpassword">
                  Confirm Password <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="cpassword"
                  id="cpassword"
                  placeholder="Retype password"
                  value={formData.cpassword}
                  onChange={handleInputChange}
                />
                {error.name === "cpassword" && (
                  <span className="text-danger">{error.msg}</span>
                )}
              </div>

              <div className="form-group basic">
                <label className="label">
                  <div className="d-flex align-items-center">
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
                  <div>
                  I agree to the{" "}
                  <a href="/terms" target="_blank" style={{color:"#0d6efd"}}>
                    Terms and Conditions
                  </a>
                    
                  </div>
                   

                  </div>
                  
                
                </label>
                {error.name === "termsAccepted" && (
                  <span className="text-danger">{error.msg}</span>
                )}
              </div>
              <div className="form-button-group transparent d-flex justify-content-center align-items-center">
                <button
                  type="submit"
                  className="btn btn-dark btn-block btn-lg"
                  disabled={isSubmit}
                >
                  Next {isSubmit && (
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

export default RegistrationForm;
