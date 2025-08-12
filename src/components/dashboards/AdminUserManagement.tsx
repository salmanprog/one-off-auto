import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchUsers, updateUserStatus } from "@/lib/api"; // Import mock API functions
import { User } from "@/lib/api"; // Import User interface
import ViewUserDialog from "./ViewUserDialog"; // Import ViewUserDialog
import EditUserDialog from "./EditUserDialog"; // Import EditUserDialog
import { useFetch } from "../../hooks/request";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"; // Import AlertDialog components

const AdminUserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // Users array
  const [loading, setLoading] = useState(true); // Loading state
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false); // View Dialog state
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // Edit Dialog state
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null); // Selected User ID state
  const [searchTerm, setSearchTerm] = useState(""); // Search input state
  const [statusFilter, setStatusFilter] = useState("all"); // Status filter state (All, Active, Inactive)

  // Fetch users using the `useFetch` hook
  const { data } = useFetch("get_users");
  const { postData } = useFetch("update_users", "submit");
  // Load users function that gets triggered when needed
  const loadUsers = () => {
    setLoading(true);

    if (Array.isArray(data)) {
      setUsers(data); // Set users if the data is an array
    } else {
      setUsers([]); // Fallback in case data is null or malformed
    }

    setLoading(false); // Set loading to false after the data is loaded
  };

  useEffect(() => {
    loadUsers(); // Initial load of users
  }, [data]); // Re-run when data changes

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Handle filter by status change
  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
  };

  // Filter users based on search term and status filter
  const filteredUsers = users.filter((user) => {
    const matchesSearchTerm =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()); // Filter by name

    const matchesStatusFilter =
      statusFilter === "all" || user.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearchTerm && matchesStatusFilter;
  });

  const handleView = (userId: number) => {
    setSelectedUserId(userId);
    setIsViewDialogOpen(true); // Open View Dialog
  };

  const handleEdit = (userId: number) => {
    setSelectedUserId(userId);
    setIsEditDialogOpen(true); // Open Edit Dialog
  };

  const handleDeactivateClick = (userId: number) => {
    const fd = new FormData();
    fd.append("status", '0');
    const callback = (receivedData: any) => {
      window.location.reload();
    };
    postData(fd, callback, userId);
  };

  const handleActivateClick = (userId: number) => {
    const fd = new FormData();
    fd.append("status", '1');
    const callback = (receivedData: any) => {
     window.location.reload();
    };
    postData(fd, callback, userId);
  };

  const handleCloseViewDialog = () => {
    setIsViewDialogOpen(false);
    setSelectedUserId(null); // Clear selected user ID on close
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedUserId(null); // Clear selected user ID on close
    loadUsers(); // Refresh user list after edit (assuming edit updates data)
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      {/* User Management Tools (Search/Filter) */}
      <div className="flex items-center mb-4">
        <Input
          placeholder="Search users by name..."
          className="max-w-sm mr-4"
          value={searchTerm}
          onChange={handleSearchChange} // Handle search input change
        />
        <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
          <SelectTrigger className="w-[180px] mr-4">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* User Management Table */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {loading ? (
          <p>Loading users...</p>
        ) : filteredUsers.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Registration Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map(user => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>{user.created_at}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost"   size="sm" className="mr-2" onClick={() => handleView(user.slug)}>View</Button>
                    {user.status === 'Active' ? (
                      <Button variant="ghost" size="sm" onClick={() => handleDeactivateClick(user.slug)}>Deactivate</Button>
                    ) : (
                      <Button variant="ghost" size="sm" onClick={() => handleActivateClick(user.slug)}>Activate</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p>No users found.</p>
        )}
      </div>

      {/* Render Dialogs */}
      <ViewUserDialog
        isOpen={isViewDialogOpen}
        onClose={handleCloseViewDialog}
        userId={selectedUserId}
      />

      <EditUserDialog
        isOpen={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        userId={selectedUserId}
        onSave={loadUsers} // Pass loadUsers to refresh the list after save
      />

      
    </div>
  );
};

export default AdminUserManagement;
