import React, { useState, useEffect, lazy } from "react";
import OtpInput from "react-otp-input";
import { useNavigate, useParams } from "react-router-dom";

const HeaderWithBack = lazy(() =>
  import("../../../site-components/Donor/components/HeaderWithBack")
);

const OTPVerificationPage = () => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  // Countdown Timer
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else {
      setIsResendDisabled(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Handle OTP Change
  const handleOtpChange = (value) => {
    setOtp(value);
    setError("");
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }
    try {
      const bformData = new FormData();
      bformData.append("data", "register");
      bformData.append("otp", otp);
      bformData.append("otp", id);

      const response = await axios.post(`${PHP_API_URL}/doner.php`, bformData);
      if (response?.data?.status === 200) {
        navigate("/address");
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
      setLoading(false);
    }
  };

  // Handle Resend OTP
  const handleResendOTP = () => {
    setTimer(30);
    setIsResendDisabled(true);
    setOtp("");
    setError("");
    console.log("Resending OTP...");
  };

  return (
    <>
      <HeaderWithBack title="OTP Verification" />
      <div className="am-content">
        <form className="otp-form " onSubmit={handleSubmit}>
          <h3 className="otp-title">Enter OTP</h3>
          <div className="d-flex justify-content-center">
            <OtpInput
              value={otp}
              onChange={handleOtpChange}
              numInputs={4}
              inputType="number"
              inputMode="numeric"
              renderSeparator={<span>-</span>}
              pattern="[0-9]*"
              renderInput={(props) => (
                <input {...props} className="otp-input" />
              )}
            />
            {error && <span className="text-danger">{error}</span>}
          </div>
          <div className="timer-container">
            {isResendDisabled ? (
              <span className="text-dark">Resend OTP in {timer}s</span>
            ) : (
              <button
                type="button"
                className="resend-btn"
                onClick={handleResendOTP}
              >
                Resend OTP
              </button>
            )}
          </div>

          <div className="form-button-group transparent d-flex justify-content-center align-items-center">
            <button
              type="submit"
              className="btn btn-dark btn-block btn-lg"
              disabled={loading}
            >
              {loading ? (
                "Loading..."
              ) : (
                <span className="fontsize-normal">Verify OTP</span>
              )}
            </button>
          </div>
        </form>
      </div>
      <style jsx>
        {" "}
        {`
          .otp-container {
            display: flex;
            justify-content: center;
            align-items: center;
=          
          }

          .otp-form {
            background: white;
            padding: 30px;
            border-radius: 12px;
            text-align: center;
          }

          .otp-title {
            font-size: 18px;
            margin-bottom: 15px;
          }

          .otp-input {
          
            width: 35px !important;
            height: 40px;
            font-size: 24px;
            text-align: center;
            border: 2px solid #ddd;
            border-radius: 8px;
            margin: 5px;
            transition: all 0.2s ease-in-out;

           
          }

          .separator {
            font-size: 22px;
            font-weight: bold;
            color: #333;
            margin: 0 5px;
          }

          .timer-container {
            margin: 15px 0;
          }

          .timer-text {
            font-size: 14px;
            color: #666;
          }

          .resend-btn {
            background: none;
            border: none;
            color: #007bff;
            font-weight: bold;
            cursor: pointer;
            font-size: 14px;

            &:hover {
              text-decoration: underline;
            }
          }

          .verify-btn {
            width: 100%;
            padding: 12px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            cursor: pointer;
            margin-top: 10px;
            transition: background 0.3s ease-in-out;

            &:hover {
              background: #0056b3;
            }
          }

          .error-text {
            color: red;
            font-size: 14px;
            margin-top: 5px;
          }
        `}
      </style>
    </>
  );
};

export default OTPVerificationPage;
