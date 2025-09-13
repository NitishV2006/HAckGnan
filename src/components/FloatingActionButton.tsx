import { Plus, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingActionButtonProps {
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export const FloatingActionButton = ({ 
  onClick, 
  icon = <Plus className="h-6 w-6" />,
  className = ""
}: FloatingActionButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className={`floating-action ${className}`}
      size="lg"
    >
      {icon}
    </Button>
  );
};

export const CommunityFloatingButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <FloatingActionButton
      onClick={onClick}
      icon={<MessageCircle className="h-6 w-6" />}
      className="bg-community-accent hover:bg-[hsl(var(--community-accent))/0.9]"
    />
  );
};