import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Download, Eye, Shield, Wifi, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const configurations = {
  basic: `# MikroTik RB951Ui-2HnD Complete Hotspot Configuration
# Universal Billing System with User Manager
# Compatible with RouterOS 6.x and 7.x

# ===============================
# BASIC NETWORK CONFIGURATION
# ===============================

# Set identity
/system identity set name="Hotspot-Gateway"

# Configure WAN interface (ether1)
/ip address add address=dhcp interface=ether1

# Configure LAN interface (ether2-master-local)
/ip address add address=192.168.1.1/24 interface=ether2-master-local

# Create DHCP pool
/ip pool add name=dhcp_pool ranges=192.168.1.100-192.168.1.200

# Configure DHCP server
/ip dhcp-server add address-pool=dhcp_pool disabled=no interface=ether2-master-local name=dhcp1
/ip dhcp-server network add address=192.168.1.0/24 dns-server=8.8.8.8,8.8.4.4 gateway=192.168.1.1

# Configure DNS
/ip dns set servers=8.8.8.8,8.8.4.4 allow-remote-requests=yes`,

  hotspot: `# ===============================
# HOTSPOT CONFIGURATION
# ===============================

# Create hotspot profile
/ip hotspot profile add dns-name=hotspot.local hotspot-address=192.168.1.1 \\
    html-directory=hotspot login-by=cookie,http-chap name=hsprof1 \\
    use-radius=yes smtp-server=127.0.0.1

# Create hotspot server
/ip hotspot add address-pool=dhcp_pool disabled=no interface=ether2-master-local \\
    name=hotspot1 profile=hsprof1

# Create user profiles with bandwidth limits
/ip hotspot user profile add name="1mbps" rate-limit=1M/1M shared-users=3 \\
    session-timeout=30d keepalive-timeout=2m
/ip hotspot user profile add name="2mbps" rate-limit=2M/2M shared-users=3 \\
    session-timeout=30d keepalive-timeout=2m
/ip hotspot user profile add name="5mbps" rate-limit=5M/5M shared-users=3 \\
    session-timeout=30d keepalive-timeout=2m
/ip hotspot user profile add name="10mbps" rate-limit=10M/10M shared-users=3 \\
    session-timeout=30d keepalive-timeout=2m

# Configure RADIUS for User Manager
/radius add address=127.0.0.1 secret=testing123 service=hotspot`,

  usermanager: `# ===============================
# USER MANAGER CONFIGURATION
# ===============================

# Create User Manager profiles with pricing
/user-manager user profile add name="1mbps-profile" name-for-users="Basic 1Mbps" \\
    owner=admin price=5 starts-at=logon validity=30d
/user-manager user profile add name="2mbps-profile" name-for-users="Standard 2Mbps" \\
    owner=admin price=10 starts-at=logon validity=30d
/user-manager user profile add name="5mbps-profile" name-for-users="Premium 5Mbps" \\
    owner=admin price=20 starts-at=logon validity=30d
/user-manager user profile add name="10mbps-profile" name-for-users="Business 10Mbps" \\
    owner=admin price=35 starts-at=logon validity=30d

# Create bandwidth limitations
/user-manager limitation add name="1mbps-limit" owner=admin rate-limit-rx=1M rate-limit-tx=1M
/user-manager limitation add name="2mbps-limit" owner=admin rate-limit-rx=2M rate-limit-tx=2M
/user-manager limitation add name="5mbps-limit" owner=admin rate-limit-rx=5M rate-limit-tx=5M
/user-manager limitation add name="10mbps-limit" owner=admin rate-limit-rx=10M rate-limit-tx=10M

# Associate limitations with profiles
/user-manager profile limitation add limitation="1mbps-limit" profile="1mbps-profile"
/user-manager profile limitation add limitation="2mbps-limit" profile="2mbps-profile"
/user-manager profile limitation add limitation="5mbps-limit" profile="5mbps-profile"
/user-manager profile limitation add limitation="10mbps-limit" profile="10mbps-profile"

# Enable User Manager router
/user-manager router add address=127.0.0.1 name="local-router" shared-secret=testing123`,

  firewall: `# ===============================
# FIREWALL AND SECURITY
# ===============================

# NAT masquerading for internet access
/ip firewall nat add action=masquerade chain=srcnat out-interface=ether1

# Allow established and related connections
/ip firewall filter add action=accept chain=forward connection-state=established,related
/ip firewall filter add action=accept chain=input connection-state=established,related

# Allow hotspot and management traffic
/ip firewall filter add action=accept chain=input dst-port=53 protocol=udp
/ip firewall filter add action=accept chain=input dst-port=53 protocol=tcp
/ip firewall filter add action=accept chain=input dst-port=80 protocol=tcp
/ip firewall filter add action=accept chain=input dst-port=8291 protocol=tcp
/ip firewall filter add action=accept chain=input dst-port=22 protocol=tcp

# Drop all other input
/ip firewall filter add action=drop chain=input

# Allow hotspot authorized traffic
/ip firewall filter add action=accept chain=forward hotspot=auth

# Block access to router from hotspot network
/ip firewall filter add action=reject chain=forward dst-address=192.168.1.1 \\
    hotspot=auth reject-with=icmp-admin-prohibited

# Drop all other forward traffic
/ip firewall filter add action=drop chain=forward`
};

