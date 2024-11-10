import React from 'react';
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { MessageCircle, Zap, Clock, Lock, Puzzle, Paintbrush } from 'lucide-react';
import ChatBotCard from '@/components/ChatBotCard';
import AppleCardsCarouselDemo from '../components/apple-cards-carousel';
import BackgroundLines from '@/components/BackgroundLines'
import { useNavbar } from '@nextui-org/navbar';
import { useNavigate } from 'react-router-dom';

// Add motion from framer-motion for animations


export default function ChatbotLanding() {
  const features = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Natural Conversations",
      description: "Advanced AI that understands context and nuance"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Instant responses and seamless performance at any scale"
    },
    {
      icon: <Paintbrush className="w-6 h-6" />,
      title: "Fully Customizable",
      description: "Tailor the appearance and behavior to match your brand perfectly"
    },
    {
      icon: <Puzzle className="w-6 h-6 text-blue-500" />,
      title: "Plug & Play",
      description: "Easy integration with any website or platform through our flexible API"
    }
  ];
  const navigate = useNavigate()
  const handleDemo = () => {
    navigate('/chat');
};

  return (
    <DefaultLayout>
      <BackgroundLines />
      <div className="relative min-h-screen">
        
        <section className="relative flex flex-col items-center justify-center gap-6 py-8 md:py-10">
          <div className="inline-block max-w-lg text-center justify-center">
            <span className={title()}>Hi 👋🏻&nbsp;</span>
            <span className={title({ color: "violet" })}>I am Aiden&nbsp;</span>
            <br />
            <span className={title()}>
              Advanced AI Chatbot Integration Hub
            </span>
            <div className={subtitle({ class: "mt-4" })} style={{color: 'grey'}}>
              Where seamless integration meets arisnal customization          
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              size="lg"
              color="primary"
              variant="shadow"
              radius="full"
              className="font-semibold"
              onClick={handleDemo}
            >
              Try Demo
            </Button>
            <Button
              size="lg"
              variant="bordered"
              radius="full"
              className="font-semibold"
            >
              Documentation
            </Button>
          </div>

          <div className="w-full max-w-5xl mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((feature, index) => (
                <Card key={index} className="p-4">
                  <CardBody className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-2 rounded-full bg-primary/10 text-primary">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-default-500">{feature.description}</p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
          <ChatBotCard />
          <AppleCardsCarouselDemo />
        </section>
      </div>
    </DefaultLayout>
  );
}