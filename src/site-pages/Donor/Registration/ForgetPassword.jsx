import React, { useEffect } from "react";

import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { PHP_API_URL } from "../../../site-components/Helper/Constant";
import IsDonorLoggedIn from "../IsDonorLoggedIn";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const initializeForm = {
    phone:"",
    password:"",
    cpassword:"",
  }
  const [formData,setFormData] = useState(initializeForm);
  const [seconds, setSeconds] = useState();

  const [email, setEmail] = useState("");
  const [otpSend, setOtpSend] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [resendOtp, setResendOtp] = useState(false)
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



  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmit(true);
    let isValid = true;

    // Validate email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (otpSend && !resendOtp && (!otp || otp.length < 6)) {
      setOtpError("Please Enter Valid OTP");
      isValid = false;
    } else {
      setOtpError("");
    }

    // Validate password
    if (otpSend && !resendOtp && !newPassword) {
      setNewPasswordError("Please enter your new password");
      isValid = false;
    } else {
      setNewPasswordError("");
    }
    if (otpSend && !resendOtp && !confirmNewPassword) {
      setConfirmNewPasswordError("Please confirm your password");
      isValid = false;
    } else {
      if (newPassword !== confirmNewPassword) {
        setConfirmNewPasswordError(
          "Confirm password must be same as new password"
        );
      }
      else {
        setConfirmNewPasswordError("");
      }
    }

    if (!isValid) {
      setTimeout(() => {
        setIsSubmit(false);
      }, 100);
    }

   
    if (isValid) {
      try {
        const bformData = new FormData();
        bformData.append("email", email);
        // bformData.append("user_pass", password);
        if (otpSend && !resendOtp) {
          bformData.append("data", "resetpass2");
          bformData.append("otp", otp);
          bformData.append("newpassword", newPassword);
        } else {
          bformData.append("data", "resetpass1");
        }

        
        const response = await axios.post(
          `${PHP_API_URL}/faculty.php`,
          bformData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        
        if (response.data?.status === 200) {
          
          toast.success(response.data.msg);
          setEmail("");
          setNewPassword("");
          setConfirmNewPassword("");
          setOtp("");


          setTimeout(() => {
            setIsSubmit(false);
            navigate("/admin/signin");
          }, 3000);
        } else if (response.data?.status === 201) {
          setSeconds(60);
          setOtpSend(true);
          setResendOtp(false)
          toast.success("OTP Sent");
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
    }
  };

  if (redirect) {
    return <Navigate to="/admin/home" replace={true} />; // Redirect to home page if logged in
  }

  useEffect(() => {
    if (resendOtp) {
      handleSubmit();
    }
  }, [resendOtp]);
  const resendVOTP = (e) => {
    e.preventDefault()
    setResendOtp(true);
  };

    const [error, setError] = useState({});
    const markError = (name, msg) => {
      setError({ name: name, msg: msg });
    };
  

  const handleSubmitOtpForm = async(e)=>{
    e.preventDefault();
    setIsSubmit(true);

    if( !formData || !/^\d{0,10}$/.test(formData?.phone)) {
      markError("phone", "Phone is required");
      return setIsSubmit(false);
    }


    if (!formData.password) {
      markError("password", "password is required.");
      return setIsSubmit(false);
    }
    

    if (!formData.cpassword) {
      markError("password", "Confirm password is required.");
      return setIsSubmit(false);
    }

    markError("", "");

    console.log("dasg")

   
      try {
        const bformData = new FormData();
        bformData.append("data","reset_password");
        Object.keys(formData).forEach((key)=>{
          bformData.append(`${key}`,formData[key]);
        })
      
        const response = await axios.post(
          `${PHP_API_URL}/donor.php`,
          bformData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(bformData)
        
        if (response.data?.status === 200) {
          
          toast.success(response.data.msg);
          setEmail("");
          setNewPassword("");
          setConfirmNewPassword("");
          setOtp("");


          setTimeout(() => {
            setIsSubmit(false);
            navigate("/admin/signin");
          }, 3000);
        } else if (response.data?.status === 201) {
          setSeconds(60);
          setOtpSend(true);
          setResendOtp(false)
          toast.success("OTP Sent");
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
    
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value)
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
                <div className="card shadow-lg">
                  <div className="card-body px-3">
                    <div className="d-flex align-items-center justify-content-between m-b-30">
                      <img
                        className="img-fluid rounded-5"
                        style={{ maxWidth: "30%" }}
                        alt="NLU Logo"
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
                            : "Set your new password"}
                        </p>
                      </div>
                    </div>
                    {!otpSend && (
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
                          Phone number:
                        </label>
                        <div className="input-affix">
                          <i className="prefix-icon anticon ">
                          </i>
                          <input
                            type="text"
                            name="phone"
                            className="form-control"
                            id="phone"
                            placeholder="Enter phone number"
                            value={formData?.phone}
                            
                            onChange={handleInputChange}
                          />
                        </div>
                        
                      </div>

                     
                          <div className="form-group">
                            <label
                              className="font-weight-semibold"
                              htmlFor="password"
                            >
                              New Password:
                            </label>
                            <div className="input-affix m-b-10">
                              <i className="prefix-icon anticon">
                             
                              </i>
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
                            
                          </div>

                          <div className="form-group">
                            <label
                              className="font-weight-semibold"
                              htmlFor="cpassword"
                            >
                              Confirm New Password:
                            </label>
                            <div className="input-affix m-b-10">
                              <i className="prefix-icon anticon">
                                
                              </i>
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
                            {confirmNewPasswordError && (
                              <small className="text-danger">
                                {confirmNewPasswordError}
                              </small>
                            )}
                          </div>

                            {/* {otpSend && 
                          <div className="form-group">
                            <label
                              className="font-weight-semibold"
                              htmlFor="otp"
                            >
                              Otp:
                            </label>
                            <div className="input-affix m-b-10">
                              <i className="prefix-icon anticon">
                               
                              </i>
                              <input
                                type="number"
                                name="otp"
                                className="form-control"
                                id="otp"
                                placeholder="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                              />
                            </div>
                            {otpError && (
                              <small className="text-danger">{otpError}</small>
                            )}
                          </div>
}

                      {otpSend &&
                        (seconds > 0 ? (
                          <div className="text-center text-secondary mb-1">
                            OTP is valid for {seconds}
                          </div>
                        ) : (
                          <div className="text-center text-secondary mb-1 cursor-pointer" onClick={resendVOTP}>
                            Resend OTP
                          </div>
                        ))} */}

                      <div className="form-group mb-1 px-0">
                        <button
                          type="submit"
                          className="btn btn-dark d-flex justify-content-center align-items-center btn-block submit_btn"
                          id="signin-btn"
                        >
                        
                          Continue
                          {isSubmit && (
                            <>
                              &nbsp; <div className="loader-circle"></div>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                    )}
                    <Link to="/admin/">
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