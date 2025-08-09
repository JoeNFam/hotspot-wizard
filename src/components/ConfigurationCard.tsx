import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Download, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ConfigurationCardProps {
  title: string;
  description: string;
  bandwidth: string;
  price: string;
  config: string;
  status: "active" | "configured" | "pending";
}

export function ConfigurationCard({ title, description, bandwidth, price, config, status }: ConfigurationCardProps) {
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(config);
    toast({
      title: "Configuration copied",
      description: "MikroTik configuration has been copied to clipboard.",
    });
  };

  const downloadConfig = () => {
    const blob = new Blob([config], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mikrotik-${title.toLowerCase().replace(/\s+/g, '-')}-config.rsc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Configuration downloaded",
      description: `${title} configuration file has been downloaded.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-network-success";
      case "configured": return "bg-network-primary";
      case "pending": return "bg-network-warning";
      default: return "bg-muted";
    }
  };

  return (
    <Card className="bg-card border-border shadow-card hover:shadow-glow transition-all duration-300 group">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          <Badge className={`${getStatusColor(status)} text-white px-2 py-1 text-xs font-medium rounded-full`}>
            {status}
          </Badge>
        </div>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
        <div className="flex gap-4 text-sm">
          <div className="flex flex-col">
            <span className="text-muted-foreground">Bandwidth</span>
            <span className="font-semibold text-accent">{bandwidth}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Price</span>
            <span className="font-semibold text-network-secondary">{price}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/30 border border-border rounded-lg p-3 font-mono text-xs text-muted-foreground max-h-32 overflow-y-auto">
          <pre className="whitespace-pre-wrap">{config.substring(0, 200)}...</pre>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={copyToClipboard} className="flex-1">
            <Copy className="w-4 h-4 mr-2" />
            Copy Config
          </Button>
          <Button variant="secondary" size="sm" onClick={downloadConfig} className="flex-1">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button variant="default" size="sm" className="px-3">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}