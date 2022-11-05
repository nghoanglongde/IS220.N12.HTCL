import React from 'react'

function Pin({ pinSize, data_img }) {
  return (
    <div className={`pin ${pinSize}`}>
        <img className="mainPic" src={`${data_img}`} alt=""/>
    
        <div className="content">
            <h3>sample</h3>

            <div className="search">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Search_icon.svg/1024px-Search_icon.svg.png"
            alt=""  />
          </div>
        </div>
    </div>
  )
}

export default Pin
