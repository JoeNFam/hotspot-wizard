import { NetworkHeader } from "@/components/NetworkHeader";
import { BandwidthPackages } from "@/components/BandwidthPackages";
import { SetupWizard } from "@/components/SetupWizard";
import { CompleteConfiguration } from "@/components/CompleteConfiguration";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-12">
        <NetworkHeader />
        <BandwidthPackages />
        <SetupWizard />
        <CompleteConfiguration />
      </div>
    </div>
  );
};

export default Index;
