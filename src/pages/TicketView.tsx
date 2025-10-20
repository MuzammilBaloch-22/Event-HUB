import { useParams, useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, User, Mail, Hash, CheckCircle, Download, ArrowLeft } from "lucide-react";
import { Booking } from "@/data/events";

const TicketView = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  
  const bookings: Booking[] = JSON.parse(localStorage.getItem("bookings") || "[]");
  const booking = bookings.find(b => b.id === bookingId);
  
  if (!booking) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Ticket Not Found</h1>
        <Button onClick={() => navigate("/my-tickets")}>View My Tickets</Button>
      </div>
    );
  }
  
  const handleDownload = () => {
    // Simulate download
    alert("In a real app, this would download the ticket as a PDF or image!");
  };
  
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="gap-2"
            onClick={() => navigate("/my-tickets")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to My Tickets
          </Button>
        </div>
        
        {/* Success Message */}
        <div className="max-w-2xl mx-auto mb-8 p-6 rounded-xl bg-success/10 border border-success/20 flex items-center gap-4">
          <div className="p-3 rounded-full bg-success/20">
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-success">Booking Confirmed!</h2>
            <p className="text-muted-foreground">
              Your ticket has been sent to {booking.userEmail}
            </p>
          </div>
        </div>
        
        {/* Ticket Card */}
        <div className="max-w-2xl mx-auto">
          <Card className="gradient-card border-2 border-primary/30 shadow-glow overflow-hidden">
            {/* Ticket Header */}
            <div className="gradient-primary p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm opacity-90">Event Ticket</p>
                  <h1 className="text-3xl font-bold">{booking.event.title}</h1>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-90">Tickets</p>
                  <p className="text-4xl font-bold">{booking.ticketCount}</p>
                </div>
              </div>
            </div>
            
            <CardContent className="p-8 space-y-6">
              {/* Event Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Date & Time</p>
                      <p className="font-semibold">
                        {new Date(booking.event.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </p>
                      <p className="text-sm">{booking.event.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-semibold">{booking.event.venue}</p>
                      <p className="text-sm">{booking.event.location}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="font-semibold">{booking.userName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-semibold">{booking.userEmail}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Hash className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Booking ID</p>
                      <p className="font-semibold font-mono text-sm">{booking.id}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* QR Code */}
              <div className="border-t border-dashed border-border pt-6">
                <div className="text-center space-y-4">
                  <p className="text-sm text-muted-foreground font-semibold">
                    SHOW THIS QR CODE AT ENTRY
                  </p>
                  
                  <div className="flex justify-center">
                    <div className="p-6 bg-white rounded-2xl shadow-card">
                      <QRCodeSVG 
                        value={booking.qrCode}
                        size={200}
                        level="H"
                        includeMargin={false}
                      />
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground font-mono">
                    {booking.qrCode}
                  </p>
                </div>
              </div>
              
              {/* Total */}
              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Total Paid</span>
                  <span className="text-3xl font-bold text-primary">
                    ${booking.totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1 gap-2"
                  onClick={handleDownload}
                >
                  <Download className="h-4 w-4" />
                  Download Ticket
                </Button>
                <Button 
                  className="flex-1 gradient-primary"
                  onClick={() => navigate("/")}
                >
                  Browse More Events
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Info Box */}
          <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-sm text-muted-foreground text-center">
              Please arrive 30 minutes before the event starts. Keep this ticket accessible on your device.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketView;
