import React, { useEffect, useState } from 'react'
import './ChatList.css'
import AddUser from './Adduser/AddUser';
import axios from 'axios';
import useConversation from '../../../zustand/useConversation.jsx';
import { toast } from 'react-toastify'

function ChatList() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const {selectedConversation,setSelectedConversation,setMessages} = useConversation()
    const [addMode,setAddMode] = useState(false);
    const [conversations,setConveration] = useState([]);

    const isSelected = selectedConversation || null;
    

    useEffect(()=>{
        async function getConversation(){
        await axios.get(`${apiUrl}/conversation/allconversation`,{ withCredentials: true })
        .then((response)=>{
            setConveration(response.data.data);
        })
        .catch((error)=>{
            toast.error("Error while fetching Conversation List!!!")
            console.log(error);
        })
       } 
       getConversation()
    },[conversations])
    async function handleConversation(user){
        const username = user.username;
        await axios.get(`${apiUrl}/conversation/user/${username}`,{withCredentials:true})
        .then((response)=>{
            setSelectedConversation(user);
        })
        .catch((error)=>{ 
            toast.error("Error while Fetching Conversation,in chat!!!")
            console.log(error.message);
        })
    }

   return (
    <div className='chat-list'>
        <div className="search">
            <div className="searchbar">
                <img src="./search.png" alt="" />
                <input type='search' placeholder='Search By Name'/>
            </div>
            <img src={addMode?'minus.png':'./plus.png'} className='mode' onClick={()=>setAddMode(!addMode)}/>
        </div>
        {conversations.map((conversation)=>(
            <div key={conversation._id} className={`item ${conversation.userDetails[0]._id === isSelected?._id ? "selected": ""}`} onClick={(e)=>{handleConversation(conversation.userDetails[0])}}>
                <img src={conversation.userDetails[0].avatar} alt="" />
                <div className="texts">
                    <span>{conversation.userDetails[0].username}</span>

                </div>
            </div>
        ))}
        
        {addMode?<AddUser setAddMode={setAddMode} conversations={conversations}/>:<></>}
    </div>
  )
}

export default ChatList