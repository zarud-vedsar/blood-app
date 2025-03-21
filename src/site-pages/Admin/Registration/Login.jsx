import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import IsAdminLoggedIn from "../IsAdminLoggedIn";
import axios from "axios";
import { PHP_API_URL } from "../../../site-components/Helper/Constant";
import { useAdminContext } from "../../../site-components/Admin/ContextApi/AdminContext";
import secureLocalStorage from "react-secure-storage";
import logo from "../../../site-components/common/assets/img/logo-donation.avif";
import { MdMailOutline } from "react-icons/md";
import { AiOutlineLock } from "react-icons/ai";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ userid: "", password: "" });
  const {setAdminDetail } = useAdminContext();
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const markError = (name, msg) => {
    setError({ name: name, msg: msg });
  };

  useEffect(() => {
    if (IsAdminLoggedIn()) {
      navigate("/admin/dashboard");
    }
  }, []);

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setIsSubmit(true);

    if (!formData.userid) {
      markError("userid", "User ID is required");
      return setIsSubmit(false);
    }
    

    if (!formData.password) {
      markError("password", "Password is required.");
      return setIsSubmit(false);
    }

    markError("", "");

    try {
      const bformData = new FormData();
      bformData.append("data", "login");
      bformData.append("userid", formData?.userid);
      bformData.append("password", formData?.password);

      const response = await axios.post(`${PHP_API_URL}/admin.php`, bformData);
      
      if (response?.data?.status === 200) {
        setAdminDetail(response?.data?.data);
        secureLocalStorage.setItem("loguserid", response?.data?.data?.id);
        toast.success(response?.data?.msg);
        setTimeout(() => {
          window.location.reload();
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
    
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div className="container-fluid p-h-0 p-v-20 bg full-height d-flex bg_light">
        <div className="d-flex flex-column justify-content-between w-100">
          <div className="container" style={{ height: "100vh", display: "grid" }}>
            <div className="row align-items-center">
              <div className="col-md-7 col-lg-5 m-h-auto">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between m-b-30">
                      <img
                        className="img-fluid rounded-5"
                        style={{ maxWidth: "30%" }}
                        alt="NLU Logo"
                        src={logo}
                      />
                      <h2 className="h4_new">Sign In</h2>
                    </div>
                    <div className="row">
                      <div className="col-md-12 ml-2">
                        <h3 className="h6_new">Welcome Back!</h3>
                        <p>Enter your credentials for login</p>
                      </div>
                    </div>
                    <form
                      onSubmit={handleSubmit}
                    >

                      
                      <div className="form-group">
                        <label
                          className="font-weight-semibold"
                          htmlFor="user_email"
                        >
                          User ID :
                        </label>
                        <div className="input-affix">
                          <i className="prefix-icon anticon ">
                            <MdMailOutline />
                          </i>
                          <input
                    type="text"
                    className="form-control"
                    name="userid"
                    id="userid"
                    placeholder="Enter user id"
                    value={formData.userid}
                    onChange={handleInputChange}
                  />
                          
                        </div>
                        {error.name === "userid" && (
                    <span className="text-danger">{error.msg}</span>
                  )}
                        
                      </div>

                      <div className="form-group">
                        <label
                          className="font-weight-semibold"
                          htmlFor="user_pass"
                        >
                          Password:
                        </label>
                        <div className="input-affix m-b-10">
                          <i className="prefix-icon anticon">
                            <AiOutlineLock />
                          </i>
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter Password"
                            value={formData?.password}
                            onChange={handleInputChange}
                          />
                        </div>
                        {error.name === "password" && (
                    <span className="text-danger">{error.msg}</span>
                  )}
                      </div>
                      <div className="form-group mb-0">
                        <button
                          disabled={isSubmit}
                          type="submit"
                          className="btn btn-dark py-2 d-flex justify-content-center align-items-center btn-block"
                        >
                          Sign In{" "}
                          {isSubmit && (
                            <>
                              &nbsp; <div className="loader-circle"></div>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
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

export default Login;
