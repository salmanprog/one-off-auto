import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchUsers, updateUserStatus } from "@/lib/api"; // Import mock API functions
import { User } from "@/lib/api"; // Import User interface
import ViewUserDialog from "./ViewUserDialog"; // Import ViewUserDialog
import EditUserDialog from "./EditUserDialog"; // Import EditUserDialog
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"; // Import AlertDialog components

const AdminUserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false); // State for View Dialog
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // State for Edit Dialog
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null); // State to hold the selected user ID

  // New state for status change confirmation dialogs
  const [isDeactivateDialogOpen, setIsDeactivateDialogOpen] = useState(false);
  const [isActivateDialogOpen, setIsActivateDialogOpen] = useState(false);
  const [userToChangeStatusId, setUserToChangeStatusId] = useState<number | null>(null);

  const loadUsers = () => {
    setLoading(true);
    fetchUsers()
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadUsers(); // Initial load
  }, []);

  const handleView = (userId: number) => {
    setSelectedUserId(userId);
    setIsViewDialogOpen(true); // Open View Dialog
  };

  const handleEdit = (userId: number) => {
    setSelectedUserId(userId);
    setIsEditDialogOpen(true); // Open Edit Dialog
  };

  const handleDeactivateClick = (userId: number) => {
      setUserToChangeStatusId(userId);
      setIsDeactivateDialogOpen(true);
  };

  const handleActivateClick = (userId: number) => {
      setUserToChangeStatusId(userId);
      setIsActivateDialogOpen(true);
  };

  const confirmDeactivate = () => {
    if (userToChangeStatusId !== null) {
       updateUserStatus(userToChangeStatusId, 'Inactive') // Call mock API to update status
        .then(() => {
          // alert(`User ${userToChangeStatusId} deactivated.`); // Or use a toast
          loadUsers(); // Refresh the user list after deactivation
          setIsDeactivateDialogOpen(false);
          setUserToChangeStatusId(null);
        })
        .catch(error => {
          console.error("Error deactivating user:", error);
          // alert(`Failed to deactivate user ${userToChangeStatusId}.`); // Or use a toast
          setIsDeactivateDialogOpen(false);
          setUserToChangeStatusId(null);
        });
    }
  };

  const confirmActivate = () => {
    if (userToChangeStatusId !== null) {
      updateUserStatus(userToChangeStatusId, 'Active') // Call mock API to update status
       .then(() => {
         // alert(`User ${userToChangeStatusId} activated.`); // Or use a toast
         loadUsers(); // Refresh the user list after activation
         setIsActivateDialogOpen(false);
         setUserToChangeStatusId(null);
       })
       .catch(error => {
         console.error("Error activating user:", error);
         // alert(`Failed to activate user ${userToChangeStatusId}.`); // Or use a toast
         setIsActivateDialogOpen(false);
         setUserToChangeStatusId(null);
       });
    }
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
        <Input placeholder="Search users..." className="max-w-sm mr-4" />
        <Select>
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
        ) : users.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Email</TableHead> {/* Using email as username */}
                {/* <TableHead>Role</TableHead> Removed */}
                <TableHead>Status</TableHead>
                <TableHead>Registration Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell> {/* Display email */}
                  {/* <TableCell>{user.role}</TableCell> Removed */}
                  <TableCell>{user.status}</TableCell>
                  <TableCell>{user.registrationDate}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="mr-2" onClick={() => handleView(user.id)}>View</Button>
                    <Button variant="ghost" size="sm" className="mr-2" onClick={() => handleEdit(user.id)}>Edit</Button>
                    {user.status === 'Active' ? (
                      <Button variant="ghost" size="sm" onClick={() => handleDeactivateClick(user.id)}>Deactivate</Button>
                    ) : (
                      <Button variant="ghost" size="sm" onClick={() => handleActivateClick(user.id)}>Activate</Button>
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

       {/* Deactivate User Confirmation Dialog */}
       <AlertDialog open={isDeactivateDialogOpen} onOpenChange={setIsDeactivateDialogOpen}>
         <AlertDialogContent>
           <AlertDialogHeader>
             <AlertDialogTitle>Confirm Deactivation</AlertDialogTitle>
             <AlertDialogDescription>
               Are you sure you want to deactivate user with ID {userToChangeStatusId}? This action cannot be undone.
             </AlertDialogDescription>
           </AlertDialogHeader>
           <AlertDialogFooter>
             <AlertDialogCancel onClick={() => setUserToChangeStatusId(null)}>Cancel</AlertDialogCancel>
             <AlertDialogAction onClick={confirmDeactivate}>Deactivate</AlertDialogAction>
           </AlertDialogFooter>
         </AlertDialogContent>
       </AlertDialog>

       {/* Activate User Confirmation Dialog */}
       <AlertDialog open={isActivateDialogOpen} onOpenChange={setIsActivateDialogOpen}>
         <AlertDialogContent>
           <AlertDialogHeader>
             <AlertDialogTitle>Confirm Activation</AlertDialogTitle>
             <AlertDialogDescription>
               Are you sure you want to activate user with ID {userToChangeStatusId}?
             </AlertDialogDescription>
           </AlertDialogHeader>
           <AlertDialogFooter>
             <AlertDialogCancel onClick={() => setUserToChangeStatusId(null)}>Cancel</AlertDialogCancel>
             <AlertDialogAction onClick={confirmActivate}>Activate</AlertDialogAction>
           </AlertDialogFooter>
         </AlertDialogContent>
       </AlertDialog>

    </div>
  );
};

export default AdminUserManagement; 