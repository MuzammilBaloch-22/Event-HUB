import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Booking } from "@/data/events";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Ticket, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const MyTickets = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  
  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(storedBookings);
  }, []);
  
  if (bookings.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="p-6 rounded-full bg-primary/10 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <Ticket className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">No Tickets Yet</h1>
          <p className="text-xl text-muted-foreground mb-8">
            You haven't booked any events yet. Start exploring amazing events!
          </p>
          <Button 
            size="lg"
            className="gradient-primary shadow-glow"
            onClick={() => navigate("/")}
          >
            Browse Events
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Tickets</h1>
          <p className="text-muted-foreground">
            You have {bookings.length} {bookings.length === 1 ? 'ticket' : 'tickets'}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map(booking => (
            <Card 
              key={booking.id} 
              className="gradient-card border-border/50 hover:border-primary/50 transition-smooth hover:shadow-glow cursor-pointer"
              onClick={() => navigate(`/ticket/${booking.id}`)}
            >
              <div className="relative h-48 overflow-hidden rounded-t-xl">
                <img 
                  src={booking.event.image} 
                  alt={booking.event.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-success">
                    {booking.ticketCount} {booking.ticketCount === 1 ? 'Ticket' : 'Tickets'}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="line-clamp-1">{booking.event.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>
                    {new Date(booking.event.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="line-clamp-1">{booking.event.location}</span>
                </div>
                
                <div className="pt-3 border-t border-border flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    ${booking.totalPrice.toFixed(2)}
                  </span>
                  
                  <Button 
                    size="sm"
                    className="gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/ticket/${booking.id}`);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                    View Ticket
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyTickets;
