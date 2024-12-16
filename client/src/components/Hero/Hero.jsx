import React from 'react';
import './Hero.css'; // Ensure the correct CSS file is used

const Hero = ({ heroData, setHeroCount, heroCount, setPlayStatus, playStatus }) => {
  return (
    <div className="hero">
      <div className="hero-text">
        <p>{heroData.text1}</p>
        <p>{heroData.text2}</p>
      </div>

      <div className="hero-explore">
        <p><a href="/registration" className="hero-register">Register</a></p>
      </div>

      <div className="hero-dot-play">
        <ul className="hero-dots">
          <li onClick={() => setHeroCount(0)} className={heroCount === 0 ? "hero-dot orange" : "hero-dot"}></li>
          <li onClick={() => setHeroCount(1)} className={heroCount === 1 ? "hero-dot orange" : "hero-dot"}></li>
          <li onClick={() => setHeroCount(2)} className={heroCount === 2 ? "hero-dot orange" : "hero-dot"}></li>
        </ul>

        <div className="hero-play">
          <img onClick={() => setPlayStatus(!playStatus)} src={playStatus ? '/assets/pause_icon.png' : '/assets/play_icon.png'} alt="Play/Pause Icon" />
          <p>See the Video</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
