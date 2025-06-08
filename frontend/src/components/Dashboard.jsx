// Dashboard.jsx
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
// Note: Ensure 'recharts' is installed if you haven't already: pnpm add recharts
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  DollarSign,
  TrendingUp,
  Target,
  Award,
  Bell,
  BookOpen,
  ChevronRight,
  Star,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const user = {
  firstname: "Brandon",
  lastname: "Smith",
};

const spendingData = [
  { name: "Food & Dining", value: 750, color: "#00f5bc" },
  { name: "Transportation", value: 320, color: "#adffec" },
  { name: "Shopping", value: 360, color: "#8da0a5" },
  { name: "Entertainment", value: 180, color: "#00a37d" },
  { name: "Bills & Utilities", value: 820, color: "#044e77" },
  { name: "Other", value: 350, color: "#ff9b00" },
];

const savingsGoals = [
  { name: "Emergency Fund", current: 3500, target: 5000, badge: "critical" },
  { name: "Vacation", current: 1200, target: 2500, badge: "on-track" },
  { name: "New Car", current: 8500, target: 15000, badge: "ahead" },
];

const weeklySpending = [
  { day: "Mon", amount: 45 },
  { day: "Tue", amount: 67 },
  { day: "Wed", amount: 23 },
  { day: "Thu", amount: 89 },
  { day: "Fri", amount: 156 },
  { day: "Sat", amount: 234 },
  { day: "Sun", amount: 78 },
];

const tips = [
  {
    title: "Smart Spending Tip",
    description:
      "You've spent 15% less on dining out this month! Consider redirecting those savings to your Emergency Fund.",
    action: "Add to Savings",
    icon: TrendingUp,
  },
  {
    title: "Bill Reminder",
    description:
      "Your credit card payment is due in 3 days. Set up autopay to avoid late fees.",
    action: "Set Autopay",
    icon: Bell,
  },
];

