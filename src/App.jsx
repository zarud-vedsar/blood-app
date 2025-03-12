import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './site-components/common/assets/css/style.css';
import './site-components/common/assets/css/ionicons.min.css';

const AdminRoute = lazy(() => import("./site-route/AdminRoute"));
const DonorRoute = lazy(() => import("./site-route/DonorRoute"));

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/*" element={<DonorRoute />}></Route>
          <Route path="/admin" element={<AdminRoute />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
