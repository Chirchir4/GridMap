import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { auth } from '../../firebase/firebase';
import { saveChat } from '../../redux/actions';

function MessagesFooter({sendMessage,setTextMessage,textMessage }) {
   const dispatch = useDispatch();
   const { darkMode } = useSelector((state) => state.globals);
   // const [textMessage, setTextMessage] = useState();
   // const [message, setMessage] = useState('');

   // const onChangeMessage = (message) => {
   //    setMessage(message);
   // };

   // const onSubmitMessage = (e) => {
   //    e.preventDefault();
   //    saveChat(auth.currentUser.uid, selectedUser, message);
   //    setMessage('');
   // };
   

   return (
      <div className="sticky bottom-0">
         <div
            className={`flex items-center justify-between  border-t  px-4 sm:px-6 md:px-5 h-16 ${
               darkMode ? 'bg-slate-900 border-slate-400' : 'border-slate-200 bg-white'
            }`}
         >
            {/* Plus button */}
            <button className="shrink-0 text-slate-400 hover:text-slate-500 mr-3">
               <span className="sr-only">Add</span>
               <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12C23.98 5.38 18.62.02 12 0zm6 13h-5v5h-2v-5H6v-2h5V6h2v5h5v2z" />
               </svg>
            </button>
            {/* Message input */}
            <form className="grow flex" onSubmit={(e)=>sendMessage(e)}>
               <div className="grow mr-3">
                  <label htmlFor="message-input" className="sr-only">
                     Type a message
                  </label>
                  <input
                      value={textMessage}
                     onChange={(e) => setTextMessage(e.target.value)}
                     id="message-input"
                     className="form-input w-full bg-slate-100 border-transparent focus:bg-white focus:border-slate-300"
                     type="text"
                     placeholder=" Type a message"
                  />
               </div>
               <button type="submit" className="btn bg-indigo-500 px-4 rounded-md hover:bg-indigo-600 text-white whitespace-nowrap">
                  Send 
               </button>
            </form>
         </div>
      </div>
   );
}

export default MessagesFooter;
