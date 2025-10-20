import { Link, useLocation } from "react-router-dom";
import { Ticket, Calendar, QrCode, LayoutDashboard } from "lucide-react";
import { Button } from "./ui/button";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg gradient-primary shadow-glow">
              <Ticket className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              EventHub
            </span>
          </Link>
          
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button 
                variant={isActive("/") ? "default" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Events</span>
              </Button>
            </Link>
            
            <Link to="/my-tickets">
              <Button 
                variant={isActive("/my-tickets") ? "default" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <Ticket className="h-4 w-4" />
                <span className="hidden sm:inline">My Tickets</span>
              </Button>
            </Link>
            
            <Link to="/dashboard">
              <Button 
                variant={isActive("/dashboard") ? "default" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Button>
            </Link>
            
            <Link to="/scanner">
              <Button 
                variant={isActive("/scanner") ? "secondary" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <QrCode className="h-4 w-4" />
                <span className="hidden sm:inline">Scan</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
