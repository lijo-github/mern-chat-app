import React, { useEffect } from 'react'
import {useSocketContext} from '../context/socketContext.jsx';
import useConversation from '../zustand/useConversation.js';
import notificationSound from '../assets/sounds/sounds_notification.mp3';

const useListenMessages = () => {
  const {socket} = useSocketContext();
  const {messages, setMessages} = useConversation();

  useEffect (() =>{
    socket?.on("newMessage",(newMessage) =>{
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      setMessages([...messages, newMessage]);
    });
  },[socket, setMessages, messages])
}

export default useListenMessages
