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
import { ToastContainer } from "react-toastify";
import DonorList from "../site-pages/Admin/Donor/DonorList";
import BloodRequestViewDetail from "../site-pages/Admin/Donation/BloodRequestViewDetail";
import DonorDetailView from "../site-pages/Admin/Donor/DonorDetailView";
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
        <Suspense fallback={<div></div>}>
        <ToastContainer
            autoClose={5000}
            position="top-right"
            hideProgressBar={false}
            draggable
            pauseOnHover
            closeOnClick
          />

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
            <Route
              path="/donor/list"
              element={<ProtectedRoute element={<DonorList />} />}
            />
            <Route
              path="/blood-request/:id"
              element={<ProtectedRoute element={<BloodRequestViewDetail />} />}
            />
            <Route
              path="/donor-detail/:id"
              element={<ProtectedRoute element={<DonorDetailView />} />}
            />
          </Routes>
        </Suspense>
      </AdminProvider>
    </>
  );
}

export default AdminRoute;