export function CompleteConfiguration() {
  const { toast } = useToast();

  const copyConfiguration = (config: string, name: string) => {
    const fullConfig = Object.values(configurations).join('\n\n');
    navigator.clipboard.writeText(fullConfig);
    toast({
      title: "Configuration copied",
      description: "Complete MikroTik configuration has been copied to clipboard.",
    });
  };

  const downloadConfiguration = () => {
    const fullConfig = Object.values(configurations).join('\n\n');
    const blob = new Blob([fullConfig], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mikrotik-rb951ui-2hnd-complete-config.rsc';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Configuration downloaded",
      description: "Complete configuration file ready for import.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Complete Configuration</h2>
        <p className="text-muted-foreground">
          Full RouterOS configuration ready for production deployment
        </p>
      </div>

      <div className="flex gap-4 justify-center">
        <Button variant="network" size="lg" onClick={() => copyConfiguration('', 'complete')}>
          <Copy className="w-4 h-4 mr-2" />
          Copy Complete Config
        </Button>
        <Button variant="accent" size="lg" onClick={downloadConfiguration}>
          <Download className="w-4 h-4 mr-2" />
          Download .rsc File
        </Button>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-muted/50">
          <TabsTrigger value="basic" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Database className="w-4 h-4 mr-2" />
            Network
          </TabsTrigger>
          <TabsTrigger value="hotspot" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Wifi className="w-4 h-4 mr-2" />
            Hotspot
          </TabsTrigger>
          <TabsTrigger value="usermanager" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Eye className="w-4 h-4 mr-2" />
            User Manager
          </TabsTrigger>
          <TabsTrigger value="firewall" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Shield className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        {Object.entries(configurations).map(([key, config]) => (
          <TabsContent key={key} value={key}>
            <Card className="bg-card border-border shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="capitalize">{key} Configuration</CardTitle>
                    <CardDescription>
                      {key === 'basic' && "Network interfaces, DHCP, and DNS settings"}
                      {key === 'hotspot' && "Hotspot server and user profile configuration"}
                      {key === 'usermanager' && "Billing profiles and bandwidth limitations"}
                      {key === 'firewall' && "Security rules and NAT configuration"}
                    </CardDescription>
                  </div>
                  <Badge className="bg-network-success text-white">Production Ready</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 border border-border rounded-lg p-4 font-mono text-xs max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-foreground">{config}</pre>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => copyConfiguration(config, key)}
                    className="flex-1"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Section
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}