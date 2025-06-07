// Tips.jsx
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Lightbulb,
  TrendingUp,
  DollarSign,
  PiggyBank,
  Calendar,
  Clock,
  CheckCircle,
  Star,
  Target,
  Award,
} from "lucide-react";

const tips = [
  {
    id: 1,
    title: "Track Every Pula",
    description:
      "Start by recording every expense for one week. You'll be surprised where your money actually goes!",
    category: "budgeting",
    difficulty: "Easy",
    readTime: "2 min read",
    impact: "High Impact",
    featured: true,
    steps: [
      "Download a spending tracker app",
      "Record every purchase immediately",
      "Review weekly patterns",
      "Identify surprise expenses",
    ],
  },
  {
    id: 2,
    title: "The 50/30/20 Rule",
    description:
      "Allocate 50% for needs, 30% for wants, and 20% for savings and debt repayment.",
    category: "budgeting",
    difficulty: "Medium",
    readTime: "3 min read",
    impact: "High Impact",
    featured: false,
    steps: [
      "Calculate your after-tax income",
      "List all necessary expenses",
      "Set aside 20% for savings first",
      "Use remaining 30% for discretionary spending",
    ],
  },
  {
    id: 3,
    title: "Automate Your Savings",
    description:
      "Set up automatic transfers to your savings account right after payday.",
    category: "saving",
    difficulty: "Easy",
    readTime: "2 min read",
    impact: "Medium Impact",
    featured: false,
    steps: [
      "Open a high-yield savings account",
      "Set up automatic transfer",
      "Start with a small amount",
      "Increase gradually each month",
    ],
  },
  {
    id: 4,
    title: "Emergency Fund First",
    description:
      "Build P1,000 emergency fund before focusing on other financial goals.",
    category: "saving",
    difficulty: "Medium",
    readTime: "4 min read",
    impact: "High Impact",
    featured: false,
    steps: [
      "Set emergency fund goal",
      "Cut unnecessary expenses",
      "Save windfalls and bonuses",
      "Keep in separate, accessible account",
    ],
  },
  {
    id: 5,
    title: "Start Investing Early",
    description:
      "Even P250/month invested early can grow significantly due to compound interest.",
    category: "investing",
    difficulty: "Medium",
    readTime: "5 min read",
    impact: "High Impact",
    featured: false,
    steps: [
      "Open investment account",
      "Choose low-cost index funds",
      "Set up automatic investing",
      "Don't try to time the market",
    ],
  },
  {
    id: 6,
    title: "The 24-Hour Rule",
    description:
      "Wait 24 hours before making any non-essential purchase over P500.",
    category: "habits",
    difficulty: "Easy",
    readTime: "2 min read",
    impact: "Medium Impact",
    featured: false,
    steps: [
      "Identify the item you want",
      "Write it down with the price",
      "Wait 24 hours before buying",
      "Often you'll realize you don't need it",
    ],
  },
];

const modules = [
  {
    id: 1,
    title: "Budgeting Basics",
    description:
      "Learn how to create and stick to a budget that works for your lifestyle.",
    lessons: 6,
    duration: "45 min",
    progress: 75,
    icon: DollarSign,
  },
  {
    id: 2,
    title: "Smart Saving Strategies",
    description:
      "Discover proven methods to save more money without sacrificing your quality of life.",
    lessons: 8,
    duration: "60 min",
    progress: 30,
    icon: PiggyBank,
  },
  {
    id: 3,
    title: "Investment Fundamentals",
    description:
      "Understand the basics of investing and how to grow your wealth over time.",
    lessons: 10,
    duration: "90 min",
    progress: 0,
    icon: TrendingUp,
  },
  {
    id: 4,
    title: "Building Healthy Money Habits",
    description:
      "Develop sustainable financial habits that will serve you for life.",
    lessons: 5,
    duration: "30 min",
    progress: 60,
    icon: Target,
  },
];

