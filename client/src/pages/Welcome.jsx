import React, { useEffect, useState } from 'react';
import Background from '../components/Background/Background'; // Ensure Background component is working
import './Welcome.css'; // Ensure correct CSS file is applied

const Welcome = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // After 0.5 seconds, the text will appear (for smooth transition)
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <div className="welcome-page">
      <Background />
      <div className={`content ${isVisible ? 'fade-in' : ''}`}>
        <h1>Welcome to DiscForum</h1>
        <p>Where discussions happen!</p>
      </div>
    </div>
  );
};

export default Welcome;
