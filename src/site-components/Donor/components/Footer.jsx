import React from "react";
import { Link, useLocation } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";

const Footer = () => {
  // Use the location hook to get the current path
  const location = useLocation();

  return (
    <div className="appBottomMenu">
      <Link
        to="/dashboard"
        className={`item ${location.pathname === "/dashboard" ? "active" : ""}`}
        id="home-link"
      >
        <div className="col">
          <ion-icon name="home-outline"></ion-icon>
          <strong className="mt-1">Home</strong>
        </div>
      </Link>

      <Link
        to="/blood-donation/list"
        className={`item ${location.pathname === "/blood-donation/list" ? "active" : ""}`}
      >
        <div className="col">
          <ion-icon name="fitness-outline"></ion-icon>
          <strong className="mt-1">Donate</strong>
        </div>
      </Link>

      <Link
        to="/blood-donation-request/add-new"
        className={`item ${location.pathname === "/blood-donation-request/request-list" ? "active" : ""}`}
      >
        <div className="col">
          <ion-icon name="megaphone-outline"></ion-icon>
          <strong className="mt-1">Request for blood</strong>
        </div>
      </Link>

      <Link
        to="/account"
        className={`item ${location.pathname === "/blood-donation-request/request-list" ? "active" : ""}`}
      >
        <div className="col">
        <ion-icon name="person"></ion-icon>
          <strong className="mt-1">Account</strong>
        </div>
      </Link>

     
    </div>
  );
};

export default Footer;

