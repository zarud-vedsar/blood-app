import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
const AdminRoute = lazy(() => import("./site-route/AdminRoute"));
const DonarRoute = lazy(() => import("./site-route/DonarRoute"));

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/*" element={<AdminRoute />}></Route>
          <Route path="/admin" element={<DonarRoute />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
