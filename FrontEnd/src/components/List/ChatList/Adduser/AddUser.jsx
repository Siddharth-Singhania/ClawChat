import React, { useEffect, useState } from 'react'
import './AddUser.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import useConversation from '../../../../zustand/useConversation'

function AddUser(props) {
  const [text,setText] = useState("")
  const apiUrl = import.meta.env.VITE_API_URL
  const [found,setFound] = useState(false);
  const [searched,setsearched] = useState(false);
  const [reqUser,setReqUser] = useState({})
  const {setSelectedConversation} = useConversation();
  const [exist,setExist] = useState(false);


  async function handleAdd(){    
      await axios.post(`${apiUrl}/conversation/user/${reqUser.username}`,{}, { withCredentials: true })
      .then((response)=>{
        console.log(response.data.data.newConversation)
        toast.success("User Added!!!")
        props.setAddMode(false);
        //setSelectedConversation(response.data.data)
      })
      .catch((error)=>{
        console.log(error)
        toast.error(error.message);
        props.setAddMode(false);
      })
  }

  async function handlesearch(username){
    //setExist(false);
    await axios.get(`${apiUrl}/conversation/searchUser/${username}`, { withCredentials: true })
    .then((response)=>{
        //console.log(response.data.data)
        setReqUser(response.data.data);
        if(Object.keys(response.data.data).length !== 0){
           setFound(true);
           const fd = props.conversations.some(
            (conversation)=> conversation.userDetails[0]._id === response.data.data._id
          )
          setExist(fd);
        }else{
          setFound(false);
        }  

        setText("");

    })
    .catch((error)=>{
      toast.error(error.message);
    })
  }

  return (
    <div className='adduser'>
        <form>
            <input type="text" placeholder='username' name='username' onChange={(e)=>setText(e.target.value)} value={text}/>
            <button onClick={(e)=>{
                e.preventDefault();
                if(text !== ""){
                  setsearched(true);
                  handlesearch(text)}}}>Search</button>
        </form>
        {found === false && searched===false ? <div className='user'>Search for a new friend</div>:
        found === false && searched===true ? <div className='user'>Not Found</div>:
        <div className="user">
            <div className="detail">
                <img src={reqUser.avatar} alt="" />
                <span>{reqUser.username}</span>
            </div>
            {exist === false?
            <button onClick={()=>handleAdd()}>Add User</button>
          :<button onClick={()=>toast.success("User is Already a Friend!!")}>Already Exists</button>}
        </div>}
    </div>
    
  )
}

export default AddUser