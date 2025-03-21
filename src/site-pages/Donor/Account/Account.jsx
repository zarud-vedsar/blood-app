import React from "react";
import { useState } from "react";
import {
  capitalizeFirstLetter,
  goBack,
} from "../../../site-components/Helper/HelperFunction";
import { useDonor } from "../../../site-components/Donor/ContextApi/DonorContext";
import secureLocalStorage from "react-secure-storage";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import { IoChevronBackOutline } from "react-icons/io5";

const Account = () => {
  const { donor } = useDonor();
  const [loading, setLoading] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // Track the active dropdown
  const navigate = useNavigate();

  const logout = () => {
    secureLocalStorage.clear();
    setTimeout(() => {
      navigate("/info");
    }, 300);
  };

  return (
    <>
      <div className="appHeader d-flex justify-content-around align-items-center">
        <div className="left left-0">
          <a href="#" className="headerButton " onClick={goBack}>
            <IoChevronBackOutline />
          </a>
        </div>
        <div className="pageTitle w-75">Account</div>
        <div className="right ">{/* <Slider/> */}</div>
      </div>

      <div id="appCapsule">
        <section className="section px-2  pb-5 mb-5">
          {/* {loading && <div className="loader-fetch">Loading...</div>}
          {!loading && donationRequestList.length === 0 && (
            <p className="text-center pt-2">No data found.</p>
          )} */}
          <div className="container">
            <div className="row">
              <div className="col-12 d-flex flex-column justify-content-center align-items-center mt-3">
                <div className="id-profile-img d-flex justify-content-center align-items-center">
                  {/* Display first letter of the name */}
                  <span className="user-initial">
                    {donor?.name ? donor?.name[0].toUpperCase() : ""}
                  </span>
                </div>
                <div className="text-center my-2">
                <Link to={`/change-phone-number`} >
                {donor?.phone} <i class="fa-solid fa-pen-to-square " style={{marginLeft:"5px"}}></i> 
                </Link>
                 
                  
                </div>
                <Link to={`/edit-profile`} className="btn btn-dark">
                <i class="fa-solid fa-pen-to-square " style={{marginRight:"5px"}}></i>  Edit Profile
                </Link>
              </div>

              <div className="id-link-wrapper mt-5">
                <Link
                  to={"/blood-donation-request/add-new"}
                  className="id-link-item"
                >
                  <span className="icon">
                    <ion-icon name="megaphone-outline"></ion-icon>
                  </span>
                  <p className="link-text">Request For Blood</p>
                  <span className="arrow">
                    <FaAngleRight className="icons" />
                  </span>
                </Link>

                <Link to={"/blood-donation/history"} className="id-link-item">
                  <span className="icon">
                    <ion-icon name="megaphone-outline"></ion-icon>
                  </span>
                  <p className="link-text">Donation History</p>
                  <span className="arrow">
                    <FaAngleRight className="icons" />
                  </span>
                </Link>

                <Link to={"/terms-condition"} className="id-link-item">
                  <span className="icon">
                    <ion-icon name="megaphone-outline"></ion-icon>
                  </span>
                  <p className="link-text">Terms & Conditions</p>
                  <span className="arrow">
                    <FaAngleRight className="icons" />
                  </span>
                </Link>
              </div>

              <div className="d-flex align-items-center id-logout">
                <ion-icon name="log-out-outline"></ion-icon>
                <button
                  className="btn id-side-logout-btn px-2"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </section>
        <style>
          {`
         .id-profile-img{
         height: 115px;
         width: 115px;
         border-radius: 50%;
         }

         .id-link-item{
         display: flex;
         align-items: center;
         gap:10px;
         }

         .id-link-wrapper .id-link-item span ion-icon{
         padding: 10px;
         background-color: #00000014;
         border-radius: 50%;
         color: #e20014;
         font-size: 20px;
         }
         .id-link-item .arrow .icons{
         background: #ebebeb;
    font-size: 24px;
    padding: 5px;
    border-radius: 50%;
         }

         .id-link-right{
         margin-left: auto;
         }

         .id-link-wrapper {
             display: flex;
             flex-direction: column;
             gap: 5px;
             padding: 20px;
}

.id-link-item {
   display: flex;
   align-items: center;
   justify-content: space-between;
   border-radius: 8px;
   transition: all 0.3s ease;
   text-decoration: none;
   color: #333;
}

.link-text {
   flex: 1;
   font-size: 16px;
   font-weight: 600;
   margin-bottom: 8px;
}


   .id-logout ion-icon{
    padding: 10px;
    background: #ebebeb;
    border-radius: 50%;
    font-size: 20px;
    color: #e20014;
   }

   .id-logout{
   padding: 0px 25px
   
   }

   .id-link-item {
      padding: 6px;
   }

      .id-profile-img {
 width: 100px;
    height: 100px;
    background-color: #cb848a61;
    border-radius: 50%;
    color: #282828;
    font-size: 86px;
    font-weight: bold;
    border: 1px solid #28282842;
}
.user-initial {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

}
        `}
        </style>
      </div>
    </>
  );
};

export default Account;
