import { createContext, useEffect, useState,useContext } from "react";
import { useAuthContext } from "./AuthContext.jsx";
import io from "socket.io-client"

const SocketContext = createContext();

export const useSocketContext = ()=>{
    return useContext(SocketContext)
}

const Url = import.meta.env.BACKEND_URL

export const SocketContextProvider = ({children}) =>{
    const [socket,setSocket] = useState(null)
    const [onlineUsers,setOnlineUsers] = useState([])
    const {authUser} = useAuthContext();

    useEffect(()=>{
        if(authUser){
            const socket = io("http://localhost:8000",{
                query:{
                    userId:authUser.data.user._id,
                }
            })
            setSocket(socket)

            socket.on("getOnlineUsers",(users)=>{
                setOnlineUsers(users)
            })

            return ()=> socket.close()
        }else{
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
    },[authUser])

    return <SocketContext.Provider value={{socket,onlineUsers}}>{children}</SocketContext.Provider>
}