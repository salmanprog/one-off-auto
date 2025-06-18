import React, { useEffect, useState, useRef } from 'react';
import { getLoggedInUser, fetchChatSessionsForUser, User, ChatSession, ChatMessage, fetchChatMessages, sendChatMessage, fetchUserById } from '@/lib/api'; // Import necessary API functions and interfaces
import { FileText, Image, Mic, Paperclip, Send } from 'lucide-react'; // Import icons for different message types and attachment

interface UserMessagesProps {
  hideSidebar?: boolean;
}

const UserMessages: React.FC<UserMessagesProps> = ({ hideSidebar }) => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]); // State to hold messages for the selected session
  const [newMessageContent, setNewMessageContent] = useState(''); // State for the message input field
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // State to hold the selected file
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for the hidden file input
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false); // State for loading messages
  const [error, setError] = useState<string | null>(null);
  const [otherUsers, setOtherUsers] = useState<{[key: number]: User}>({}); // State to store other users' data

  useEffect(() => {
    // Fetch logged-in user
    getLoggedInUser()
      .then(user => {
        setLoggedInUser(user);
        setLoadingUser(false);
      })
      .catch(err => {
        console.error('Error fetching logged-in user:', err);
        setError('Failed to load user data.');
        setLoadingUser(false);
      });
  }, []);

  useEffect(() => {
    // Fetch chat sessions once logged-in user is available
    if (loggedInUser) {
      setLoadingSessions(true);
      fetchChatSessionsForUser(loggedInUser.id)
        .then(sessions => {
          setChatSessions(sessions);
          setLoadingSessions(false);
        })
        .catch(err => {
          console.error('Error fetching chat sessions:', err);
          setError('Failed to load chat sessions.');
          setLoadingSessions(false);
        });
    }
  }, [loggedInUser]);

  useEffect(() => {
    // Fetch messages when selectedSessionId changes
    if (selectedSessionId !== null) {
      setLoadingMessages(true);
      fetchChatMessages(selectedSessionId)
        .then(messages => {
          setMessages(messages);
          setLoadingMessages(false);
        })
        .catch(err => {
          console.error(`Error fetching messages for session ${selectedSessionId}:`, err);
          setError('Failed to load messages.');
          setLoadingMessages(false);
        });
    } else {
      setMessages([]); // Clear messages if no session is selected
    }
  }, [selectedSessionId]); // Refetch messages when selected session changes

  useEffect(() => {
    // Fetch user data for other participants in chat sessions
    if (chatSessions.length > 0 && loggedInUser) {
      const otherUserIds = chatSessions.map(session =>
        session.buyerId === loggedInUser.id ? session.sellerId : session.buyerId
      );
      // Fetch unique user IDs
      const uniqueUserIds = Array.from(new Set(otherUserIds));

      uniqueUserIds.forEach(userId => {
        if (!otherUsers[userId]) { // Avoid refetching already fetched users
          fetchUserById(userId)
            .then(user => {
              if (user) {
                setOtherUsers(prevUsers => ({ ...prevUsers, [userId]: user }));
              }
            })
            .catch(err => console.error(`Error fetching user ${userId}:`, err));
        }
      });
    }
  }, [chatSessions, loggedInUser, otherUsers]); // Refetch when sessions or loggedInUser change

  const handleSelectSession = (sessionId: number) => {
    setSelectedSessionId(sessionId);
    setMessages([]); // Clear messages when changing session
    setNewMessageContent(''); // Clear text input field
    setSelectedFile(null); // Clear selected file
  };

  const handleSendMessage = async () => {
    if (selectedSessionId !== null && loggedInUser) {
      try {
        if (selectedFile) {
          // Determine file type for mock message
          const fileType = selectedFile.type.startsWith('image/') ? 'image' : 'file';
          const placeholderUrl = fileType === 'image' ? 'https://via.placeholder.com/300/attached_image.jpg' : 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'; // Placeholder URL

          const newMessage = await sendChatMessage(
            selectedSessionId,
            loggedInUser.id,
            selectedFile.name, // Use file name as content for now, or add a caption field
            fileType,
            placeholderUrl,
            selectedFile.name
          );
          setMessages(prevMessages => [...prevMessages, newMessage]);
          setSelectedFile(null); // Clear selected file after sending
        } else if (newMessageContent.trim() !== '') {
          // Send text message
          const newMessage = await sendChatMessage(selectedSessionId, loggedInUser.id, newMessageContent, 'text');
          setMessages(prevMessages => [...prevMessages, newMessage]);
          setNewMessageContent('');
        }
      } catch (error) {
        console.error('Error sending message:', error);
        setError('Failed to send message.');
      }
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setNewMessageContent(''); // Clear text message when a file is selected
    }
  };

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const renderMessageContent = (message: ChatMessage) => {
    switch (message.type) {
      case 'text':
        return <p className="text-sm break-words">{message.content}</p>;
      case 'image':
        return message.url ? <img src={message.url} alt="Image" className="max-w-xs rounded-md" /> : <p>Invalid image message</p>;
      case 'file':
        return message.url ? (
          <a href={message.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline">
            <FileText size={16} className="mr-1" />
            {message.fileName || 'File'}
          </a>
        ) : <p>Invalid file message</p>;
      case 'voice':
        return message.url ? (
          <audio controls src={message.url}>
            Your browser does not support the audio element.
          </audio>
        ) : <p>Invalid voice message</p>;
      default:
        return <p>Unsupported message type</p>;
    }
  };

  return (
    <div className={hideSidebar ? "h-full" : "flex h-full"}>
      {!hideSidebar && (
        <aside className="w-64 bg-gray-100 p-4 overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">Chats</h3>
          {loadingUser || loadingSessions ? (
            <p>Loading chats...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : chatSessions.length === 0 ? (
            <p>No chats found.</p>
          ) : (
            <ul className="space-y-2">
              {chatSessions.map(session => {
                const otherParticipantId = session.buyerId === loggedInUser?.id ? session.sellerId : session.buyerId;
                const otherUser = otherUsers[otherParticipantId];
                const latestMessage = session.messages[session.messages.length - 1]; // Get latest message (mock)

                return (
                  <li
                    key={session.id}
                    className={`cursor-pointer p-2 rounded ${selectedSessionId === session.id ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
                    onClick={() => handleSelectSession(session.id)}
                  >
                    <p className="font-medium">{otherUser ? otherUser.fullName || otherUser.username : 'Loading user...'}</p>
                    {/* Optionally show a snippet of the last message */}
                    {latestMessage && (
                      <p className="text-sm text-gray-600 truncate">
                        {latestMessage.type === 'text' ? latestMessage.content : `[${latestMessage.type.charAt(0).toUpperCase() + latestMessage.type.slice(1)}]`}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </aside>
      )}
      {/* Main chat area */}
      <main className="flex-1 p-4 flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Chatroom</h2>
        {loadingMessages ? (
          <p>Loading messages...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="flex flex-col h-full">
            {/* Messages Display Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-md">
              {messages.length === 0 ? (
                <p className="text-gray-400 text-center">No messages yet.</p>
              ) : (
                messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === loggedInUser?.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`rounded-lg p-3 max-w-[70%] ${message.senderId === loggedInUser?.id ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}
                    >
                      {renderMessageContent(message)}
                      <span className="text-xs opacity-75 mt-1 block text-right">
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Message Input Area */}
            <div className="mt-4 flex items-center">
              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileSelect}
              />
              {/* Attachment button */}
              <button
                onClick={handleAttachmentClick}
                className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                // Always enabled in popup
              >
                <Paperclip size={24} />
              </button>

              {selectedFile ? (
                <div className="flex-1 border rounded-md p-2 flex items-center justify-between">
                  <span className="text-sm truncate">{selectedFile.name}</span>
                  <button
                    onClick={() => setSelectedFile(null)}
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
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                  // Always enabled in popup
                />
              )}

              <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                disabled={!newMessageContent.trim() && !selectedFile}
              >
                 <Send size={24} />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserMessages; 