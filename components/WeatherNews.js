import React from "react";
import styled from "styled-components";

// Example static news; in production, fetch from a news/weather API
const newsItems = [
  {
    title: "Heavy Rain Expected in Karachi",
    summary: "Meteorological department warns of possible urban flooding as heavy rains approach Karachi this weekend.",
    link: "#",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "Heatwave Alert for Punjab",
    summary: "Temperatures may soar above 44°C in parts of Punjab. Stay hydrated and avoid outdoor activities during peak hours.",
    link: "#",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "Monsoon Arrives Early",
    summary: "The monsoon season is expected to arrive earlier than usual, bringing relief to drought-hit regions.",
    link: "#",
    img: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=400&q=80"
  }
];

const WeatherNews = () => (
  <NewsGlass>
    <h3>Weather News</h3>
    <ul>
      {newsItems.map((item, idx) => (
        <li key={idx}>
          <img src={item.img} alt={item.title} />
          <div>
            <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
            <p>{item.summary}</p>
          </div>
        </li>
      ))}
    </ul>
  </NewsGlass>
);

const NewsGlass = styled.div`
  background: rgba(255,255,255,0.18);
  border-radius: 18px;
  box-shadow: 0 2px 10px 0 rgba(31,38,135,0.09);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1.2px solid rgba(56,189,248,0.12);
  padding: 1.2rem 1.2rem 1.2rem 1.2rem;
  margin: 2rem 0;
  max-width: 340px;
  width: 100%;
  h3 {
    margin-bottom: 1rem;
    color: #2563eb;
    font-size: 1.13rem;
    font-weight: 700;
    letter-spacing: 0.5px;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {
    display: flex;
    align-items: flex-start;
    gap: 0.9rem;
    margin-bottom: 1.2rem;
    &:last-child { margin-bottom: 0; }
    img {
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 10px;
      box-shadow: 0 1px 8px #2563eb22;
    }
    div {
      flex: 1;
      a {
        font-weight: 700;
        color: #2563eb;
        text-decoration: none;
        font-size: 1.03rem;
        &:hover { text-decoration: underline; }
      }
      p {
        margin: 0.3rem 0 0 0;
        font-size: 0.96rem;
        color: #222;
      }
    }
  }
`;

export default WeatherNews;
