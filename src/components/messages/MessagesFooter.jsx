import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../../functions/firebase';
import { saveChat } from '../../redux/actions';

function MessagesFooter({ selectedUser }) {
   const dispatch = useDispatch();
   const { darkMode } = useSelector((state) => state.globals);
   const [message, setMessage] = useState('');

   const onChangeMessage = (message) => {
      setMessage(message);
   };

   const onSubmitMessage = (e) => {
      e.preventDefault();
      saveChat(auth.currentUser.uid, selectedUser, message);
      setMessage('');
   };

   return (
      <div className="sticky bottom-0">
         <div
            className={`flex items-center justify-between  border-t  px-4 sm:px-6 md:px-5 h-16 ${
               darkMode ? 'bg-slate-900 border-slate-400' : 'border-slate-200 bg-white'
            }`}
         >
            {/* Message input */}
            <form className="grow flex" onSubmit={onSubmitMessage}>
               <div className="grow mr-3">
                  <label htmlFor="message-input" className="sr-only">
                     Type a message
                  </label>
                  <input
                     value={message}
                     onChange={(e) => onChangeMessage(e.target.value)}
                     id="message-input"
                     className="form-input w-full bg-slate-100 border-transparent focus:bg-white focus:border-slate-300"
                     type="text"
                     placeholder="Aa"
                  />
               </div>
               <button type="submit" className="btn bg-indigo-500 hover:bg-indigo-600 text-white whitespace-nowrap">
                  Send -&gt;
               </button>
            </form>
         </div>
      </div>
   );
}

export default MessagesFooter;
