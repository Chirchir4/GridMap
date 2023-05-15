import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';

import User01 from '../../images/user-40-11.jpg';
import User02 from '../../images/user-40-12.jpg';

import ChatImage from '../../images/chat-image.jpg';
import { auth } from '../../functions/firebase';
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

const getFormattedDate = () => {
   const today = moment();
   const formattedDate = today.format('dddd, D MMMM');
   return formattedDate;
};

function MessagesBody({ messages, selectedUser }) {
   const [currentUser, setCurrentUser] = useState();
   const { darkMode } = useSelector((state) => state.globals);
   const { chats, users } = useSelector((state) => state.allData);

   useEffect(() => {
      console.log('selectedUser', selectedUser);
      console.log('Users', users);
      if (selectedUser) {
         const user = users.find((user) => user.userId === selectedUser);
         console.log('user', user);
         setCurrentUser(user);
      }
   }, [selectedUser]);
   const mapMessages = () => {
      return messages[0]?.chats.map((message) => {
         return (
            <div className="flex items-start mb-4 last:mb-0">
               {message.senderId === auth.currentUser.uid ? (
                  <div
                     style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: '#3cc351',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        marginRight: '15px'
                     }}
                  >
                     Me
                  </div>
               ) : (
                  <div
                     style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        marginRight: '15px'
                     }}
                     className="bg-indigo-500"
                  >
                     {currentUser && currentUser.username[0].toUpperCase()}
                  </div>
               )}
               <div>
                  <div
                     className={`${
                        message.senderId === auth.currentUser.uid
                           ? 'text-sm bg-white text-slate-800 p-3 rounded-lg rounded-tl-none border border-slate-200 shadow-md mb-1'
                           : 'text-sm bg-indigo-500 text-white p-3 rounded-lg rounded-tl-none border border-transparent shadow-md mb-1'
                     } `}
                  >
                     {message.message}
                  </div>
                  <div className="flex items-center justify-between">
                     <div className="text-xs text-slate-500 font-medium">{convertTimestampToTime(message.time)}</div>
                  </div>
               </div>
            </div>
         );
      });
   };

   return (
      <div className={`grow px-4 sm:px-6 md:px-5 py-6 ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
         {mapMessages()}
         {/* Date separator */}
         <div className="flex justify-center">
            <div className="inline-flex items-center justify-center text-xs font-medium px-2.5 py-1 bg-white border border-slate-200 rounded-full my-5">
               {getFormattedDate()}
            </div>
         </div>
      </div>
   );
}

export default MessagesBody;
