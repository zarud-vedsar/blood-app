import React, { useState, useEffect } from "react";
import userImg from "../../site-components/common/assets/img/user.png";
import Footer from "../../site-components/Donor/components/Footer";
import { useDonor } from "../../site-components/Donor/ContextApi/DonorContext";
import { Link } from "react-router-dom";
import ImageF from "../../site-components/common/assets/img/dash-1.png";
import ImageT from "../../site-components/common/assets/img/dash-3.png";
import ImageFourth from "../../site-components/common/assets/img/dash-4.png";
import ImageFifth from "../../site-components/common/assets/img/dash-5.png";
import BannerImg from "../../site-components/common/assets/img/banner-img.avif";
import BannerImg1 from "../../site-components/common/assets/img/BloodDonation.png";
import BannerImg2 from "../../site-components/common/assets/img/bannerimg2.jpg";
import BannerImg3 from "../../site-components/common/assets/img/bannnerimg3.jpg";
import BannerImg5 from "../../site-components/common/assets/img/bannerimg5.jpg";
import { capitalizeFirstLetter } from "../../site-components/Helper/HelperFunction";
const Dashboard = () => {
  const { donor } = useDonor();

  const images = [BannerImg, BannerImg5, BannerImg1, BannerImg3, ]; // Array of image paths
  const [currentIndex, setCurrentIndex] = useState(0);

  // Next slide function
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Previous slide function
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Auto slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 3000); // 3000ms = 3 seconds for auto sliding

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);


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
      <div
        className="slider"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`, // Moves the images right to left
        }} >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slider Image ${index + 1}`}
            className={`img-fluid id-dash-banner-img ${currentIndex === index ? "shadow" : ""}`} // Add shadow to the active image
            style={{ animation: `slideRightToLeft 1s ease-in-out` }} // Apply sliding animation
          />
        ))}
      </div>
      <button onClick={goToPrevious} className="prev-btn d-none">
        &#10094;
      </button>
      <button onClick={goToNext} className="next-btn d-none">
        &#10095;
      </button>
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
                  <h4 className="mt-1 fw-600">Donation History</h4>
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
