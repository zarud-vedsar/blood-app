import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="appBottomMenu">
      <Link to="/dashboard" className="item" id="home-link">
        <div className="col">
          <ion-icon name="home-outline"></ion-icon>
          <strong className="mt-1">Home</strong>
        </div>
      </Link>

      <Link to="/blood-donation/list" className="item">
        <div className="col">
          <ion-icon name="fitness-outline"></ion-icon>
          <strong className="mt-1">Donate</strong>
        </div>
      </Link>

      <Link to="/blood-donation-request/request-list" className="item">
        <div className="col">
          <ion-icon name="megaphone-outline"></ion-icon>
          <strong className="mt-1">Request for blood</strong>
        </div>
      </Link>
      <Link to="/blood-donation/history" className="item">
        <div className="col">
          <ion-icon name="swap-horizontal-outline"></ion-icon>
          <strong className="mt-1">History</strong>
        </div>
      </Link>
    </div>
  );
};

export default Footer;
