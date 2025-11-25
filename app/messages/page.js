/**
 * Messages Page
 * Chat interface for buyer-seller communication
 */

'use client';

import Navbar from '@/components/layout/Navbar';
import Image from 'next/image';
import { useState } from 'react';

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(1);
  const [message, setMessage] = useState('');

  const conversations = [
    {
      id: 1,
      name: "Creative Studio BD",
      avatar: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=100&h=100&fit=crop",
      lastMessage: "Sure, I can deliver it by tomorrow",
      time: "2 min ago",
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: "Tech Pro BD",
      avatar: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=100&h=100&fit=crop",
      lastMessage: "The website is ready for review",
      time: "1 hour ago",
      unread: 0,
      online: false
    },
    {
      id: 3,
      name: "Garments Direct",
      avatar: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop",
      lastMessage: "We have 500 units in stock",
      time: "3 hours ago",
      unread: 1,
      online: true
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "them",
      text: "Hello! Thanks for your interest in our logo design service.",
      time: "10:30 AM"
    },
    {
      id: 2,
      sender: "me",
      text: "Hi! I need a professional logo for my startup. Can you show me some samples?",
      time: "10:32 AM"
    },
    {
      id: 3,
      sender: "them",
      text: "Of course! I'll send you our portfolio. What's your business about?",
      time: "10:35 AM"
    },
    {
      id: 4,
      sender: "me",
      text: "It's an e-commerce platform for SMEs in Bangladesh.",
      time: "10:37 AM"
    },
    {
      id: 5,
      sender: "them",
      text: "Great! I have experience with similar projects. When do you need it?",
      time: "10:40 AM"
    },
    {
      id: 6,
      sender: "me",
      text: "Can you deliver within 3 days?",
      time: "10:42 AM"
    },
    {
      id: 7,
      sender: "them",
      text: "Sure, I can deliver it by tomorrow if you confirm today!",
      time: "10:45 AM"
    },
  ];

  const currentChat = conversations.find(c => c.id === selectedChat);

  return (
    <div className="min-h-screen bg-gray-50 font-body flex flex-col">
      <Navbar />

      <div className="flex-1 container mx-auto px-6 py-8">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden h-[calc(100vh-200px)]">
          <div className="grid grid-cols-12 h-full">
            
            {/* Conversations List */}
            <div className="col-span-4 border-r border-gray-200 flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <h1 className="text-2xl font-bold text-gray-900 font-heading">Messages</h1>
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Conversation List */}
              <div className="flex-1 overflow-y-auto">
                {conversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedChat(conv.id)}
                    className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                      selectedChat === conv.id ? 'bg-primary/5' : ''
                    }`}
                  >
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                        <Image src={conv.avatar} alt={conv.name} width={48} height={48} className="object-cover" />
                      </div>
                      {conv.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-gray-900 truncate">{conv.name}</h3>
                        <span className="text-xs text-gray-500 flex-shrink-0">{conv.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                        {conv.unread > 0 && (
                          <span className="ml-2 bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0">
                            {conv.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="col-span-8 flex flex-col">
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                      <Image src={currentChat.avatar} alt={currentChat.name} width={48} height={48} className="object-cover" />
                    </div>
                    {currentChat.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">{currentChat.name}</h2>
                    <p className="text-sm text-gray-600">{currentChat.online ? 'Online' : 'Offline'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-md ${msg.sender === 'me' ? 'order-2' : 'order-1'}`}>
                      <div
                        className={`px-4 py-3 rounded-2xl ${
                          msg.sender === 'me'
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                      </div>
                      <p className={`text-xs text-gray-500 mt-1 ${msg.sender === 'me' ? 'text-right' : 'text-left'}`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </button>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-primary"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && message.trim()) {
                        // Handle send
                        setMessage('');
                      }
                    }}
                  />
                  <button className="p-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
