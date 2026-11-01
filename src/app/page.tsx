
import Hero from "@/components/Hero";

import HowItWorks from "@/components/HowItWorks";
import FeaturedStudios from "@/components/FeaturedStudio";


export default function Home() {
  return (
    <div className="flex flex-col">

      <main className="flex-grow">
        <Hero />

        <FeaturedStudios />


        <HowItWorks />
      </main>
    </div>
  );
}
