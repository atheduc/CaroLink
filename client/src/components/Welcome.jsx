import React, { useState, useEffect } from 'react';
import Background from './Background/Background';
import Hero from './Hero/Hero';
import Navbar from './Navbar/Navbar';

const Welcome = () => {
  const [heroCount, setHeroCount] = useState(0);
  const [playStatus, setPlayStatus] = useState(false);

  // Hero data array
  const heroData = [
    { text1: "Link", text2: "with Carolinians" },
    { text1: "Foster", text2: "Knowledge" },
    { text1: "Create", text2: "Academic Dreams" },
  ];

  // Cycle through hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount((prevCount) => (prevCount === 2 ? 0 : prevCount + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Background playStatus={playStatus} heroCount={heroCount} />
      <Navbar />
      <Hero
        setPlayStatus={setPlayStatus}
        heroData={heroData[heroCount]}
        heroCount={heroCount}
        setHeroCount={setHeroCount}
        playStatus={playStatus}
      />
    </div>
  );
};

export default Welcome;
