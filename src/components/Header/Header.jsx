import React, { useState } from 'react';
import { BsFillMoonStarsFill } from "react-icons/bs";
import { FiSun } from "react-icons/fi";

// import Notifications from '../NewComponents/DropdownNotifications';

import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../../redux/globals.slice';
import DropdownProfile from './DropdownProfile';
import DropdownNotifications from './DropdownNotifications';
import light from "../../assets/light.png"

function Header() {

  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const {darkMode}=useSelector((state)=>state.globals)
  const dispatch=useDispatch()
  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
};
  return (
    <header className={`sticky top-0  z-30 ${darkMode? "bg-slate-900 border-b border-slate-500":"bg-white border-b border-slate-200"}`}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end h-16 -mb-px">

          {/* Header: Left side */}
        

          {/* Header: Right side */}
          <div className="flex items-center gap-2 space-x-3">
          {darkMode ? (
                                         <img src={light} height="30" width="30" onClick={() => handleToggleDarkMode()} className="cursor-pointer text-xl " />
                        ) : (
                            <BsFillMoonStarsFill onClick={() => handleToggleDarkMode()} className="cursor-pointer text-xl " />
                        )}
                        <DropdownNotifications/>
        <DropdownProfile/>
            {/* <Notifications align="right" /> */}
         
            {/*  Divider */}
            <hr className="w-px h-6 bg-slate-200 mx-3" />
            {/* <UserMenu align="right" /> */}

          </div>

        </div>
      </div>
    </header>
  );
}

export default Header;