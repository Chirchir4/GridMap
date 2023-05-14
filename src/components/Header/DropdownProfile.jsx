import React, { useState, useRef, useEffect } from 'react';
// import { logoutAction } from '../../redux/auth/auth.actions';
import { useDispatch, useSelector } from 'react-redux';
import Transition from '../../utils/Transition';
// import { setExpertMode } from '../../redux/auth/auth.slice';
// import Transition from '../NewUtils/Transition';

function DropdownProfile({ align }) {
   const [dropdownOpen, setDropdownOpen] = useState(false);

   const trigger = useRef(null);
   const dropdown = useRef(null);
   
   useEffect(() => {
      const clickHandler = ({ target }) => {
         if (!dropdown.current) return;
         if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
         setDropdownOpen(false);
      };
      document.addEventListener('click', clickHandler);
      return () => document.removeEventListener('click', clickHandler);
   });

   // close if the esc key is pressed
   useEffect(() => {
      const keyHandler = ({ keyCode }) => {
         if (!dropdownOpen || keyCode !== 27) return;
         setDropdownOpen(false);
      };
      document.addEventListener('keydown', keyHandler);
      return () => document.removeEventListener('keydown', keyHandler);
   });
 

   return (
      <div className="relative ">
         <button
            ref={trigger}
            className="grow flex items-center truncate w-8 h-8 justify-center bg-slate-100 hover:bg-slate-200 transition duration-150  rounded-full "
            aria-haspopup="true"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-expanded={dropdownOpen}
         >
            <svg className="shrink-0 h-6 w-6 " viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
               <path fill="none" d="M0 0h24v24H0z" />
               <path
                  fill="currentColor"
                  d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
               />
            </svg>
         </button>
         <Transition
            className={`origin-top-right z-10 absolute top-full min-w-60 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1 ${
               align === 'right' ? 'right-0' : 'left-0'
            }`}
            show={dropdownOpen}
            enter="transition ease-out duration-200 transform"
            enterStart="opacity-0 -translate-y-2"
            enterEnd="opacity-100 translate-y-0"
            leave="transition ease-out duration-200"
            leaveStart="opacity-100"
            leaveEnd="opacity-0"
         >
            <ul ref={dropdown} onFocus={() => setDropdownOpen(true)} onBlur={() => setDropdownOpen(false)}>
               <li>
                  <a
                     className="font-medium text-sm text-slate-600 hover:text-slate-800 block py-1.5 px-3"
                     href="/"
                     onClick={() => {setDropdownOpen(false)
                        localStorage.removeItem("uid");
                        localStorage.removeItem("userType");}}
               
                  >
                     <div className="flex items-center justify-between"     
                 
                  >
                        <div className="grow flex items-center truncate">
                           <div className="truncate">Log out</div>
                        </div>
                     
                     </div>
                  </a>
               </li>
            </ul>
         </Transition>
      </div>
   );
}

export default DropdownProfile;
