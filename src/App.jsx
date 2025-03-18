import React, { Suspense, lazy, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const AdminRoute = lazy(() => import("./site-route/AdminRoute"));
const DonorRoute = lazy(() => import("./site-route/DonorRoute"));

function App() {
  const [expand, setExpand] = useState(false);
  const [folded, setFolded] = useState(false);

  function toggleExpand(data) {
    setExpand(data);
  }

  function toggleFolded(data) {
    setFolded(data);
  }
  return (
    <>
      <Router>
        <Routes>
          <Route path="/*" element={<DonorRoute />}></Route>
          <Route path="/admin/*" element={
            <div
            className={`${expand ? "is-expand" : ""} ${folded ? "is-folded" : ""
              }`}
          >
            <AdminRoute
              toggleExpand={toggleExpand}
              toggleFolded={toggleFolded}
            />
          </div>
            }></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
