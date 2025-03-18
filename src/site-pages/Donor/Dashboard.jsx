import React, { useState } from "react";
import userImg from "../../site-components/common/assets/img/user.png";
import Slider from "../../site-components/Donor/components/Slider";
import Footer from "../../site-components/Donor/components/Footer";
import { useDonor } from "../../site-components/Donor/ContextApi/DonorContext";
import { Link } from "react-router-dom";
import ImageF from "../../site-components/common/assets/img/dash-1.png";
import ImageS from "../../site-components/common/assets/img/dash-2.png";
import ImageT from "../../site-components/common/assets/img/dash-3.png";
import ImageFourth from "../../site-components/common/assets/img/dash-4.png";
const Dashboard = () => {
  const { donor } = useDonor();
  console.log(donor);
  return (
    <>
      <div className="appHeader border-0">
        <div className="left">
          <img src={userImg} alt="User" className="imaged w32" />
        </div>
        <div className="right">
          <Slider />{" "}
        </div>
      </div>

      <div id="appCapsule">
        <section className="section px-2  pb-2 mb-1">
          <div
            className="card"
            style={{
              backgroundColor: "white",
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 1px 2px, rgba(0, 0, 0, 0.1) 0px 4px 16px",
            }}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between ">
                <div>
                  <h6 className="card-subtitle">USER ID</h6>
                  <h6 className="card-title">{donor?.uniqueId}</h6>
                </div>

                <div className="blood-drop">{donor?.bloodGroup}</div>
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-6">
              <div
                className="card"
                style={{ boxShadow: "rgb(232 221 221 / 12%) 0px 4px 8px, rgb(0 0 0 / 11%) 0px 4px 16px"}}
              >
                <div className="mx-auto text-center py-1">
                  <Link to="/blood-donation-request/request-list"> 
                  <img src={ImageT} alt="" className="id-dash-b-img" />
                  <h4 className="mt-1">Request for Blood</h4>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div
                className="card"
                style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.1)",}}
              >
                <div className="mx-auto text-center py-1">
                  <Link to="/blood-donation/list"> 
                  <img src={ImageS} alt="" className="id-dash-b-img" />
                  <h4 className="mt-1">Donate</h4>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-6 mt-2">
              <div
                className="card"
                style={{ boxShadow: "rgb(232 221 221 / 12%) 0px 4px 8px, rgb(0 0 0 / 11%) 0px 4px 16px"}}
              >
                <div className="mx-auto text-center py-1">
                  <Link to="/blood-donation-request/request-list"> 
                  <img src={ImageF} alt="" className="id-dash-b-img" />
                  <h4 className="mt-1">Blood Request List</h4>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-6 mt-2">
              <div
                className="card"
                style={{ boxShadow: "rgb(232 221 221 / 12%) 0px 4px 8px, rgb(0 0 0 / 11%) 0px 4px 16px"}}
              >
                <div className="mx-auto text-center py-1">
                  <Link to="/blood-donation/history"> 
                  <img src={ImageFourth} alt="" className="id-dash-b-img" />
                  <h4 className="mt-1">History</h4>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Dashboard;
