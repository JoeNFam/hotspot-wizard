import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Download, Upload, Settings, User, Wifi } from "lucide-react";

const steps = [
  {
    id: "install",
    title: "Install User Manager",
    icon: Download,
    description: "Download and install the User Manager package",
    commands: [
      "/system package enable user-manager",
      "/system reboot"
    ],
    details: [
      "Download User Manager package from MikroTik downloads",
      "Upload via Files in Winbox",
      "Reboot router to activate package",
      "Verify installation in System > Packages"
    ]
  },
  {
    id: "import",
    title: "Import Configuration",
    icon: Upload,
    description: "Import the generated configuration into RouterOS",
    commands: [
      "# Copy configuration to terminal",
      "# Execute line by line or as script"
    ],
    details: [
      "Open Winbox > New Terminal",
      "Paste configuration commands",
      "Execute commands sequentially",
      "Verify hotspot is active"
    ]
  },
  {
    id: "customize",
    title: "Customize Login Page",
    icon: Settings,
    description: "Brand the hotspot login page with ISP details",
    commands: [
      "/ip hotspot profile set hsprof1 html-directory=flash/hotspot",
      "# Upload custom login.html via FTP"
    ],
    details: [
      "Access router via FTP/SFTP",
      "Navigate to /flash/hotspot/",
      "Edit login.html with ISP branding",
      "Upload logo and custom styles"
    ]
  },
  {
    id: "users",
    title: "Create User Accounts",
    icon: User,
    description: "Add users with name and phone format",
    commands: [
      '/user-manager user add name="John Doe" password="1234567890" profile="1mbps-profile"',
      '/user-manager user add name="Jane Smith" password="0987654321" profile="2mbps-profile"'
    ],
    details: [
      "Access User Manager web interface",
      "Navigate to Users > Add User",
      "Set Name = Customer Full Name",
      "Set Password = Phone Number",
      "Assign appropriate package profile"
    ]
  },
  {
    id: "manage",
    title: "Manage & Renew",
    icon: Wifi,
    description: "Handle renewals and bandwidth management",
    commands: [
      "# Access User Manager web interface",
      "# Navigate to Users for management"
    ],
    details: [
      "Monitor active sessions",
      "Process payment renewals",
      "Upgrade/downgrade packages",
      "Generate usage reports"
    ]
  }
];

export function SetupWizard() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Setup Instructions</h2>
        <p className="text-muted-foreground">
          Complete step-by-step guide for MikroTik RB951Ui-2HnD hotspot deployment
        </p>
      </div>

      <Tabs defaultValue="install" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-muted/50">
          {steps.map((step) => (
            <TabsTrigger 
              key={step.id} 
              value={step.id} 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <step.icon className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">{step.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {steps.map((step, index) => (
          <TabsContent key={step.id} value={step.id} className="space-y-4">
            <Card className="bg-card border-border shadow-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Step {index + 1}: {step.title}
                      <Badge className="bg-network-primary text-white">Required</Badge>
                    </CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Commands</h4>
                  <div className="bg-muted/30 border border-border rounded-lg p-4 font-mono text-sm">
                    {step.commands.map((command, cmdIndex) => (
                      <div key={cmdIndex} className="flex items-center gap-2 mb-2 last:mb-0">
                        <span className="text-network-secondary">$</span>
                        <span className="text-foreground">{command}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Detailed Steps</h4>
                  <div className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-network-success mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button variant="network" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Download Guide
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Mark Complete
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