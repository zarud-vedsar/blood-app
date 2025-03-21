import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { PHP_API_URL } from "../../../site-components/Helper/Constant";
import { toast } from "react-toastify";
import HeaderWithBack from "../../../site-components/Donor/components/HeaderWithBack";
import secureLocalStorage from "react-secure-storage";
import { useDonor } from "../../../site-components/Donor/ContextApi/DonorContext";

const ChangePhoneNumber = () => {
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
  const loguserid = secureLocalStorage.getItem("loguserid");
  const { donor, setDonor } = useDonor();
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
      markError("phone", "Valid Phone Number is required.");
      toast.error("Valid Phone Number is required");
      return setIsSubmit(false);
    }

    if (formData?.phone === donor?.phone) {
      markError("phone", "Please enter new phone number.");
      toast.error("Please enter new phone number");
      return setIsSubmit(false);
    }

    markError("", "");

    try {
      const bformData = new FormData();
      bformData.append("data", "changePhoneOTP");
      bformData.append("phone", formData?.phone);
      bformData.append("loguserid", loguserid);

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
      markError("phone", "Phone is required.");
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
      bformData.append("data", "changePhone");
      bformData.append("phone", formData?.phone);
      bformData.append("loguserid", loguserid);

      bformData.append("otp", formData?.otp);

      const response = await axios.post(`${PHP_API_URL}/doner.php`, bformData);

      if (response?.data?.status === 200) {
        setDonor((prev) => ({ ...prev, phone: formData?.phone }));
        toast.success(response?.data?.msg, {
          autoClose: 500,
          onClose: () => window.history.back(),
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
        markError("phone", "Valid Phone Number is required");
      } else {
        markError("", "");
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <HeaderWithBack title={"Change Phone Number"} />

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
                            Enter New Phone Number{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <div className="input-affix">
                            <i className="prefix-icon anticon "></i>
                            <input
                              type="number"
                              name="phone"
                              className="form-control"
                              id="phone"
                              placeholder="Enter New Phone Number"
                              value={formData?.phone}
                              onChange={handleInputChange}
                              readOnly={step !== "step1"}
                            />
                          </div>
                          {error.name === "phone" && (
                            <span className="text-danger">{error.msg}</span>
                          )}
                        </div>

                        {step === "step2" && (
                          <div className="form-group">
                            <label
                              className="font-weight-semibold"
                              htmlFor="otp"
                            >
                              Otp <span className="text-danger">*</span>
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
                              <div className="form-button-group transparent d-flex justify-content-center align-items-center">
                                <button
                                  type="submit"
                                  className="btn btn-dark btn-block btn-lg"
                                  disabled={isSubmit}
                                  onClick={handleSubmitOtpForm}
                                >
                                  Request OTP{" "}
                                  {isSubmit && (
                                    <>
                                      &nbsp;{" "}
                                      <div className="loader-circle"></div>
                                    </>
                                  )}
                                </button>
                              </div>
                            )}
                            {step === "step2" && (
                              <div className="form-button-group transparent d-flex justify-content-center align-items-center">
                                <button
                                  type="submit"
                                  className="btn btn-dark btn-block btn-lg"
                                  disabled={isSubmit}
                                  onClick={verifyOTP}
                                >
                                  Verify OTP{" "}
                                  {isSubmit && (
                                    <>
                                      &nbsp;{" "}
                                      <div className="loader-circle"></div>
                                    </>
                                  )}
                                </button>
                              </div>
                            )}
                          </div>
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

export default ChangePhoneNumber;
