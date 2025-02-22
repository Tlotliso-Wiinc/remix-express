//"use client";

import {
  Form,
  Link,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import { useState } from 'react';
import { 
  Users, 
  Activity, 
  BarChart2, 
  DollarSign, 
  Home, 
  Settings, 
  Bell,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Search,
  ShoppingCart, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  UserRoundCog,
  PiggyBank,
  Banknote,
  CreditCard,
  HandCoins,
  Files,
  ChartCandlestick,
  FileText,
  ArrowRightLeft
} from 'lucide-react';

import "./tailwind.css";

import Dashboard from "./dashboard";
import Dash from "./dash";

import appStylesHref from "./app.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];


/*export const loader = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 1-second delay
  return null;
};*/

function SkeletonLoader() {
  return (
    <div className="skeleton">
      <div className="skeleton-box"></div>
      <div className="skeleton-box"></div>
      <div className="skeleton-box"></div>
    </div>
  );
}


export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [count, setCount] = useState(0);
  const navigation = useNavigation();

  const handleClick = () => {
    setCount(count + 1);
  };

  const SideNavigation = () => (
    <div className={`
      fixed md:static z-20 w-64 bg-[#007791] text-white h-full 
      transform transition-transform duration-300 border-r border-gray-200
      ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
    `}>
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-md font-bold text-white mt-2">Mokhatlo FMS</h2>
        <button 
          className="md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        >
          <X className="h-6 w-6 text-gray-900" />
        </button>
      </div>
      {/*<hr className="border-t border-gray-300 my-1"></hr>*/}
      <hr className="border-t-2 border-gray-400 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200 h-0.5 my-1"></hr>

      <nav className="mt-8">
        {[
          { icon: Home, label: 'Home', to: '/' },
          { icon: UserRoundCog, label: 'User Management', to: '/users' },
          { icon: Users, label: 'Members', to: '/members' },
          { icon: ArrowRightLeft, label: 'Transactions', to: '/transactions' },
          { icon: PiggyBank, label: 'Savings', to: '/savings' },
          { icon: Banknote, label: 'Loans', to: '/loans' },
          { icon: Files, label: 'Documents', to: '/documents' },
          { icon: FileText, label: 'Reports', to: '/reports' },
          { icon: BarChart2, label: 'Analytics', to: '/analytics' },
          { icon: Settings, label: 'Settings', to: '/settings' },
        ].map(({ icon: Icon, label, to }) => (
          <Link to={to} key={label}>
            <div
              className="px-4 py-3 hover:bg-[#006278] flex items-center cursor-pointer text-white text-sm"
            >
              
                <Icon className="h-5 w-5 mr-3" />
                <span>{label}</span>
            
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );

  const handleUserMenuOpen = (e: any): void => {
    e.preventDefault(); // Prevent default behavior
    setIsUserMenuOpen(!isUserMenuOpen)
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="flex h-screen bg-gray-100">
          <SideNavigation />
          
          <div className="flex-1 overflow-y-auto">
          <header className="bg-white shadow-sm p-4">
              <div className="flex items-center flex items-center justify-between">

                <div className="flex items-center">
                  <button 
                    className="md:hidden mr-2" 
                    onClick={() => setIsSidebarOpen(true)}
                  >
                    <Menu className="h-6 w-6" />
                  </button>
                  <div className="relative flex-grow ml-8">
                  {/*}
                    <input 
                      type="text" 
                      placeholder="Search..." 
                      className="w-full pl-10 pr-4 py-2 border border-[#007791] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  */}
                  </div>
                </div>
            
                <div className="flex items-center space-x-4">
                  <div className="relative mr-4">
                    <Bell className="h-6 w-6 text-gray-600 hover:text-blue-500 cursor-pointer" />
                    <span className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs">
                      3
                    </span>
                  </div>
                  <div className="h-6 w-px bg-gray-300" />
                  <div className="relative">
                    <button 
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-md"
                    >
                    {/*
                      <img 
                        src="/api/placeholder/40/40" 
                        alt="User" 
                        className="w-8 h-8 rounded-full"
                      />
                    */}
                      <span className="text-sm">Mike Fantaman</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg text-sm">
                        <div 
                          className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
                        >
                          <Users className="h-4 w-4 mr-2" />
                          Profile
                        </div>
                        <div 
                          className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer text-red-600"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </header>
            
            <main className="p-6">
            
              <div
                className={
                  navigation.state === "loading" ? "loading" : ""
                }
                id="detail"
              >
                <Outlet />
              </div>
            
            {/*}
              {navigation.state === "loading" ? (
                <SkeletonLoader />
              ) : (
                <Outlet />
              )}
            */}

            </main>

          </div>
        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
    
  );
}