const Dashboard = () => {
  const [selectedGoal, setSelectedGoal] = useState(null);

  const totalSpending = spendingData.reduce((sum, item) => sum + item.value, 0);
  const monthlyBudget = 4300;
  const budgetProgress = (totalSpending / monthlyBudget) * 100;

  const calculateSmartScore = () => {
    // Adjust weights based on leniency
    const budgetWeight = 0.7 - 0.15; // gets less strict
    const riskWeight = 0.2 - 0.15; // penalizes risky spend less
    const savingsWeight = 0.1 + 0.1; // rewards savings more
    const trendWeight = 0.5 + 0.2; // trend matters more leniently

    // Budget Adherence
    const budgetUsage = totalSpending / monthlyBudget;
    const idealBuffer = 1 + 0.25; // tolerates 5% over at leniency 1
    let budgetScore;
    if (budgetUsage <= idealBuffer) {
      budgetScore = 100 * (1 - budgetUsage / idealBuffer);
    } else {
      budgetScore = 80 - (budgetUsage - idealBuffer) * 100;
    }
    const budgetComponent =
      Math.max(0, Math.min(budgetScore, 100)) * budgetWeight;

    // Risky Spending Distribution
    const riskCategories = ["Entertainment", "Shopping"];
    const riskSpend = spendingData
      .filter((d) => riskCategories.includes(d.name))
      .reduce((sum, d) => sum + d.value, 0);
    const riskRatio = riskSpend / totalSpending;
    const distributionScore = (1 - riskRatio) * 100;
    const distributionComponent = distributionScore * riskWeight;

    // Savings Progress
    const savingsProgress =
      savingsGoals.reduce((sum, goal) => {
        const ratio = goal.current / goal.target;
        return sum + Math.min(1, ratio);
      }, 0) / savingsGoals.length;
    const savingsComponent = savingsProgress * 100 * savingsWeight;

    // Spending Trend: weekly reduction is rewarded more leniently
    const weekChange = weeklySpending[6].amount - weeklySpending[0].amount;
    const trendRaw = weekChange < 0 ? 100 : Math.max(60, 100 - weekChange);
    const trendComponent = trendRaw * trendWeight;

    // Final Score
    const totalScore =
      budgetComponent +
      distributionComponent +
      savingsComponent +
      trendComponent;

    return Math.round(Math.min(100, Math.max(0, totalScore)));
  };

  const smartscore = calculateSmartScore();

  const rankThresholds = [
    { min: 90, label: "Outstanding" },
    { min: 80, label: "Excellent" },
    { min: 60, label: "Good" },
    { min: 40, label: "Average" },
    { min: 0, label: "Needs Improvement" },
  ];

  const smartscorerank = () => {
    if (isNaN(smartscore)) return "N/A";
    return rankThresholds.find(({ min }) => smartscore >= min)?.label || "N/A";
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-navy-900">
              Good morning, {user.firstname}!
            </h1>
            <p className="text-slate-600 mt-1">
              Let's check your financial wellness today
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="bg-gold-50 text-gold-700 border-gold-200"
            >
              <Star className="w-3 h-3 mr-1" />
              Premium Member
            </Badge>
            <Button size="sm" className="gradient-navy text-white">
              <BookOpen className="w-4 h-4 mr-2" />
              Learn More
            </Button>
          </div>
        </div>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-soft hover:shadow-elegant transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Monthly Spending
                  </p>
                  <p className="text-2xl font-bold text-navy-900">
                    P{totalSpending.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    of P{monthlyBudget.toLocaleString()} budget
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <Progress value={budgetProgress} className="mt-3 h-2" />
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-elegant transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Savings Rate
                  </p>
                  <p className="text-2xl font-bold text-navy-900">23%</p>
                  <p className="text-xs text-success mt-1">
                    +3% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-elegant transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Goals Progress
                  </p>
                  <p className="text-2xl font-bold text-navy-900">2/3</p>
                  <p className="text-xs text-gold-600 mt-1">On track</p>
                </div>
                <div className="w-12 h-12 bg-gold-100 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-gold-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-elegant transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Smart Score
                  </p>
                  <p className="text-2xl font-bold text-navy-900">
                    {smartscore}
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    {smartscorerank()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Spending Breakdown */}
          <Card className="lg:col-span-2 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Spending Breakdown</span>
                <Button variant="ghost" size="sm">
                  View Details <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={spendingData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {spendingData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-sm text-slate-600">Total</p>
                      <p className="text-lg font-bold text-navy-900">
                        P{totalSpending}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {spendingData.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-slate-700">
                          {item.name}
                        </span>
                      </div>
                      <span className="font-medium text-navy-900">
                        P{item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Spending Trend */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={weeklySpending}>
                  <XAxis dataKey="day" axisLine={true} tickLine={false} />
                  <YAxis hide />
                  <Bar dataKey="amount" fill="#ff9b00" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 text-center">
                <p className="text-sm text-slate-600">Daily Average</p>
                <p className="text-xl font-bold text-navy-900">P92</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Savings Goals */}
        <Card className="shadow-soft bg-neutral-300">
          <CardHeader>
            <CardTitle>Savings Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {savingsGoals.map((goal, index) => {
                const progress = (goal.current / goal.target) * 100;
                const badgeColors = {
                  critical: "bg-red-100 text-red-700",
                  "on-track": "bg-gold-100 text-gold-700",
                  ahead: "bg-green-100 text-green-700",
                };

                return (
                  <div
                    key={index}
                    className={cn(
                      "p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer bg-white",
                      selectedGoal === goal.name
                        ? "border-gold-400 bg-gold-50"
                        : "border-slate-200 hover:border-slate-300"
                    )}
                    onClick={() =>
                      setSelectedGoal(
                        selectedGoal === goal.name ? null : goal.name
                      )
                    }
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-navy-900">{goal.name}</h3>
                      <Badge className={cn("text-xs", badgeColors[goal.badge])}>
                        {goal.badge === "critical" && "Behind"}
                        {goal.badge === "on-track" && "On Track"}
                        {goal.badge === "ahead" && "Ahead"}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">
                          P{goal.current.toLocaleString()}
                        </span>
                        <span className="text-slate-900">
                          P{goal.target.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <p className="text-xs text-slate-500">
                        {Math.round(progress)}% complete
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Smart Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tips.map((tip, index) => (
            <Card
              key={index}
              className="shadow-soft border-l-4 border-l-gold-400"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center">
                    <tip.icon className="w-5 h-5 text-gold-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-navy-900 mb-1">
                      {tip.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-3">
                      {tip.description}
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gold-300 text-gold-700 hover:bg-gold-50"
                    >
                      {tip.action}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
