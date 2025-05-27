import { type } from "os";

// Mock Data Structures
export interface User {
  id: number;
  username: string; // Using username as email
  fullName?: string; // Added fullName field
  email?: string; // Added email field
  profileImageUrl?: string; // Added profile image URL field
  phoneNumber?: string; // Added phone number field
  status: string;
  registrationDate: string;
}

export interface Listing {
  id: number;
  make: string;
  model: string;
  year: number;
  price: string;
  seller: string; // Add seller field to link listings to users
  status: string;
  datePosted: string;
  vehicleType?: string;
  listingTitle?: string;
  description?: string;
  modifications?: string;
}

export interface RecentActivity {
  id: number;
  description: string;
  timestamp: string;
}

export interface ChatMessage {
  id: number;
  sessionId: number;
  senderId: number;
  content?: string; // Make content optional
  timestamp: string;
  type: 'text' | 'image' | 'file' | 'voice'; // Add type field
  url?: string; // Add url for media/files
  fileName?: string; // Add fileName for files
}

export interface ChatSession {
  id: number;
  listingId: number;
  buyerId: number;
  sellerId: number;
  messages: ChatMessage[];
  createdAt: string;
}

interface OverviewStats {
  totalUsers: number;
  activeListings: number;
  pendingListings: number;
}

// Mock Data
const mockUsers: User[] = [
  { id: 1, username: 'john.doe@example.com', fullName: 'John Doe', email: 'john.doe@example.com', profileImageUrl: 'https://via.placeholder.com/150', phoneNumber: '123-456-7890', status: 'Active', registrationDate: '2023-10-20' },
  { id: 2, username: 'jane.smith@example.com', fullName: 'Jane Smith', email: 'jane.smith@example.com', profileImageUrl: 'https://via.placeholder.com/150', phoneNumber: '098-765-4321', status: 'Active', registrationDate: '2023-11-01' },
  { id: 3, username: 'admin.user@example.com', fullName: 'Admin User', email: 'admin.user@example.com', profileImageUrl: 'https://via.placeholder.com/150', phoneNumber: '555-555-5555', status: 'Active', registrationDate: '2023-09-15' },
  { id: 4, username: 'buyer.user@example.com', fullName: 'Buyer User', email: 'buyer.user@example.com', profileImageUrl: 'https://via.placeholder.com/150', phoneNumber: '111-222-3333', status: 'Active', registrationDate: '2024-01-01' },
  // Add more mock users
];

let mockListings: Listing[] = [
  { id: 101, make: 'Toyota', model: 'Camry', year: 2020, price: '$18,500', seller: 'john.doe@example.com', status: 'Active', datePosted: '2023-10-27', vehicleType: 'Sedan', listingTitle: 'Clean Toyota Camry', description: 'Well-maintained sedan.', modifications: 'None' },
  { id: 102, make: 'Honda', model: 'Civic', year: 2018, price: '$14,000', seller: 'jane.smith@example.com', status: 'Pending Approval', datePosted: '2023-11-10', vehicleType: 'Coupe', listingTitle: 'Sporty Honda Civic', description: 'Low mileage, single owner.', modifications: 'Spoiler' },
  { id: 103, make: 'Ford', model: 'F-150', year: 2015, price: '$22,000', seller: 'john.doe@example.com', status: 'Sold', datePosted: '2023-10-01', vehicleType: 'Truck', listingTitle: 'Reliable Ford F-150', description: 'Great for work or leisure.', modifications: 'Lift kit' },
  // Add more mock listings
];

const mockRecentActivity: RecentActivity[] = [
    { id: 1, description: 'New user registered: John Doe', timestamp: '2023-11-15 10:00' },
    { id: 2, description: 'New listing created: 2023 Honda Civic', timestamp: '2023-11-15 10:30' },
    { id: 3, description: 'Listing status updated: 2018 Ford F-150 marked as sold', timestamp: '2023-11-14 15:00' },
    // Add more mock activity
];

