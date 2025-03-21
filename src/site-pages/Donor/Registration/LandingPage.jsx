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
        <div className="lower-section  mx-auto">
          <div className="mx-auto px-2">
            <h1>Give Blood, Give Hope. Your donation saves lives!</h1>
            <span className="mt-1"> 
              This combination creates an impactful and motivational splash
              screen to encourage users to donate blood.
            </span>
          </div>
          <div className="mb-2">
            <Link className="btn am-ctm-btn mt-2 id-btn" to="/register">
             Get Started
            </Link>
            
          </div>
          <div className="mt-1 fw-600">
            Already registered? <Link to="/login" style={{color:"#0d6efd", fontWeight:"700" }}> Login</Link>
            
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
          height: 657px;
          widht:100vw;
                              background: var(--am-primary-red);

        }
        .upper-section {
                    background: var(--am-primary-red);

        }
        .lower-section {
          background: var(--am-primary-white);
          border-radius: 30px 30px 0px 0px;
          position:fixed;

          bottom:0px;
          padding: 23px;
        }
        .am-ctm-btn {

          width: 100% !important;
          padding: 20px;
          background: var(--am-primary-red);
          color: var(--am-primary-white);
          font-weight: 600;
        }
          .am-ctm-img{
 width: 80%;
  margin-top:10%;
  border-radius:60% 60% 60% 0px;
      }

      .id-btn:hover{
        color: white;
      
      }
      `}</style>
    </>
  );
};

export default LandingPage;
