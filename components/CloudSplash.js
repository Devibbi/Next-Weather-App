import React, { useEffect, useState, useRef } from "react";
import styled, { keyframes, css } from "styled-components";

// More realistic cloud entrance animation - removed brightness change at start
const cloudEntrance = keyframes`
  0% { transform: scale(0.8) translateY(20px); opacity: 0; }
  30% { transform: scale(1.03) translateY(-5px); opacity: 0.9; }
  45% { transform: scale(0.99) translateY(2px); opacity: 1; }
  65% { transform: scale(1.01) translateY(-1px); }
  100% { transform: scale(1) translateY(0); opacity: 1; }
`;

// More realistic rain animation with variable speed and slight wind effect
const rainFall = keyframes`
  0% { 
    opacity: 0; 
    transform: translateY(-15px) scaleY(0.8); 
  }
  5% { 
    opacity: 0.9; 
    transform: translateY(0) scaleY(1); 
  }
  90% { 
    opacity: 0.9; 
  }
  100% { 
    opacity: 0; 
    transform: translateY(120px) scaleY(1.2); 
  }
`;

// More realistic lightning flash with multiple pulses
const lightningFlash = keyframes`
  0%, 100% { opacity: 0; }
  0.5% { opacity: 0.3; }
  1% { opacity: 0.95; }
  2% { opacity: 0.2; }
  3% { opacity: 0.93; }
  5% { opacity: 0.45; }
  6% { opacity: 0.85; }
  8% { opacity: 0; }
`;

// Subtle glow effect for cloud during lightning
const cloudGlow = keyframes`
  0%, 100% { filter: brightness(1) contrast(1); }
  0.5% { filter: brightness(1.2) contrast(1.1); }
  1% { filter: brightness(1.5) contrast(1.2); }
  2% { filter: brightness(1.1) contrast(1.05); }
  3% { filter: brightness(1.4) contrast(1.15); }
  5% { filter: brightness(1.2) contrast(1.1); }
  6% { filter: brightness(1.3) contrast(1.12); }
  8% { filter: brightness(1) contrast(1); }
`;

// Subtle background flicker during lightning
const bgFlicker = keyframes`
  0%, 100% { background-color: rgba(0,0,0,0); }
  0.5% { background-color: rgba(255,255,255,0.05); }
  1% { background-color: rgba(255,255,255,0.2); }
  2% { background-color: rgba(255,255,255,0.05); }
  3% { background-color: rgba(255,255,255,0.15); }
  5% { background-color: rgba(255,255,255,0.05); }
  6% { background-color: rgba(255,255,255,0.1); }
  8% { background-color: rgba(0,0,0,0); }
`;

// Decreased animation duration
const SPLASH_MIN_DURATION = 3200;

// Make splash animation background match exactly the post-animation background for seamless blending
const splashGradient = 'linear-gradient(180deg, #bcd1e6 60%, #7e9bbd 100%)';

// --- FINAL FIX: Cloud Never Disappears Abruptly, Always Visible Until Offscreen ---
const splashExitUp = keyframes`
  0% { opacity: 1; transform: translateY(0) scale(1); }
  98% { opacity: 1; transform: translateY(-118vh) scale(1.22); }
  100% { opacity: 0; transform: translateY(-120vh) scale(1.22); }
`;

const SplashBg = styled.div`
  position: fixed;
  z-index: 99999;
  top: 0; left: 0; right: 0; bottom: 0;
  background: ${splashGradient};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.5s, background 0.7s;
  overflow: visible;
  ${({ $exit }) => $exit && css`
    animation: ${splashExitUp} 1.22s cubic-bezier(.77,.01,.24,1) forwards;
  `}
`;

const CloudContainer = styled.div`
  position: relative;
  width: 410px;
  height: 205px;
  animation: ${cloudEntrance} 1.2s cubic-bezier(.45,.05,.55,.95) 0s 1 both;
`;

const CloudGroup = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  
  ${props => props.$lightning && css`
    animation: ${cloudGlow} 2s ease-out;
  `}
