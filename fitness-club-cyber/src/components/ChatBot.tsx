import { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Hi there! I'm your Fitness Club assistant. How can I help you today?",
    sender: 'bot',
    timestamp: new Date(),
  },
];

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot thinking
    setTimeout(() => {
      getBotResponse(inputValue);
    }, 1000);
  };

  const getBotResponse = async (userInput: string) => {
    try {
      // Initialize Gemini API
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      console.log('API Key:', apiKey); // Debugging line
      console.log('API Key Type:', typeof apiKey); // Debugging line
      console.log('API Key Length:', apiKey ? apiKey.length : 'undefined'); // Debugging line
      
      // For now, always use rule-based responses for testing
      console.log('Using rule-based responses for testing');
      
      const lowerInput = userInput.toLowerCase();
      let response = "I'm sorry, I didn't understand that. Can you ask about our programs, events, or membership?";

      // Fitness Club specific responses
      if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
        response = "Hello! Welcome to our Fitness Club. How can I assist you today?";
      } else if (lowerInput.includes('program') || lowerInput.includes('offer')) {
        response = "We offer four main programs: Guided Strength Training, Cardio & Sports, Nutrition Guidance, and Community Events. Which one interests you most?";
      } else if (lowerInput.includes('strength') || lowerInput.includes('weight')) {
        response = "Our Guided Strength Training program offers personalized plans for all levels. We have certified trainers who can help with form correction and progression.";
      } else if (lowerInput.includes('cardio') || lowerInput.includes('running')) {
        response = "Our Cardio & Sports program includes basketball, badminton, swimming sessions, and cardio workshops. We also organize sports leagues!";
      } else if (lowerInput.includes('nutrition') || lowerInput.includes('diet')) {
        response = "Our Nutrition Guidance program offers personalized meal plans, supplement guidance, and healthy cooking workshops. We believe fitness starts in the kitchen!";
      } else if (lowerInput.includes('event') || lowerInput.includes('activity')) {
        response = "We have exciting events like FIT-A-THON (our biggest championship), Wellness Workshop Series, and Team Building Challenges. Check our Events section for upcoming dates!";
      } else if (lowerInput.includes('join') || lowerInput.includes('member')) {
        response = "To join, connect with us through our WhatsApp group or Instagram. Then attend our orientation session to learn about programs and meet members. No experience needed - just bring commitment!";
      } else if (lowerInput.includes('contact') || lowerInput.includes('email')) {
        response = "You can reach us at fitness@vit.ac.in or through our social media channels. We're happy to answer any questions!";
      } else if (lowerInput.includes('thank')) {
        response = "You're welcome! Is there anything else I can help you with?";
      }

      const botMessage: Message = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      return;
    } catch (error) {
      console.error('Error getting Gemini response:', error);
      
      // Fallback response if API fails
      const botMessage: Message = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble connecting right now. Please ask about our programs, events, or membership!",
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {isOpen ? (
        <div className="fixed bottom-24 right-6 w-full max-w-md h-[500px] bg-gray-900/90 backdrop-blur-lg border border-cyber-purple/30 rounded-2xl shadow-2xl z-50 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-cyber-purple/20">
            <h3 className="text-lg font-bold gradient-text">Fitness Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-cyber-purple to-cyber-blue text-white'
                      : 'bg-gray-800 text-gray-200'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-cyber-purple/20">
            <div className="flex gap-2">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about programs, events, or membership..."
                className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-gray-200 resize-none focus:outline-none focus:ring-2 focus:ring-cyber-purple/50"
                rows={2}
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="self-end p-2 bg-gradient-to-r from-cyber-purple to-cyber-blue rounded-xl hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-cyber-purple to-cyber-blue rounded-full shadow-lg hover:shadow-[0_0_30px_rgba(139,92,246,0.8)] transition-all z-50"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </button>
      )}
    </>
  );
};