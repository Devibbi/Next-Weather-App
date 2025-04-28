import React from "react";
import styled from "styled-components";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

const FooterFull = () => (
  <FooterContainer>
    <FooterLinks>
      <a href="/terms">Terms of Use</a> |
      <a href="/privacy">Privacy Policy</a> |
      <a href="/accessibility">Accessibility Statement</a> |
      <a href="/datavendors">Data Vendors</a>
    </FooterLinks>
    <FooterSocial>
      <a href="https://facebook.com/askibbi" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
      <a href="https://twitter.com/ibraheembhatti" aria-label="Twitter" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
      <a href="https://instagram.com/ibbi_125" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
      <a href="https://github.com/devibbi" aria-label="GitHub" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
    </FooterSocial>
    <FooterText>
      <span><strong>Data Rights:</strong> The Weather App uses the most accurate data sources and APIs for your location. All forecasts and data are provided for informational purposes only.</span>
      <br />
      <span> {new Date().getFullYear()} Weather App. All rights reserved.</span>
    </FooterText>
  </FooterContainer>
);

const FooterContainer = styled.footer`
  width: 100%;
  background: linear-gradient(90deg, #232946 60%, #2563eb 100%);
  color: #fff;
  padding: 2.5rem 0 1.2rem 0;
  border-radius: 18px 18px 0 0;
  margin-top: 2.5rem;
  box-shadow: 0 4px 24px 0 rgba(31,38,135,0.22);
  text-align: center;
`;

const FooterLinks = styled.div`
  margin-bottom: 1.1rem;
  a {
    color: #7fc7ff;
    margin: 0 0.6rem;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.07rem;
    &:hover { color: #fff; text-decoration: underline; }
  }
`;

const FooterSocial = styled.div`
  margin-bottom: 1.2rem;
  a {
    color: #7fc7ff;
    margin: 0 0.5rem;
    font-size: 1.32rem;
    transition: color 0.2s;
    &:hover { color: #fff; }
  }
`;

const FooterText = styled.div`
  font-size: 1.03rem;
  color: #e0e7ef;
  margin-top: 0.7rem;
  span { display: block; margin-bottom: 0.2rem; }
`;

export default FooterFull;