const mockChatSessions: ChatSession[] = [
  {
    id: 1,
    listingId: 101, // Toyota Camry
    buyerId: 1, // John Doe
    sellerId: 2, // Jane Smith (Corrected seller ID for demo)
    messages: [
      { id: 1, sessionId: 1, senderId: 1, content: 'Hi Jane, is the Camry still available?', timestamp: '2023-11-20T10:00:00Z', type: 'text' },
      { id: 2, sessionId: 1, senderId: 2, content: 'Hi John, Yes, it is!', timestamp: '2023-11-20T10:05:00Z', type: 'text' },
      { id: 5, sessionId: 1, senderId: 1, content: 'Great! Can you send some more pictures?', timestamp: '2023-11-20T10:10:00Z', type: 'text' },
      { id: 6, sessionId: 1, senderId: 2, url: 'https://via.placeholder.com/300/ছবি1.jpg', timestamp: '2023-11-20T10:15:00Z', type: 'image' },
      { id: 7, sessionId: 1, senderId: 2, url: 'https://www.africau.edu/images/default/sample.pdf', fileName: 'car_details.pdf', timestamp: '2023-11-20T10:20:00Z', type: 'file' },
    ],
    createdAt: '2023-11-20T10:00:00Z',
  },
  {
    id: 2,
    listingId: 102, // Honda Civic
    buyerId: 4, // Buyer User
    sellerId: 2, // Jane Smith
    messages: [
      { id: 3, sessionId: 2, senderId: 4, content: 'I am interested in the Civic. Can I see it this week?', timestamp: '2024-01-05T14:00:00Z', type: 'text' },
      { id: 4, sessionId: 2, senderId: 2, content: 'Hello! Yes, that should be possible. What day works for you?', timestamp: '2024-01-05T14:15:00Z', type: 'text' },
      { id: 8, sessionId: 2, senderId: 4, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', timestamp: '2024-01-05T14:30:00Z', type: 'voice' },
    ],
    createdAt: '2024-01-05T14:00:00Z',
  },
];
let nextChatSessionId = 3;
let nextChatMessageId = 9;

// Mock logged-in user (for demonstration)
const mockLoggedInUser: User = { id: 1, username: 'john.doe@example.com', fullName: 'John Doe', email: 'john.doe@example.com', profileImageUrl: 'https://via.placeholder.com/150', phoneNumber: '123-456-7890', status: 'Active', registrationDate: '2023-10-20' };

// Mock API Functions

export const fetchOverviewStats = (): Promise<OverviewStats> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalUsers: mockUsers.length,
        activeListings: mockListings.filter(listing => listing.status === 'Active').length,
        pendingListings: mockListings.filter(listing => listing.status === 'Pending Approval').length,
      });
    }, 500); // Simulate network delay
  });
};

export const fetchUsers = (): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUsers);
    }, 500); // Simulate network delay
  });
};

// Function to fetch listings, optionally filtered by seller
export const fetchListings = (sellerUsername?: string): Promise<Listing[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let listingsToReturn = mockListings;
      if (sellerUsername) {
        listingsToReturn = mockListings.filter(listing => listing.seller === sellerUsername);
      }
      resolve(listingsToReturn);
    }, 500); // Simulate network delay
  });
};

export const fetchRecentActivity = (): Promise<RecentActivity[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockRecentActivity);
      }, 500); // Simulate network delay
    });
};

export const updateUserStatus = (userId: number, status: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const userIndex = mockUsers.findIndex(user => user.id === userId);
            if (userIndex !== -1) {
                mockUsers[userIndex].status = status;
                console.log(`Mock: User ${userId} status updated to ${status}`);
                resolve();
            } else {
                reject(new Error(`User with ID ${userId} not found`));
            }
        }, 500); // Simulate network delay
    });
};

export const updateListingStatus = (listingId: number, status: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const listingIndex = mockListings.findIndex(listing => listing.id === listingId);
            if (listingIndex !== -1) {
                mockListings[listingIndex].status = status;
                console.log(`Mock: Listing ${listingId} status updated to ${status}`);
                resolve();
            } else {
                reject(new Error(`Listing with ID ${listingId} not found`));
            }
        }, 500); // Simulate network delay
    });
};

export const updateListingData = (listingId: number, updatedData: Partial<Listing>): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const listingIndex = mockListings.findIndex(listing => listing.id === listingId);
            if (listingIndex !== -1) {
                // Update only the fields provided in updatedData
                mockListings[listingIndex] = { ...mockListings[listingIndex], ...updatedData };
                console.log(`Mock: Listing ${listingId} data updated`, mockListings[listingIndex]);
                resolve();
            } else {
                reject(new Error(`Listing with ID ${listingId} not found`));
            }
        }, 500); // Simulate network delay
    });
};

export const deleteListing = (listingId: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const initialLength = mockListings.length;
            const filteredListings = mockListings.filter(listing => listing.id !== listingId);
            if (filteredListings.length < initialLength) {
                // @ts-ignore
                mockListings = filteredListings; // Update the mock array
                console.log(`Mock: Listing ${listingId} deleted.`);
                resolve();
            } else {
                reject(new Error(`Listing with ID ${listingId} not found for deletion`));
            }
        }, 500); // Simulate network delay
    });
};

