import React, { useState, useEffect, useRef } from 'react';

import Header from '../components/Header';
import MessagesSidebar from '../components/messages/MessagesSidebar';
import MessagesHeader from '../components/messages/MessagesHeader';
import MessagesBody from '../components/messages/MessagesBody';
import MessagesFooter from '../components/messages/MessagesFooter';
import { useSelector } from 'react-redux';
import { auth } from '../functions/firebase';
import { setMessageRead } from '../redux/actions';

function Messages() {

  const contentArea = useRef(null)
  const { darkMode } = useSelector((state) => state.globals);
  const { chats } = useSelector((state) => state.allData);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [msgSidebarOpen, setMsgSidebarOpen] = useState(true);

  useEffect(() => {
    contentArea.current.scrollTop = 99999999
  }, [msgSidebarOpen]); // automatically scroll the chat and make the most recent message visible

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Content area */} 
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden" ref={contentArea}>

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="relative flex">

            {/* Messages sidebar */}
            <MessagesSidebar msgSidebarOpen={msgSidebarOpen} setMsgSidebarOpen={setMsgSidebarOpen} />

            {/* Messages body */}
            <div className={`grow flex flex-col md:translate-x-0 transform transition-transform duration-300 ease-in-out ${msgSidebarOpen ? 'translate-x-1/3' : 'translate-x-0'}`}>
              <MessagesHeader msgSidebarOpen={msgSidebarOpen} setMsgSidebarOpen={setMsgSidebarOpen} />
              <MessagesBody />
              <MessagesFooter />
            </div>

          </div>
        </main>

      </div>
      
    </div>
  );
}

export default Messages;