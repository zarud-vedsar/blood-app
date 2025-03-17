import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { PHP_API_URL } from "../../../site-components/Helper/Constant";
import { Link } from "react-router-dom";

const ForgetPassword = () => {

  const initializeForm = {
    phone: "",
    password: "",
    cpassword: "",
    otp:"",
  };

  const [formData, setFormData] = useState(initializeForm);
  const [seconds, setSeconds] = useState(0);
  const [otpSend, setOtpSend] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
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

    if (!formData.phone || !/^\d{0,10}$/.test(formData?.phone)) {
      markError("phone", "Phone is required");
      return setIsSubmit(false);
    }

    if (!formData.password) {
      markError("password", "password is required.");
      return setIsSubmit(false);
    }

    if (!formData.cpassword) {
      markError("cpassword", "Confirm password is required.");
      return setIsSubmit(false);
    }

    markError("", "");

    try {
      const bformData = new FormData();
      bformData.append("data", "reset_password");
      bformData.append("phone", formData?.phone);
      bformData.append("password",formData?.password );
      bformData.append("cpassword", formData?.cpassword);
      
     
      const response = await axios.post(`${PHP_API_URL}/doner.php`, bformData);


      if (response.data?.status === 200) {
        setFormData((prev)=>({...prev,id:response?.data?.data?.id}));
        setSeconds(60);
        setOtpSend(true);
    
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

    if (!formData.phone || !/^\d{0,10}$/.test(formData?.phone)) {
      markError("phone", "Phone is required");
      return setIsSubmit(false);
    }

    if (!formData.password) {
      markError("password", "password is required.");
      return setIsSubmit(false);
    }

    if (!formData.cpassword) {
      markError("cpassword", "Confirm password is required.");
      return setIsSubmit(false);
    }

    
    if (!formData.otp || !/^\d{0,6}$/.test(formData?.otp)) {
      markError("otp", "OTP is required");
      return setIsSubmit(false);
    }

    markError("", "");

    try {
      const bformData = new FormData();
      bformData.append("data", "verifyResetPasswordOTP");
      bformData.append("phone", formData?.phone);
      bformData.append("password",formData?.password );
      bformData.append("cpassword", formData?.cpassword);
      bformData.append("otp", formData?.otp);
      bformData.append("id", formData?.id);
      
     
      const response = await axios.post(`${PHP_API_URL}/doner.php`, bformData);

      if (response.data?.status === 200) {
        setTimeout(() => {
          navigate("/info")
        }, 300);
    
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
    }
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div className="container-fluid p-h-0 p-v-20 bg full-height d-flex">
        <div className="d-flex flex-column justify-content-between w-100">
          <div
            className="container"
            style={{ height: "100vh", display: "grid" }}
          >
            <div className="row align-items-center">
              <div className="col-md-7 col-lg-5 m-h-auto">
                <div className=" shadow-lg">
                  <div className=" p-3">
                    <div className="d-flex align-items-center justify-content-between m-b-30">
                      <img
                        className="img-fluid rounded-5"
                        style={{ maxWidth: "30%" }}
                        alt="Logo"
                        src="https://spaceshineone.co.in/wp-content/themes/rpnlup/assets/img/rpnlup_logo_glow.png"
                      />
                      <h2 className="h4_new">
                        Forget <br />
                        Password
                      </h2>
                    </div>
                    <div className="row">
                      <div className="col-md-12 ml-2">
                        <h3 className="h6_new">Welcome Back!</h3>
                        <p>
                          {!otpSend
                            ? "Enter your registered phone number"
                            : "Verify OTP"}
                        </p>
                      </div>
                    </div>
                    { (
                      <form
                        className="pt-2 px-2"
                        id="security_login_form"
                        onSubmit={handleSubmitOtpForm}
                      >
                        <div className="form-group">
                          <label
                            className="font-weight-semibold"
                            htmlFor="phone"
                          >
                            Phone number <span className="text-danger">*</span>
                          </label>
                          <div className="input-affix">
                            <i className="prefix-icon anticon "></i>
                            <input
                              type="text"
                              name="phone"
                              className="form-control"
                              id="phone"
                              placeholder="Enter phone number"
                              value={formData?.phone}
                              onChange={handleInputChange}
                              readOnly={otpSend}
                            />
                          </div>
                          {error.name === "phone" && (
                            <span className="text-danger">{error.msg}</span>
                          )}
                        </div>
                          
                          {!otpSend && 
                          (<>
                        <div className="form-group">
                          <label
                            className="font-weight-semibold"
                            htmlFor="password"
                          >
                            New Password <span className="text-danger">*</span>
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
                              readOnly={otpSend}
                            />
                          </div>
                          {error.name === "password" && (
                            <span className="text-danger">{error.msg}</span>
                          )}
                        </div>

                        <div className="form-group">
                          <label
                            className="font-weight-semibold"
                            htmlFor="cpassword"
                          >
                            Confirm New Password <span className="text-danger">*</span>
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
                              readOnly={otpSend}
                            />
                          </div>
                          {error.name === "cpassword" && (
                            <span className="text-danger">{error.msg}</span>
                          )}
                        </div>
                        </>)
                }

                        {otpSend && 
                          <div className="form-group">
                            <label
                              className="font-weight-semibold"
                              htmlFor="otp"
                            >
                              Otp <span className="text-danger">*</span>
                            </label>
                            <div className="input-affix m-b-10">
                              <i className="prefix-icon anticon">
                               
                              </i>
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
}

                      {otpSend &&
                        (seconds > 0 ? (
                          <div className="text-center text-secondary mb-1">
                            OTP is valid for {seconds}
                          </div>
                        ) : (
                          <button className="text-center text-secondary mb-1 cursor-pointer btn btn-block" type="submit" >
                            Resend OTP
                          </button>
                        ))}

                        
                        <div className="form-group mb-1 px-0 ">
                        {!otpSend ?
                          <button
                            disabled={isSubmit}
                            type="submit"
                            className="btn btn-dark d-flex justify-content-center align-items-center btn-block submit_btn mt-2"
                            id="signin-btn"
                          >
                            
                            {isSubmit ? (
                              "Submiting..."
                            ) : (
                              <span className="fontsize-normal">Forget</span>
                            )}
                          </button>
                          : <button
                          disabled={isSubmit}
                          className="btn btn-dark d-flex justify-content-center align-items-center btn-block submit_btn"
                          id="signin-btn"
                          onClick={(event) => {
                            event.preventDefault();  
                            event.stopPropagation(); 
                            verifyOTP();           
                          }}
                        >
                          
                          {isSubmit ? (
                            "Submiting..."
                          ) : (
                            <span className="fontsize-normal">Verify OTP</span>
                          )}
                        </button> }
                        </div> 
                        
                      </form>
                    )}
                    <Link to="/">
                      <div className="text-center text-secondary mb-3">
                        Sign In
                      </div>
                    </Link>
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
