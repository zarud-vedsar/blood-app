import React, { useState, lazy, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDonor } from "../../../site-components/Donor/ContextApi/DonorContext";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import {
  PHP_API_URL,
  PINCODE_URL,
} from "../../../site-components/Helper/Constant";
import { toast } from "react-toastify";

const HeaderWithBack = lazy(() =>
  import("../../../site-components/Donor/components/HeaderWithBack")
);

const AddressForm = () => {
  const [formData, setFormData] = useState({
    state: null,
    city: null,
    pincode: null,
    address: null,
    latitude: null,
    longitude: null,
  });
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
        },
        (err) => {
          console.log(err.message);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };
  useEffect(() => getLocation(), []);
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const [isSubmit, setIsSubmit] = useState();
  const { donor, setDonor } = useDonor();

  const [error, setError] = useState({});

  const markError = (name, msg) => {
    setError({ name: name, msg: msg });
  };

  const searchPincode = async (e) => {
    if (!/^\d{0,6}$/.test(e.target.value)) {
      markError("pincode", "Pincode must be a 6-digit number");
      return;
    } else {
      setFormData({ ...formData, pincode: e.target.value });
    }

    if (e.target.value.length < 6) return;
    setLoading(true);
    try {
      const response = await axios.get(`${PINCODE_URL}/${e.target.value}`);
      if (
        response?.data[0]?.Status === "Success" &&
        response?.data[0]?.PostOffice[0]?.Country === "India"
      ) {
        setFormData((prev) => ({
          ...prev,
          state: response?.data[0]?.PostOffice[0]?.State,
          city: response?.data[0]?.PostOffice[0]?.District,
        }));
      } else {
        markError("pincode", "Please provide valid pincode");

        setFormData((prev) => ({ ...prev, state: "", city: "" }));
        toast.error("Please provide valid pincode.");
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
      markError("", "");

      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    if (!formData?.pincode) {
      markError("pincode", "Vaild Pincode is required");

      return setIsSubmit(false);
    }
    if (formData?.pincode && formData?.pincode?.length < 6) {
      markError("pincode", "Pincode must be a 6-digit number");
      return setIsSubmit(false);
    }
    if (!formData?.state) {
      markError("state", "State is required");

      return setIsSubmit(false);
    }
    if (!formData?.city) {
      markError("city", "City is required");

      return setIsSubmit(false);
    }
    if (!formData?.address) {
      markError("address", "Address is required");

      return setIsSubmit(false);
    }

    try {
      const bformData = new FormData();
      bformData.append("data", "setlocation");

      bformData.append("loguserid", secureLocalStorage.getItem("loguserid"));

      Object.keys(formData).forEach((key) => {
        bformData.append(`${key}`, formData[key]);
      });

      const response = await axios.post(`${PHP_API_URL}/doner.php`, bformData);
      if (response?.data?.status === 200) {
        setDonor((prev) => ({ ...prev, ...formData }));
        toast.success(response?.data?.msg, {
          autoClose: 300,
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

  return (
    <>
      <HeaderWithBack title={"Address"} />
      <div className="am-content">
        <form onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-body">
              <div className="form-group basic">
                <label className="label" htmlFor="pincode">
                  PinCode <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="pincode"
                  id="pincode"
                  placeholder="Enter Pincode"
                  value={formData.pincode}
                  onChange={searchPincode}
                />
                {error.name === "pincode" && (
                  <span className="text-danger">{error.msg}</span>
                )}
              </div>

              <div className="form-group basic">
                <label className="label" htmlFor="state">
                  State <span className="text-danger">*</span>
                </label>
                {loading ? (
                  <div className="loader-circle"></div>
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    name="state"
                    id="state"
                    placeholder="Enter state"
                    value={formData.state}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        state: e.target.value,
                      }))
                    }
                  />
                )}
                {error.name === "state" && (
                  <span className="text-danger">{error.msg}</span>
                )}
              </div>
              <div className="form-group basic">
                <label className="label" htmlFor="city">
                  City <span className="text-danger">*</span>
                </label>
                {loading ? (
                  <div className="loader-circle"></div>
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    id="city"
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, city: e.target.value }))
                    }
                  />
                )}
                {error.name === "city" && (
                  <span className="text-danger">{error.msg}</span>
                )}
              </div>
              <div className="form-group basic">
                <label className="label" htmlFor="address">
                  Address <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  id="address"
                  placeholder="Enter address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                />
                {error.name === "address" && (
                  <span className="text-danger">{error.msg}</span>
                )}
              </div>

              <div className="form-button-group transparent d-flex justify-content-center align-items-center">
                <button
                  type="submit"
                  className="btn btn-dark btn-block btn-lg"
                  disabled={isSubmit}
                >
                  Submit{" "}
                  {isSubmit && (
                    <>
                      &nbsp; <div className="loader-circle"></div>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <style jsx>{`
        .leaflet-touch .leaflet-control-layers,
        .leaflet-touch .leaflet-bar {
          margin: 0px;
        }
      `}</style>
    </>
  );
};

export default AddressForm;
