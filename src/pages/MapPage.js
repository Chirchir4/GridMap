import React, { useEffect, useState } from 'react';
import MapView from '../components/Map/Mapview'
import WelcomeBanner from '../components/WelcomeBanner/WelcomeBanner';
import Header from '../components/Header/Header';
import { useSelector } from 'react-redux';


export default function MapPage() {
  const {darkMode}=useSelector((state)=>state.globals)
  
  useEffect(() => {
    if(localStorage.getItem("uid")) {

    } else {
      window.location.href="/"
    }
  }, [])
  
  return (
    <div className={darkMode? "bg-slate-900 border-b border-slate-500 h-full":"bg-white border-b border-slate-200 h-full"}>
      <Header/>
<div className='mt-8'>
<WelcomeBanner />
</div>
<div >
<MapView></MapView>
</div>
     
    
    </div>
  )
}
