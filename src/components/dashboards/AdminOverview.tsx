import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchOverviewStats, fetchRecentActivity } from "@/lib/api"; // Import mock API functions
import { useFetch } from "../../hooks/request";


interface OverviewStats {
  totalUsers: number;
  activeListings: number;
  pendingListings: number;
}

interface RecentActivity {
  id: number;
  description: string;
  timestamp: string;
}

const AdminOverview: React.FC = () => {
  const [stats, setStats] = useState<OverviewStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingActivity, setLoadingActivity] = useState(true);
  const { data } = useFetch("get_dashboard");

  useEffect(() => {
    // Fetch Overview Stats
    fetchOverviewStats()
      .then(data => {
        setStats(data);
        setLoadingStats(false);
      })
      .catch(error => {
        console.error("Error fetching overview stats:", error);
        setLoadingStats(false);
      });

    // Fetch Recent Activity
    fetchRecentActivity()
      .then(data => {
        setRecentActivity(data);
        setLoadingActivity(false);
      })
      .catch(error => {
        console.error("Error fetching recent activity:", error);
        setLoadingActivity(false);
      });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Overview</h2>
      
      {/* Overview Section with Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            {/* Icon placeholder - User Icon */}
             <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87m-4-12a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loadingStats ? 'Loading...' : data?.total_user ?? 'N/A'}</div>
            {/* <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p> */}
          </CardContent>
        </Card>

        <Card>
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
            {/* Icon placeholder - Car Icon */}
             <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M10 2h4a2 2 0 0 1 2 2v2H8V4a2 2 0 0 1 2-2Z" />
              <path d="M15 22h-6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2Z" />
              <path d="M8 11h8" />
              <path d="M8 15h4" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loadingStats ? 'Loading...' : data?.total_active_vehicle ?? 'N/A'}</div>
            {/* <p className="text-xs text-muted-foreground">
              +15.5% from last month
            </p> */}
          </CardContent>
        </Card>

        <Card>
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Listings</CardTitle>
             {/* Icon placeholder - Clock Icon */}
             <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loadingStats ? 'Loading...' : data?.total_pending_vehicle ?? 'N/A'}</div>
            {/* <p className="text-xs text-muted-foreground">
              +5.2% from last month
            </p> */}
          </CardContent>
        </Card>

      </section>

      {/* Recent Activity Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
        <div className="bg-white p-4 rounded shadow">
          {loadingActivity ? (
            <p>Loading recent activity...</p>
          ) : recentActivity.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {recentActivity.map(activity => (
                <li key={activity.id} className="py-2 text-sm">
                  <span className="font-medium">{new Date(activity.timestamp).toLocaleString()}:</span> {activity.description}
                </li>
              ))}
            </ul>
          ) : (
            <p>No recent activity.</p>
          )}
        </div>
      </section>

    </div>
  );
};

export default AdminOverview; 