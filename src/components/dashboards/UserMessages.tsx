import React, { useEffect, useState, useRef } from 'react';
import { useSocket } from "../sockets/SocketContext"; // Import socket from context
import { Paperclip, Send } from 'lucide-react'; // Import icons
import Helper from "../../helpers";
import { useFetch } from "../../hooks/request";

interface UserMessagesProps {
  hideSidebar?: boolean;
  listing?: any;  // Changed `listing` type to `any` to support undefined or null
}

const UserMessages: React.FC<UserMessagesProps> = ({ hideSidebar, listing }) => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]); // Messages for selected session
  const [newMessageContent, setNewMessageContent] = useState(''); // Message input content
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // File selected for message
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for file input
  const socket = useSocket(); // Get socket instance from context
  const authUser = Helper.getStorageData("session");
  const { data } = useFetch("chat_listing");
  const { postData } = useFetch("upload_media", "submit");
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    // Only set logged-in user on mount
    setLoggedInUser(authUser);
  }, []);  // Empty dependency array ensures this runs only once on mount

  // Listen for incoming messages and recent chat messages
  useEffect(() => {
    if (socket && loggedInUser) {
      // Listen for incoming messages
      socket.on('_recieve_message', (newMessage: ChatMessage) => {
        if (newMessage.data?.reciever_id === loggedInUser.id) {
          setMessages((prevMessages) => [...prevMessages, newMessage.data]);
        }
      });

      // Listen for recent chat messages
      socket.on('_recent_chat', (response: { code: number; message: string; data: ChatMessage[] }) => {
        if (response.code === 200) {
          setMessages(response.data); // Set messages with the recent chat data
        } else {
          console.error('Failed to retrieve recent chat.');
        }
      });

      // Cleanup when the component unmounts
      return () => {
        socket.off('_recieve_message');
        socket.off('_recent_chat');
      };
    }
  }, [socket, loggedInUser]); // This effect depends on `socket` and `loggedInUser`

  useEffect(() => {
    if (loggedInUser && listing) {
      const messageParams = {
        reciever_id: listing.user_id?.toString(),  // Ensure `listing.user_id` is not undefined
        sender_id: loggedInUser.id?.toString(),  // Ensure `loggedInUser.id` is not undefined
      };

      if (messageParams.reciever_id && messageParams.sender_id) {
        socket?.emit('_load_recent_chat', messageParams);
        socket?.emit('_sender_read_messages', {reciever_id: loggedInUser.id?.toString()}, (response: any) => {
            if (response.code === 200) {
              console.log('MyMessage:', response.data.total_messages);
            }  
          });
      } else {
        console.error("Invalid user or listing data");
      }
    }
  }, [loggedInUser, listing, socket]); // Run this effect when loggedInUser or listing changes

  const handleSendMessage = async () => {
    const currentChatTarget = selectedUser || listing;
  
    if (loggedInUser && socket && currentChatTarget) {
      let messageContent = newMessageContent.trim();
      let type = 'text';
  
      if (uploadedImageUrl) {
        messageContent = uploadedImageUrl;
        type = 'image';
      }
  
      if (!messageContent) return;
  
      const message = {
        reciever_id: currentChatTarget.user?.id?.toString() || currentChatTarget.user_id?.toString(),
        sender_id: loggedInUser.id?.toString(),
        message: messageContent,
        type: type,
      };
  
      console.log("Sending message:", message); // For debug
  
      socket.emit('_send_message', message, (response: any) => {
        if (response.code === 200) {
          console.log('Message sent successfully:', response.data);
  
          setMessages(prevMessages => [
            ...prevMessages,
            { ...response.data, id: Date.now(), timestamp: new Date().toISOString() }
          ]);
  
          setNewMessageContent('');
          setUploadedImageUrl(null);
  
          socket?.emit('_user_chat_read_unread_messages', {
            sender_id: loggedInUser.id?.toString(),
            reciever_id: message.reciever_id,
          }, (response: any) => {
            if (response.code === 200) {
              console.log('Message Total successfully:', response.data.total_messages);
            }
          });
        } else {
          console.error('Error sending message:', response.message);
        }
      });
    } else {
      console.warn("No chat target (listing or selectedUser) found.");
    }
  };

  const handleSelectSession = (userId: number) => {
    const selected = data.find((chat) => chat.user.id === userId);
    if (!selected || !loggedInUser) return;
  
    setSelectedUser(selected);
  
    const messageParams = {
      reciever_id: selected.user.id.toString(),
      sender_id: loggedInUser.id.toString(),
    };
  
    socket?.emit('_load_recent_chat', messageParams);
  
    socket?.emit('_sender_read_messages', { reciever_id: loggedInUser.id.toString() }, (response: any) => {
      if (response.code === 200) {
        console.log('MyMessage:', response.data.total_messages);
      }
    });
  };

  const uploadFile = async (file: File) => {
    try {
      const fd = new FormData();
      fd.append("file_url", file);
      fd.append("file_type", 'image');
      fd.append("thumbnail_url", file);
     
      const callback = (receivedData: any) => {
        const fileUrl = receivedData?.data?.file_url;
        setUploadedImageUrl(fileUrl);
      };
      postData(fd, callback);
     
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div className={hideSidebar ? "h-full" : "flex h-full"}>
      {!listing && (
        <aside className="w-64 bg-gray-100 p-4 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Chats</h3>
      
        {!data ? (
          <p className="text-red-500">Something went wrong. Please reload.</p>
        ) : data.length === 0 ? (
          <p>No chats found.</p>
        ) : (
          <ul className="space-y-2">
            {data.map((chat_history) => (
              <li
                key={chat_history.id}
                className="cursor-pointer p-2 rounded bg-blue-200 hover:bg-blue-300 transition"
                onClick={() => handleSelectSession(chat_history.user.id)}
              >
                <div className="flex items-center space-x-2">
                  <img
                    src={chat_history.user?.image_url || '/default-avatar.png'}
                    alt={chat_history.user?.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <p className="font-medium text-sm">{chat_history.user?.name || 'Unknown User'}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </aside>
      )}
      {/* Main chat area */}
      <main className="flex-1 p-4 flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Send a Message to {listing?.vehicle_owner_name}</h2>

        <div className="flex flex-col h-full">
          {/* Messages Display Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-md">
            {messages.length === 0 ? (
              <p className="text-gray-400 text-center">No messages yet.</p>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender_id === loggedInUser?.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex items-center space-x-2">
                    {message.sender_id !== loggedInUser?.id && (
                      <div className="flex items-center">
                        <img
                          src={message.user?.image_url}
                          alt="User"
                          className="w-10 h-10 rounded-full mr-2"
                        />
                        <p className="text-sm font-semibold">{message.user?.name || 'Unknown'}</p> 
                      </div>
                    )}
                    <div
                      className={`rounded-lg p-3 max-w-[70%] ${message.sender_id === loggedInUser?.id ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`} // Color the sender's and receiver's messages differently
                    >
                      {/* Render the content of the message */}
                      {message.type === 'text' && (
                        <p className="text-sm break-words">{message.message}</p>
                      )}
                      {message.type === 'image' && (
                        <img
                          src={message.message}
                          alt="Sent"
                          className="max-w-[200px] rounded-md border"
                        />
                      )}
                    </div>
                    {message.sender_id === loggedInUser?.id && (
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-semibold">{message.user?.name}</p> {/* Display sender's name */}
                        <img
                          src={message.user?.image_url} // Access sender's image
                          alt="User"
                          className="w-10 h-10 rounded-full ml-2"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Message Input Area */}
          <div className="mt-4 flex items-center space-x-2">
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
                const maxSizeMB = 5;

                if (!allowedTypes.includes(file.type)) {
                  alert("Only JPEG, PNG, or WEBP images are allowed.");
                  return;
                }

                if (file.size > maxSizeMB * 1024 * 1024) {
                  alert(`Image size should be less than ${maxSizeMB}MB.`);
                  return;
                }
                if (file) {
                  //setSelectedFile(file);
                  uploadFile(file); // <- Upload on select
                }
              }}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <Paperclip size={24} />
            </button>

            {uploadedImageUrl ? (
                <div className="flex-1 border rounded-md p-2 flex items-center justify-between">
                  <span className="text-sm text-blue-600 truncate">{uploadedImageUrl}</span>
                  <button
                    onClick={() => setUploadedImageUrl(null)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    &times;
                  </button>
                </div>
              ) : (
                <input
                  type="text"
                  className="flex-1 border rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type a message..."
                  value={newMessageContent}
                  onChange={(e) => setNewMessageContent(e.target.value)}
                />
              )}
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              disabled={!newMessageContent.trim() && !uploadedImageUrl}
            >
              <Send size={24} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserMessages;
