import React from 'react'
import './UserInfo.css'

function UserInfo() {
  return (
    <div  className='user-info'>
        <div className="user">
            <img src='avatar.png'/>
            <h2>Tony Stark</h2>
        </div>
        <div className="icons">
            <img src='./more.png'/>
            <img src='./video.png'/>
            <img src='./edit.png'/>
        </div>
    </div>
  )
}

export default UserInfo