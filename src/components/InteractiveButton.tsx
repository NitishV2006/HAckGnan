import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface InteractiveButtonProps {
  children: React.ReactNode;
  onClick?: () => void | Promise<void>;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  disabled?: boolean;
  loadingText?: string;
  successText?: string;
  showSuccessState?: boolean;
}

export const InteractiveButton = ({
  children,
  onClick,
  variant = "default",
  size = "default",
  className,
  disabled = false,
  loadingText = "Loading...",
  successText = "Success!",
  showSuccessState = true,
  ...props
}: InteractiveButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleClick = async () => {
    if (disabled || isLoading) return;

    setIsLoading(true);
    
    // Add artificial delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      await onClick?.();
      
      if (showSuccessState) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      }
    } catch (error) {
      console.error("Button action failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonContent = () => {
    if (isLoading) {
      return (
        <>
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
          {loadingText}
        </>
      );
    }
    
    if (showSuccess) {
      return successText;
    }
    
    return children;
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={cn(
        "interactive-button",
        isLoading && "cursor-wait",
        showSuccess && "bg-green-500 hover:bg-green-600 text-white animate-glow-pulse",
        className
      )}
      {...props}
    >
      {getButtonContent()}
    </Button>
  );
};