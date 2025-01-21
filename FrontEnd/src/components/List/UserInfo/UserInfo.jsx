import React from 'react'
import './UserInfo.css'

function UserInfo() {
  const userdata = JSON.parse(localStorage.getItem('chat-user'))
  const user = userdata.data.user
  return (
    <div  className='user-info'>
        <div className="user">
            <img src={user.avatar}/>
            <h2>{user.fullName}</h2>
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