import React from "react";
import styled, { useTheme } from "styled-components";

const newsItems = [
  {
    title: "Monsoon Arrives Early",
    summary: "The monsoon season is expected to arrive earlier than usual, bringing relief to drought-hit regions.",
    img: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=400&q=80"
  },
  {
    title: "Dust Storms in Sindh",
    summary: "Strong winds and dust storms expected in parts of Sindh. Residents are advised to take precautions.",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
  }
];

const NewsRight = () => {
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
  box-sizing: border-box;
  padding-right: 0;
  align-items: stretch;
  @media (min-width: 1200px) {
    max-width: 430px;
    margin-left: auto;
    margin-right: auto;
    padding-right: 0;
    align-items: stretch;
  }
  .news-banner-item {
    display: flex;
    align-items: center;
    background: ${({ $isDark }) => $isDark ? 'linear-gradient(90deg,#232946 70%,#121629 100%)' : 'linear-gradient(90deg,#f8fafc 70%,#e0e7ef 100%)'};
    box-shadow: 0 2px 16px 0 rgba(31,38,135,0.13);
    border-radius: 16px;
    padding: 1.1rem 1rem;
    gap: 1.2rem;
    min-width: 0;
    min-height: 130px;
    width: 100%;
    max-width: 100%;
    margin-right: 0;
    box-sizing: border-box;
    height: 140px;
    @media (min-width: 1200px) {
      height: 140px;
      min-height: 140px;
    }
    @media (max-width: 1200px) {
      min-height: 120px;
      font-size: 0.98rem;
      height: 120px;
    }
    @media (max-width: 1024px) {
      min-height: 120px;
      height: 120px;
      font-size: 0.93rem;
    }
    @media (max-width: 900px) {
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
      width: 100%;
      min-width: 0;
      min-height: 100px;
      font-size: 0.92rem;
      height: auto;
    }
    @media (max-width: 700px) {
      min-height: 90px;
      font-size: 0.89rem;
      img { width: 44px; height: 44px; }
    }
    @media (max-width: 540px) {
      min-height: 70px;
      font-size: 0.85rem;
      img { width: 36px; height: 36px; }
    }
    @media (max-width: 400px) {
      min-height: 54px;
      font-size: 0.78rem;
      img { width: 28px; height: 28px; }
    }
    img {
      width: 56px;
      height: 56px;
      object-fit: cover;
      border-radius: 10px;
      box-shadow: 0 1px 8px #2563eb22;
      flex-shrink: 0;
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
  @media (max-width: 900px) {
    gap: 0.8rem;
    max-width: 100vw;
    padding-right: 0;
    align-items: stretch;
  }
`;

export default NewsRight;
