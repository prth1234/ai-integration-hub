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
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@nextui-org/react";
import { Send, Bot, Sparkles, Copy, Search, Wand2, MessageSquareMore, Share2 } from "lucide-react";

export default function ChatBotMain() {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

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

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const MessageActions = ({ text }) => (
    <Popover placement="top">
      <PopoverTrigger>
        <Button
          isIconOnly
          variant="light"
          size="sm"
          className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-2 top-2"
        >
          <MessageSquareMore className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-2">
        <div className="flex flex-col gap-2">
          <Button 
            variant="flat" 
            className="bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800"
            startContent={<Copy className="w-4 h-4" />}
            onClick={() => handleCopy(text)}
          >
            Copy
          </Button>
          <Button 
            variant="flat" 
            className="bg-purple-100 dark:bg-purple-900 hover:bg-purple-200 dark:hover:bg-purple-800"
            startContent={<Search className="w-4 h-4" />}
          >
            Lookup
          </Button>
          <Button 
            variant="flat" 
            className="bg-amber-100 dark:bg-amber-900 hover:bg-amber-200 dark:hover:bg-amber-800"
            startContent={<Wand2 className="w-4 h-4" />}
          >
            Rewrite
          </Button>
          <Button 
            variant="flat" 
            className="bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800"
            startContent={<MessageSquareMore className="w-4 h-4" />}
          >
            Explain
          </Button>
          <Button 
            variant="flat" 
            className="bg-rose-100 dark:bg-rose-900 hover:bg-rose-200 dark:hover:bg-rose-800"
            startContent={<Share2 className="w-4 h-4" />}
          >
            Share
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );

  const bubbles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    left: Math.random() * 100,
    animationDuration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="min-h-screen relative overflow-hidden bg-transparent">
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
                      className={`max-w-[80%] group transition-all duration-300 hover:scale-[1.02] ${
                        msg.sender === 'user' 
                          ? 'bg-black dark:bg-white' 
                          : 'bg-black/10 dark:bg-white/10'
                      } border-none relative`}
                    >
                      <CardBody className="p-3 relative overflow-hidden">
                        <p className={`text-sm select-text ${
                          msg.sender === 'user' 
                            ? 'text-white dark:text-black' 
                            : 'text-black dark:text-white'
                        }`}>
                          {msg.text}
                        </p>
                        {msg.sender === 'bot' && <MessageActions text={msg.text} />}
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

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-50px); }
        }
        
        @keyframes slideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}