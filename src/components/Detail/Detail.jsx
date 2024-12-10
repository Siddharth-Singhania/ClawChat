import React from 'react'
import './Detail.css'
import img_chat from '../../assets/img_chat.jpg'

function Detail() {
  return (
    <div className='detail'>
      <div className="user">
          <img className='user-img' src="./avatar.png" alt="" />
          <div className="chat-texts">
            <span>Tony Stark</span>
            <p>Lorem ipsum dolor .</p>
          </div>
      </div>
      <div className="info">
       <div className="option">
        <div className="title">
          <span>Chat Settings</span>
          <img className="arrow_img" src="./arrowUp.png" alt="" />
        </div>
       </div>
       <div className="option">
        <div className="title">
          <span>Privacy & Help</span>
          <img className="arrow_img" src="./arrowUp.png" alt="" />
        </div>
       </div>
       <div className="option">
        <div className="title">
          <span>Shared Photos</span>
          <img className="arrow_img"  src="./arrowUp.png" alt="" />
        </div>
        <div className="photos">
          <div className="photoItem">
            <div className="photoDetail">
              <img src={img_chat} alt="" />
              <span>photos 2024_2.png</span>
            </div>
            <img className='download_img' src="./download.png" alt="" />
          </div>
          <div className="photoItem">
            <div className="photoDetail">
              <img src={img_chat} alt="" />
              <span>photos 2024_2.png</span>
            </div>
            <img className='download_img' src="./download.png" alt="" />
          </div>
          <div className="photoItem">
            <div className="photoDetail">
              <img src={img_chat} alt="" />
              <span>photos 2024_2.png</span>
            </div>
            <img className='download_img' src="./download.png" alt="" />
          </div>
          <div className="photoItem">
            <div className="photoDetail">
              <img src={img_chat} alt="" />
              <span>photos 2024_2.png</span>
            </div>
            <img className='download_img' src="./download.png" alt="" />
          </div>
          <div className="photoItem">
            <div className="photoDetail">
              <img src={img_chat} alt="" />
              <span>photos 2024_2.png</span>
            </div>
            <img className='download_img' src="./download.png" alt="" />
          </div>
          <div className="photoItem">
            <div className="photoDetail">
              <img src={img_chat} alt="" />
              <span>photos 2024_2.png</span>
            </div>
            <img className='download_img' src="./download.png" alt="" />
          </div>
        </div>
       </div>
       <div className="option">
        <div className="title">
          <span>Shared Files</span>
          <img className='arrow_img' src="./arrowUp.png" alt="" />
        </div>
       </div>
      </div> 
      <div className='btn-details'> 
       <button className='block'>Block User</button>
       <button className='logout'>LogOut</button>  
      </div>
      
    </div>
  )
}

export default Detail;