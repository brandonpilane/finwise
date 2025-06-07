// Navigation.jsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Home,
  TrendingUp,
  Target,
  Lightbulb,
  Menu,
  X,
  User,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/assets/logo.svg";

const Navigation = ({ activeTab, onTabChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "insights", label: "Insights", icon: TrendingUp },
    { id: "goals", label: "Goals", icon: Target },
    { id: "tips", label: "Tips", icon: Lightbulb },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex bg-white shadow-soft border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto w-full px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 gradient-navy rounded-xl flex items-center justify-center">
                <span className="w-10 h-10 flex items-center justify-center">
                  <img src={Logo} alt="Logo" />
                </span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-navy-900">FinWise</h1>
                <p className="text-xs text-slate-600">Coach</p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onTabChange(item.id)}
                  className={cn(
                    "flex items-center gap-2 transition-all duration-200",
                    activeTab === item.id
                      ? "gradient-navy text-white shadow-md"
                      : "text-slate-600 hover:text-navy-900 hover:bg-slate-100"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                <Badge className="absolute -top-1 -right-1 w-2 h-2 p-0 bg-red-500 border-white">
                  <span className="sr-only">2 notifications</span>
                </Badge>
              </Button>
              <Button variant="ghost" size="sm">
                <User className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Mobile Header */}
        <div className="bg-white shadow-soft border-b border-slate-200 sticky top-0 z-40">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 gradient-navy rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">$</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-navy-900">FinWise</h1>
                <p className="text-xs text-slate-600">Coach</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                <Badge className="absolute -top-1 -right-1 w-2 h-2 p-0 bg-red-500 border-white">
                  <span className="sr-only">2 notifications</span>
                </Badge>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div
              className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-navy-900">Menu</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="p-4 space-y-2">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => {
                      onTabChange(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={cn(
                      "w-full justify-start gap-3 transition-all duration-200",
                      activeTab === item.id
                        ? "gradient-navy text-white"
                        : "text-slate-600 hover:text-navy-900 hover:bg-slate-100"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                ))}

                <div className="pt-4 mt-4 border-t border-slate-200 space-y-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-3"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-3"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Tab Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-30">
          <div className="flex items-center justify-around h-16 px-2">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "flex flex-col items-center gap-1 h-14 px-3 transition-all duration-200",
                  activeTab === item.id ? "text-navy-900" : "text-slate-500"
                )}
              >
                <div
                  className={cn(
                    "p-1.5 rounded-lg transition-all duration-200",
                    activeTab === item.id ? "bg-navy-100" : "bg-transparent"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
