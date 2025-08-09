import { ConfigurationCard } from "@/components/ConfigurationCard";

const packages = [
  {
    title: "Basic Package",
    description: "Entry-level internet access for basic browsing and messaging",
    bandwidth: "1 Mbps",
    price: "$5/month",
    status: "active" as const,
    config: `# Basic 1Mbps Package Configuration
/ip pool
add name=dhcp_pool ranges=192.168.1.100-192.168.1.200

/ip dhcp-server
add address-pool=dhcp_pool disabled=no interface=ether2-master-local name=dhcp1

/ip dhcp-server network
add address=192.168.1.0/24 dns-server=8.8.8.8,8.8.4.4 gateway=192.168.1.1

/ip hotspot profile
add dns-name=hotspot.local hotspot-address=192.168.1.1 html-directory=hotspot \\
    login-by=cookie,http-chap name=hsprof1 use-radius=yes

/ip hotspot
add address-pool=dhcp_pool disabled=no interface=ether2-master-local name=hotspot1 \\
    profile=hsprof1

/ip hotspot user profile
add name="1mbps" rate-limit=1M/1M shared-users=3 session-timeout=30d

/radius
add address=127.0.0.1 secret=testing123 service=hotspot

/ip firewall nat
add action=masquerade chain=srcnat out-interface=ether1`
  },
  {
    title: "Standard Package",
    description: "Balanced speed for streaming and video calls",
    bandwidth: "2 Mbps",
    price: "$10/month",
    status: "configured" as const,
    config: `# Standard 2Mbps Package Configuration
/ip hotspot user profile
add name="2mbps" rate-limit=2M/2M shared-users=3 session-timeout=30d

/user-manager user profile
add name="2mbps-profile" name-for-users="Standard 2Mbps" owner=admin \\
    price=10 starts-at=logon validity=30d

/user-manager limitation
add name="2mbps-limit" owner=admin rate-limit-rx=2M rate-limit-tx=2M

/user-manager profile limitation
add limitation="2mbps-limit" profile="2mbps-profile"`
  },
  {
    title: "Premium Package",
    description: "High-speed internet for multiple devices and HD streaming",
    bandwidth: "5 Mbps",
    price: "$20/month",
    status: "configured" as const,
    config: `# Premium 5Mbps Package Configuration
/ip hotspot user profile
add name="5mbps" rate-limit=5M/5M shared-users=3 session-timeout=30d

/user-manager user profile
add name="5mbps-profile" name-for-users="Premium 5Mbps" owner=admin \\
    price=20 starts-at=logon validity=30d

/user-manager limitation
add name="5mbps-limit" owner=admin rate-limit-rx=5M rate-limit-tx=5M

/user-manager profile limitation
add limitation="5mbps-limit" profile="5mbps-profile"`
  },
  {
    title: "Business Package",
    description: "Maximum performance for business operations and 4K streaming",
    bandwidth: "10 Mbps",
    price: "$35/month",
    status: "pending" as const,
    config: `# Business 10Mbps Package Configuration
/ip hotspot user profile
add name="10mbps" rate-limit=10M/10M shared-users=3 session-timeout=30d

/user-manager user profile
add name="10mbps-profile" name-for-users="Business 10Mbps" owner=admin \\
    price=35 starts-at=logon validity=30d

/user-manager limitation
add name="10mbps-limit" owner=admin rate-limit-rx=10M rate-limit-tx=10M

/user-manager profile limitation
add limitation="10mbps-limit" profile="10mbps-profile"`
  }
];

export function BandwidthPackages() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Bandwidth Packages</h2>
        <p className="text-muted-foreground">
          Pre-configured speed limits with 30-day validity and 3-device sharing
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {packages.map((pkg, index) => (
          <ConfigurationCard key={index} {...pkg} />
        ))}
      </div>
    </div>
  );
}