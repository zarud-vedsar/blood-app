import React from 'react'
import { goBack } from "../../site-components/Helper/HelperFunction";
import Slider from "../../site-components/Donor/components/Slider";
import { IoChevronBackOutline } from "react-icons/io5";

const TermsCondition = () => {
  return (
    <>
    <div className="appHeader d-flex justify-content-around align-items-center">
        <div className="left left-0">
        <a href="#" class="headerButton " onClick={goBack}>
        <IoChevronBackOutline />
            </a>
        </div>
        <div className="pageTitle w-75">Terms & Condition</div>
        <div className="right ">
          <Slider/>
        </div>
      </div>
    
    </>
  )
}

export default TermsCondition