import { useState } from "react";
import { Scanner as QRScanner } from "@yudiel/react-qr-scanner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, QrCode, Camera } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Scanner = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState<"valid" | "invalid" | null>(null);
  
  const handleScan = (result: any) => {
    if (result && result[0]?.rawValue) {
      const scannedData = result[0].rawValue;
      setScanResult(scannedData);
      setIsScanning(false);
      
      // Simulate validation (in real app, this would check against backend)
      const isValid = scannedData.includes("evt-");
      setScanStatus(isValid ? "valid" : "invalid");
    }
  };
  
  const handleError = (error: any) => {
    console.error("QR Scanner Error:", error);
  };
  
  const resetScanner = () => {
    setScanResult(null);
    setScanStatus(null);
    setIsScanning(true);
  };
  
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
              <QrCode className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-2">QR Ticket Scanner</h1>
            <p className="text-muted-foreground">
              Scan attendee tickets to validate entry
            </p>
          </div>
          
          <Card className="gradient-card border-border/50 shadow-card">
            <CardHeader>
              <CardTitle>Scanner</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {!isScanning && !scanResult && (
                <div className="text-center py-12">
                  <div className="inline-flex p-6 rounded-full bg-primary/10 mb-4">
                    <Camera className="h-16 w-16 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Ready to Scan</h3>
                  <p className="text-muted-foreground mb-6">
                    Click the button below to start scanning QR codes
                  </p>
                  <Button 
                    size="lg"
                    className="gradient-primary shadow-glow"
                    onClick={() => setIsScanning(true)}
                  >
                    Start Scanner
                  </Button>
                </div>
              )}
              
              {isScanning && (
                <div className="space-y-4">
                  <div className="rounded-xl overflow-hidden border-2 border-primary/30">
                    <QRScanner
                      onScan={handleScan}
                      onError={handleError}
                      constraints={{
                        facingMode: "environment"
                      }}
                      styles={{
                        container: {
                          width: "100%",
                          paddingTop: "100%",
                          position: "relative"
                        },
                        video: {
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover"
                        }
                      }}
                    />
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-3">
                      Position the QR code within the frame
                    </p>
                    <Button 
                      variant="outline"
                      onClick={() => setIsScanning(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
              
              {scanResult && scanStatus && (
                <div className="space-y-6">
                  <div className={`p-6 rounded-xl border-2 text-center ${
                    scanStatus === "valid" 
                      ? "bg-success/10 border-success" 
                      : "bg-destructive/10 border-destructive"
                  }`}>
                    <div className={`inline-flex p-4 rounded-full mb-4 ${
                      scanStatus === "valid" ? "bg-success/20" : "bg-destructive/20"
                    }`}>
                      {scanStatus === "valid" ? (
                        <CheckCircle className="h-16 w-16 text-success" />
                      ) : (
                        <XCircle className="h-16 w-16 text-destructive" />
                      )}
                    </div>
                    
                    <h3 className={`text-2xl font-bold mb-2 ${
                      scanStatus === "valid" ? "text-success" : "text-destructive"
                    }`}>
                      {scanStatus === "valid" ? "Valid Ticket" : "Invalid Ticket"}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4">
                      {scanStatus === "valid" 
                        ? "This ticket is authentic and can be admitted" 
                        : "This ticket could not be verified"}
                    </p>
                    
                    <Badge variant={scanStatus === "valid" ? "default" : "destructive"}>
                      Scanned Data: {scanResult}
                    </Badge>
                  </div>
                  
                  {scanStatus === "valid" && (
                    <div className="p-4 rounded-lg bg-background/50 border border-border">
                      <h4 className="font-semibold mb-2">Ticket Information</h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>Event: Sample Event (based on QR data)</p>
                        <p>Status: Ready for entry</p>
                        <p>Scan Time: {new Date().toLocaleTimeString()}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-3">
                    <Button 
                      className="flex-1 gradient-primary"
                      onClick={resetScanner}
                    >
                      Scan Another Ticket
                    </Button>
                    <Button 
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setScanResult(null);
                        setScanStatus(null);
                      }}
                    >
                      Done
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-sm text-muted-foreground text-center">
              <strong>Note:</strong> This is a demo scanner using dummy validation. 
              In production, tickets would be verified against a real database.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scanner;
