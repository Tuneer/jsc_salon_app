import { ReactNode } from 'react';
import { useRouter } from 'next/router';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear authentication tokens or session
    localStorage.removeItem('merchantToken');
    localStorage.removeItem('adminToken');
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex flex-row bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold">
          Dashboard
        </div>
        <nav className="flex-1">
          {/* Example Links for Merchants and Admins */}
          <a href="/dashboard/merchant" className="block py-2 px-4 hover:bg-blue-700">Merchant Home</a>
          <a href="/dashboard/merchant/profile" className="block py-2 px-4 hover:bg-blue-700">Profile</a>
          <a href="/dashboard/merchant/appointments" className="block py-2 px-4 hover:bg-blue-700">Appointments</a>
          <a href="/dashboard/merchant/services" className="block py-2 px-4 hover:bg-blue-700">Services</a>
          <a href="/dashboard/merchant/sales" className="block py-2 px-4 hover:bg-blue-700">Sales</a>
          {/* Add more links here for admin or merchant */}
        </nav>
        <div className="p-4">
          <button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-700 text-white py-2 rounded">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
