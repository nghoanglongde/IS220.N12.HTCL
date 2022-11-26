import React from 'react'

function Pin({ pinSize, data_img }) {
  return (
    <div className={`pin ${pinSize}`}>
        <img className="mainPic" src={`${data_img}`} alt=""/>
    
        <div className="content">
            <h3>sample</h3>

            <div className="search">
            <img src="https://img.icons8.com/fluency-systems-regular/512/clone-figure.png"
            alt=""  />
          </div>
        </div>
    </div>
  )
}

export default Pin
