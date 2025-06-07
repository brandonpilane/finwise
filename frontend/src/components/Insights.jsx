// Insights.jsx
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// Note: Ensure 'recharts' is installed if you haven't already: pnpm add recharts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Calendar,
  Filter,
  Download,
} from "lucide-react";

const monthlyTrends = [
  { month: "Jan", spending: 2100, budget: 2500 },
  { month: "Feb", spending: 2350, budget: 2500 },
  { month: "Mar", spending: 2650, budget: 2500 },
  { month: "Apr", spending: 2200, budget: 2500 },
  { month: "May", spending: 2000, budget: 2500 },
  { month: "Jun", spending: 2400, budget: 2500 },
];

const categoryTrends = [
  {
    month: "Jan",
    food: 450,
    transport: 300,
    shopping: 200,
    entertainment: 150,
  },
  {
    month: "Feb",
    food: 480,
    transport: 320,
    shopping: 280,
    entertainment: 180,
  },
  {
    month: "Mar",
    food: 520,
    transport: 350,
    shopping: 350,
    entertainment: 200,
  },
  {
    month: "Apr",
    food: 420,
    transport: 280,
    shopping: 180,
    entertainment: 120,
  },
  {
    month: "May",
    food: 380,
    transport: 250,
    shopping: 150,
    entertainment: 100,
  },
  {
    month: "Jun",
    food: 450,
    transport: 320,
    shopping: 280,
    entertainment: 180,
  },
];

const alerts = [
  {
    type: "overspending",
    category: "Entertainment",
    amount: 180,
    budget: 150,
    severity: "medium",
    message: "You've exceeded your entertainment budget by $30 this month.",
  },
  {
    type: "unusual",
    category: "Shopping",
    amount: 280,
    average: 200,
    severity: "low",
    message: "Shopping spending is 40% higher than your 3-month average.",
  },
  {
    type: "savings",
    category: "General",
    amount: 150,
    potential: 200,
    severity: "low",
    message: "You could save an extra $50 by reducing dining out frequency.",
  },
];

const insights = [
  {
    title: "Peak Spending Days",
    description:
      "You tend to spend most on Fridays and Saturdays. Consider setting daily spending limits for weekends.",
    impact: "Could save $200/month",
    actionable: true,
  },
  {
    title: "Subscription Analysis",
    description:
      "You have 8 active subscriptions totaling $127/month. 3 haven't been used in the last 30 days.",
    impact: "Could save $45/month",
    actionable: true,
  },
  {
    title: "Seasonal Pattern",
    description:
      "Your spending typically increases by 15% during holiday months. Plan ahead for November and December.",
    impact: "Budget adjustment needed",
    actionable: false,
  },
];

