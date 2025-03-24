import React from "react";
import { useState } from "react";
import axios from "axios";
import { PHP_API_URL } from "../../../site-components/Helper/Constant";
import { toast } from "react-toastify";
import HeaderWithBack from "../../../site-components/Donor/components/HeaderWithBack";
import secureLocalStorage from "react-secure-storage";

const ContactAndSupport = () => {
  const loguserid = secureLocalStorage.getItem("loguserid");
  const initializeForm = {
    loguserid: loguserid,
    msg: "",
  };

  const [formData, setFormData] = useState(initializeForm);

  const [isSubmit, setIsSubmit] = useState(false);

  const [error, setError] = useState({});
  const markError = (name, msg) => {
    setError({ name: name, msg: msg });
  };

  const handleSubmitOtpForm = async (e) => {
    e.preventDefault();
    setIsSubmit(true);

    if (!formData?.msg) {
      markError("msg", "Please provide your query.");
      toast.error("Please provide your query");
      return setIsSubmit(false);
    }

    markError("", "");

    try {
      const bformData = new FormData();
      bformData.append("data", "changePhoneOTP");
      bformData.append("msg", formData?.msg);
      bformData.append("loguserid", formData?.loguserid);

      const response = await axios.post(`${PHP_API_URL}/doner.php`, bformData);

      if (response.data?.status === 200) {
        toast.success(response?.data?.msg, {
          autoClose: 300,
          onClose: () => window.history.back(),
        });
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } catch (error) {
      setIsSubmit(false);
      const status = error.response?.data?.status;

      if (status === 400 || status === 500 || status === 401) {
        markError(error?.response?.data?.key, error?.response?.data?.msg);
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
      <HeaderWithBack title={"Contact & Support"} />

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
                            Query <span className="text-danger">*</span>
                          </label>
                          <div className="input-affix">
                            <i className="prefix-icon anticon "></i>
                            <textarea
                              name="msg"
                              className="form-control"
                              id="mgs"
                              placeholder="Enter your query"
                              value={formData?.msg}
                              onChange={handleInputChange}
                            />
                          </div>
                          {error.name === "msg" && (
                            <span className="text-danger">{error.msg}</span>
                          )}
                        </div>

                        <div className="id-postion-fixed-bottom">
                          <div
                            className="form-group mb-1 px-0"
                            style={{ marginTop: "auto" }}
                          >
                            <div className="form-button-group transparent d-flex justify-content-center align-items-center">
                              <button
                                type="submit"
                                className="btn btn-dark btn-block btn-lg"
                                disabled={isSubmit}
                                onClick={handleSubmitOtpForm}
                              >
                                Submit
                                {isSubmit && (
                                  <>
                                    &nbsp; <div className="loader-circle"></div>
                                  </>
                                )}
                              </button>
                            </div>
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

export default ContactAndSupport;
