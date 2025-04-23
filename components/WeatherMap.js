import React, { useEffect, useRef } from 'react';

export default function WeatherMap({ lat, lon }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!lat || !lon) return;
    // Use OpenWeatherMap's tile layers with Leaflet
    const L = window.L;
    if (!L) return;
    if (mapRef.current._leaflet_id) {
      mapRef.current._leaflet_id = null;
      mapRef.current.innerHTML = '';
    }
    const map = L.map(mapRef.current).setView([lat, lon], 8);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    // Add OpenWeatherMap radar overlay
    L.tileLayer('https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=689e563a4664417e5bbde0e2ba455089', {
      opacity: 0.6
    }).addTo(map);
    return () => map.remove();
  }, [lat, lon]);

  return <div ref={mapRef} style={{width:'100%',height:'320px',margin:'18px auto',borderRadius:'18px',boxShadow:'0 2px 16px #0002'}} />;
}
