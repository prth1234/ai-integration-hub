import React, { useState, useEffect } from 'react';
import { Card, CardBody, Chip, Button, Input, Avatar, useNavbar } from "@nextui-org/react";
import { SendHorizonal, Mic, Image as ImageIcon, Smile, Sparkles, Bot, Wand2 } from "lucide-react";
const animations = `
  @keyframes messageSlideIn {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes suggestionFadeIn {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes skeletonFadeIn {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes skeletonFadeOut {
    0% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(-10px);
    }
  }

  @keyframes fadeInFast {
    from { 
      opacity: 0;
      transform: translateY(5px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes typingDot {
    0%, 100% { 
      transform: translateY(0);
      opacity: 0.5;
    }
    50% { 
      transform: translateY(-2px);
      opacity: 1;
    }
  }

  .animate-messageSlideIn {
    animation: messageSlideIn 0.5s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
  }

  .animate-suggestionFadeIn {
    animation: suggestionFadeIn 0.4s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
  }

  .animate-skeletonFadeIn {
    animation: skeletonFadeIn 0.6s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
  }

  .animate-skeletonFadeOut {
    animation: skeletonFadeOut 0.4s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
  }

  .animate-fadeInFast {
    animation: fadeInFast 0.3s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
  }

  .animate-fadeInUp {
    animation: fadeInUp 0.4s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
  }

  .animate-typingDot {
    animation: typingDot 1.4s ease-in-out infinite;
  }

  .transition-all {
    transition: all 0.4s cubic-bezier(0.4, 0.0, 0.2, 1);
  }
`;

