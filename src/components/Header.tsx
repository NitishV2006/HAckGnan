import { Bell, Leaf, User, LogOut, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import sarvagnanLogo from "@/assets/sarvagnan-logo.png";

interface HeaderProps {
  userName?: string;
  points?: number;
}

export const Header = ({ userName = "Wellness Seeker", points = 0 }: HeaderProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || userName;

  return (
    <header className="premium-card border-0 shadow-[var(--shadow-soft)] m-3 mb-0 sticky top-3 z-40 backdrop-blur-md bg-card/90">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img 
            src={sarvagnanLogo} 
            alt="Sarvagnan" 
            className="h-10 w-10 rounded-2xl shadow-[var(--shadow-soft)] calm-hover"
          />
          <div>
            <h1 className="text-premium-lg text-foreground">
              सर्वज्ञान्
            </h1>
            <p className="text-sm text-muted-foreground font-medium">
              नमस्ते, {displayName}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="points-badge gentle-pulse">
            <Sparkles className="h-4 w-4 mr-2" />
            {points.toLocaleString()}
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-11 w-11 p-0 calm-hover rounded-2xl">
                <Avatar className="h-11 w-11 border-2 border-primary/20">
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-medium">
                    {displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="premium-card border-border/30">
              <DropdownMenuItem onClick={() => navigate('/profile')} className="calm-hover">
                <User className="h-4 w-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="calm-hover text-destructive">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};