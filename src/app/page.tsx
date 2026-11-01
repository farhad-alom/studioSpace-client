
import Hero from "@/components/Hero";
import BrowseCategories from "@/components/BrowseCategories";
import HowItWorks from "@/components/HowItWorks";
import FeaturedStudios from "@/components/FeaturedStudio";

import HostGuarantee from "@/components/HostGuarantee";


export default function Home() {
  return (
    <div className="flex flex-col">

      <main className="grow">
        <Hero />

        <FeaturedStudios />
        <BrowseCategories />

        <HowItWorks />
        <HostGuarantee />
      </main>
    </div>
  );
}

