import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Router, Wifi, Shield, Users } from "lucide-react";

export function NetworkHeader() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 bg-gradient-primary rounded-2xl shadow-glow">
            <Router className="w-12 h-12 text-white" />
          </div>
        </div>
        <div>
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            MikroTik Hotspot Manager
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Complete RB951Ui-2HnD configuration generator for universal hotspot billing
          </p>
        </div>
      </div>

      <Card className="bg-gradient-dark border-border shadow-card p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="p-3 bg-network-primary/20 rounded-lg">
                <Wifi className="w-6 h-6 text-network-primary" />
              </div>
            </div>
            <div>
              <div className="font-semibold text-foreground">Hotspot Ready</div>
              <div className="text-sm text-muted-foreground">Login page configured</div>
            </div>
          </div>
          
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="p-3 bg-network-secondary/20 rounded-lg">
                <Users className="w-6 h-6 text-network-secondary" />
              </div>
            </div>
            <div>
              <div className="font-semibold text-foreground">User Manager</div>
              <div className="text-sm text-muted-foreground">Billing system integrated</div>
            </div>
          </div>
          
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="p-3 bg-network-success/20 rounded-lg">
                <Shield className="w-6 h-6 text-network-success" />
              </div>
            </div>
            <div>
              <div className="font-semibold text-foreground">Security</div>
              <div className="text-sm text-muted-foreground">Firewall & NAT rules</div>
            </div>
          </div>
          
          <div className="text-center space-y-2">
            <Badge className="bg-network-success text-white px-3 py-1 text-sm font-medium">
              RouterOS 6.x & 7.x Compatible
            </Badge>
            <div className="text-xs text-muted-foreground">
              Ready for production deployment
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}