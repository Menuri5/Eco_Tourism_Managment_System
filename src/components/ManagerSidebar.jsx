/**
 * Manager Sidebar component
 */
import React from 'react';
import AdminSidebar from './AdminSidebar'; // reuses the sidebar you already shared earlier

// This component doesn't build anything new — it just calls AdminSidebar
// and passes role="manager" automatically
export default function ManagerSidebar() {
  return <AdminSidebar role="manager" />;
}