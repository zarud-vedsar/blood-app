import React from "react";
import { Navigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { useDonar } from "../../site-components/Donor/ContextApi/DonarContext";

const ProtectedRoute = async ({ element }) => {
  const [donar, setDonar] = useDonar();

  const loguserid = parseInt(secureLocalStorage.getItem("loguserid"), 10);

  if (isNaN(loguserid) || loguserid <= 0) {
    return <Navigate to="/" replace />;
  }
  if (!donar) {
    try {
      const bformData = new FormData();
      bformData.append("data", "fetchuserbyid");

      bformData.append("loguserid", secureLocalStorage.getItem("loguserid"));

      const response = await axios.post(`${PHP_API_URL}/doner.php`, bformData);
      console.log(response);
      if (response?.data?.status === 200) {
        setDonar((prev) => response?.data?.data);
        if (!response?.data?.data?.pincode) {
          return <Navigate to="/address" replace />;
        }
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
    }
  }
  return element;
};
export default ProtectedRoute;
