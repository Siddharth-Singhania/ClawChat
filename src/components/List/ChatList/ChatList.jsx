import React, { useState } from 'react'
import './ChatList.css'
import AddUser from './Adduser/AddUser';

function ChatList() {
    const [addMode,setAddMode] = useState(false);

  return (
    <div className='chat-list'>
        <div className="search">
            <div className="searchbar">
                <img src="./search.png" alt="" />
                <input type='search' placeholder='Search By Name'/>
            </div>
            <img src={addMode?'minus.png':'./plus.png'} className='mode' onClick={()=>setAddMode(!addMode)}/>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className="texts">
                <span>Tony stark</span>
                <p>Hello</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className="texts">
                <span>Tony stark</span>
                <p>Hello</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className="texts">
                <span>Tony stark</span>
                <p>Hello</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className="texts">
                <span>Tony stark</span>
                <p>Hello</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className="texts">
                <span>Tony stark</span>
                <p>Hello</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className="texts">
                <span>Tony stark</span>
                <p>Hello</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className="texts">
                <span>Tony stark</span>
                <p>Hello</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className="texts">
                <span>Tony stark</span>
                <p>Hello</p>
            </div>
        </div>
        <div className="item">
            <img src="./avatar.png" alt="" />
            <div className="texts">
                <span>Tony stark</span>
                <p>Hello</p>
            </div>
        </div>
        {addMode?<AddUser/>:<></>}
    </div>
  )
}

export default ChatList