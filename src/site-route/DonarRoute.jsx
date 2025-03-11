


import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import  '../site-components/Donor/css/custom.css';
const Login = lazy(() => import("../site-pages/Donar/Registration/Login"));
const RegistrationForm = lazy(() => import("../site-pages/Donar/Registration/RegistrationForm"));
const LandingPage = lazy(() => import("../site-pages/Donar/Registration/LandingPage"));

function DonorRoute() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/" element={<Navigate to="info" />} />
      <Route path="/info" element={<LandingPage />} />
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="/login" element={<RegistrationForm />} />
    </Routes>
    </Suspense>
  );
}

export default DonorRoute;
