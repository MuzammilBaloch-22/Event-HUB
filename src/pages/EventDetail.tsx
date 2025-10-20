import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { dummyEvents, Booking } from "@/data/events";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, MapPin, Users, DollarSign, Clock, Building, User, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EventDetail = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const event = dummyEvents.find(e => e.id === eventId);
  const [ticketCount, setTicketCount] = useState(1);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  
  if (!event) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
        <Button onClick={() => navigate("/")}>Back to Events</Button>
      </div>
    );
  }
  
  const totalPrice = event.price * ticketCount;
  
  const handleBooking = () => {
    if (!userName || !userEmail) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name and email.",
        variant: "destructive"
      });
      return;
    }
    
    if (ticketCount > event.seatsAvailable) {
      toast({
        title: "Not Enough Seats",
        description: `Only ${event.seatsAvailable} seats available.`,
        variant: "destructive"
      });
      return;
    }
    
    const booking: Booking = {
      id: `BKG-${Date.now()}`,
      eventId: event.id,
      event: event,
      userName,
      userEmail,
      ticketCount,
      totalPrice,
      bookingDate: new Date().toISOString(),
      qrCode: `${event.id}-${userName}-${Date.now()}`
    };
    
    // Store in localStorage
    const existingBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    localStorage.setItem("bookings", JSON.stringify([...existingBookings, booking]));
    
    toast({
      title: "Booking Successful!",
      description: `Your ${ticketCount} ticket(s) have been booked.`,
      className: "bg-success text-success-foreground"
    });
    
    navigate(`/ticket/${booking.id}`);
  };
  
  return (
    <div className="min-h-screen">
      {/* Header Image */}
      <div className="relative h-[400px] overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        <div className="absolute top-6 left-6">
          <Button 
            variant="ghost" 
            className="gap-2 bg-background/50 backdrop-blur-md hover:bg-background/70"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
      </div>
      
      <div className="container mx-auto px-4 -mt-32 relative z-10 pb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Event Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="gradient-card border-border/50 shadow-card">
              <CardHeader>
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold">{event.title}</h1>
                  <p className="text-muted-foreground">{event.description}</p>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date & Time</p>
                      <p className="font-semibold">
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          weekday: 'long',
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </p>
                      <p className="text-sm text-muted-foreground">{event.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-semibold">{event.venue}</p>
                      <p className="text-sm text-muted-foreground">{event.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Availability</p>
                      <p className="font-semibold">{event.seatsAvailable} seats available</p>
                      <p className="text-sm text-muted-foreground">of {event.totalSeats} total</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Organizer</p>
                      <p className="font-semibold">{event.organizer}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="gradient-card border-border/50 shadow-card sticky top-24">
              <CardHeader>
                <CardTitle>Book Your Tickets</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Price per ticket</span>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-secondary" />
                      <span className="text-2xl font-bold">
                        {event.price === 0 ? 'Free' : event.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tickets">Number of Tickets</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                    >
                      -
                    </Button>
                    <Input
                      id="tickets"
                      type="number"
                      min="1"
                      max={event.seatsAvailable}
                      value={ticketCount}
                      onChange={(e) => setTicketCount(Math.max(1, parseInt(e.target.value) || 1))}
                      className="text-center"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setTicketCount(Math.min(event.seatsAvailable, ticketCount + 1))}
                    >
                      +
                    </Button>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold">Total</span>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-5 w-5 text-secondary" />
                      <span className="text-3xl font-bold">
                        {totalPrice === 0 ? 'Free' : totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full gradient-primary shadow-glow hover:opacity-90 transition-smooth"
                    size="lg"
                    onClick={handleBooking}
                  >
                    Confirm Booking
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