const ChatBotCard = () => {
  const [conversationState, setConversationState] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [isLoadingOut, setIsLoadingOut] = useState(false);

  const conversation = [
    { type: 'bot', message: 'Hello! How can I help you today?', withSparkle: true },
    { type: 'user', message: 'I need help with my project' },
    { type: 'typing' },
    { type: 'bot', message: 'I\'d be happy to help! What kind of project are you working on?', withSparkle: false },
    { type: 'user', message: 'A React application' },
    { type: 'typing' },
    { type: 'bot', message: 'Great choice! I can help you with React development. Would you like to:', withButtons: true }
  ];

  const suggestions = [
    "Help with coding 💻",
    "Explain concepts 🎯",
    "Debug issues 🐛",
    "Best practices 📚"
  ];

  useEffect(() => {
    // Show loader for 1 second
    const loaderTimer = setTimeout(() => {
      setIsLoadingOut(true); // Start fade out animation
      
      // Wait for fade out animation to complete before showing content
      setTimeout(() => {
        setIsLoading(false);
        setShowContent(true);
        setConversationState(1);
        
        // Start conversation progression after a shorter delay
        const messageInterval = setInterval(() => {
          setConversationState(prev => {
            if (prev >= conversation.length + 2) {
              clearInterval(messageInterval);
              return prev;
            }
            return prev + 1;
          });
        }, 1500);

        return () => clearInterval(messageInterval);
      }, 400); // Match this with the skeletonFadeOut animation duration
    }, 1000);

    return () => {
      clearTimeout(loaderTimer);
    };
  }, []);

  useEffect(() => {
    setIsTyping(conversation[conversationState]?.type === 'typing');
  }, [conversationState]);

  const renderMessage = (message, type, withSparkle = false, withButtons = false, animate = true) => {
    const isBot = type === 'bot';

   
    return (
      <div className={`flex gap-3 items-start ${isBot ? '' : 'justify-end'} transform-gpu ${animate ? 'animate-messageSlideIn' : ''}`}>
        {isBot && (
          <Avatar
            size="sm"
            icon={<Bot className="w-4 h-4" />}
            className="bg-primary-100"
          />
        )}
        <div className={`flex flex-col gap-1 ${!isBot && 'items-end'}`}>
          <Chip 
            color={isBot ? "primary" : "default"} 
            variant="flat" 
            size="sm"
            className={isBot ? "self-start" : undefined}
            startContent={withSparkle && <Sparkles className="w-3 h-3" />}
          >
            {isBot ? 'Aiden' : 'You'}
          </Chip>
          <div className="relative">
            <p className={`text-sm px-3 py-2 rounded-lg max-w-[320px] whitespace-pre-line shadow-sm
              ${isBot ? 'bg-primary-50 text-primary-900' : 'bg-blue-100 text-blue-900'}`}>
              {message}
            </p>
            {withSparkle && (
              <div className="absolute -top-1 -right-1">
                <span className="animate-fadeInFast">✨</span>
              </div>
            )}
          </div>
          {withButtons && (
            <div className="flex gap-2 mt-2 flex-wrap animate-fadeInUp">
              <Button size="sm" color="primary" variant="flat" 
                startContent={<Wand2 className="w-3 h-3" />}
                className="transition-transform duration-300 hover:translate-y-[-2px]"
>
                Try Demo
              </Button>
              <Button size="sm" color="secondary" variant="flat"
                className="transition-transform duration-300 hover:translate-y-[-2px]">
                Learn More
              </Button>
              <Button size="sm" color="success" variant="flat"
                className="transition-transform duration-300 hover:translate-y-[-2px]">
                Get Started
              </Button>
            </div>
          )}
        </div>
        {!isBot && (
          <Avatar
            size="sm"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100"
            className="shrink-0"
          />
        )}
      </div>
    );
  };

  const renderSkeleton = () => (
    <div className={`space-y-4 ${isLoadingOut ? 'animate-skeletonFadeOut' : ''}`}>
      {[0.1, 0.2, 0.3].map((delay, index) => (
        <div 
          key={index} 
          className={`flex items-start gap-3 ${index === 1 ? 'justify-end' : ''} animate-skeletonFadeIn`}
          style={{ animationDelay: `${delay}s` }}
        >
          {index !== 1 && <div className="rounded-full w-8 h-8 bg-gray-200" />}
          <div className="space-y-2">
            <div className={`h-4 w-20 rounded-lg bg-gray-200 ${index === 1 ? 'ml-auto' : ''}`} />
            <div className={`h-${index === 1 ? '12' : index === 2 ? '20' : '16'} w-${index === 1 ? '48' : index === 2 ? '72' : '64'} rounded-lg bg-gray-200`} />
          </div>
          {index === 1 && <div className="rounded-full w-8 h-8 bg-gray-200" />}
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex justify-center w-full p-4">
      <Card className="w-full max-w-2xl">
        <CardBody className="p-4">
          <div className="flex items-center justify-between mb-6 pb-4 border-b">
            <div className="flex items-center gap-3">
              <Avatar
                size="sm"
                icon={<Bot className="w-4 h-4" />}
                className="bg-primary-100"
              />
              <div>
                <h4 className="text-medium font-semibold">Aiden AI</h4>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success animate-typingDot" />
                  <span className="text-success text-xs">Online & Ready!</span>
                </div>
              </div>
            </div>
            <Button 
              color="primary" 
              variant="light" 
              size="sm"
              startContent={<Sparkles className="w-4 h-4" />}
              className="transition-transform duration-300 hover:translate-y-[-2px]"
            >
              New Chat
            </Button>
          </div>

          {showSuggestions && showContent && (
            <div className="flex gap-2 mb-4 flex-wrap">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  size="sm"
                  color="primary"
                  variant="flat"
                  className="animate-suggestionFadeIn transition-transform duration-300 hover:translate-y-[-2px]"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          )}

          <div className="space-y-4 min-h-[400px] max-h-[400px] overflow-y-auto mb-4 scroll-smooth">
            <div className="transition-all">
              {isLoading ? (
                renderSkeleton()
              ) : (
                <>
                  {conversation.slice(0, conversationState).map((item, index) => {
                    if (item.type === 'typing') return null;
                    return renderMessage(item.message, item.type, item.withSparkle, item.withButtons);
                  })}
                  
                  {isTyping && (
                    <div className="flex gap-3 items-start animate-fadeInFast">
                      <Avatar
                        size="sm"
                        icon={<Bot className="w-4 h-4" />}
                        className="bg-primary-100"
                      />
                      <div className="flex flex-col gap-1">
                        <Chip color="primary" variant="flat" size="sm" className="self-start">Aiden</Chip>
                        <div className="space-y-2 p-2">
                          <div className="flex gap-2">
                            {[0, 0.3, 0.6].map((delay, i) => (
                              <span
                                key={i}
                                className="w-2 h-2 bg-primary rounded-full animate-typingDot"
                                style={{ animationDelay: `${delay}s` }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="flex gap-2 items-end animate-fadeInUp">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              endContent={
                <div className="flex gap-2">
                  <Button isIconOnly size="sm" variant="light" className="transition-transform duration-300 hover:translate-y-[-2px]">
                    <Mic className="w-4 h-4" />
                  </Button>
                  <Button isIconOnly size="sm" variant="light" className="transition-transform duration-300 hover:translate-y-[-2px]">
                    <ImageIcon className="w-4 h-4" />
                  </Button>
                  <Button isIconOnly size="sm" variant="light" className="transition-transform duration-300 hover:translate-y-[-2px]">
                    <Smile className="w-4 h-4" />
                  </Button>
                </div>
              }
            />
            <Button 
              isIconOnly 
              color="primary"
              className="transition-transform duration-300 hover:translate-y-[-2px]"
            >
              <SendHorizonal className="w-4 h-4" />
            </Button>
          </div>
        </CardBody>
      </Card>
      <style>{animations}</style>
    </div>
  );
};

export default ChatBotCard;