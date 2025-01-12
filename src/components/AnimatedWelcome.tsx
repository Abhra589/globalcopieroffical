import { useEffect, useState } from "react";

export const AnimatedWelcome = () => {
  const [text, setText] = useState("");
  const fullText = "Welcome to Globalcopier!";
  
  useEffect(() => {
    let currentIndex = 0;
    const animationSpeed = 100; // Speed of each character appearing
    
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, animationSpeed);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div 
      className={`font-serif italic text-2xl md:text-3xl mb-4 text-white/90 transition-opacity duration-500 ${
        text.length === 0 ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
      }}
    >
      {text}
    </div>
  );
};