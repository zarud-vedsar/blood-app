import axios from "axios";
import React, { useState, lazy, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { PHP_API_URL } from "../../../site-components/Helper/Constant";
import IsDonorLoggedIn from "../IsDonorLoggedIn";

const HeaderWithBack = lazy(() =>
  import("../../../site-components/Donor/components/HeaderWithBack")
);

const bloodGroups = [
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
  { value: "A1+", label: "A1+" },
  { value: "A1-", label: "A1-" },
  { value: "A2+", label: "A2+" },
  { value: "A2-", label: "A2-" },
  { value: "A1B+", label: "A1B+" },
  { value: "A1B-", label: "A1B-" },
  { value: "A2B+", label: "A2B+" },
  { value: "A2B-", label: "A2B-" },
];

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

  const markError = (name , msg)=>{
    setError({"name":name,"msg":msg});
  }

  useEffect(() => {
    if (IsDonorLoggedIn()) {
      navigate("/dashboard");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    if (!formData.name)
      {
        markError("name","Name is required");
        return setIsSubmit(false);
      } 
      
    if (!formData.email) {
      markError("email" , "Email is required");
      return setIsSubmit(false);
    }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)){
        markError("email" , "Invalid email address");
        return setIsSubmit(false);
      }
        if (!formData.phone){ markError("phone" , "Phone is required");
          return setIsSubmit(false);
        };
        if (!/^\d{10}$/.test(formData.phone)) {
          markError("phone", "Phone number must be exactly 10 digits");
          return setIsSubmit(false);
        }
        if (!formData.dob){ markError("dob", "Date of Birth is required") ;
          return setIsSubmit(false);
        };
        if (!formData.gender) { markError("gender", "Gender is required");
          return setIsSubmit(false);
        };
        if (!formData.bloodGroup) {markError("bloodGroup" , "Blood group is required");
          return setIsSubmit(false);
        };
        if (!formData.termsAccepted){
          markError("termsAccepted" , "You must accept the terms");
          return setIsSubmit(false);};
          if (!formData.password){ markError("password" , "Password is required.");
            return setIsSubmit(false);
          };
          if (!formData.cpassword){
            markError("cpassword" , "Confirm password is required.");
            return setIsSubmit(false);};
            
    if (formData.password !== formData.cpassword){
      markError("cpassword" , "Confirm password must be same as password.");
      return setIsSubmit(false);}; 
      markError("",'')

    try {
      const bformData = new FormData();
      bformData.append("data", "register");
      Object.keys(formData).forEach((key) => {
        bformData.append(`${key}`, formData[key]);
      });
      const response = await axios.post(`${PHP_API_URL}/doner.php`, bformData);
      if (response?.data?.status === 200) {
        setTimeout(() => {
          navigate(`/otp-verification/${response?.data?.data?.id}`);
        }, 300);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } catch (error) {
      console.log(error);
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
                {error.name ==="email" && (
                  <span className="text-danger">{error.msg}</span>
                )}
              </div>

              <div className="form-group basic">
                <label className="label" htmlFor="phone">
                  Phone <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="phone"
                  id="phone"
                  placeholder="Enter Phone"
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
                <input
                  type="date"
                  className="form-control"
                  name="dob"
                  id="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                />
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
                {error.termsAccepted && (
                  <span className="text-danger">{error.termsAccepted}</span>
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
                    <span className="fontsize-normal">Next</span>
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
