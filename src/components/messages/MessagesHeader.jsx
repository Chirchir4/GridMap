import React from 'react';

import User01 from '../../images/user-32-01.jpg';
import User02 from '../../images/user-32-07.jpg';
import { useSelector } from 'react-redux';

function MessagesHeader({
  msgSidebarOpen,
  setMsgSidebarOpen
}) {
  const {darkMode}=useSelector((state)=>state.globals)
  
  return (
    <div className="sticky top-16 w-full">
      <div className={`flex items-center justify-between bg-white border-b border-slate-200 px-4 sm:px-6 md:px-5 h-16 ${darkMode? "bg-slate-900 border-slate-400":"bg-white border-slate-200"}`}>
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
              <img className="rounded-full border-2 border-white box-content" src={User01} width="32" height="32" alt="User 01" />
            </a>
            <a className="block" href="#0">
              <img className="rounded-full border-2 border-white box-content" src={User02} width="32" height="32" alt="User 04" />
            </a>
          </div>
        </div>
       
      </div>
    </div>
  );
}

export default MessagesHeader;
