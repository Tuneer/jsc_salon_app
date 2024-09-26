import DashboardLayout from '../../components/DashboardLayout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const MerchantDashboard = () => {
  const router = useRouter();

  // Check for merchant authentication
  useEffect(() => {
    const token = localStorage.getItem('merchantToken');
    if (!token) {
      router.push('/login');
    }
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold">Merchant Dashboard</h1>
      <p>Welcome to your dashboard! From here you can manage your services, appointments, and view your sales reports.</p>
      <div className="grid grid-cols-3 gap-4">
        <a href="/dashboard/merchant/profile" className="block bg-blue-500 p-4 text-white">Update Profile</a>
        <a href="/dashboard/merchant/appointments" className="block bg-green-500 p-4 text-white">Manage Appointments</a>
        <a href="/dashboard/merchant/services" className="block bg-yellow-500 p-4 text-white">Manage Services</a>
        <a href="/dashboard/merchant/sales" className="block bg-red-500 p-4 text-white">View Sales Report</a>
      </div>
    </DashboardLayout>
  );
};

export default MerchantDashboard;
