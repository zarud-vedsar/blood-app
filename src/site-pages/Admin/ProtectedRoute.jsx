import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { useAdminContext } from "../../site-components/Admin/ContextApi/AdminContext";
import { PHP_API_URL } from "../../site-components/Helper/Constant";
import { toast } from "react-toastify";

const ProtectedRoute = ({ element }) => {
  const { adminDetail,setAdminDetail} = useAdminContext(); 
  const [loading, setLoading] = useState(true);

  const loguserid = parseInt(secureLocalStorage.getItem("loguserid"), 10);

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  const isUserLoggedIn = async () => {
    if (!loguserid || isNaN(loguserid) || loguserid <= 0) {
      return   setLoading(false);
    }
    if (adminDetail) {
      setLoading(false);
      return; // User already in context, no need to fetch again
    }

    try {
      const bformData = new FormData();
      bformData.append("data", "load_admin_detail");
      bformData.append("loguserid", loguserid);

      const response = await axios.post(`${PHP_API_URL}/admin.php`, bformData);

      if (response?.data?.status === 200) {
        setAdminDetail(response?.data?.data);

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

  if (loading) return <div>Loading...</div>;
  console.log(loguserid)
  if (!loguserid || isNaN(loguserid) || loguserid <= 0) return <Navigate to="/admin" replace />;
  return element;
};

export default ProtectedRoute;
