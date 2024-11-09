import { useState } from 'react';
import { Button } from '@nextui-org/button';
import {
 
    HeartFilledIcon,
    
  } from "@/components/icons";
const LikeButton = () => {
  const [likeCount, setLikeCount] = useState(10000);
  const [isLiked, setIsLiked] = useState(false);
  const [particles, setParticles] = useState([]);
  const [stars, setStars] = useState([]);

  const generateParticles = () => {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: Math.random() * 0.5 + 0.5,
      rotation: Math.random() * 360
    }));
  };

  const generateStars = () => {
    return Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: Math.random() * 0.3 + 0.3,
      delay: i * 100
    }));
  };

  const handleLikeClick = () => {
    setLikeCount(prev => prev + 1);
    setIsLiked(true);
    setParticles(generateParticles());
    setStars(generateStars());

    setTimeout(() => {
      setIsLiked(false);
      setParticles([]);
      setStars([]);
    }, 1000);
  };

  const formatCount = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return count;
  };

  return (
    <div className="relative">
      <Button
        onClick={handleLikeClick}
        variant="flat"
        className={`
          text-sm font-normal text-default-600 bg-default-100
          transition-all duration-300 ease-in-out
          ${isLiked ? 'scale-105' : 'scale-100'}
        `}
        startContent={
          <HeartFilledIcon 
            className={`
              text-danger transition-transform duration-300
              ${isLiked ? 'scale-125' : 'scale-100'}
            `}
          />
        }
      >
        {formatCount(likeCount)} Like{likeCount !== 1 && 's'}

        {/* Floating hearts */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute pointer-events-none"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              transform: `scale(${particle.scale}) rotate(${particle.rotation}deg)`,
              animation: 'float-up 1s ease-out forwards',
            }}
          >
            <HeartFilledIcon 
              size={16}
              className="text-pink-500 fill-pink-500 opacity-80"
            />
          </div>
        ))}

        {/* Sparkle stars */}
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute pointer-events-none"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              transform: `scale(${star.scale})`,
              animation: `sparkle 0.8s ease-out ${star.delay}ms forwards`,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" className="text-yellow-400">
              <path
                d="M10 0l2.5 7.5L20 10l-7.5 2.5L10 20l-2.5-7.5L0 10l7.5-2.5z"
                fill="currentColor"
              />
            </svg>
          </div>
        ))}
      </Button>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float-up {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: translate(var(--tx, -20px), -40px) scale(0.5) rotate(var(--r, 20deg));
          }
        }

        @keyframes sparkle {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0);
          }
        }
      `}</style>
    </div>
  );
};

export default LikeButton;