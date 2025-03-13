import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "../site-components/Donor/css/custom.css";
import OTPverificationPage from "../site-pages/Donor/Registration/OTPverificationPage";
import AddressForm from "../site-pages/Donor/Registration/AddressForm";
import { DonorProvider } from "../site-components/Donor/ContextApi/DonorContext";
import ProtectedRoute from "../site-pages/Donor/ProtectRoute";
import Dashboard from "../site-pages/Donor/Dashboard";
import AddNewBloodRequest from "../site-pages/Donor/DonationRequest/AddNewBloodRequest";
import BloodRequestList from "../site-pages/Donor/DonationRequest/BloodRequestList";
import ForgetPassword from "../site-pages/Donor/Registration/ForgetPassword";
import DonationDetailView from "../site-pages/Donor/DonationRequest/DonationDetailView";
import BloodDonationList from "../site-pages/Donor/BloodDonation/BloodDonationList";
import BloodDonatedHistory from "../site-pages/Donor/BloodDonation/BloodDonatedHistory";
import BloodDonationDetailView from "../site-pages/Donor/BloodDonation/BloodDonationDetailView";
const Login = lazy(() => import("../site-pages/Donor/Registration/Login"));
const RegistrationForm = lazy(() =>
  import("../site-pages/Donor/Registration/RegistrationForm")
);
const LandingPage = lazy(() =>
  import("../site-pages/Donor/Registration/LandingPage")
);

function DonorRoute() {
  return (
    <DonorProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="info" />} />
          <Route path="/info" element={<LandingPage />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget" element={<ForgetPassword />} />
          <Route
            path="/otp-verification/:id"
            element={<OTPverificationPage />}
          />
          <Route
            path="/address"
            element={<AddressForm/>}
          />
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
          <Route
            path="/blood-donation-request/add-new"
            element={<ProtectedRoute element={< AddNewBloodRequest/>} />}
          />
          <Route
            path="/blood-donation-request/edit/:id"
            element={<ProtectedRoute element={< AddNewBloodRequest/>} />}
          />
          <Route
            path="/blood-donation-request/request-list"
            element={<ProtectedRoute element={< BloodRequestList/>} />}
          />
          <Route
            path="/blood-donation-request/detail-view/:id"
            element={<ProtectedRoute element={<DonationDetailView/>} />}
          />
          <Route
            path="/blood-donation/list"
            element={<ProtectedRoute element={<BloodDonationList/>} />}
          />
          <Route
            path="/blood-donation/history"
            element={<ProtectedRoute element={<BloodDonatedHistory/>} />}
          />
          <Route
            path="/blood-donation/detail-view/:id"
            element={<ProtectedRoute element={<BloodDonationDetailView/>} />}
          />
        </Routes>
      </Suspense>
    </DonorProvider>
  );
}

export default DonorRoute;
