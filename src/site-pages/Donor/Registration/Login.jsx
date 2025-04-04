import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import IsDonorLoggedIn from "../IsDonorLoggedIn";
import axios from "axios";
import { PHP_API_URL } from "../../../site-components/Helper/Constant";
import { useDonor } from "../../../site-components/Donor/ContextApi/DonorContext";
import secureLocalStorage from "react-secure-storage";
import LogoImg from "../../../site-components/common/assets/img/blood-logo.png";
import { toast } from "react-toastify";
import HeaderWithBack from "../../../site-components/Donor/components/HeaderWithBack";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ phone: "", password: "" });
  const { donor, setDonor } = useDonor();
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
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

    if (!formData.phone) {
      markError("phone", "Phone Number is required");
      toast.error("Phone Number is required");
      return setIsSubmit(false);
    }
    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      markError("phone", "Phone number must be valid.");
      toast.error("Phone number must be valid.");
      return setIsSubmit(false);
    }

    if (!formData.password) {
      markError("password", "Password is required.");
      toast.error("Password is required.");
      return setIsSubmit(false);
    }

    markError("", "");

    try {
      const bformData = new FormData();
      bformData.append("data", "login");
      bformData.append("phone", formData?.phone);
      bformData.append("password", formData?.password);

      const response = await axios.post(`${PHP_API_URL}/doner.php`, bformData);
      if (response?.data?.status === 200) {
        setDonor(response?.data?.data);
        secureLocalStorage.setItem("loguserid", response?.data?.data?.id);
        toast.success(response?.data?.msg, {
          autoClose: 1000,
          onClose: () => navigate("/dashboard"),
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
      if (!/^[6-9]\d{9}$/.test(value)) {
        markError("phone", "Valid phone number is required");
      } else {
        markError("", "");
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <HeaderWithBack title={" "} />

      <div>
        <div className=" text-center id-login-top-img">
          {/* <img src={LogoImg} alt="logo" /> */}
          {/* <h1 className="text-white fs-14">Welcome Back!</h1> */}
        </div>
        <div className="d-flex justify-content-center mt-1">
          <p
            style={{
              margin: "auto 0px",
              fontSize: "x-large",
              fontWeight: "600",
              color: "#000",
            }}
          >
            Welcome Back!
          </p>
        </div>
        <div className="section mb-5 p-2">
          <form onSubmit={handleSubmit}>
            <div className="card">
              <div className="card-body px-0">
                <div className="form-group basic">
                  <label className="label" htmlFor="phone">
                    Phone Number <span className="text-danger">*</span>
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
                <div className="text-end">
                  <Link to="/forget" style={{ color: "#0d6efd" }}>
                    {" "}
                    Forgot Password?
                  </Link>
                </div>
              </div>
            </div>
            <div className="form-button-group transparent d-flex   flex-column justify-content-center align-items-center">
              <button
                type="submit"
                className="btn btn-dark btn-block btn-lg rounded-3"
                disabled={isSubmit}
              >
                Login{" "}
                {isSubmit && (
                  <>
                    &nbsp; <div className="loader-circle"></div>
                  </>
                )}
              </button>

              <div className="mt-1 mb-2">
                Don't have an account ?{" "}
                <Link to="/register" style={{ color: "#0d6efd" }}>
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
