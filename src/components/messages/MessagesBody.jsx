import React, { useEffect } from 'react';

import User01 from '../../images/user-40-11.jpg';
import User02 from '../../images/user-40-12.jpg';
import ChatImage from '../../images/chat-image.jpg';
import { useSelector } from 'react-redux';
// import { auth } from '../../firebase/firebase';
import { setMessageRead } from '../../redux/actions';

function convertTimestampToTime(timestamp) {
   const date = new Date(timestamp);
   const hours = date.getHours();
   const minutes = date.getMinutes();
   const period = hours >= 12 ? 'PM' : 'AM';
   const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
   const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
   const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;
   return formattedTime;
}

function MessagesBody({ messages, selectedUser }) {
   useEffect(() => {
      // setMessageRead(selectedUser, auth.currentUser.uid);
   }, [messages]);
   const { chatMessages } = useSelector((state) => state.allData);
  console.log("chat messages",chatMessages)
   const mapMessages = () => {
      // return messages[0]?.chats.map((message) => {
      return   chatMessages && chatMessages.map((message) => {
         return (
            <div className="flex items-start mb-4 last:mb-0">
               <img
                  className="rounded-full mr-4"
                  src={ message.senderId.includes(localStorage.getItem("uid")) ? User01 : User02}
                  width="40"
                  height="40"
                  alt="User 01"
               />
               <div>
                  <div
                     className={`${
                        message.senderId.includes(localStorage.getItem("uid")) 
                           ? 'text-sm bg-white text-slate-800 p-3 rounded-lg rounded-tl-none border border-slate-200 shadow-md mb-1'
                           : 'text-sm bg-indigo-500 text-white p-3 rounded-lg rounded-tl-none border border-transparent shadow-md mb-1'
                     } `}
                  >
                     {message.message}
                  </div>
                  {/* <div className="flex items-center justify-between">
                     <div className="text-xs text-slate-500 font-medium">{convertTimestampToTime(message.time)}</div>
                  </div> */}
               </div>
            </div>
         );
      });
   };

   return (
      <div className="grow px-4 sm:px-6 md:px-5 py-6">
         {mapMessages()}
         {/* Date separator */}
         <div className="flex justify-center">
            <div className="inline-flex items-center justify-center text-xs font-medium px-2.5 py-1 bg-white border border-slate-200 rounded-full my-5">
               Tuesday, 20 January
            </div>
         </div>
         {/* Chat msg
      <div className="flex items-start mb-4 last:mb-0">
        <img className="rounded-full mr-4" src={User01} width="40" height="40" alt="User 01" />
        <div>
          <div className="text-sm bg-white text-slate-800 p-3 rounded-lg rounded-tl-none border border-slate-200 shadow-md mb-1">
            <svg className="fill-current text-slate-400" viewBox="0 0 15 3" width="15" height="3">
              <circle cx="1.5" cy="1.5" r="1.5">
                <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.1" />
              </circle>
              <circle cx="7.5" cy="1.5" r="1.5">
                <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.2" />
              </circle>
              <circle cx="13.5" cy="1.5" r="1.5">
                <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.3" />
              </circle>
            </svg>
          </div>
        </div>
      </div> */}
      </div>
   );
}

export default MessagesBody;
