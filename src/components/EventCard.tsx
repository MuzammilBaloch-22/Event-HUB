import { Calendar, MapPin, Users, DollarSign } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Event } from "@/data/events";
import { Link } from "react-router-dom";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const availabilityPercentage = (event.seatsAvailable / event.totalSeats) * 100;
  
  const getAvailabilityColor = () => {
    if (availabilityPercentage > 50) return "bg-success";
    if (availabilityPercentage > 20) return "bg-secondary";
    return "bg-destructive";
  };
  
  return (
    <Card className="overflow-hidden transition-smooth hover:scale-[1.02] hover:shadow-glow gradient-card border-border/50">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover transition-smooth hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          <Badge className="bg-primary/90 backdrop-blur-sm">
            {event.category}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-5 space-y-3">
        <h3 className="text-xl font-bold line-clamp-1">{event.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {event.description}
        </p>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{new Date(event.date).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            })} at {event.time}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4 text-primary" />
              <span>{event.seatsAvailable} seats left</span>
            </div>
            
            <div className={`h-2 w-2 rounded-full ${getAvailabilityColor()}`} />
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-5 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <DollarSign className="h-5 w-5 text-secondary" />
          <span className="text-2xl font-bold">
            {event.price === 0 ? 'Free' : event.price.toFixed(2)}
          </span>
        </div>
        
        <Link to={`/event/${event.id}`}>
          <Button className="gradient-primary shadow-glow hover:opacity-90 transition-smooth">
            Book Ticket
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
