import React from "react";
import styled from "styled-components";

const PromoBanner = () => (
  <Banner>
    <div className="promo-content">
      <div className="promo-left">
        <h2>Want Premium Weather Services?</h2>
        <p>
          <b>Login</b> to enjoy <b>live climate updates</b>, <b>minute-casts</b>, notifications, and more.<br/>
          Or <b>download our app</b> for the best mobile experience!
        </p>
      </div>
      <div className="promo-actions">
        <Button className="login">Login</Button>
        <Button className="download">Download App</Button>
      </div>
    </div>
  </Banner>
);

const Banner = styled.div`
  background: linear-gradient(90deg, #38bdf8bb 0%, #2563ebbb 100%);
  color: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 18px 0 rgba(31,38,135,0.10);
  padding: 1.3rem 2rem;
  margin: 2rem auto 1.7rem auto;
  max-width: 700px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .promo-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 1.5rem;
  }
  .promo-left {
    flex: 1;
    h2 {
      margin: 0 0 0.5rem 0;
      font-size: 1.4rem;
      font-weight: 700;
      letter-spacing: 0.5px;
    }
    p {
      margin: 0;
      font-size: 1.08rem;
      font-weight: 400;
    }
  }
  .promo-actions {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
  @media (max-width: 600px) {
    padding: 1.1rem 0.7rem;
    .promo-content {
      flex-direction: column;
      gap: 1rem;
    }
    .promo-actions {
      width: 100%;
      justify-content: center;
    }
  }
`;

const Button = styled.button`
  background: #fff;
  color: #2563eb;
  font-weight: 700;
  font-size: 1.07rem;
  border: none;
  border-radius: 2rem;
  padding: 0.7rem 1.6rem;
  box-shadow: 0 2px 8px #2563eb22;
  cursor: pointer;
  margin: 0;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #2563eb;
    color: #fff;
  }
`;

export default PromoBanner;
