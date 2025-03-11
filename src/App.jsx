import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import './site-components/common/assets/css/style.css';
import './site-components/common/assets/css/ionicons.min.css';

const AdminRoute = lazy(() => import("./site-route/AdminRoute"));
const DonarRoute = lazy(() => import("./site-route/DonarRoute"));

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/*" element={<DonarRoute />}></Route>
          <Route path="/admin" element={<AdminRoute />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
