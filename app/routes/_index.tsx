import { 
  Users, 
  DollarSign, 
  ShoppingCart, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  ArrowUp,
  ArrowDown,
  BanknoteIcon,
  PiggyBank,
  HandCoins
} from 'lucide-react';

import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Financial Management System Dashboard" },
    { name: "description", content: "Welcome to the Financial Management System Dashboard for a Savings and Credit Organization!" },
  ];
};

export default function Dashboard() {
  const stats = [
    {
      title: 'Members',
      value: '20',
      change: '+18.2%',
      isIncrease: true,
      icon: Users,
      color: 'blue' as 'blue'
    },
    {
      title: 'Total Funds',
      value: 'LSL 54,239',
      change: '+12.5%',
      isIncrease: true,
      icon: BanknoteIcon,
      color: 'emerald' as 'emerald'
    },
    {
      title: 'Savings',
      value: 'LSL 30,000',
      change: '+12.5%',
      isIncrease: true,
      icon: PiggyBank,
      color: 'purple' as 'purple'
    },
    {
      title: 'Loans Issued',
      value: 'LSL 24,200',
      change: '+12.5%',
      isIncrease: true,
      icon: HandCoins,
      color: 'orange' as 'orange'
    },
  ];

  interface Stat {
    title: string;
    value: string;
    change: string;
    isIncrease: boolean;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    color: 'emerald' | 'blue' | 'purple' | 'orange';
  }
  
  const StatCard = ({ stat }: { stat: Stat }) => {
    const colorVariants = {
      emerald: 'bg-emerald-50 text-emerald-600',
      blue: 'bg-blue-50 text-blue-600',
      purple: 'bg-purple-50 text-purple-600',
      orange: 'bg-orange-50 text-orange-600'
    };

    return (
      <div className="bg-white p-6 rounded-sm border-2 border-gray-250">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">{stat.title}</p>
            <h3 className="text-lg font-semibold mt-1">{stat.value}</h3>
            <div className="flex items-center mt-2">
              {stat.isIncrease ? (
                <ArrowUp className="h-4 w-4 text-emerald-500" />
              ) : (
                <ArrowDown className="h-4 w-4 text-red-500" />
              )}
              <span className={`text-sm ml-1 ${stat.isIncrease ? 'text-emerald-500' : 'text-red-500'}`}>
                {stat.change}
              </span>
            </div>
          </div>
          <div className={`p-3 rounded-lg ${colorVariants[stat.color]}`}>
            <stat.icon className="h-6 w-6" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="p-6">

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>

       {/* Recent Activity */}
        <div className="bg-white p-6 rounded-sm border border-gray-100 mt-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Recent Activity</h3>
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-500">Today</span>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { title: 'New transaction', description: 'Tlotliso Mafantiri is payed M19,000.00', time: '2 hours ago' },
              { title: 'New user', description: 'Sarah Smith joined the platform', time: '4 hours ago' },
              { title: 'System update', description: 'Version 2.1.0 deployed successfully', time: '6 hours ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <Activity className="h-4 w-4 text-blue-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-sm text-gray-500">{activity.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

    </main>
  );
}
