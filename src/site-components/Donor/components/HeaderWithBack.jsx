import React from 'react'

const HeaderWithBack = ({title}) => {
  const goBack=()=>{
    window.history.back();
  }
  return (
    <>
    <div class="appHeader">
        <div class="left">
            <a href="#" class="headerButton " onClick={goBack}>
                <ion-icon name="arrow-back-outline" role="img" class="md hydrated"
                    aria-label="arrow back outline"></ion-icon>
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
