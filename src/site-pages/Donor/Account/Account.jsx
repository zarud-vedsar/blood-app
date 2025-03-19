import React from "react";
import { useState } from "react";
import { goBack } from "../../../site-components/Helper/HelperFunction";
import { useDonor } from "../../../site-components/Donor/ContextApi/DonorContext";
import secureLocalStorage from "react-secure-storage";
import { Link, useNavigate } from "react-router-dom";

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
  console.log(donor);

  return (
    <>
      <div className="appHeader d-flex justify-content-around align-items-center">
        <div className="left left-0">
          <a href="#" class="headerButton " onClick={goBack}>
            <ion-icon
              name="arrow-back-outline"
              role="img"
              class="md hydrated"
              aria-label="arrow back outline"
            ></ion-icon>
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
                <img
                  src="https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ="
                  alt=""
                  className="id-profile-img"
                />
                <div className="text-center my-2">
                  <h2 className="mb-0">{donor?.name}</h2>
                  <a href="mailto:admin@gmail.com">{donor?.email}</a>
                </div>
                <button className="btn btn-dark ">Edit Profile</button>
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
                    <ion-icon name="arrow-forward"></ion-icon>
                  </span>
                </Link>

                <Link
                  to={""}
                  className="id-link-item"
                >
                  <span className="icon">
                    <ion-icon name="megaphone-outline"></ion-icon>
                  </span>
                  <p className="link-text">Terms & Conditions</p>
                  <span className="arrow">
                    <ion-icon name="arrow-forward"></ion-icon>
                  </span>
                </Link>

                <Link
                  to={"/blood-donation/history"}
                  className="id-link-item"
                >
                  <span className="icon">
                    <ion-icon name="megaphone-outline"></ion-icon>
                  </span>
                  <p className="link-text">Donation History</p>
                  <span className="arrow">
                    <ion-icon name="arrow-forward"></ion-icon>
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

.id-link-item:hover .icon, 
.id-link-item:hover .arrow {
   color: #fff;
}
   .id-logout ion-icon{
       padding: 10px;
    background: #ebebeb;
    border-radius: 50%;
    font-size: 20px;
    color: #e20014;
   }

   .id-logout{
   padding: 0px 4px
   
   }

@media (max-width: 768px) {
   .id-link-wrapper {
      padding: 10px 0px;
   }

   .id-link-item {
      padding: 6px;
   }


}

        `}
        </style>
      </div>
    </>
  );
};

export default Account;