export const getLoggedInUser = (): Promise<User> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockLoggedInUser);
        }, 200); // Simulate quick check
    });
};

export const fetchUserByUsername = (username: string): Promise<User | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const user = mockUsers.find(user => user.username === username);
            console.log(`Mock: Fetching user by username ${username}. Found:`, user);
            resolve(user);
        }, 300); // Simulate network delay
    });
};

export const updateUserData = (userId: number, updatedData: Partial<User>): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const userIndex = mockUsers.findIndex(user => user.id === userId);
            if (userIndex !== -1) {
                // Update only the fields provided in updatedData
                mockUsers[userIndex] = { ...mockUsers[userIndex], ...updatedData };
                console.log(`Mock: User ${userId} data updated`, mockUsers[userIndex]);
                resolve();
            } else {
                reject(new Error(`User with ID ${userId} not found`));
            }
        }, 500); // Simulate network delay
    });
};

export const changePassword = async (userId: number, currentPassword: string, newPassword: string): Promise<void> => {
    console.log(`Mock: Attempting to change password for user ${userId}. (Current password: ${currentPassword}, New password: ${newPassword})`);
    // In a real application, you would implement secure password hashing and comparison here.
    // For this mock, we'll just simulate a successful change after a delay.
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Mock: Password for user ${userId} changed successfully (simulated).`);
            resolve();
        }, 1000); // Simulate network delay for password change
    });
};

export const initiateChat = (listingId: number, buyerId: number, sellerId: number): Promise<ChatSession> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Check if a chat session already exists for this listing and buyer
      const existingSession = mockChatSessions.find(
        (session) =>
          session.listingId === listingId && session.buyerId === buyerId
      );

      if (existingSession) {
        console.log(
          `Mock: Existing chat session found for listing ${listingId} and buyer ${buyerId}.`
        );
        resolve(existingSession);
      } else {
        // Create a new chat session
        const newSession: ChatSession = {
          id: nextChatSessionId++,
          listingId,
          buyerId,
          sellerId,
          messages: [],
          createdAt: new Date().toISOString(),
        };
        mockChatSessions.push(newSession);
        console.log(
          `Mock: New chat session created for listing ${listingId} and buyer ${buyerId}.`
        );
        resolve(newSession);
      }
    }, 500);
  });
};

export const fetchChatMessages = (sessionId: number): Promise<ChatMessage[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const session = mockChatSessions.find((s) => s.id === sessionId);
      if (session) {
        console.log(
          `Mock: Fetching messages for chat session ${sessionId}.`
        );
        resolve(session.messages);
      } else {
        reject(new Error(`Chat session with ID ${sessionId} not found`));
      }
    }, 500);
  });
};

export const fetchUserById = (userId: number): Promise<User | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = mockUsers.find(user => user.id === userId);
      console.log(`Mock: Fetching user by ID ${userId}. Found:`, user);
      resolve(user);
    }, 200); // Simulate network delay
  });
};

export const fetchChatSessionsForUser = (userId: number): Promise<ChatSession[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Return sessions where the user is either the buyer or the seller
      const userSessions = mockChatSessions.filter(
        (session) => session.buyerId === userId || session.sellerId === userId
      );
      console.log(`Mock: Fetching chat sessions for user ${userId}. Found:`, userSessions);
      resolve(userSessions);
    }, 500); // Simulate network delay
  });
};

export const sendChatMessage = (sessionId: number, senderId: number, content: string, type: ChatMessage['type'] = 'text', url?: string, fileName?: string): Promise<ChatMessage> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const session = mockChatSessions.find((s) => s.id === sessionId);
      if (session) {
        const newMessage: ChatMessage = {
          id: nextChatMessageId++,
          sessionId,
          senderId,
          content: type === 'text' ? content : undefined, // Only include content for text messages
          timestamp: new Date().toISOString(),
          type,
          url,
          fileName,
        };
        session.messages.push(newMessage);
        console.log(
          `Mock: New message sent in session ${sessionId} by user ${senderId} (type: ${type}).`,
          newMessage
        );
        resolve(newMessage);
      } else {
        reject(new Error(`Chat session with ID ${sessionId} not found`));
      }
    }, 500);
  });
};

// Add more mock API functions as needed for specific actions (e.g., addUser) 