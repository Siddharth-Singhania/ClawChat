import React, { useState } from 'react'
import './Login.css'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useAuthContext } from '../../context/AuthContext.jsx'

const apiUrl = import.meta.env.VITE_API_URL

function Login() {
    const {authUser,setAuthUser} = useAuthContext();
    const [avatar,setAvatar] = useState({
        file:null,
        url:""
    })

    function handleAvatar(e){
        if(e.target.files[0]){
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    async function handleLogin(e){
        e.preventDefault();
        const formData = new FormData(e.target)
        
        await axios.post(`${apiUrl}/user/login`,{
            email: formData.get('email'),
            password: formData.get('password')
        }, { withCredentials: true })
        .then(response=>{
            localStorage.setItem("chat-user", JSON.stringify(response.data));
            setAuthUser(response.data)
            console.log("Login Successfully:\n",response.data);
            toast.success("Logged in successfully")
        })
        .catch(error=>{
            console.error("Login Error:\n",error.message);
            toast.error(error?.response?.data?.message);
        })
        

        
    }

    async function handleSignup(e){
        e.preventDefault();
        const formData = new FormData(e.target)
        formData.append("avatar", avatar.file);

        axios.post(`${apiUrl}/user/signup`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true
        })
        .then(response => {
            // Handle success (e.g., show success message)
            handleLogin(e)
            console.log("Signup successful:", response.data);
            toast.success("Account created successfully!");
        })
        .catch(error => {
            // Handle error
            console.error("Signup error:", error?.response?.data?.message);
            toast.error(error?.response?.data?.message);
        });
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
                <form onSubmit={handleSignup}>
                    <label htmlFor='file'>
                        <img src={avatar.url || "avatar.png"} alt="" />
                        Upload an image</label>
                    <input type="file" id='file' style={{display:"none"}} onChange={handleAvatar}/>
                    <input type='text' placeholder='FullName' name='fullName'/>
                    <input type='text' placeholder='Gender' name='gender'/>
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