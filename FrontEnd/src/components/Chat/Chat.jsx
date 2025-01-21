import React, { useEffect, useRef, useState } from 'react'
import './Chat.css'
import EmojiPicker from 'emoji-picker-react'
import useConversation from '../../zustand/useConversation'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useAuthContext } from '../../context/AuthContext.jsx'
import useListenMessages from '../../Hooks/useListenMessages.jsx'

function Chat() {
  useListenMessages();
  const apiUrl = import.meta.env.VITE_API_URL
  const[emoji,setEmoji] = useState(false);
  const [text,setText] = useState("");
  const endref = useRef(null)
  const {selectedConversation,messages,setMessages} = useConversation();
  const {authUser} = useAuthContext();

  async function getConvo(){
    await axios.get(`${apiUrl}/conversation/user/${selectedConversation.username}`,{withCredentials:true})
      .then((response)=>{
          setMessages(response.data.data)
      })
      .catch((error)=>{ 
          toast.error("Error while Fetching Conversation!!!")
          console.log(error.message);
      })
  }

  useEffect(()=>{
    if(selectedConversation) endref.current?.scrollIntoView({behavior:"instant"})
  },[messages])

  useEffect(()=>{
    if(selectedConversation) getConvo();
  },[selectedConversation,setMessages])

  
  function handleEmoji(e){
    setText(prev=>prev+e.emoji);
  }

  async function handleSendMessage(){
    if(text === "") return;
    await axios.post(`${apiUrl}/message/send/${selectedConversation.username}`,{message:text},{withCredentials:true})
    .then((response)=>{
      //console.log(response.data.data)
      const newMessage = {
        _id: response.data.data._id,
        senderId: response.data.data.senderId,
        receiverId: response.data.data.receiverId,
        message: response.data.data.message,
        timestamp: new Date().toISOString(),
      }
      setMessages([...messages,newMessage])
      setText("");
      
    })
    .catch((error)=>{
      setText("");
      console.log(error)
      toast.error("Message was Not sent!!!")
    })
  }

  return (
    <>{selectedConversation === null? <div></div>:
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={selectedConversation.avatar} alt="" />
          <div className="chat-texts">
            <span>{selectedConversation.username}</span>
            <p>Lorem ipsum dolor .</p>
          </div>
        </div>
        <div className="chat-icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center" onClick={()=>setEmoji(false)}>
        {messages.map((chat) => {
          return chat.senderId !== authUser.data.user._id ? (
            <div className="message" key={chat._id}>
              <img className="chat-dp" src={selectedConversation.avatar} alt="Avatar" />
              <div className="texts">
                <p>{chat.message}</p>
                <span>1 min ago</span>
              </div>
            </div>
            
          ) : (
            <div className="message own" key={chat._id}>
              <div className="texts own">
                <p>{chat.message}</p>
                <span>1 min ago</span>
              </div>
            </div>
          );
        })}
        <div ref={endref}></div>
      </div>
      <div className="bottom">
        <div className="chat-icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input type="text" placeholder='Type a message...' onChange={(e)=>setText(e.target.value)} value={text}/>
        <div className="emoji">
          <img src="./emoji.png" onClick={()=>setEmoji(!emoji)}/>
          <div className="picker">
            <EmojiPicker open={emoji} onEmojiClick={handleEmoji}/>
          </div>
        </div>
        <button className='sendButton' onClick={()=>handleSendMessage()}>Send</button>
      </div>
    </div>}
    </>
  )
}

export default Chat