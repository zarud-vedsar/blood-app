import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AdminProvider } from "../site-components/Admin/ContextApi/AdminContext";
const Login = lazy(() => import("../site-pages/Admin/Registration/Login"));

function AdminRoute() {
  return (
    <AdminProvider>
    <Suspense fallback={<div>Loading...</div>}>
    <Routes>

      <Route path="/" element={<Login />} />
    </Routes>
    </Suspense>
    </AdminProvider>
  );
}

export default AdminRoute;
