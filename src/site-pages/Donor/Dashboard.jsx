import React, { useState } from "react";
import userImg from "../../site-components/common/assets/img/user.png";
import Slider from "../../site-components/Donor/components/Slider";

const Dashboard = () => {
  

  return (
    <>
      <div className="appHeader border-0">
        <div className="left">
          <img src={userImg} alt="User" className="imaged w32" />
        </div>
        <div className="right">
        <Slider/>        </div>
      </div>

    
    </>
  );
};

export default Dashboard;
