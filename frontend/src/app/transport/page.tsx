import FeaturedVehicles from "@/components/transportation/FeaturedVehicles";
import PopularRoutes from "@/components/transportation/PopularRoutes";
import SafetyTips from "@/components/transportation/SafetyTips";
import TransportHero from "@/components/transportation/TransportHero";
import TransportOptions from "@/components/transportation/TransportOption";


export default function TransportPage() {
  return (
    <main>
      <TransportHero />
      <TransportOptions />
      <FeaturedVehicles />
      <PopularRoutes />
      <SafetyTips />
    </main>
  );
}
