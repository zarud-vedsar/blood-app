import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AdminProvider } from "../site-components/Admin/ContextApi/AdminContext";
import ProtectedRoute from "../site-pages/Admin/ProtectedRoute";
import "../site-components/Admin/assets/css/custom.css";
import "../site-components/Admin/assets/css/App.min.css";
import Navbar from "../site-components/Admin/components/Navbar";
import IsAdminLoggedIn from "../site-pages/Admin/IsAdminLoggedIn";
import BloodRequestList from "../site-pages/Admin/Donation/BloodRequestList";
import DonationList from "../site-pages/Admin/Donation/DonationList";
const Login = lazy(() => import("../site-pages/Admin/Registration/Login"));
const Dashboard = lazy(() => import("../site-pages/Admin/Dashboard/Dashboard"));

function AdminRoute({ toggleExpand, toggleFolded }) {
  const isLoggedIn = IsAdminLoggedIn();

  return (
    <>
      <AdminProvider>
        {isLoggedIn && (
          <Navbar toggleExpand={toggleExpand} toggleFolded={toggleFolded} />
        )}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/dashboard"
              element={<ProtectedRoute element={<Dashboard />} />}
            />
            <Route
              path="/blood-request/list"
              element={<ProtectedRoute element={<BloodRequestList />} />}
            />
            <Route
              path="/donation/list"
              element={<ProtectedRoute element={<DonationList />} />}
            />
          </Routes>
        </Suspense>
      </AdminProvider>
    </>
  );
}

export default AdminRoute;
