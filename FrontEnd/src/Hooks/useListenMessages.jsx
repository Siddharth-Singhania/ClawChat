import { useEffect } from "react";
import {useSocketContext} from "../context/socketContext.jsx"
import useConversation from "../zustand/useConversation.jsx";

const useListenMessages = ()=>{
    const {socket} = useSocketContext();
    const {messages,setMessages} = useConversation();

    useEffect(()=>{

        socket?.on("newMessage",(newMessage)=>{
            setMessages([...messages,newMessage])
        });
        return ()=>socket?.off("newMessage");
    },[socket,setMessages,messages])
}

export default useListenMessages;
