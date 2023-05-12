import React, { useState, useEffect, useRef } from 'react';
import MessagesSidebar from '../components/messages/MessagesSidebar';
import MessagesHeader from '../components/messages/MessagesHeader';
import MessagesBody from '../components/messages/MessagesBody';
import MessagesFooter from '../components/messages/MessagesFooter';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import {   getDataWithoutDocId,
   saveData,
   saveDataWithoutDocId, } from '../functions/functions';
import { and,or, where } from 'firebase/firestore';
import Header from '../components/Header/Header';
import { setChatMessages, setReceiverID } from '../redux/data.slice';
   

function Messages() {
   const contentArea = useRef(null);

   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [msgSidebarOpen, setMsgSidebarOpen] = useState(true);
   const { darkMode } = useSelector((state) => state.globals);
   const { receiverId } = useSelector((state) => state.allData);
   const { chatMessages } = useSelector((state) => state.allData);
   const [chatId, setchatId] = useState("")
const dispatch=useDispatch()
   const [selectedUser, setSelectedUser] = useState();
  //  let {  chatId } = useParams();
  const [chats, setChats] = useState([]);
  const [textMessage, setTextMessage] = useState("");
  const getAllUsers = () => {
    getDataWithoutDocId("users").then((result) => {

      const allUsers = [];
      result.forEach((doc) => {
        const { email, lastMessage } = doc.data();
        allUsers.push({
          id: doc.id,
          name: email,
          lastMessage: lastMessage || "Start Conversation!",
        });
      });
      setChats(allUsers);
    });
  };
console.log("chat id",chatId)
const getChatForReceiverId = () => {
  getDataWithoutDocId(
    "chats",
    or(
      where("chatId", "==",  localStorage.getItem("uid")+receiverId),
      where("chatId", "==",  receiverId+localStorage.getItem("uid")),
    )
  ).then((result) => {
    const allUsers = [];
    result.forEach((doc) => {
      const data = doc.data();
      console.log("This is the result of chats", data);
      if (chatId) {
        console.log("chatID",chatId)
        if(doc.id.includes(chatId))
        {
            setChatMessages(data.chatMessages);
        }
      } else {
          window.location.href = window.location.href =
            "/chat/" + receiverId + "/" + doc.id;
      }
    });
    console.log("Thse is the all users", allUsers);
    // setChats(allUsers);
  });
};

  useEffect(() => {
    getAllUsers();

    if (receiverId) {
      getChatForReceiverId();
    }
  }, [receiverId]);
 
  const sendMessage = (e) => {
    e.preventDefault()
    if (textMessage === "") {
       alert("Cannot send Empty Message");
       return;
    }
 
    const newMessage = {
       receiverId: receiverId,
       senderId: localStorage.getItem("uid"),
       message: textMessage,
    };

    dispatch(setChatMessages([...chatMessages, newMessage]));

    if (chatId) {
   
       saveData("chats", chatId, {
          chatMessages: [...chatMessages, newMessage],
          chatUser1: receiverId,
          chatUser2: localStorage.getItem("uid"),
       });
    } else {
       saveDataWithoutDocId("chats", {
          chatMessages: [...chatMessages, newMessage],
          chatId: localStorage.getItem("uid")+receiverId,
       }).then((res) => {
          console.log("This is the res", res._key.path.segments[1]);
          dispatch(setReceiverID(receiverId));
          window.history.pushState(null, null, `/chat/${receiverId}/${res._key.path.segments[1]}`);
       });
    }
 
    // Clear textMessage state
    setTextMessage("");
 
    contentArea.current.scrollTop = contentArea.current.scrollHeight;
 };
 

   useEffect(() => {
      contentArea.current.scrollTop = 99999999;
   }, [msgSidebarOpen]); // automatically scroll the chat and make the most recent message visible



   const selectConversation = (userId) => {
  
    // dispatch(setChatMessages(""))
      setSelectedUser(userId);
      dispatch(setReceiverID(userId))
 

   };
 
   return (
      <div className={`flex h-screen overflow-hidden ${darkMode ? 'bg-slate-900' : ''}`}>
         <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden" ref={contentArea}>
            {/*  Site header */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <main>
               <div className="relative flex">
                  {/* Messages sidebar */}
                  <MessagesSidebar
               chats={chats}
                     msgSidebarOpen={msgSidebarOpen}
                     setMsgSidebarOpen={setMsgSidebarOpen}
                     selectConversation={selectConversation}
                   
                  />

                  {/* Messages body */}
                  <div
                     className={`grow flex flex-col md:translate-x-0 transform transition-transform duration-300 ease-in-out ${
                        msgSidebarOpen ? 'translate-x-1/3' : 'translate-x-0'
                     }`}
                  >
                     <MessagesHeader msgSidebarOpen={msgSidebarOpen} setMsgSidebarOpen={setMsgSidebarOpen} />
                     {selectedUser && <MessagesBody   selectedUser={selectedUser} />}
                     {selectedUser && <MessagesFooter sendMessage={ sendMessage} setTextMessage={setTextMessage} textMessage={textMessage}/>}
                  </div>
               </div>
            </main>
         </div>
      </div>
   );
}

export default Messages;
