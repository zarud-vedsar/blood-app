import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { PHP_API_URL } from "../../../site-components/Helper/Constant";
import { Link } from "react-router-dom";
import IsDonorLoggedIn from "../IsDonorLoggedIn";
import { toast } from "react-toastify";
import HeaderWithBack from "../../../site-components/Donor/components/HeaderWithBack";
import { IoArrowBack } from "react-icons/io5";

const ForgetPassword = () => {
  useEffect(() => {
    if (IsDonorLoggedIn()) {
      navigate("/dashboard");
    }
  }, []);
  const initializeForm = {
    phone: "",
    password: "",
    cpassword: "",
    otp: "",
  };

  const [formData, setFormData] = useState(initializeForm);
  const [seconds, setSeconds] = useState(0);
  const [step, setStep] = useState("step1");
  const [isSubmit, setIsSubmit] = useState(false);
  const [resetId, setResetId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  const [error, setError] = useState({});
  const markError = (name, msg) => {
    setError({ name: name, msg: msg });
  };

  const handleSubmitOtpForm = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    

    if (!formData.phone || !/^[6-9]\d{9}$/.test(formData?.phone)) {
      markError("phone", "Valid phone number is required");
      toast.error("Valid phone number is required");
      return setIsSubmit(false);
    }
    markError("", "");
    try {
      const bformData = new FormData();
      bformData.append("data", "request_otp");
      bformData.append("phone", formData?.phone);

      const response = await axios.post(`${PHP_API_URL}/doner.php`, bformData);

      if (response.data?.status === 200) {
        setFormData((prev) => ({ ...prev, id: response?.data?.data?.id }));
        setSeconds(60);
        setStep("step2");
        toast.success(response?.data?.msg);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } catch (error) {
      setIsSubmit(false);
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
  const verifyOTP = async () => {
    setIsSubmit(true);

    if (!formData.phone || !/^[6-9]\d{9}$/.test(formData?.phone)) {
      markError("phone", "Phone is required");
      toast.error("Phone is required");

      return setIsSubmit(false);
    }

    if (!formData.otp || !/^\d{0,6}$/.test(formData?.otp)) {
      markError("otp", "OTP is required");
      toast.error("OTP is required");
      return setIsSubmit(false);
    }

    markError("", "");

    try {
      const bformData = new FormData();
      bformData.append("data", "verifyResetPasswordOTP");
      bformData.append("phone", formData?.phone);

      bformData.append("otp", formData?.otp);
      bformData.append("id", formData?.id);

      const response = await axios.post(`${PHP_API_URL}/doner.php`, bformData);

      if (response?.data?.status === 200) {
        setResetId(response?.data?.data?.id);
        setStep("step3");
        toast.success(response?.data?.msg);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } catch (error) {
      const status = error.response?.data?.status;
      setIsSubmit(false);
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
  const updatePassword = async () => {
    setIsSubmit(true);

    if (!formData.password) {
      markError("password", "Password is required.");
      toast.error("Password is required.");
      return setIsSubmit(false);
    }
    if (!formData.cpassword) {
      markError("cpassword", "Confirm password is required.");
      toast.error("Confirm password is required.");
      return setIsSubmit(false);
    }

    if (formData.password !== formData.cpassword) {
      markError("cpassword", "Confirm password must be same as password.");
      toast.error("Confirm password must be same as password.");
      return setIsSubmit(false);
    }

    markError("", "");

    try {
      const bformData = new FormData();
      bformData.append("data", "ResetPassword");
      bformData.append("password", formData?.password);
      bformData.append("cpassword", formData?.cpassword);
      bformData.append("id", resetId);

      const response = await axios.post(`${PHP_API_URL}/doner.php`, bformData);

      if (response?.data?.status === 200) {
        toast.success(response?.data?.msg, {
          autoClose: 1000,
          onClose: () => navigate("/info"),
        });
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } catch (error) {
      const status = error.response?.data?.status;
      setIsSubmit(false);
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
          <HeaderWithBack title={"Forgot Password"} />
    
      <div className="container-fluid p-h-0 p-v-20 bg  d-flex">
        <div className="d-flex flex-column justify-content-between w-100">
          <div
            className="container"
            style={{ marginTop: "70px", display: "grid" }}
          >
            <div className="row align-items-center">
              <div className="col-md-7 col-lg-5 col-sm-12 m-h-auto">
                <div className="">
                  <div className="">
                   
                    
                    {
                      <div className="pt-2">
                        <div className="form-group basic">
                          <label className="label" htmlFor="phone">
                            Phone Number <span className="text-danger">*</span>
                          </label>
                          <div className="input-affix">
                            <i className="prefix-icon anticon "></i>
                            <input
                              type="number"
                              name="phone"
                              className="form-control"
                              id="phone"
                              placeholder="Enter Phone Number"
                              value={formData?.phone}
                              onChange={handleInputChange}
                              readOnly={step !== "step1"}
                            />
                          </div>
                          {error.name === "phone" && (
                            <span className="text-danger">{error.msg}</span>
                          )}
                        </div>

                        {step === "step3" && (
                          <>
                            <div className="form-group basic">
                              <label className="label" htmlFor="password">
                                New Password{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <div className="input-affix m-b-10">
                                <i className="prefix-icon anticon"></i>
                                <input
                                  type="password"
                                  name="password"
                                  className="form-control"
                                  id="password"
                                  placeholder="New Password"
                                  value={formData?.password}
                                  onChange={handleInputChange}
                                />
                              </div>
                              {error.name === "password" && (
                                <span className="text-danger">{error.msg}</span>
                              )}
                            </div>

                            <div className="form-group basic">
                              <label className="label" htmlFor="cpassword">
                                Confirm New Password{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <div className="input-affix m-b-10">
                                <i className="prefix-icon anticon"></i>
                                <input
                                  type="password"
                                  name="cpassword"
                                  className="form-control"
                                  id="cpassword"
                                  placeholder="Confirm Password"
                                  value={formData?.cpassword}
                                  onChange={handleInputChange}
                                />
                              </div>
                              {error.name === "cpassword" && (
                                <span className="text-danger">{error.msg}</span>
                              )}
                            </div>
                          </>
                        )}

                        {step === "step2" && (
                          <div className="form-group">
                            <label
                              className="font-weight-semibold"
                              htmlFor="otp"
                            >
                              OTP <span className="text-danger">*</span>
                            </label>
                            <div className="input-affix m-b-10">
                              <i className="prefix-icon anticon"></i>
                              <input
                                type="number"
                                name="otp"
                                className="form-control"
                                id="otp"
                                placeholder="Enter OTP"
                                value={formData?.otp}
                                onChange={handleInputChange}
                              />
                            </div>
                            {error.name === "otp" && (
                              <span className="text-danger">{error.msg}</span>
                            )}
                          </div>
                        )}

                        {step === "step2" &&
                          (seconds > 0 ? (
                            <div className="text-center text-secondary mb-1">
                              OTP is valid for {seconds}
                            </div>
                          ) : (
                            <button
                              className="text-center text-secondary mb-1 cursor-pointer btn btn-block"
                              onClick={handleSubmitOtpForm}

                            >
                              Resend OTP
                            </button>
                          ))}

                        <div className="id-postion-fixed-bottom">
                          <div
                            className="form-group mb-1 px-0"
                            style={{ marginTop: "auto" }}
                          >
                            {step === "step1" && (
                              <button
                                disabled={isSubmit}
                                className="btn btn-dark btn-block btn-lg rounded-3"
                                id="signin-btn"
                                onClick={handleSubmitOtpForm}
                              >
                                Request OTP{" "}
                                {isSubmit && (
                                  <>
                                    &nbsp; <div className="loader-circle"></div>
                                  </>
                                )}
                              </button>
                            )}
                            {step === "step2" && (
                              <button
                                disabled={isSubmit}
                                className="btn btn-dark btn-block btn-lg rounded-3"
                                onClick={(event) => {
                                  event.preventDefault();
                                  event.stopPropagation();
                                  verifyOTP();
                                }}
                              >
                                Verify OTP{" "}
                                {isSubmit && (
                                  <>
                                    &nbsp; <div className="loader-circle"></div>
                                  </>
                                )}
                              </button>
                            )}
                            {step === "step3" && (
                              <button
                                disabled={isSubmit}
                                className="btn btn-dark btn-block btn-lg rounded-3"
                                
                                onClick={(event) => {
                                  event.preventDefault();
                                  event.stopPropagation();
                                  updatePassword();
                                }}
                              >
                                Reset Password{" "}
                                {isSubmit && (
                                  <>
                                    &nbsp; <div className="loader-circle"></div>
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                          <Link to="/login">
                            <div
                              className="text-center  mb-3"
                              style={{ color: "#0d6efd" }}
                            >
                              <IoArrowBack  style={{marginRight:"5px"}} />

                              Back to login
                            </div>
                          </Link>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
