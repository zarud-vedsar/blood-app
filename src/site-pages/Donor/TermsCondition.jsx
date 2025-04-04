import React from 'react'
import { goBack } from "../../site-components/Helper/HelperFunction";
import { IoChevronBackOutline } from "react-icons/io5";
import DataNotFound from '../../site-components/common/assets/img/data-not-found.png';

const TermsCondition = () => {
  return (
    <>
    <div className="appHeader d-flex justify-content-around align-items-center">
        <div className="left left-0">
        <a href="#" className="headerButton " onClick={goBack}>
        <IoChevronBackOutline />
            </a>
        </div>
        <div className="pageTitle w-75">Terms & Condition</div>
        <div className="right ">
          {/* <Slider/> */}
        </div>
      </div>

      <div id="appCapsule">
        <section className="section px-2  pb-5 mb-5">
            <img src={DataNotFound} alt="" className="img-fluid" />
        </section>
      </div>
    
    </>
  )
}

export default TermsCondition