`;

const CloudPart = styled.div`
  position: absolute;
  border-radius: 50%;
  background: ${props => props.$dark
    ? 'radial-gradient(circle at 60% 40%, #bfc6d1 55%, #a1a8b3 80%, #7d8799 100%)'
    : 'radial-gradient(circle at 60% 40%, #f6f8fa 70%, #e6eaf1 88%, #bfc6d1 100%)'};
  box-shadow: inset 0 -12px 22px -5px rgba(0,0,0,0.22),
              0 20px 38px -12px rgba(31,38,135,0.15),
              0 6px 16px -6px rgba(0,0,0,0.13);
  filter: ${props => props.$blur ? `blur(${props.$blur}px)` : 'none'};
  opacity: ${props => props.$opacity || 1};
  width: ${props => props.$w * 1.14}px;
  height: ${props => props.$h * 1.14}px;
  left: ${props => props.$l * 1.14}px;
  top: ${props => props.$t * 1.14}px;
  z-index: ${props => props.$z || 1};
`;

const RainDrop = styled.div`
  position: absolute;
  left: ${props => props.$left}px;
  top: 80px;
  width: ${props => props.$w}px;
  height: ${props => props.$h}px;
  background: linear-gradient(180deg, rgba(180, 215, 240, 0.8) 0%, rgba(160, 200, 235, 0.9) 100%);
  border-radius: 50% 50% 45% 45%;
  opacity: ${props => props.$opacity};
  transform-origin: center top;
  animation: ${rainFall} ${props => props.$duration}s linear infinite;
  animation-delay: ${props => props.$delay}s;
  z-index: ${props => props.$z || 0};
  box-shadow: 0 6px 8px -2px rgba(0,0,0,0.1);
  filter: blur(${props => props.$blur || 0}px);
  
  ${props => props.$wind && css`
    animation: ${rainFall} ${props.$duration}s linear infinite,
              translateX(${props.$wind}px) ${props.$duration * 1.5}s ease-in infinite;
  `}
`;

const LightningBolt = styled.div`
  position: absolute;
  z-index: 30;
  left: ${props => props.$left || 120}px;
  top: ${props => props.$top || 30}px;
  opacity: ${props => props.$active ? 1 : 0};
  transition: opacity 0.07s;
  filter: drop-shadow(0 0 16px rgba(255, 250, 215, 0.9));
`;

const LightningPath = styled.svg`
  width: ${props => props.$size || 52}px;
  height: ${props => props.$size * 1.5 || 78}px;
`;

const LightningGlow = styled.ellipse`
  fill: rgba(255, 250, 215, 0.8);
  filter: blur(3px);
