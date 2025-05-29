import React from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DashboardLayout from "../layouts/DashboardLayout";

const AdminDashboard: React.FC = () => {
  return (
    <DashboardLayout>
      {/* Content for the selected admin section will be rendered here */}
      <div>Select a section from the sidebar</div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
