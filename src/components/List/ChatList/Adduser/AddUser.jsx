import React from 'react'
import './AddUser.css'


function AddUser() {
  return (
    <div className='adduser'>
        <form>
            <input type="text" placeholder='username' name='username' />
            <button>Search</button>
        </form>
        <div className="user">
            <div className="detail">
                <img src="./avatar.png" alt="" />
                <span>Jane Doe</span>
            </div>
            <button>Add User</button>
        </div>
    </div>
    
  )
}

export default AddUser