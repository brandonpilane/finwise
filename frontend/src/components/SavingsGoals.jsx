// SavingsGoals.jsx
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Target,
  Plus,
  Trophy,
  Star,
  Gift,
  Home,
  Car,
  Plane,
  CheckCircle,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils"; // cn is likely a utility function for conditional class names

const achievements = [
  {
    name: "First Goal",
    description: "Set your first savings goal",
    unlocked: true,
    icon: Target,
  },
  {
    name: "Consistent Saver",
    description: "Save for 30 days straight",
    unlocked: true,
    icon: Star,
  },
  {
    name: "Goal Crusher",
    description: "Complete your first savings goal",
    unlocked: false,
    icon: Trophy,
  },
  {
    name: "Emergency Ready",
    description: "Build a 3-month emergency fund",
    unlocked: false,
    icon: Award,
  },
];

const goalTemplates = [
  {
    name: "Emergency Fund",
    target: 5000,
    icon: Home,
    color: "bg-red-100 text-red-700",
  },
  {
    name: "Vacation",
    target: 2500,
    icon: Plane,
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "New Car",
    target: 15000,
    icon: Car,
    color: "bg-green-100 text-green-700",
  },
  {
    name: "Gift Fund",
    target: 500,
    icon: Gift,
    color: "bg-purple-100 text-purple-700",
  },
];

const savingsGoals = [
  {
    id: 1,
    name: "Emergency Fund",
    current: 3500,
    target: 5000,
    monthlyContribution: 300,
    deadline: "2024-12-31",
    status: "on-track",
    icon: Home,
    color: "red",
  },
  {
    id: 2,
    name: "Dream Vacation",
    current: 1200,
    target: 2500,
    monthlyContribution: 200,
    deadline: "2024-08-15",
    status: "behind",
    icon: Plane,
    color: "blue",
  },
  {
    id: 3,
    name: "New Car Down Payment",
    current: 8500,
    target: 15000,
    monthlyContribution: 500,
    deadline: "2025-06-01",
    status: "ahead",
    icon: Car,
    color: "green",
  },
];