const Insights = () => {
  // Removed type annotations from useState calls
  const [selectedPeriod, setSelectedPeriod] = useState("6months");
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-navy-900">
              Financial Insights
            </h1>
            <p className="text-slate-600 mt-1">
              Understand your spending patterns and opportunities
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Alerts Section */}
        <Card className="shadow-soft border-l-4 border-l-orange-400">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              Smart Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {alerts.map((alert, index) => {
                const severityColors = {
                  high: "border-red-200 bg-red-50",
                  medium: "border-orange-200 bg-orange-50",
                  low: "border-blue-200 bg-blue-50",
                };

                return (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      severityColors[alert.severity]
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {alert.category}
                      </Badge>
                      {alert.type === "overspending" && (
                        <TrendingUp className="w-4 h-4 text-red-500" />
                      )}
                      {alert.type === "unusual" && (
                        <TrendingUp className="w-4 h-4 text-orange-500" />
                      )}
                      {alert.type === "savings" && (
                        <TrendingDown className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <p className="text-sm text-slate-700">{alert.message}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Trends Analysis */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Spending Trends</CardTitle>
            <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <TabsList>
                <TabsTrigger value="3months">3 Months</TabsTrigger>
                <TabsTrigger value="6months">6 Months</TabsTrigger>
                <TabsTrigger value="1year">1 Year</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Overall Spending vs Budget */}
              <div>
                <h3 className="text-lg font-medium text-navy-900 mb-4">
                  Spending vs Budget
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={monthlyTrends}>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Area
                      type="monotone"
                      dataKey="budget"
                      stroke="#f59e0b"
                      fill="#fef3c7"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                    <Area
                      type="monotone"
                      dataKey="spending"
                      stroke="#1e3a8a"
                      fill="#e0e9ff"
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Category Breakdown */}
              <div>
                <h3 className="text-lg font-medium text-navy-900 mb-4">
                  Category Trends
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={categoryTrends}>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Line
                      type="monotone"
                      dataKey="food"
                      stroke="#ef4444"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="transport"
                      stroke="#f59e0b"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="shopping"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="entertainment"
                      stroke="#06b6d4"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-slate-600">Food</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-slate-600">Transport</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-slate-600">Shopping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                    <span className="text-sm text-slate-600">
                      Entertainment
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Smart Insights */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>AI-Powered Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {insights.map((insight, index) => (
                <div
                  key={index}
                  className="p-6 bg-gradient-to-br from-navy-50 to-gold-50 rounded-xl border border-slate-200"
                >
                  <h3 className="font-medium text-navy-900 mb-2">
                    {insight.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-3">
                    {insight.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-gold-100 text-gold-700">
                      {insight.impact}
                    </Badge>
                    {insight.actionable && (
                      <Button size="sm" variant="outline" className="text-xs">
                        Take Action
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Category Analysis */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Category Deep Dive</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="food">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="food">Food & Dining</TabsTrigger>
                <TabsTrigger value="transport">Transportation</TabsTrigger>
                <TabsTrigger value="shopping">Shopping</TabsTrigger>
                <TabsTrigger value="entertainment">Entertainment</TabsTrigger>
              </TabsList>

              <TabsContent value="food" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-navy-900 mb-3">
                      Monthly Breakdown
                    </h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={categoryTrends}>
                        <XAxis
                          dataKey="month"
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis hide />
                        <Bar
                          dataKey="food"
                          fill="#ef4444"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <h5 className="font-medium text-slate-900">
                        Average per meal
                      </h5>
                      <p className="text-2xl font-bold text-navy-900">$18.50</p>
                      <p className="text-sm text-slate-600">
                        15% higher than city average
                      </p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <h5 className="font-medium text-slate-900">
                        Most expensive day
                      </h5>
                      <p className="text-2xl font-bold text-navy-900">
                        Saturday
                      </p>
                      <p className="text-sm text-slate-600">
                        $67 average weekend spending
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* You'd add similar TabsContent for other categories here */}
              <TabsContent value="transport" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-navy-900 mb-3">
                      Monthly Breakdown (Transportation)
                    </h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={categoryTrends}>
                        <XAxis
                          dataKey="month"
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis hide />
                        <Bar
                          dataKey="transport"
                          fill="#f59e0b"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <h5 className="font-medium text-slate-900">
                        Average Trip Cost
                      </h5>
                      <p className="text-2xl font-bold text-navy-900">$12.00</p>
                      <p className="text-sm text-slate-600">
                        Consider public transport options.
                      </p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <h5 className="font-medium text-slate-900">
                        Fuel vs Maintenance
                      </h5>
                      <p className="text-2xl font-bold text-navy-900">
                        Fuel is 70% of costs
                      </p>
                      <p className="text-sm text-slate-600">
                        Look into fuel-efficient routes.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="shopping" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-navy-900 mb-3">
                      Monthly Breakdown (Shopping)
                    </h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={categoryTrends}>
                        <XAxis
                          dataKey="month"
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis hide />
                        <Bar
                          dataKey="shopping"
                          fill="#8b5cf6"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <h5 className="font-medium text-slate-900">
                        Average Transaction
                      </h5>
                      <p className="text-2xl font-bold text-navy-900">$55.00</p>
                      <p className="text-sm text-slate-600">
                        Larger purchases drive up spending.
                      </p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <h5 className="font-medium text-slate-900">
                        Online vs In-store
                      </h5>
                      <p className="text-2xl font-bold text-navy-900">
                        Online is 60%
                      </p>
                      <p className="text-sm text-slate-600">
                        Easier to track in-store deals.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="entertainment" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-navy-900 mb-3">
                      Monthly Breakdown (Entertainment)
                    </h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={categoryTrends}>
                        <XAxis
                          dataKey="month"
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis hide />
                        <Bar
                          dataKey="entertainment"
                          fill="#06b6d4"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <h5 className="font-medium text-slate-900">
                        Movie Tickets & Streaming
                      </h5>
                      <p className="text-2xl font-bold text-navy-900">$45.00</p>
                      <p className="text-sm text-slate-600">
                        Check for bundled streaming services.
                      </p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <h5 className="font-medium text-slate-900">
                        Dining Out & Social
                      </h5>
                      <p className="text-2xl font-bold text-navy-900">$75.00</p>
                      <p className="text-sm text-slate-600">
                        Cook more at home for savings.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Insights;
