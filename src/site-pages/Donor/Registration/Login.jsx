import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import IsDonorLoggedIn from "../IsDonorLoggedIn";
import axios from "axios";
import { PHP_API_URL } from "../../../site-components/Helper/Constant";
import { useDonor } from "../../../site-components/Donor/ContextApi/DonorContext";
import secureLocalStorage from "react-secure-storage";

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
      markError("phone", "Phone is required");
      return setIsSubmit(false);
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      markError("phone", "Phone number must be exactly 10 digits");
      return setIsSubmit(false);
    }

    if (!formData.password) {
      markError("password", "Confirm password is required.");
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

        setTimeout(() => {
          navigate(`/dashboard`);
        }, 300);
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

    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div>
        <div className=" text-center id-login-top-img">
          <h1 className="text-dark fs-14">Welcome Back!</h1>
        </div>

        <div className="section mb-5 p-2">
          <form onSubmit={handleSubmit}>
            <div className="card">
              <div className="card-body">
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
              </div>
            </div>

            <div className="form-button-group transparent d-flex   flex-column justify-content-center align-items-center">
              <button
                type="submit"
                className="btn btn-dark btn-block btn-lg"
                disabled={isSubmit}
              >
                {isSubmit ? (
                  "Logging..."
                ) : (
                  <span className="fontsize-normal">Login</span>
                )}
              </button>
               <div className="mt-1 mb-2">
                          Don't have an account ? <Link to="/info"> Register</Link>
                          
                        </div>
            </div>
            
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
