import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
const Login = lazy(() => import("../site-pages/Donor/Registration/Login"));

function AdminRoute() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Routes>

      <Route path="/" element={<Login />} />
    </Routes>
    </Suspense>
  );
}

export default AdminRoute;
