import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { useDonor } from "../../site-components/Donor/ContextApi/DonorContext";
import { PHP_API_URL } from "../../site-components/Helper/Constant";
import PageLoader from "../../site-components/Donor/components/PageLoader";
import { toast } from "react-toastify";

const ProtectedRoute = ({ element }) => {
  const { donor, setDonor } = useDonor(); // Assuming useDonor returns an object
  const [loading, setLoading] = useState(true);

  const loguserid = parseInt(secureLocalStorage.getItem("loguserid"), 10);

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  const isUserLoggedIn = async () => {
    if (!loguserid || isNaN(loguserid) || loguserid <= 0) {
      return   setLoading(false);
    }

    if (donor) {
      setLoading(false);
      return; // User already in context, no need to fetch again
    }

    try {
      const bformData = new FormData();
      bformData.append("data", "fetchuserbyid");
      bformData.append("loguserid", loguserid);

      const response = await axios.post(`${PHP_API_URL}/doner.php`, bformData);

      if (response?.data?.status === 200) {
        setDonor(response?.data?.data);

        // If pincode is missing, redirect to address page
        if (!response?.data?.data?.pincode) {
          return <Navigate to="/address" replace />;
        }
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } catch (error) {
      setLoading(false);

      toast.error("An error occurred. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  if (!loguserid || isNaN(loguserid) || loguserid <= 0) return <Navigate to="/" replace />;
  if (donor && !donor.pincode) return <Navigate to="/address" replace />;

  return element;
};

export default ProtectedRoute;
