import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Card = ({ card, index, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className={`relative transition-all duration-500 ease-in-out ${
        isActive ? 'w-[60%] opacity-100' : 'w-[10%] opacity-50'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ minWidth: isActive ? '60%' : '10%' }}
    >
      <div className="h-[600px] relative rounded-3xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        <img
          src={card.src}
          alt={card.title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        {isActive && (
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent">
            <p className="text-white/80 text-sm mb-2">{card.category}</p>
            <h3 className="text-white text-2xl font-bold">{card.title}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

const Carousel = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevious = () => {
    setActiveIndex((current) => (current === 0 ? items.length - 1 : current - 1));
  };

  const handleNext = () => {
    setActiveIndex((current) => (current === items.length - 1 ? 0 : current + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative max-w-7xl mx-auto px-4 mt-8">
      <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
        {React.Children.map(items, (item, index) => (
          <Card
            key={index}
            card={item.props.card}
            index={index}
            isActive={index === activeIndex}
          />
        ))}
      </div>
      <button
        onClick={handlePrevious}
        className="absolute left-8 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors z-10"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-8 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors z-10"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};

const data = [
  {
    category: "Artificial Intelligence",
    title: "You can do more with AI.",
    src: "https://i.pinimg.com/736x/6a/a6/b5/6aa6b5c9e54ec15e2d4db0100195aab5.jpg"
  },
  {
    category: "Productivity",
    title: "Enhance your productivity.",
    src: "https://i.pinimg.com/564x/e2/c0/d8/e2c0d8b8a3ab27b6ccc987f497a77866.jpg"
  },
  {
    category: "Product",
    title: "Launching the new Apple Vision Pro.",
    src: "https://i.pinimg.com/564x/b2/46/0c/b2460c21e55b0506aecb05eae74b2d06.jpg"
  },
  {
    category: "Product",
    title: "Maps for your iPhone 15 Pro Max.",
    src: "https://i.pinimg.com/736x/69/52/8a/69528afee1d4b6bb7aa6dc567aefd4cd.jpg"
  },
  {
    category: "iOS",
    title: "Photography just got better.",
    src: "https://i.pinimg.com/736x/42/c8/74/42c874c04aa5dd646e53971114f79f22.jpg"
  },
  {
    category: "Hiring",
    title: "Hiring for a Staff Software Engineer",
    src: "https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop"
  }
];

// Add this CSS to your global styles or component
const style = document.createElement('style');
style.textContent = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
document.head.appendChild(style);

const PhotoCarousel = () => {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20 bg-white dark:bg-black">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-regular text-neutral-800 dark:text-neutral-200 font-sans">
        Get to know Aiden.
      </h2>
      <Carousel items={cards} />
    </div>
  );
};

export default PhotoCarousel;