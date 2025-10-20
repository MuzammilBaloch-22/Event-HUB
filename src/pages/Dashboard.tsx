import { dummyEvents } from "@/data/events";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, DollarSign, TrendingUp, Eye, QrCode } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Calculate stats from dummy data
  const totalEvents = dummyEvents.length;
  const totalSeatsBooked = dummyEvents.reduce((acc, event) => 
    acc + (event.totalSeats - event.seatsAvailable), 0
  );
  const totalRevenue = dummyEvents.reduce((acc, event) => 
    acc + (event.price * (event.totalSeats - event.seatsAvailable)), 0
  );
  const averageBookingRate = ((totalSeatsBooked / dummyEvents.reduce((acc, event) => 
    acc + event.totalSeats, 0)) * 100).toFixed(1);
  
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Organizer Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your events and attendee statistics
          </p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="gradient-card border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Events
              </CardTitle>
              <Calendar className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalEvents}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Active events
              </p>
            </CardContent>
          </Card>
          
          <Card className="gradient-card border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Attendees
              </CardTitle>
              <Users className="h-5 w-5 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalSeatsBooked}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Across all events
              </p>
            </CardContent>
          </Card>
          
          <Card className="gradient-card border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-5 w-5 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                From ticket sales
              </p>
            </CardContent>
          </Card>
          
          <Card className="gradient-card border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Booking Rate
              </CardTitle>
              <TrendingUp className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{averageBookingRate}%</div>
              <p className="text-xs text-muted-foreground mt-1">
                Average fill rate
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Events List */}
        <Card className="gradient-card border-border/50">
          <CardHeader>
            <CardTitle>Your Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dummyEvents.map(event => {
                const attendees = event.totalSeats - event.seatsAvailable;
                const fillRate = ((attendees / event.totalSeats) * 100).toFixed(0);
                
                return (
                  <div 
                    key={event.id}
                    className="p-4 rounded-lg bg-background/50 border border-border/50 hover:border-primary/50 transition-smooth"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex gap-4 flex-1">
                        <img 
                          src={event.image} 
                          alt={event.title}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-lg">{event.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                {new Date(event.date).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric', 
                                  year: 'numeric' 
                                })} • {event.location}
                              </p>
                            </div>
                            <Badge variant={event.seatsAvailable > 50 ? "default" : "secondary"}>
                              {event.category}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 mt-3">
                            <div>
                              <p className="text-xs text-muted-foreground">Attendees</p>
                              <p className="font-semibold">{attendees} / {event.totalSeats}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Fill Rate</p>
                              <p className="font-semibold">{fillRate}%</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Revenue</p>
                              <p className="font-semibold">${(event.price * attendees).toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="gap-2"
                          onClick={() => navigate(`/event/${event.id}`)}
                        >
                          <Eye className="h-4 w-4" />
                          View
                        </Button>
                        <Button 
                          size="sm"
                          variant="outline"
                          className="gap-2"
                          onClick={() => navigate("/scanner")}
                        >
                          <QrCode className="h-4 w-4" />
                          Scan
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
