import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils"; // Assuming cn utility for classnames
import AdminOverview from '../dashboards/AdminOverview';
import AdminUserManagement from '../dashboards/AdminUserManagement';
import AdminListingManagement from '../dashboards/AdminListingManagement';
import UserAccountSettings from '../dashboards/UserAccountSettings';
import UserListings from '../dashboards/UserListings';
import AdminContactListing from '../dashboards/AdminContactListing';
import AdminSubscriberListing from '../dashboards/AdminSubscriberListing';
import UserInquiries from '../dashboards/UserInquiries';
import UserNotifications from '../dashboards/UserNotifications';
import UserMessages from '../dashboards/UserMessages'; // Import the new UserMessages component

const DashboardLayout: React.FC = () => {
  const location = useLocation();

  // Determine if the current path is under /admin-dashboard or /user-dashboard
  const isAdminDashboard = location.pathname.startsWith('/admin-dashboard');
  const isUserDashboard = location.pathname.startsWith('/user-dashboard');

  // Define navigation links based on the current dashboard type
  const navLinks = isAdminDashboard
    ? [
        { path: '/admin-dashboard', label: 'Overview' },
        { path: '/', label: 'Home' },
        { path: '/admin-dashboard/users', label: 'User Management' },
        { path: '/admin-dashboard/listings', label: 'Listing Management' },
        { path: '/admin-dashboard/contactlistings', label: 'Contact-us Listing' },
        { path: '/admin-dashboard/subscriberslistings', label: 'Subscriber Listing' },
      ]
    : isUserDashboard
    ? [
        { path: '/', label: 'Home' },
        { path: '/user-dashboard', label: 'Account Settings' },
        { path: '/user-dashboard/listings', label: 'My Listings' },
        { path: '/user-dashboard/notifications', label: 'Notifications' },
        { path: '/user-dashboard/messages', label: 'Messages' }, // Add link for Messages
      ]
    : []; // Default empty if not in a dashboard context

  // Determine the component to render based on the current path
  const renderContent = () => {
    if (isAdminDashboard) {
      switch (location.pathname) {
        case '/admin-dashboard':
          return <AdminOverview />;
        case '/admin-dashboard/users':
          return <AdminUserManagement />;
        case '/admin-dashboard/listings':
          return <AdminListingManagement />;
          case '/admin-dashboard/contactlistings':
          return <AdminContactListing />;
          case '/admin-dashboard/subscriberslistings':
          return <AdminSubscriberListing />;
        default:
          return <div>Admin Dashboard Section Not Found</div>; // Or a 404 component
      }
    } else if (isUserDashboard) {
       switch (location.pathname) {
         case '/user-dashboard/listings':
           return <UserListings />;
         case '/user-dashboard/notifications':
           return <UserNotifications />;
         case '/user-dashboard':
           return <UserAccountSettings />;
         case '/user-dashboard/messages':
           return <UserMessages />;
         default:
           return <div>User Dashboard Section Not Found</div>; // Or a 404 component
       }
    }
     return <div>Select a dashboard section</div>; // Default message if no dashboard path is matched
  };

  return (
    <div className="flex h-screen bg-oneoffautos-lightgray">
      {/* Sidebar */}
      <aside className="w-64 bg-oneoffautos-blue text-white p-6 space-y-4">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <nav className="space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'block py-2 px-4 rounded-md font-medium transition duration-200 text-left',
                location.pathname === link.path
                  ? 'bg-oneoffautos-red text-white'
                  : 'text-white hover:bg-oneoffautos-darkgray hover:text-white'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default DashboardLayout; 