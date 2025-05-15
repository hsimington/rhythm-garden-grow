
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface TooltipMessageProps {
  message: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
  onContinue: () => void;
  onClose?: () => void;
  hintElement?: ReactNode;
}

const TooltipMessage = ({ 
  message, 
  position, 
  onContinue, 
  onClose,
  hintElement 
}: TooltipMessageProps) => {
  const positionClasses = {
    top: "bottom-full mb-4",
    bottom: "top-full mt-4",
    left: "right-full mr-4",
    right: "left-full ml-4",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
  };

  return (
    <div className={`absolute z-50 max-w-xs ${positionClasses[position]}`}>
      <Card className="bg-white p-4 shadow-lg rounded-lg border-2 border-beatsage-purple">
        <p className="text-sm mb-3">{message}</p>
        {hintElement && (
          <div className="mb-3 p-2 bg-beatsage-light-purple rounded-md">
            {hintElement}
          </div>
        )}
        <div className="flex justify-between gap-2">
          {onClose && (
            <Button 
              onClick={onClose}
              variant="outline" 
              size="sm"
            >
              Skip
            </Button>
          )}
          <Button 
            onClick={onContinue}
            className="bg-beatsage-purple hover:bg-beatsage-dark-purple"
            size="sm"
          >
            Continue
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TooltipMessage;
