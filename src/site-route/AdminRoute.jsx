import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AdminProvider } from "../site-components/Admin/ContextApi/AdminContext";
import ProtectedRoute from "../site-pages/Admin/ProtectedRoute";
import "../site-components/Admin/assets/css/custom.css";
import "../site-components/Admin/assets/css/App.min.css";
const Navbar=lazy(()=>import("../site-components/Admin/components/Navbar"));
import IsAdminLoggedIn from "../site-pages/Admin/IsAdminLoggedIn";
const BloodRequestList=lazy(()=>import("../site-pages/Admin/Donation/BloodRequestList"));
const DonationList=lazy(()=>import("../site-pages/Admin/Donation/DonationList"));
import { ToastContainer } from "react-toastify";
const DonorList=lazy(()=>import("../site-pages/Admin/Donor/DonorList"));
const BloodRequestViewDetail=lazy(()=>import("../site-pages/Admin/Donation/BloodRequestViewDetail"));
const DonorDetailView=lazy(()=>import("../site-pages/Admin/Donor/DonorDetailView"));
const Contact=lazy(()=>import("../site-pages/Admin/Inquery/Contact"));
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
            autoClose={1000}
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
            <Route
              path="/contact/list"
              element={<ProtectedRoute element={<Contact />} />}
            />
          </Routes>
        </Suspense>
      </AdminProvider>
    </>
  );
}

export default AdminRoute;
