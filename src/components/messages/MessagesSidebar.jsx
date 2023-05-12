import React, { useEffect } from 'react';
import ChannelMenu from './ChannelMenu';
import DirectMessages from './DirectMessages';
import Channels from './Channels';
import { useSelector } from 'react-redux';

function MessagesSidebar({ chats,msgSidebarOpen, setMsgSidebarOpen, selectConversation, messages }) {
   const { darkMode } = useSelector((state) => state.globals);
   // const { chats, users } = useSelector((state) => state.allData);

   return (
      <div
         id="messages-sidebar"
         className={`absolute z-20 top-0 bottom-0 w-full md:w-auto md:static md:top-auto md:bottom-auto -mr-px md:translate-x-0 transform transition-transform duration-200 ease-in-out ${
            msgSidebarOpen ? 'translate-x-0' : '-translate-x-full'
         }`}
      >
         <div
            className={`sticky top-16  overflow-x-hidden overflow-y-auto no-scrollbar shrink-0 border-r  md:w-72 xl:w-80 h-[calc(100vh-64px)] ${
               darkMode ? 'bg-slate-900 border-slate-400' : 'bg-white border-slate-200'
            }`}
         >
            {/* #Marketing group */}
            <div>
               {/* Group header */}
               <div className="sticky top-0 z-10">
                  <div
                     className={`flex items-center  border-b  px-5 h-16 ${darkMode ? 'bg-slate-900 border-slate-400' : 'bg-white border-slate-200'}`}
                  >
                     <div className="w-full flex items-center justify-between"></div>
                  </div>
               </div>
               {/* Group body */}
               <div className="px-5 py-4">
                  {/* Search form */}
                  <form className="relative">
                     <label htmlFor="msg-search" className="sr-only">
                        Search
                     </label>
                     <input id="msg-search" className="form-input w-full pl-9 focus:border-slate-300" type="search" placeholder="Search…" />
                     <button className="absolute inset-0 right-auto group" type="submit" aria-label="Search">
                        <svg
                           className="w-4 h-4 shrink-0 fill-current text-slate-400 group-hover:text-slate-500 ml-3 mr-2"
                           viewBox="0 0 16 16"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                           <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                        </svg>
                     </button>
                  </form>
                  {/* Direct messages */}
                  <DirectMessages
                     msgSidebarOpen={msgSidebarOpen}
                     setMsgSidebarOpen={setMsgSidebarOpen}
                     selectConversation={selectConversation}
                     messages={messages}
                     chats={chats}
                  />
                  {/* Channels */}
                  <Channels msgSidebarOpen={msgSidebarOpen} setMsgSidebarOpen={setMsgSidebarOpen} />
               </div>
            </div>
         </div>
      </div>
   );
}

export default MessagesSidebar;
