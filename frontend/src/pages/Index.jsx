import { useState } from "react";
import Navigation from "@/components/Navigation";
import Dashboard from "@/components/Dashboard";
import Insights from "@/components/Insights";
import SavingsGoals from "@/components/SavingsGoals";
import Tips from "@/components/Tips";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "insights":
        return <Insights />;
      case "goals":
        return <SavingsGoals />;
      case "tips":
        return <Tips />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="pb-20 md:pb-0">{renderActiveComponent()}</main>
    </div>
  );
};

export default Index;
