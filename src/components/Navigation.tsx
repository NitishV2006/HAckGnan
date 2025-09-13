import { Home, Heart, ShoppingBag, Users, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    sanskrit: "आरोग्यपथः",
    english: "Home",
    path: "/",
    icon: Home,
  },
  {
    sanskrit: "आरोग्यमन्दिर",
    english: "Wellness",
    path: "/wellness",
    icon: Heart,
  },
  {
    sanskrit: "आरोग्यसम्पदः",
    english: "Marketplace",
    path: "/marketplace",
    icon: ShoppingBag,
  },
  {
    sanskrit: "सहचर्यम्",
    english: "Community",
    path: "/community",
    icon: Users,
  },
  {
    sanskrit: "स्वलक्ष्यः",
    english: "Profile",
    path: "/profile",
    icon: User,
  },
];

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border/30 z-50 premium-card rounded-t-3xl border-0 m-3 mb-0">
      <div className="grid grid-cols-5 h-20 px-2">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "nav-item flex flex-col items-center justify-center gap-1 px-3 py-2 mx-1 transition-[var(--transition-smooth)]",
                isActive && "nav-item active"
              )}
            >
              <Icon className={cn(
                "h-6 w-6 transition-[var(--transition-smooth)]", 
                isActive ? "scale-110 text-primary" : "text-muted-foreground"
              )} />
              <div className="text-center">
                <div className={cn(
                  "text-xs font-devanagari font-medium transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}>
                  {item.sanskrit}
                </div>
                <div className={cn(
                  "text-[10px] transition-colors",
                  isActive ? "text-primary/80" : "text-muted-foreground/75"
                )}>
                  {item.english}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};