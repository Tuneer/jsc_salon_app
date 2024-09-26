import DashboardLayout from '../../components/DashboardLayout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const AdminDashboard = () => {
  const router = useRouter();

  // Check for admin authentication
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/login');
    }
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p>Welcome to the admin dashboard! From here you can manage merchants, view all sales, and manage employees and services.</p>
      <div className="grid grid-cols-3 gap-4">
        <a href="/dashboard/admin/merchants" className="block bg-blue-500 p-4 text-white">View All Merchants</a>
        <a href="/dashboard/admin/services" className="block bg-yellow-500 p-4 text-white">Manage All Services</a>
        <a href="/dashboard/admin/sales" className="block bg-red-500 p-4 text-white">View All Sales</a>
        <a href="/dashboard/admin/employees" className="block bg-green-500 p-4 text-white">Manage All Employees</a>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
