import React, { useState, useActionState, lazy } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
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
    gender: null,
    bloodGroup: null,
    termsAccepted: false,
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email address";
    if (!formData.phone) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Invalid phone number";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.bloodGroup) newErrors.bloodGroup = "Blood group is required";
    if (!formData.termsAccepted)
      newErrors.termsAccepted = "You must accept the terms";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [state, formAction] = useActionState(async (prevState, formData) => {
    navigate('/otp-verification')
    if (!validateForm()) return prevState;

    try {
      const bformData = new FormData();
      Object.keys(formData).forEach((key) => {
        bformData.append(`${key}`, formData[key]);
      });
    } catch (error) {
    } finally {
    }
    console.log("Submitting Form: ", formData);
    return { success: true };
  }, {});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <HeaderWithBack title={"Personal Detail"} />
      <div className="am-content">
        <form action={formAction}>
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
                {errors.name && (
                  <span className="text-danger">{errors.name}</span>
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
                {errors.email && (
                  <span className="text-danger">{errors.email}</span>
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
                {errors.phone && (
                  <span className="text-danger">{errors.phone}</span>
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
                {errors.dob && (
                  <span className="text-danger">{errors.dob}</span>
                )}
              </div>

              <div className="form-group basic">
                <label className="label">Gender <span className="text-danger">*</span> </label>
                <Select
                  options={genderOptions}
                  placeholder="Select Your Gender"
                  isSearchable
                  value={formData.gender}
                  onChange={(selected) =>
                    setFormData({ ...formData, gender: selected })
                  }
                />
                {errors.gender && (
                  <span className="text-danger">{errors.gender}</span>
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
                  value={formData.bloodGroup}
                  onChange={(selected) =>
                    setFormData({ ...formData, bloodGroup: selected })
                  }
                />
                {errors.bloodGroup && (
                  <span className="text-danger">{errors.bloodGroup}</span>
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
                {errors.termsAccepted && (
                  <span className="text-danger">{errors.termsAccepted}</span>
                )}
              </div>

              <div className="form-button-group transparent d-flex justify-content-center align-items-center">
                <button type="submit" className="btn btn-dark btn-block btn-lg">
                  <span className="fontsize-normal" disabled={state.pending}>
                    Next
                  </span>
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
