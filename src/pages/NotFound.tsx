
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-beatsage-light-purple">
      <div className="text-center p-6 bg-white rounded-2xl shadow-lg max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-beatsage-dark-purple">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! This page is out of tune</p>
        <div className="mb-6">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
            <circle cx="60" cy="60" r="60" fill="#E5DEFF" />
            <path d="M75 40L75 70C75 75.5228 70.5228 80 65 80C59.4772 80 55 75.5228 55 70C55 64.4772 59.4772 60 65 60V40L75 40Z" fill="#9B87F5" />
            <circle cx="50" cy="50" r="10" fill="#9B87F5" />
          </svg>
        </div>
        <Button 
          variant="default" 
          className="bg-beatsage-purple hover:bg-beatsage-dark-purple"
          onClick={() => window.location.href = '/'}
        >
          <Home className="mr-2 h-4 w-4" /> Back to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
