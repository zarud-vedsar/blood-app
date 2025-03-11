import React, { useState, useActionState, lazy } from "react";
import dummyUserImage from "../../../site-components/common/assets/img/user.png";
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
    pinCode: "",
    address: "",
    city: "",
    state: "",
    password: "",
    cpassword: "",
    termsAccepted: false,
  });

  const [state, formAction] = useActionState(async (prevState, formData) => {
    console.log("Submitting Form: ", formData);
    return { success: true };
  }, {});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, termsAccepted: e.target.checked });
  };

  return (
    <>
                  <HeaderWithBack title={'Personal Detail'} />

      <div className="pb-5 pt-5">
        <form className="pb-5" action={formAction}>
          <div className="card">
            <div className="card-body">

              {/* Image Upload */}
              {/* <div className="form-group">
                <div className="mx-auto am-userImageDiv">
                  <div
                    id="am-avtar_previiew_image"
                    className="mx-auto"
                    style={{ backgroundImage: `url(${dummyUserImage})` }}
                  ></div>
                  <label htmlFor="avatar-input" className="am-file-label">
                    <ion-icon name="camera-outline"></ion-icon>
                  </label>
                  <input
                    type="file"
                    className="form-control am-file-input"
                    name="avatar_user"
                    id="avatar-input"
                  />
                </div>
              </div> */}

              {/* Name Input */}
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
              </div>

              {/* Email Input */}
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
              </div>

              {/* Phone Input */}
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
              </div>

              {/* Date of Birth */}
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
              </div>

              {/* Gender Select */}
              <div className="form-group basic">
                <label className="label">Gender</label>
                <Select
                  options={genderOptions}
                  placeholder="Select Your Gender"
                  isSearchable
                  value={formData.gender}
                  onChange={(selected) =>
                    setFormData({ ...formData, gender: selected })
                  }
                />
              </div>

              {/* Blood Group Select */}
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
              </div>

              {/* Address Inputs */}
              {/* <div className="form-group basic">
                <label className="label" htmlFor="pinCode">
                  Pin Code <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="pinCode"
                  id="pinCode"
                  placeholder="Enter Pin Code"
                  value={formData.pinCode}
                  onChange={handleInputChange}
                />
              </div> */}

              {/* <div className="form-group basic">
                <label className="label" htmlFor="address">
                  Address <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  id="address"
                  placeholder="Enter Address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div> */}

              {/* <div className="form-group basic">
                <label className="label" htmlFor="city">
                  City <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  id="city"
                  placeholder="Enter City"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div> */}

              {/* <div className="form-group basic">
                <label className="label" htmlFor="state">
                  State <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="state"
                  id="state"
                  placeholder="Enter State"
                  value={formData.state}
                  onChange={handleInputChange}
                />
              </div> */}

              {/* Password Inputs */}
              {/* <div className="form-group basic">
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
              </div> */}

              {/* <div className="form-group basic">
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
              </div> */}

              {/* Terms & Conditions Checkbox */}
              <div className="form-group basic">
                <label className="label">
                  <input
                    type="checkbox"
                    style={{ marginRight: "10px" }}
                    checked={formData.termsAccepted}
                    onChange={handleCheckboxChange}
                  />
                  I agree to the{" "}
                  <a href="/terms" target="_blank">
                    Terms and Conditions
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <div className="form-button-group transparent d-flex justify-content-center align-items-center">
                <button type="submit" className="btn btn-dark btn-block btn-lg">
                  <span className="fontsize-normal">Save</span>
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
