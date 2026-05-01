import React, { useState, useEffect } from 'react';
import LayoutDashboard from 'lucide-react/dist/esm/icons/layout-dashboard';
import ShoppingBag from 'lucide-react/dist/esm/icons/shopping-bag';
import Users from 'lucide-react/dist/esm/icons/users';
import Package from 'lucide-react/dist/esm/icons/package';
import Settings from 'lucide-react/dist/esm/icons/settings';
import LogOut from 'lucide-react/dist/esm/icons/log-out';
import Menu from 'lucide-react/dist/esm/icons/menu';
import X from 'lucide-react/dist/esm/icons/x';
import Bell from 'lucide-react/dist/esm/icons/bell';
import Search from 'lucide-react/dist/esm/icons/search';
import User from 'lucide-react/dist/esm/icons/user';
import PlusCircle from 'lucide-react/dist/esm/icons/plus-circle';
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up';
import Mail from 'lucide-react/dist/esm/icons/mail';
import HelpCircle from 'lucide-react/dist/esm/icons/help-circle';
import FileText from 'lucide-react/dist/esm/icons/file-text';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const adminUser = localStorage.getItem('admin_user');
    if (!adminUser) {
      navigate('/admin-login');
    }
  }, [navigate]);

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { label: 'Orders', icon: ShoppingBag, path: '/admin/orders' },
    { label: 'Products', icon: Package, path: '/admin/products' },
    { label: 'Categories', icon: LayoutDashboard, path: '/admin/categories' },
    { label: 'Customers', icon: Users, path: '/admin/users' },
    { label: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('admin_user');
    navigate('/admin-login');
  };

  return (
    <div className="flex h-screen bg-gray-50 font-urbanist">
      
      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-800">
          <div className="flex items-center">
            <span className="text-xl font-bold er">Printomaniac<span className="text-blue-500">.</span>ADMIN</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-4">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                location.pathname === item.path 
                  ? 'bg-black text-white shadow-lg shadow-black/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span className="font-bold text-sm ">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-blue-800 hover:bg-blue-800/5 rounded-xl transition-all"
          >
            <LogOut size={20} />
            <span className="font-bold text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* TOP HEADER */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-8 shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-600">
            <Menu size={24} />
          </button>

          <div className="hidden lg:flex items-center gap-3 bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl w-96">
            <Search size={18} className="text-slate-400" />
            <input type="text" placeholder="Global system search..." className="bg-transparent border-none focus:outline-none text-sm font-medium w-full" />
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:bg-gray-50 rounded-lg transition-all">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-black rounded-full border-2 border-white" />
            </button>
            <div className="h-8 w-px bg-gray-100 mx-1" />
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <p className="text-sm font-bold text-slate-900 leading-none">System Admin</p>
                <p className="text-[10px] font-bold text-black uppercase tracking-widest mt-1">Superuser</p>
              </div>
              <div className="h-10 w-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default AdminLayout;
