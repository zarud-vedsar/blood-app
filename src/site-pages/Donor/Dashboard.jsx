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
import ImageFifth from "../../site-components/common/assets/img/dash-5.png";
import BannerImg from "../../site-components/common/assets/img/banner-img.avif";
import { capitalizeFirstLetter } from "../../site-components/Helper/HelperFunction";
const Dashboard = () => {
  const { donor } = useDonor();

  const images = [BannerImg, BannerImg, BannerImg]; // Array of image paths
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };
  

  console.log(donor);

  return (
    <>
      <div className="appHeader border-0">
        <div className="left d-flex align-items-center">
          <Link to={'/account'}>
          <img src={userImg} alt="User" className="imaged w32 id-header-user-img" />
          </Link>
          
          <h4 className="text-white mb-0 fw-600">{`Welcome, ${capitalizeFirstLetter(donor?.name)}`}</h4>
        </div>
        <div className="right">

          {/* <Slider />{" "} */}
        </div>
      </div>

      <div id="appCapsule">
      <div className="id-dash-top-color"></div>
        <section className="section px-2  pb-2 mb-1">
          <div className="card"
            style={{
              backgroundColor: "white",
              boxShadow: "rgb(0 0 0 / 6%) 0px 1px 2px, rgb(0 0 0 / 8%) 0px 4px 16px",
                marginTop: "-49px",
            }} >
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

          <div className="slider-container">
      <div className="slider">
        <img
          src={images[currentIndex]}
          alt={`Slider Image ${currentIndex + 1}`}
          className="img-fluid id-dash-banner-img"
        />
      </div>
    </div>

          {/* <div>
            <img src={BannerImg} alt=""  className="img-fluid id-dash-banner-img"/>
          </div> */}

          <div className="row mt-2">
            <div className="col-6">
              <div
                className="card"
                style={{ boxShadow: "rgb(0 0 0 / 6%) 0px 4px 8px, rgb(0 0 0 / 10%) 0px 4px 16px"}}
              >
                <div className="mx-auto text-center py-1">
                  <Link to="/blood-donation-request/add-new"> 
                  <img src={ImageF} alt="" className="id-dash-b-img" />
                  <h4 className="mt-1 fw-600">Request for Blood</h4>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div
                className="card"
                style={{ boxShadow: "rgb(0 0 0 / 6%) 0px 4px 8px, rgb(0 0 0 / 10%) 0px 4px 16px",}}
              >
                <div className="mx-auto text-center py-1">
                  <Link to="/blood-donation/list"> 
                  <img src={ImageFifth} alt="" className="id-dash-b-img" />
                  <h4 className="mt-1 fw-600">Donate</h4>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-6 mt-2">
              <div
                className="card"
                style={{ boxShadow: "rgb(0 0 0 / 6%) 0px 4px 8px, rgb(0 0 0 / 10%) 0px 4px 16px"}}
              >
                <div className="mx-auto text-center py-1">
                  <Link to="/blood-donation-request/request-list"> 
                  <img src={ImageT} alt="" className="id-dash-b-img" />
                  <h4 className="mt-1 fw-600">Blood Request List</h4>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-6 mt-2">
              <div
                className="card"
                style={{ boxShadow: "rgb(0 0 0 / 6%) 0px 4px 8px, rgb(0 0 0 / 10%) 0px 4px 16px"}}
              >
                <div className="mx-auto text-center py-1">
                  <Link to="/blood-donation/history"> 
                  <img src={ImageFourth} alt="" className="id-dash-b-img" />
                  <h4 className="mt-1 fw-600">History</h4>
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