const Tips = () => {
  // Removed type annotations from useState calls
  const [activeCategory, setActiveCategory] = useState("all");
  const [completedTips, setCompletedTips] = useState([]);

  const handleMarkComplete = (tipId) => {
    if (!completedTips.includes(tipId)) {
      setCompletedTips([...completedTips, tipId]);
    }
  };

  const dailyTip = tips.find((tip) => tip.featured) || tips[0];
  const filteredTips =
    activeCategory === "all"
      ? tips
      : tips.filter((tip) => tip.category === activeCategory);
  const completionRate = Math.round((completedTips.length / tips.length) * 100);

  return (
    <div className="min-h-screen animated-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-white drop-shadow-lg">
            Smart Tips & Education
          </h1>
          <p className="text-white/80 mt-1 drop-shadow">
            Learn, save, and build better financial habits
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="glass-card border-white/20">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-gold-600" />
                  <span className="text-sm font-medium text-navy-900">
                    Learning Progress
                  </span>
                </div>
                <div className="text-3xl font-bold mb-1 text-navy-900">
                  {completionRate}%
                </div>
                <Progress value={completionRate} className="bg-gold-600" />
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-gold-600" />
                  <span className="text-sm font-medium text-navy-900">
                    Tips Completed
                  </span>
                </div>
                <div className="text-3xl font-bold text-navy-900">
                  {completedTips.length}
                </div>
                <p className="text-sm text-navy-700">of {tips.length} total</p>
              </div>

              <div className="text-center md:text-right">
                <div className="flex items-center justify-center md:justify-end gap-2 mb-2">
                  <Star className="w-5 h-5 text-gold-600" />
                  <span className="text-sm font-medium text-navy-900">
                    Streak
                  </span>
                </div>
                <div className="text-3xl font-bold text-navy-900">7</div>
                <p className="text-sm text-navy-700">days active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Daily Featured Tip */}
        <Card className="glass-card border-l-4 border-l-gold-500 border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-gold-600" />
              <span className="text-navy-900">Tip of the Day</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <h3 className="text-xl font-bold text-navy-900 mb-3">
                  {dailyTip.title}
                </h3>
                <p className="text-slate-700 mb-4">{dailyTip.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-navy-100 text-navy-700">
                    {dailyTip.category}
                  </Badge>
                  <Badge className="bg-green-100 text-green-700">
                    {dailyTip.impact}
                  </Badge>
                  <Badge variant="outline">{dailyTip.difficulty}</Badge>
                </div>
                {!completedTips.includes(dailyTip.id) ? (
                  <Button
                    onClick={() => handleMarkComplete(dailyTip.id)}
                    className="gradient-navy"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Complete
                  </Button>
                ) : (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-medium">Completed!</span>
                  </div>
                )}
              </div>

              <div className="glass-card-dark p-6 rounded-xl">
                <h4 className="font-medium text-navy-900 mb-3">Quick Action</h4>
                <ul className="space-y-2">
                  {dailyTip.steps.map((step, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-slate-700"
                    >
                      <div className="w-5 h-5 bg-navy-200 text-navy-700 rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                        {index + 1}
                      </div>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Filters */}
        <Card className="glass-card border-white/20">
          <CardContent className="p-6">
            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="grid grid-cols-5 mb-6 glass-card">
                <TabsTrigger value="all">All Tips</TabsTrigger>
                <TabsTrigger value="budgeting">Budgeting</TabsTrigger>
                <TabsTrigger value="saving">Saving</TabsTrigger>
                <TabsTrigger value="investing">Investing</TabsTrigger>
                <TabsTrigger value="habits">Habits</TabsTrigger>
              </TabsList>

              {/* Tips Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTips.map((tip) => (
                  <Card
                    key={tip.id}
                    className="glass-card hover:glass-card-dark transition-all duration-200 border-white/20"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className={`p-2 rounded-lg ${
                            tip.category === "budgeting"
                              ? "bg-blue-100 text-blue-600"
                              : tip.category === "saving"
                              ? "bg-green-100 text-green-600"
                              : tip.category === "investing"
                              ? "bg-purple-100 text-purple-600"
                              : "bg-orange-100 text-orange-600"
                          }`}
                        >
                          {tip.category === "budgeting" && (
                            <DollarSign className="w-5 h-5" />
                          )}
                          {tip.category === "saving" && (
                            <PiggyBank className="w-5 h-5" />
                          )}
                          {tip.category === "investing" && (
                            <TrendingUp className="w-5 h-5" />
                          )}
                          {tip.category === "habits" && (
                            <Target className="w-5 h-5" />
                          )}
                        </div>
                        {completedTips.includes(tip.id) && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </div>

                      <h3 className="font-bold text-navy-900 mb-2">
                        {tip.title}
                      </h3>
                      <p className="text-sm text-slate-600 mb-4">
                        {tip.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          <Badge className="bg-slate-100 text-slate-700 text-xs">
                            {tip.readTime}
                          </Badge>
                          <Badge className="bg-green-100 text-green-700 text-xs">
                            {tip.impact}
                          </Badge>
                        </div>

                        {!completedTips.includes(tip.id) ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleMarkComplete(tip.id)}
                          >
                            Complete
                          </Button>
                        ) : (
                          <Badge className="bg-green-100 text-green-700">
                            ✓ Done
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* Learning Modules */}
        <Card className="glass-card border-white/20">
          <CardHeader>
            <CardTitle className="text-navy-900">
              Financial Education Modules
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {modules.map((module) => (
                <div
                  key={module.id}
                  className="glass-card-dark p-6 rounded-xl border border-white/20"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-navy-100 rounded-lg">
                      <module.icon className="w-5 h-5 text-navy-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-900">
                        {module.title}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {module.lessons} lessons • {module.duration}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-700 mb-4">
                    {module.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Progress value={module.progress} className="w-20" />
                      <span className="text-sm text-slate-600">
                        {module.progress}%
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant={module.progress > 0 ? "default" : "outline"}
                    >
                      {module.progress > 0 ? "Continue" : "Start"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Tips;
