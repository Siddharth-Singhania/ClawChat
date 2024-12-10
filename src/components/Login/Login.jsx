import React, { useState } from 'react'
import './Login.css'
import { toast } from 'react-toastify'

function Login() {
    const [avatar,setAvatar] = useState({
        file:null,
        url:""
    })

    function handleAvatar(e){
        console.log(e.target.files)
        if(e.target.files[0]){
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    function handleLogin(e){
        e.preventDefault();
    }
    return (
        <div className="login">
            <div className='item'>
                <h2>Welcome back</h2>
                <form onSubmit={handleLogin}> 
                    <input type='text' placeholder='Email' name='email'/>
                    <input type='password' placeholder='Password' name='password'/>
                    <button>Sign In</button>
                </form>
            </div>
            <div className='separator'></div>
            <div className='item'>
            <h2>Create An account</h2>
                <form>
                    <label htmlFor='file'>
                        <img src={avatar.url || "avatar.png"} alt="" />
                        Upload an image</label>
                    <input type="file" id='file' style={{display:"none"}} onChange={handleAvatar}/>
                    <input type='text' placeholder='Username' name='username'/>
                    <input type='text' placeholder='Email' name='email'/>
                    <input type='password' placeholder='Password' name='password'/>
                    <button>Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default Login;