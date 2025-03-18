import React from 'react'
import { IoChevronBack } from "react-icons/io5";
import { IoChevronBackCircle } from "react-icons/io5";
import { MdArrowBackIos } from "react-icons/md";

const HeaderWithBack = ({title}) => {
  const goBack=()=>{
    window.history.back();
  }
  return (
    <>
    <div class="appHeader">
        <div class="">
            <a href="#" class="headerButton " onClick={goBack}>
            {/* <IoChevronBack className='id-back-icon' /> */}
            {/* <IoChevronBackCircle className='id-back-icon' /> */}
            <MdArrowBackIos className='id-back-icon'/>
            </a>
        </div>
        
        <div class="pageTitle w-75">
            {title}
        </div>
        
    </div>
    </>
  )
}

export default HeaderWithBack;
