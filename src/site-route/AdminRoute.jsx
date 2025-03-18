import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AdminProvider } from "../site-components/Admin/ContextApi/AdminContext";
import ProtectedRoute from "../site-pages/Admin/ProtectedRoute";
const Login = lazy(() => import("../site-pages/Admin/Registration/Login"));
const Dashboard = lazy(() => import("../site-pages/Admin/Dashboard/Dashboard"));

function AdminRoute() {
  return (
    <AdminProvider>
    <Suspense fallback={<div>Loading...</div>}>
    <Routes>

      <Route path="/" element={<Login />} />
      <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard/>} />}
          />

    </Routes>
    </Suspense>
    </AdminProvider>
  );
}

export default AdminRoute;
