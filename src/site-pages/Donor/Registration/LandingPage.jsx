import React, { useEffect } from "react";
import pwd from "../../../site-components/common/assets/img/patient-doctor.jpg";
import { Link, useNavigate } from "react-router-dom";
import IsDonorLoggedIn from "../IsDonorLoggedIn";
const LandingPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (IsDonorLoggedIn()) {
      navigate('/dashboard');
    }
  }, []);

  return (
    <>
      <div className="body">
        <div
          className="upper-section flex justify-content-center align-items-center"
          style={{}}
        >
          <img src={pwd} alt="" className="am-ctm-img" />
        </div>
        <div className="lower-section  mx-auto px-2 py-4">
          <div className="mx-auto px-2">
            <h1>Give Blood, Give Hope. Your donation saves lives!</h1>
            <span>
              This combination creates an impactful and motivational splash
              screen to encourage users to donate blood.
            </span>
          </div>
          <div>
            <Link className="btn am-ctm-btn mt-2 " to="/register">
              Register
            </Link>
            
          </div>
          <div className="mt-1">
            Already register ? <Link to="/login"> Login</Link>
            
          </div>
        </div>
      </div>

      <style jsx>{`
        :root {
          --am-primary-red: #e20014;
          --am-primary-white: rgb(255, 255, 255);
        }
        .body {
        
          text-align: center;
          height:100vh;
          widht:100vw;
                              background: var(--am-primary-red);

        }
        .upper-section {
                    background: var(--am-primary-red);

        }
        .lower-section {
          background: var(--am-primary-white);
          border-radius: 30px 30px 0px 0px;
          position:absolute;
          bottom:0px;
        }
        .am-ctm-btn {

          width: 100% !important;
          padding: 20px;
          background: var(--am-primary-red);
          color: var(--am-primary-white);
        }
          .am-ctm-img{
 width: 80%;
  margin-top:10%;
  border-radius:60% 60% 60% 0px;
      `}</style>
    </>
  );
};

export default LandingPage;
