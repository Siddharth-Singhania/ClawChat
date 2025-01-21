import React from 'react'
import './Detail.css'
import img_chat from '../../assets/img_chat.jpg'
import { useAuthContext } from '../../context/AuthContext.jsx'
import { toast } from 'react-toastify'
import useConversation from '../../zustand/useConversation'
import axios from 'axios'


const apiUrl = import.meta.env.VITE_API_URL
function Detail() {
   const {setAuthUser} = useAuthContext();
   const {selectedConversation,messages,setSelectedConversation,setMessages} = useConversation();
  async function handleLogout(){
    try {
      const response = await axios.post(`${apiUrl}/user/logout`,{}, { withCredentials: true });
      localStorage.removeItem("chat-user");
      setAuthUser(null);
      setMessages([]);
      setSelectedConversation(null)
      console.log("Logout successfully:\n", response.data);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout Error:\n", error?.response?.data || error.message);
      toast.error("Logout failed! Please try again.");
    }
  }

  return (
    <>{selectedConversation === null? <div className='btn-logout'><button className='logout' onClick={()=>handleLogout()}>LogOut</button></div>:
    <div className='detail'>
      <div className="user">
          <img className='user-img' src={selectedConversation.avatar} alt="" />
          <div className="chat-texts">
            <span>{selectedConversation.username}</span>
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
       <button className='logout' onClick={()=>handleLogout()}>LogOut</button>  
      </div>
    </div>}
    </>
  )
}

export default Detail;