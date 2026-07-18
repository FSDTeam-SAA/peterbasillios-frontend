
import AboutSection from "@/components/web-componets/AboutSection";
import BuildCard from "@/components/web-componets/BuildCard";
import Hero from "@/components/web-componets/hero";
import ProjectsSection from "@/components/web-componets/ProjectsSection";
import WhyChoose from "@/components/web-componets/why-choose";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <ProjectsSection />
      <BuildCard/>
      <WhyChoose/>
     
    </main>
  );
}