`;

const FadeMask = styled.div`
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 70px;
  pointer-events: none;
  z-index: 100000;
  background: linear-gradient(to bottom, rgba(188,209,230,0) 0%, #bcd1e6 90%, #bcd1e6 100%);
  opacity: ${props => props.$active ? 1 : 0};
  transition: opacity 0.7s;
`;

// Helper to generate random number within a range
const random = (min, max) => Math.random() * (max - min) + min;

export default function RealisticCloudSplash({ onFinish }) {
  const [hide, setHide] = useState(false);
  const [showLightning, setShowLightning] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);
  const [lightningIteration, setLightningIteration] = useState(0);
  const [fadeMask, setFadeMask] = useState(false);
  const [exitAnim, setExitAnim] = useState(false);
  const timeoutsRef = useRef([]);

  // Generate rain drops with more variety and covering larger cloud
  const generateRainDrops = () => {
    const drops = [];
    // Create 55 varied raindrops for heavier rain
    for (let i = 0; i < 55; i++) {
      drops.push({
        $left: random(12, 375), // Wider spread for larger cloud
        $w: random(4, 8),
        $h: random(20, 38),
        $opacity: random(0.68, 0.97),
        $delay: random(0, 1.4),
        $duration: random(0.62, 0.94),
        $z: Math.floor(random(0, 10)),
        $blur: random(0, 1) > 0.85 ? random(0.5, 1.5) : 0,
        $wind: random(-7, 7)
      });
    }
    return drops;
  };

  const rainDrops = generateRainDrops();

  // Lightning effect scheduling - adjusted timings for shorter duration
  useEffect(() => {
    const lightningSequence = [
      { time: 600, duration: 300 },
      { time: 1300, duration: 250 },
      { time: 2100, duration: 280 }
    ];
    
    // Schedule lightning flashes
    const timeouts = lightningSequence.map((flash, idx) => {
      const startTimeout = setTimeout(() => {
        setShowLightning(true);
        setLightningIteration(idx + 1);
      }, flash.time);
      
      const endTimeout = setTimeout(() => {
        setShowLightning(false);
      }, flash.time + flash.duration);
      
      return [startTimeout, endTimeout];
    }).flat();
    
    // Schedule animation end
    const endTimeout = setTimeout(() => {
      setAnimationDone(true);
    }, SPLASH_MIN_DURATION);
    
    timeouts.push(endTimeout);
    timeoutsRef.current = timeouts;
    
    return () => timeoutsRef.current.forEach(clearTimeout);
  }, []);

  // When animation is done, show fade mask for 0.7s before fully hiding
  useEffect(() => {
    if (!animationDone) return;
    setFadeMask(true);
    setExitAnim(true);
    // Remove splash after exit animation duration (1280ms)
    const fadeTimeout = setTimeout(() => {
      setHide(true);
      if (onFinish) setTimeout(onFinish, 400);
    }, 1280);
    return () => clearTimeout(fadeTimeout);
  }, [animationDone, onFinish]);

  // Fix: Pass lightningIteration as argument to renderLightning, so it can access the current value from the component
  const renderLightning = (iteration) => {
    // Main lightning bolt
    const mainBolt = (
      <LightningBolt $active={showLightning} $left={140} $top={20}>
        <LightningPath $size={70} viewBox="0 0 60 90">
          <LightningGlow cx="30" cy="40" rx="24" ry="18" />
          <path
            d="M32,0 L26,35 L40,40 L20,90 L26,55 L12,50 L32,0"
            stroke="white"
            strokeWidth="3"
            fill="rgba(255, 250, 225, 0.9)"
          />
        </LightningPath>
      </LightningBolt>
    );
    // Secondary lightning bolt - only appears on some iterations
    const secondaryBolt = iteration % 2 === 0 && (
      <LightningBolt $active={showLightning} $left={220} $top={35}>
        <LightningPath $size={50} viewBox="0 0 60 90">
          <LightningGlow cx="30" cy="40" rx="20" ry="15" />
          <path
            d="M30,5 L24,30 L36,35 L18,85 L24,50 L12,45 L30,5"
            stroke="white"
            strokeWidth="2"
            fill="rgba(255, 250, 225, 0.85)"
          />
        </LightningPath>
      </LightningBolt>
    );
    return (
      <>
        {mainBolt}
        {secondaryBolt}
      </>
    );
  };

  if (hide) return null;
  return (
    <SplashBg $exit={exitAnim}>
      <CloudContainer>
        <CloudGroup $lightning={showLightning}>
          {/* Dark bottom cloud layers - scaled up */}
          <CloudPart $w={170} $h={85} $l={-15} $t={75} $dark $opacity={0.92} $z={5} />
          <CloudPart $w={155} $h={80} $l={105} $t={80} $dark $opacity={0.85} $z={4} />
          <CloudPart $w={130} $h={75} $l={220} $t={75} $dark $opacity={0.9} $z={4} />
          
          {/* Middle cloud layers - scaled up */}
          <CloudPart $w={160} $h={85} $l={-10} $t={52} $opacity={0.95} $z={10} />
          <CloudPart $w={180} $h={95} $l={90} $t={48} $opacity={0.98} $z={15} />
          <CloudPart $w={145} $h={80} $l={205} $t={54} $opacity={0.92} $z={12} />
          
          {/* Top cloud layers - more prominent, brighter - scaled up */}
          <CloudPart $w={145} $h={80} $l={30} $t={20} $z={30} />
          <CloudPart $w={170} $h={90} $l={130} $t={15} $z={28} />
          <CloudPart $w={135} $h={75} $l={-5} $t={32} $z={25} />
          <CloudPart $w={125} $h={70} $l={220} $t={30} $z={22} />
          
          {/* Cloud highlights for depth - scaled up */}
          <CloudPart $w={85} $h={50} $l={60} $t={8} $opacity={0.9} $z={35} />
          <CloudPart $w={75} $h={45} $l={170} $t={5} $opacity={0.95} $z={36} />
          
          {/* Cloud shadow beneath - scaled up */}
          <div 
            style={{
              position: 'absolute',
              left: 50,
              top: 140,
              width: 240,
              height: 30,
              background: 'rgba(20,30,45,0.2)',
              borderRadius: 50,
              filter: 'blur(15px)',
              zIndex: 1
            }}
          />
          
          {/* Render all raindrops */}
          {rainDrops.map((drop, i) => (
            <RainDrop key={i} {...drop} />
          ))}
        </CloudGroup>
        
        {/* Render lightning effects */}
        {showLightning && renderLightning(lightningIteration)}
      </CloudContainer>
      {/* Fade-out mask at the bottom for blending */}
      <FadeMask $active={fadeMask} />
    </SplashBg>
  );
}