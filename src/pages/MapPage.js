import React, { useEffect, useState } from 'react';
import MapView from '../components/Map/Mapview'


export default function MapPage() {

  useEffect(() => {
    if(localStorage.getItem("uid")) {

    } else {
      window.location.href="/"
    }
  }, [])
  
  return (
    <div>
        
        <MapView></MapView>
    </div>
  )
}
