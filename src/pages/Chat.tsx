
import React, { useState } from 'react';
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import { Menu, Send, Search, MoreVertical, Phone, Video } from 'lucide-react';

const Chat = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [message, setMessage] = useState('');

  const conversations = [
    { id: 1, name: 'Alice Johnson', lastMessage: 'Hey, how are you?', time: '2m ago', unread: 3 },
    { id: 2, name: 'Bob Smith', lastMessage: 'Can we schedule a meeting?', time: '5m ago', unread: 0 },
    { id: 3, name: 'Carol White', lastMessage: 'Thanks for the update!', time: '1h ago', unread: 1 },
    { id: 4, name: 'David Brown', lastMessage: 'See you tomorrow', time: '2h ago', unread: 0 },
  ];

  const messages = [
    { id: 1, sender: 'Alice Johnson', content: 'Hey, how are you?', time: '10:30 AM', isOwn: false },
    { id: 2, sender: 'You', content: 'I\'m doing great! How about you?', time: '10:32 AM', isOwn: true },
    { id: 3, sender: 'Alice Johnson', content: 'Doing well, thanks for asking!', time: '10:33 AM', isOwn: false },
  ];

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white font-outfit">
      <div className="flex">
        <DashboardSidebar
          onSidebarHide={() => setShowSidebar(false)}
          showSidebar={showSidebar}
        />
        <div className="flex-1 flex overflow-hidden ml-0 sm:ml-20 xl:ml-60">
          {/* Conversations List */}
          <div className="w-80 bg-[#171717] border-r border-gray-800 flex flex-col">
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={() => setShowSidebar(true)}
                  className="block sm:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <Menu size={20} />
                </button>
                <h2 className="text-xl font-bold">Messages</h2>
              </div>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2 bg-[#2d2d2d] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conv) => (
                <div key={conv.id} className="p-4 border-b border-gray-800 hover:bg-white/5 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {conv.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-white truncate">{conv.name}</h3>
                        <span className="text-xs text-gray-500">{conv.time}</span>
                      </div>
                      <p className="text-sm text-gray-400 truncate">{conv.lastMessage}</p>
                    </div>
                    {conv.unread > 0 && (
                      <div className="w-5 h-5 bg-pink-600 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white">{conv.unread}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 bg-[#171717] border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                  AJ
                </div>
                <div>
                  <h3 className="font-medium text-white">Alice Johnson</h3>
                  <p className="text-xs text-green-400">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                  <Phone size={18} className="text-gray-400" />
                </button>
                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                  <Video size={18} className="text-gray-400" />
                </button>
                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                  <MoreVertical size={18} className="text-gray-400" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((msg) => (
                <div key={msg.id} className={`mb-4 flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    msg.isOwn 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                      : 'bg-[#2d2d2d] text-white'
                  }`}>
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-xs mt-1 ${msg.isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 bg-[#171717] border-t border-gray-800">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 bg-[#2d2d2d] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors">
                  <Send size={18} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