const SavingsGoals = () => {
  // Removed type annotations from useState calls
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [newGoalOpen, setNewGoalOpen] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "ahead":
        return "text-green-600 bg-green-100";
      case "on-track":
        return "text-gold-600 bg-gold-100";
      case "behind":
        return "text-red-600 bg-red-100";
      default:
        return "text-slate-600 bg-slate-100";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "ahead":
        return "Ahead of Schedule";
      case "on-track":
        return "On Track";
      case "behind":
        return "Behind Schedule";
      default:
        return "Not Started";
    }
  };

  const calculateMonthsToGoal = (current, target, monthlyContribution) => {
    if (monthlyContribution <= 0) return "∞";
    return Math.ceil((target - current) / monthlyContribution);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-navy-900">Savings Goals</h1>
            <p className="text-slate-600 mt-1">
              Track your progress and achieve your dreams
            </p>
          </div>
          <Dialog open={newGoalOpen} onOpenChange={setNewGoalOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-navy text-black">
                <Plus className="w-4 h-4 mr-2" />
                New Goal
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Savings Goal</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {goalTemplates.map((template) => (
                    <Button
                      key={template.name}
                      variant="outline"
                      className="h-20 flex flex-col gap-2"
                    >
                      <div
                        className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center",
                          template.color
                        )}
                      >
                        <template.icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs">{template.name}</span>
                    </Button>
                  ))}
                </div>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="goal-name">Goal Name</Label>
                    <Input id="goal-name" placeholder="Enter goal name" />
                  </div>
                  <div>
                    <Label htmlFor="target-amount">Target Amount</Label>
                    <Input id="target-amount" type="number" placeholder="P0" />
                  </div>
                  <div>
                    <Label htmlFor="monthly-contribution">
                      Monthly Contribution
                    </Label>
                    <Input
                      id="monthly-contribution"
                      type="number"
                      placeholder="P0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="deadline">Target Date</Label>
                    <Input id="deadline" type="date" />
                  </div>
                </div>
                <Button className="w-full gradient-navy text-black">
                  Create Goal
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Progress Overview */}
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-sm text-slate-600">Total Saved</p>
                <p className="text-3xl font-bold text-navy-900">P13,200</p>
                <p className="text-sm text-green-600">+P800 this month</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-600">Total Goals</p>
                <p className="text-3xl font-bold text-navy-900">3</p>
                <p className="text-sm text-slate-600">1 completed</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-600">Monthly Savings</p>
                <p className="text-3xl font-bold text-navy-900">P1,000</p>
                <p className="text-sm text-gold-600">23% of income</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-slate-600">Next Milestone</p>
                <p className="text-3xl font-bold text-navy-900">5 days</p>
                <p className="text-sm text-slate-600">Emergency fund</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savingsGoals.map((goal) => {
            const progress = (goal.current / goal.target) * 100;
            const monthsLeft = calculateMonthsToGoal(
              goal.current,
              goal.target,
              goal.monthlyContribution
            );

            return (
              <Card
                key={goal.id}
                className={cn(
                  "shadow-soft hover:shadow-elegant transition-all duration-300 cursor-pointer",
                  selectedGoal === goal.id ? "ring-2 ring-gold-400" : ""
                )}
                onClick={() =>
                  setSelectedGoal(selectedGoal === goal.id ? null : goal.id)
                }
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center",
                          goal.color === "red" && "bg-red-100",
                          goal.color === "blue" && "bg-blue-100",
                          goal.color === "green" && "bg-green-100"
                        )}
                      >
                        <goal.icon
                          className={cn(
                            "w-6 h-6",
                            goal.color === "red" && "text-red-600",
                            goal.color === "blue" && "text-blue-600",
                            goal.color === "green" && "text-green-600"
                          )}
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-navy-900">
                          {goal.name}
                        </h3>
                        <Badge
                          className={cn("text-xs", getStatusColor(goal.status))}
                        >
                          {getStatusText(goal.status)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600">
                        P{goal.current.toLocaleString()}
                      </span>
                      <span className="font-medium text-navy-900">
                        P{goal.target.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={progress} className="h-3" />
                    <p className="text-xs text-slate-500 mt-1">
                      {Math.round(progress)}% complete
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-600">Monthly</p>
                      <p className="font-medium text-navy-900">
                        P{goal.monthlyContribution}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-600">Time left</p>
                      <p className="font-medium text-navy-900">
                        {monthsLeft} months
                      </p>
                    </div>
                  </div>

                  {selectedGoal === goal.id && (
                    <div className="animate-slide-up space-y-3 pt-3 border-t border-slate-200">
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          Add Money
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          Edit Goal
                        </Button>
                      </div>
                      <div className="text-xs text-slate-600">
                        <p>Created: March 1, 2024</p>
                        <p>Last contribution: 3 days ago</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Achievements */}
        <Card className="shadow-soft bg-neutral-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-gold-600" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={cn(
                    "p-4 rounded-xl border-2 transition-all duration-200",
                    achievement.unlocked
                      ? "border-gold-300 bg-gradient-to-br from-gold-50 to-yellow-50"
                      : "border-slate-200 bg-slate-50 opacity-60"
                  )}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center",
                        achievement.unlocked ? "bg-gold-100" : "bg-slate-200"
                      )}
                    >
                      {achievement.unlocked ? (
                        <CheckCircle className="w-5 h-5 text-gold-600" />
                      ) : (
                        <achievement.icon className="w-5 h-5 text-slate-500" />
                      )}
                    </div>
                    <div>
                      <h3
                        className={cn(
                          "font-medium",
                          achievement.unlocked
                            ? "text-navy-900"
                            : "text-slate-500"
                        )}
                      >
                        {achievement.name}
                      </h3>
                    </div>
                  </div>
                  <p
                    className={cn(
                      "text-sm",
                      achievement.unlocked ? "text-slate-900" : "text-slate-800"
                    )}
                  >
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tips for Better Saving */}
        <Card className="shadow-soft gradient-navy text-black">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">💡 Smart Saving Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Automate Your Savings</h4>
                <p className="text-sm opacity-90">
                  Set up automatic transfers to reach your goals faster without
                  thinking about it.
                </p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Round Up Purchases</h4>
                <p className="text-sm opacity-90">
                  Enable round-up savings to save spare change from every
                  purchase automatically.
                </p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Review & Adjust</h4>
                <p className="text-sm opacity-90">
                  Review your goals monthly and adjust contributions based on
                  your current situation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SavingsGoals;
