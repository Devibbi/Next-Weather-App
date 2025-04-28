import React from 'react';

export default function DataVendors() {
  return (
    <div style={{maxWidth:700,margin:'2rem auto',padding:'2rem',background:'#fff2',borderRadius:18}}>
      <h2>Data Vendors</h2>
      <p>Our weather data is sourced from leading providers, including OpenWeatherMap and other reputable meteorological services. We strive to deliver accurate and timely information by partnering with trusted vendors.</p>
      <ul>
        <li>OpenWeatherMap</li>
        <li>National Weather Service (NWS)</li>
        <li>Other international weather agencies</li>
      </ul>
    </div>
  );
}
