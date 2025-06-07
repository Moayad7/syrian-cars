
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface TransitionWrapperProps {
  children: React.ReactNode;
}

const TransitionWrapper = ({ children }: TransitionWrapperProps) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage("fadeOut");
    }
  }, [location, displayLocation]);

  const handleAnimationEnd = () => {
    if (transitionStage === "fadeOut") {
      setTransitionStage("fadeIn");
      setDisplayLocation(location);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div
      className={`${
        transitionStage === "fadeIn" ? "animate-fade-in" : "opacity-0"
      } transition-opacity duration-300`}
      onAnimationEnd={handleAnimationEnd}
    >
      {children}
    </div>
  );
};

export default TransitionWrapper;
