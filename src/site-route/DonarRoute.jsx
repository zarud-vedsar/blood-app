import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
const Login = lazy(() => import("../site-pages/Donar/Registration/Login"));

function DonarRoute() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default DonarRoute;
