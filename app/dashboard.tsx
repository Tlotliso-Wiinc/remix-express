import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Users, 
  DollarSign, 
  ShoppingCart, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const Dashboard = () => {
  
  // Sample data for charts
  const performanceData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 700 }
  ];

  const cards = [
    {
      title: "Total Users",
      value: "14,526",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      description: "Active users this month",
      chart: performanceData
    },
    {
      title: "Revenue",
      value: "$45,265",
      change: "+8.2%",
      trend: "up",
      icon: DollarSign,
      description: "Monthly revenue",
      chart: performanceData.map(d => ({ ...d, value: d.value * 1.5 }))
    },
    {
      title: "Sales",
      value: "1,245",
      change: "-3.1%",
      trend: "down",
      icon: ShoppingCart,
      description: "Total orders this month",
      chart: performanceData.map(d => ({ ...d, value: d.value * 0.8 }))
    },
    {
      title: "Performance",
      value: "88.5%",
      change: "+4.3%",
      trend: "up",
      icon: TrendingUp,
      description: "Average response time",
      chart: performanceData.map(d => ({ ...d, value: d.value * 0.6 }))
    }
  ];

  return (
    <main className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          const isPositive = card.trend === "up";
          
          return (
            <Card key={card.title} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold">{card.value}</span>
                    <span className={`flex items-center text-sm ${
                      isPositive ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {isPositive ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                      {card.change}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {card.description}
                  </p>
                </div>
                <div className="h-16 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={card.chart}>
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke={isPositive ? "#16a34a" : "#dc2626"}
                        strokeWidth={2}
                        dot={false}
                      />
                      <Tooltip 
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-white p-2 shadow-lg rounded-lg border text-xs">
                                {payload[0].value}
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <Users className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New user registered</p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#007791"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Dashboard;