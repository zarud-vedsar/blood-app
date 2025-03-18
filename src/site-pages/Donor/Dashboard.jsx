import React, { useState } from "react";
import userImg from "../../site-components/common/assets/img/user.png";
import Slider from "../../site-components/Donor/components/Slider";
import Footer from "../../site-components/Donor/components/Footer";
import { useDonor } from "../../site-components/Donor/ContextApi/DonorContext";
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
          <div className="card" style={{ backgroundColor: "#eae7e7" }}>
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
              <div className="card" style={{ backgroundColor: "#eae7e7" }}>
                <div className="card-body mx-auto">
                  
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
