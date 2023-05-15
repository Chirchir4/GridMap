import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import User01 from '../../images/user-32-01.jpg';
import User02 from '../../images/user-32-07.jpg';

function MessagesHeader({ msgSidebarOpen, setMsgSidebarOpen, selectedUser }) {
   const { chats, users } = useSelector((state) => state.allData);
   const [currentUser, setCurrentUser] = useState();
   useEffect(() => {
      console.log('selectedUser', selectedUser);
      console.log('Users', users);
      if (selectedUser) {
         const user = users.find((user) => user.userId === selectedUser);
         console.log('user', user);
         setCurrentUser(user);
      }
   }, [selectedUser]);
   return (
      <div className="sticky top-16">
         <div className="flex items-center justify-between bg-white border-b border-slate-200 px-4 sm:px-6 md:px-5 h-16">
            {/* People */}
            <div className="flex items-center">
               {/* Close button */}
               <button
                  className="md:hidden text-slate-400 hover:text-slate-500 mr-4"
                  onClick={() => setMsgSidebarOpen(!msgSidebarOpen)}
                  aria-controls="messages-sidebar"
                  aria-expanded={msgSidebarOpen}
               >
                  <span className="sr-only">Close sidebar</span>
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                     <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
                  </svg>
               </button>
               {/* People list */}
               <div className="flex -space-x-3 -ml-px">
                  <a className="block" href="#0">
                     <div
                        style={{
                           width: '32px',
                           height: '32px',
                           borderRadius: '50%',
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center',
                           color: '#fff'
                        }}
                        className="bg-indigo-500"
                     >
                        {currentUser && currentUser.username[0].toUpperCase()}
                     </div>
                  </a>
                  <a className="block" href="#0">
                     <div
                        style={{
                           width: '32px',
                           height: '32px',
                           borderRadius: '50%',
                           backgroundColor: '#3cc351',
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center',
                           color: '#fff'
                        }}
                     >
                        Me
                     </div>
                  </a>
               </div>
            </div>
         </div>
      </div>
   );
}

export default MessagesHeader;
