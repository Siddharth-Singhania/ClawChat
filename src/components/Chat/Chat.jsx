import React, { useEffect, useRef, useState } from 'react'
import './Chat.css'
import EmojiPicker from 'emoji-picker-react'
import img_chat from '../../assets/img_chat.jpg'

function Chat() {
  const[emoji,setEmoji] = useState(false);
  const [text,setText] = useState("");
  const endref = useRef(null)

  useEffect(()=>{
    endref.current?.scrollIntoView({behavior:"instant"})
  },[])

  function handleEmoji(e){
    setText(prev=>prev+e.emoji);
  }

  return (
    <div className='chat'>
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="chat-texts">
            <span>Tony Stark</span>
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
      <div className="message">
          <img className="chat-dp" src="./avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum reprehenderit eligendi quisquam molestias ex qui obcaecati inventore dolorem ad aliquid nulla nam ducimus, odit quibusdam veritatis quasi, reiciendis cum voluptates.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts own">
            <img src={img_chat} alt="" />
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img className="chat-dp" src="./avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum reprehenderit eligendi quisquam molestias ex qui obcaecati inventore dolorem ad aliquid nulla nam ducimus, odit quibusdam veritatis quasi, reiciendis cum voluptates.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts own">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum reprehenderit eligendi quisquam molestias ex qui obcaecati inventore dolorem ad aliquid nulla nam ducimus, odit quibusdam veritatis quasi, reiciendis cum voluptates.</p>
            <span>1 min ago</span>
          </div>
        </div>
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
        <button className='sendButton'>Send</button>
      </div>
    </div>
  )
}

export default Chat