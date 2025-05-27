import React, { useEffect, useState } from 'react';
import { fetchRecentActivity, RecentActivity } from '../../lib/api';

const UserNotifications: React.FC = () => {
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRecentActivities = async () => {
      try {
        const activities = await fetchRecentActivity();
        setRecentActivities(activities);
      } catch (err) {
        setError('Failed to fetch recent activities.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getRecentActivities();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      {loading && <p>Loading notifications...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && recentActivities.length === 0 && (
        <p>No recent activities found.</p>
      )}
      {!loading && !error && recentActivities.length > 0 && (
        <ul className="space-y-2">
          {recentActivities.map((activity) => (
            <li key={activity.id} className="border-b pb-2">
              <p>{activity.description}</p>
              <p className="text-sm text-gray-500">{activity.timestamp}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserNotifications; 