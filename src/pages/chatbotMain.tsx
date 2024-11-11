import React, { useState, useRef, useEffect } from 'react';
import ChatbotNavbar from "@/components/navbar_view1";
import {
  Input,
  Button,
  Card,
  CardBody,
  ScrollShadow,
  Spinner,
  Avatar,
} from "@nextui-org/react";
import { Send, Bot, Sparkles, Copy, Search, Wand2, MessageSquareMore, Share2 } from "lucide-react";

const GlobalStyles = () => (
  <style>{`
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-50px); }
    }
    
    @keyframes slideIn {
      from { 
        transform: translateY(20px); 
        opacity: 0; 
      }
      to { 
        transform: translateY(0); 
        opacity: 1; 
      }
    }
    
    @keyframes scaleIn {
      from { 
        transform: scale(0.9) translateY(10px); 
        opacity: 0; 
      }
      to { 
        transform: scale(1) translateY(0); 
        opacity: 1; 
      }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .animate-slideIn {
      animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    
    .animate-scaleIn {
      animation: scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    
    .animate-fadeIn {
      animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  `}</style>
);

export default function ChatBotMain() {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [selectionPosition, setSelectionPosition] = useState(null);
  const scrollRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const text = selection.toString().trim();
    
    if (text && text.length > 1) {  // Only show menu if more than 1 character is selected
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      setSelectedText(text);
      setSelectionPosition({
        top: rect.top - 25,
        left: rect.left + (rect.width / 2) - 60,
      });
    } else {
      setSelectedText('');
      setSelectionPosition(null);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setSelectedText('');
        setSelectionPosition(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('mouseup', handleTextSelection);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mouseup', handleTextSelection);
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(selectedText);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
    setSelectedText('');
    setSelectionPosition(null);
  };

  const SelectionMenu = () => {
    if (!selectedText || !selectionPosition) return null;

    const menuItems = [
      { 
        icon: Copy, 
        bg: "bg-gradient-to-r from-blue-500 to-cyan-500",
        label: "Copy",
        onClick: handleCopy
      },
      { 
        icon: Search, 
        bg: "bg-gradient-to-r from-purple-500 to-pink-500",
        label: "Search",
        onClick: () => {
          window.open(`https://www.google.com/search?q=${selectedText}`, '_blank');
          setSelectedText('');
          setSelectionPosition(null);
        }
      },
      { 
        icon: Wand2, 
        bg: "bg-gradient-to-r from-amber-500 to-orange-500",
        label: "Rewrite",
        onClick: () => {
          console.log('Rewrite:', selectedText);
          setSelectedText('');
          setSelectionPosition(null);
        }
      },
    ];

    return (
      <div
        ref={menuRef}
        className="fixed z-50 flex gap-0.5 p-1 bg-white/20 dark:bg-black/20 backdrop-blur-xl rounded-lg shadow-2xl border border-white/20 dark:border-white/10 animate-scaleIn"
        style={{
          top: `${selectionPosition.top}px`,
          left: `${selectionPosition.left}px`,
        }}
      >
        {menuItems.map(({ icon: Icon, bg, label, onClick }) => (
          <button
            key={label}
            onClick={onClick}
            className="group relative"
          >
            <div className={`
              p-1.5 rounded-md ${bg} shadow-lg 
              transition-all duration-300 
              hover:scale-110 hover:shadow-xl 
              active:scale-95
              ring-1 ring-transparent hover:ring-white/20
              backdrop-blur-sm
            `}>
              <Icon className="w-2.5 h-2.5 text-white transform transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="
              absolute -top-6 left-1/2 transform -translate-x-1/2 
              bg-black dark:bg-white text-white dark:text-black 
              text-[10px] font-medium py-0.5 px-1.5 rounded-md
              opacity-0 group-hover:opacity-100 
              transition-all duration-200 
              scale-95 group-hover:scale-100
              pointer-events-none
              shadow-xl
              whitespace-nowrap
            ">
              {label}
              <div className="
                absolute -bottom-1 left-1/2 transform -translate-x-1/2 
                w-1.5 h-1.5 bg-black dark:bg-white rotate-45
              "/>
            </div>
          </button>
        ))}
      </div>
    );
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (userInput.trim()) {
      const newMessages = [...messages, { text: userInput, sender: "user" }];
      setMessages(newMessages);
      setUserInput('');
      setIsLoading(true);
      setIsTyping(true);

      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsTyping(false);

      setTimeout(() => {
        setIsLoading(false);
        setMessages([...newMessages, { text: "This is an automated response", sender: "bot" }]);
      }, 2000);
    }
  };

  const bubbles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    left: Math.random() * 100,
    animationDuration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="min-h-screen relative overflow-hidden bg-transparent">
      <GlobalStyles />
      <SelectionMenu />
      
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full bg-black/5 dark:bg-white/5"
          style={{
            width: bubble.size + 'px',
            height: bubble.size + 'px',
            left: bubble.left + '%',
            animation: `float ${bubble.animationDuration}s infinite ease-in-out ${bubble.delay}s`,
            opacity: 0.1,
          }}
        />
      ))}

      <div className="h-screen flex flex-col">
        <ChatbotNavbar />
        
        <Card className="flex-grow m-4 bg-transparent border-none motion-safe:animate-fadeIn">
          <CardBody className="p-0 h-full flex flex-col">
            <ScrollShadow ref={scrollRef} className="flex-grow p-4">
              <div className="max-w-4xl mx-auto space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} motion-safe:animate-slideIn`}
                  >
                    {msg.sender === 'bot' && (
                      <Avatar
                        icon={<Bot />}
                        classNames={{
                          base: "bg-black/10 dark:bg-white/10 motion-safe:animate-scaleIn",
                          icon: "text-black dark:text-white",
                        }}
                      />
                    )}
                    <Card
                      className={`max-w-[80%] transition-all duration-300 hover:scale-[1.02] ${
                        msg.sender === 'user' 
                          ? 'bg-black dark:bg-white' 
                          : 'bg-black/10 dark:bg-white/10'
                      } border-none`}
                    >
                      <CardBody className="p-3 relative overflow-hidden">
                        <p className={`text-sm ${
                          msg.sender === 'user' 
                            ? 'text-white dark:text-black' 
                            : 'text-black dark:text-white'
                        }`}>
                          {msg.text}
                        </p>
                      </CardBody>
                    </Card>
                    {msg.sender === 'user' && (
                      <Avatar
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                        className="motion-safe:animate-scaleIn"
                      />
                    )}
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex items-start gap-2 motion-safe:animate-slideIn">
                    <Avatar
                      icon={<Bot />}
                      classNames={{
                        base: "bg-black/10 dark:bg-white/10",
                        icon: "text-black dark:text-white",
                      }}
                    />
                    <Card className="bg-black/10 dark:bg-white/10 border-none">
                      <CardBody className="p-3">
                        {isTyping ? (
                          <div className="flex gap-1">
                            <span className="w-2 h-2 rounded-full bg-black dark:bg-white animate-bounce [animation-delay:-0.3s]" />
                            <span className="w-2 h-2 rounded-full bg-black dark:bg-white animate-bounce [animation-delay:-0.15s]" />
                            <span className="w-2 h-2 rounded-full bg-black dark:bg-white animate-bounce" />
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Spinner size="sm" />
                            <p className="text-sm text-black dark:text-white">
                              AI is thinking...
                            </p>
                          </div>
                        )}
                      </CardBody>
                    </Card>
                  </div>
                )}
              </div>
            </ScrollShadow>

            <Card className="m-4 bg-transparent border-none">
              <CardBody className="p-4">
                <form 
                  onSubmit={handleSendMessage}
                  className="max-w-4xl mx-auto relative group w-full"
                >
                  <Input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your message..."
                    variant="bordered"
                    radius="full"
                    size="lg"
                    classNames={{
                      input: "text-base",
                      inputWrapper: "bg-black/5 dark:bg-white/5 transition-all duration-300 group-hover:bg-black/10 dark:group-hover:bg-white/10 group-hover:scale-[1.01] w-full",
                    }}
                    startContent={
                      <Sparkles className="text-black dark:text-white w-5 h-5 animate-pulse" />
                    }
                    endContent={
                      <Button
                        type="submit"
                        isIconOnly
                        variant="flat"
                        radius="full"
                        size="sm"
                        className="bg-black dark:bg-white text-white dark:text-black transition-all duration-300 hover:scale-110 hover:opacity-80 hover:shadow-lg"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    }
                  />
                </form>
              </CardBody>
            </Card>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}