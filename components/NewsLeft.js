import React from "react";
import styled, { useTheme } from "styled-components";

const newsItems = [
  {
    title: "Heavy Rain Expected in Karachi",
    summary: "Meteorological department warns of possible urban flooding as heavy rains approach Karachi this weekend.",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "Heatwave Alert for Punjab",
    summary: "Temperatures may soar above 44°C in parts of Punjab. Stay hydrated and avoid outdoor activities during peak hours.",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
  }
];

const NewsLeft = () => {
  const theme = useTheme();
  return (
    <NewsBanner $isDark={theme.mode === 'dark'}>
      {newsItems.map((item, idx) => (
        <div className="news-banner-item" key={idx}>
          <img src={item.img} alt={item.title} />
          <div>
            <h4>{item.title}</h4>
            <p>{item.summary}</p>
          </div>
        </div>
      ))}
    </NewsBanner>
  );
};

const NewsBanner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  .news-banner-item {
    display: flex;
    align-items: center;
    background: ${({ $isDark }) => $isDark ? 'linear-gradient(90deg,#232946 70%,#121629 100%)' : 'linear-gradient(90deg,#f8fafc 70%,#e0e7ef 100%)'};
    box-shadow: 0 2px 16px 0 rgba(31,38,135,0.13);
    border-radius: 16px;
    padding: 1.1rem 1rem;
    gap: 1.2rem;
    img {
      width: 56px;
      height: 56px;
      object-fit: cover;
      border-radius: 10px;
      box-shadow: 0 1px 8px #2563eb22;
    }
    h4 {
      margin: 0 0 0.2rem 0;
      font-size: 1.08rem;
      color: ${({ $isDark }) => $isDark ? '#fff' : '#2563eb'};
      font-weight: 700;
    }
    p {
      margin: 0;
      color: ${({ $isDark }) => $isDark ? '#e0e7ef' : '#222'};
      font-size: 0.97rem;
    }
  }
`;

export default NewsLeft;
