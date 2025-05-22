import React, { useEffect } from "react";
import { useParams } from "react-router";
import { createSocketConnection } from "./utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";

const Chat = () => {
  const { targetUserId } = useParams();
 
  const user = useSelector((state) => state.user);
  const [messages, setMessages] = React.useState([]);
  const [newMessage, setNewMessage] = React.useState("");
  const userId = user?._id;
  const firstName = user?.firstName;

  const chatMessages = async () => {
    const messages = await axios.get(
      `http://localhost:3000/chat/${targetUserId}`,
      {
        withCredentials: true,
      }
    );
    
    const chatMessage = messages?.data?.messages.map((message) => {
      return {
        firstName: message?.senderId?.firstName,
        lastName: message?.senderId?.lastName,
        text: message?.text,
      };
    });
    setMessages(chatMessage);
  };
  useEffect(() => {
    chatMessages();
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    // as soon as the socket is created, the socket connection is made and joinChat event is emitted
    socket.emit("joinChat", { firstName, userId, targetUserId });

    socket.on("receiveMessage", ({ firstName, lastName, text }) => {
      
      setMessages((preMessage) => [
        ...preMessage,
        { firstName, lastName, text },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const returnMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-1/2 mx-auto bg-gray-800 rounded-lg shadow-lg p-6 mt-10 flex flex-col h-[80vh]">
      <h1 className="text-2xl font-bold text-center text-gray-300 mb-4 border-b border-gray-600 pb-2">
        Chat
      </h1>
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat ${user.firstName === msg.firstName ? 'chat-end' : 'chat-start'}`}

          >
            <div className="chat-header">
              {`${msg.firstName} ${msg.lastName}`}
            </div>
            <div className=" chat-bubble">{msg.text}</div>
          </div>
        ))}
      </div>

      {/* Input field & button */}
      <div className="mt-4 flex items-center gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
          className="input input-bordered w-full flex-1 bg-gray-500 text-white placeholder-gray-200 focus:outline-none"
        />
        <button className="btn btn-primary" onClick={returnMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;

// import React, { useState } from 'react';

// const Chat = () => {
//   const [activeChat, setActiveChat] = useState('anakin');
//   const [newMessage, setNewMessage] = useState("");

//   // Sample friends data
//   const friends = [
//     { id: 'anakin', name: 'Anakin Skywalker', status: 'online', avatar: 'AS', unread: 2 },
//     { id: 'obi', name: 'Obi-Wan Kenobi', status: 'online', avatar: 'OW', unread: 0 },
//     { id: 'yoda', name: 'Master Yoda', status: 'offline', avatar: 'MY', unread: 0 },
//     { id: 'padme', name: 'Padmé Amidala', status: 'online', avatar: 'PA', unread: 3 },
//     { id: 'mace', name: 'Mace Windu', status: 'away', avatar: 'MW', unread: 0 },
//   ];

//   // Chat message data by friend
//   const chatMessages = {
//     anakin: [
//       { id: 1, text: "It's over Anakin,\nI have the high ground.", sender: "start" },
//       { id: 2, text: "You underestimate my power!", sender: "end" }
//     ],
//     obi: [
//       { id: 1, text: "Hello there!", sender: "start" },
//       { id: 2, text: "General Kenobi!", sender: "end" }
//     ],
//     yoda: [
//       { id: 1, text: "Do or do not, there is no try.", sender: "start" }
//     ],
//     padme: [
//       { id: 1, text: "Have you ever been to Naboo?", sender: "start" },
//       { id: 2, text: "It's the most beautiful place in the galaxy.", sender: "end" },
//       { id: 3, text: "We should visit sometime!", sender: "start" }
//     ],
//     mace: [
//       { id: 1, text: "Take a seat, young Skywalker.", sender: "start" }
//     ]
//   };

//   const [messages, setMessages] = useState(chatMessages);

//   const handleSendMessage = () => {
//     if (newMessage.trim() === "") return;

//     const updatedMessages = { ...messages };
//     updatedMessages[activeChat] = [
//       ...updatedMessages[activeChat],
//       {
//         id: updatedMessages[activeChat].length + 1,
//         text: newMessage,
//         sender: "end"
//       }
//     ];

//     setMessages(updatedMessages);
//     setNewMessage("");

//     // Simulate a response after a short delay
//     setTimeout(() => {
//       const responseMessages = { ...messages };
//       responseMessages[activeChat] = [
//         ...updatedMessages[activeChat],
//         {
//           id: updatedMessages[activeChat].length + 1,
//           text: getAutoResponse(activeChat),
//           sender: "start"
//         }
//       ];
//       setMessages(responseMessages);
//     }, 1000);
//   };

//   const getAutoResponse = (chatId) => {
//     const responses = {
//       anakin: "Don't try it!",
//       obi: "May the Force be with you.",
//       yoda: "Much to learn, you still have.",
//       padme: "Naboo is peaceful - we have no weapons.",
//       mace: "The Senate will decide your fate."
//     };
//     return responses[chatId] || "I'll respond soon.";
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'online': return 'bg-green-500';
//       case 'away': return 'bg-yellow-500';
//       default: return 'bg-gray-500';
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-900 text-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
//         <div className="p-4 border-b border-gray-700">
//           <h1 className="text-xl font-bold text-blue-400">Star Wars Chat</h1>
//         </div>

//         {/* Friends list */}
//         <div className="flex-grow overflow-y-auto">
//           <div className="p-2">
//             <h2 className="text-sm font-medium text-gray-400 p-2">FRIENDS</h2>

//             {friends.map((friend) => (
//               <div
//                 key={friend.id}
//                 onClick={() => setActiveChat(friend.id)}
//                 className={`flex items-center p-3 rounded-lg cursor-pointer mb-1 ${
//                   activeChat === friend.id ? 'bg-gray-700' : 'hover:bg-gray-700'
//                 }`}
//               >
//                 {/* Avatar */}
//                 <div className="avatar placeholder mr-3">
//                   <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
//                     {friend.avatar}
//                   </div>
//                 </div>

//                 {/* Friend info */}
//                 <div className="flex-grow">
//                   <div className="flex justify-between">
//                     <span className="font-medium">{friend.name}</span>
//                     {friend.unread > 0 && (
//                       <span className="bg-blue-600 text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                         {friend.unread}
//                       </span>
//                     )}
//                   </div>
//                   <div className="flex items-center text-sm text-gray-400">
//                     <span className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(friend.status)}`}></span>
//                     <span>{friend.status}</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* User profile */}
//         <div className="p-4 border-t border-gray-700 flex items-center">
//           <div className="avatar placeholder mr-3">
//             <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
//               OW
//             </div>
//           </div>
//           <div>
//             <div className="font-medium">Obi-Wan Kenobi</div>
//             <div className="flex items-center text-sm text-gray-400">
//               <span className="w-2 h-2 rounded-full mr-2 bg-green-500"></span>
//               <span>Online</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Chat area */}
//       <div className="flex-grow flex flex-col">
//         {/* Chat header */}
//         <div className="px-6 py-4 border-b border-gray-700 flex items-center">
//           <div className="avatar placeholder mr-3">
//             <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
//               {friends.find(f => f.id === activeChat)?.avatar}
//             </div>
//           </div>
//           <div>
//             <div className="font-medium">{friends.find(f => f.id === activeChat)?.name}</div>
//             <div className="flex items-center text-sm text-gray-400">
//               <span className={`w-2 h-2 rounded-full mr-2 ${
//                 getStatusColor(friends.find(f => f.id === activeChat)?.status || 'offline')
//               }`}></span>
//               <span>{friends.find(f => f.id === activeChat)?.status}</span>
//             </div>
//           </div>
//         </div>

//         {/* Messages */}
//         <div className="flex-grow p-6 overflow-y-auto bg-gray-900">
//           <div className="flex flex-col space-y-4">
//             {messages[activeChat].map((message) => (
//               <div
//                 key={message.id}
//                 className={`chat ${message.sender === "start" ? "chat-start" : "chat-end"}`}
//               >
//                 <div className="chat-image avatar placeholder">
//                   <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
//                     {message.sender === "start"
//                       ? friends.find(f => f.id === activeChat)?.avatar
//                       : "OW"}
//                   </div>
//                 </div>
//                 <div
//                   className={`chat-bubble p-3 rounded-lg max-w-xs md:max-w-md ${
//                     message.sender === "start"
//                       ? "bg-gray-700 text-white"
//                       : "bg-blue-600 text-white"
//                   }`}
//                 >
//                   {message.text.split('\n').map((line, i) => (
//                     <React.Fragment key={i}>
//                       {line}
//                       {i < message.text.split('\n').length - 1 && <br />}
//                     </React.Fragment>
//                   ))}
//                 </div>
//                 <div className="chat-footer opacity-50 text-xs">
//                   {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Message input */}
//         <div className="p-4 border-t border-gray-700">
//           <div className="flex bg-gray-800 rounded-lg">
//             <input
//               type="text"
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               onKeyPress={handleKeyPress}
//               placeholder="Type a message..."
//               className="flex-grow p-3 bg-gray-800 rounded-l-lg focus:outline-none text-gray-100"
//             />
//             <button
//               onClick={handleSendMessage}
//               className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-r-lg focus:outline-none"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;
