import React from 'react';
import { useSelector } from 'react-redux';
import { auth } from '../../functions/firebase';

import UserImage01 from '../../assets/images/user-32-01.jpg';
import UserImage02 from '../../assets/images/user-32-02.jpg';
import UserImage03 from '../../assets/images/user-32-03.jpg';
import UserImage04 from '../../assets/images/user-32-04.jpg';
import UserImage05 from '../../assets/images/user-32-05.jpg';
import UserImage06 from '../../assets/images/user-32-06.jpg';

function DirectMessages({ setMsgSidebarOpen, selectConversation, messages }) {
   const { darkMode } = useSelector((state) => state.globals);
   const { chats, users } = useSelector((state) => state.allData);

   const renderAllConversations = () => {
      return users.map((user) => {
         const userMessages = chats.filter((conversation) => conversation.user1 === user.userId || conversation.user2 === user.userId);
         const unreadMessages = userMessages[0]?.chats?.filter((message) => message.senderId !== auth.currentUser.uid && !message.isRead).length;
         return (
            <li className="-mx-2" key={user.userId} onClick={() => selectConversation(user.userId)}>
               <button className="flex items-center justify-between w-full p-2 rounded" onClick={() => setMsgSidebarOpen(false)}>
                  <div className="flex items-center truncate">
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
                        {user.username[0].toUpperCase()}
                     </div>
                     <div className="truncate">
                        <span className={`text-sm font-medium  ${darkMode ? 'text-slate-400' : 'text-slate-800'}`}>{user.username}</span>
                     </div>
                  </div>
                  <div className="flex items-center ml-2">
                     {unreadMessages > 0 && (
                        <div className="text-xs inline-flex font-medium bg-indigo-400 text-white rounded-full text-center leading-5 px-2">
                           {unreadMessages}
                        </div>
                     )}
                  </div>
               </button>
            </li>
         );
      });
   };

   return (
      <div className="mt-4">
         <div className="text-xs font-semibold text-slate-400 uppercase mb-3">Direct messages</div>
         <ul className="mb-6">
            {renderAllConversations()}
            {/* <li className="-mx-2">
               <button className="flex items-center justify-between w-full p-2 rounded bg-indigo-100" onClick={() => setMsgSidebarOpen(false)}>
                  <div className="flex items-center truncate">
                     <img className="w-8 h-8 rounded-full mr-2" src={UserImage01} width="32" height="32" alt="User 01" />
                     <div className="truncate">
                        <span className="text-sm font-medium text-slate-800">Dominik Lamakani</span>
                     </div>
                  </div>
                  <div className="flex items-center ml-2">
                     <div className="text-xs inline-flex font-medium bg-indigo-400 text-white rounded-full text-center leading-5 px-2">2</div>
                  </div>
               </button>
            </li>
            <li className="-mx-2">
               <button className="flex items-center justify-between w-full p-2 rounded" onClick={() => setMsgSidebarOpen(false)}>
                  <div className="flex items-center truncate">
                     <img className="w-8 h-8 rounded-full mr-2" src={UserImage03} width="32" height="32" alt="User 03" />
                     <div className="truncate">
                        <span className="text-sm font-medium text-slate-800">Jerzy Wierzy</span>
                     </div>
                  </div>
                  <div className="flex items-center ml-2">
                     <img className="w-5 h-5 rounded-full shrink-0" src={UserImage03} width="20" height="20" alt="User 03" />
                  </div>
               </button>
            </li>
            <li className="-mx-2">
               <button className="flex items-center justify-between w-full p-2 rounded" onClick={() => setMsgSidebarOpen(false)}>
                  <div className="flex items-center truncate">
                     <img className="w-8 h-8 rounded-full mr-2" src={UserImage06} width="32" height="32" alt="User 06" />
                     <div className="truncate">
                        <span className="text-sm font-medium text-slate-800">Mary Roszczewski</span>
                     </div>
                  </div>
                  <div className="flex items-center ml-2">
                     <svg className="w-3 h-3 shrink-0 fill-current text-slate-400" viewBox="0 0 12 12">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                     </svg>
                  </div>
               </button>
            </li> */}
         </ul>
      </div>
   );
}

export default DirectMessages;
