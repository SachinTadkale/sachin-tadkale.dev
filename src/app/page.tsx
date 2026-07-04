import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowIThink } from "@/components/HowIThink";
import { Nav } from "@/components/Nav";
import { SelectedWork } from "@/components/SelectedWork";
import { TechStack } from "@/components/TechStack";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <TechStack />
        <HowIThink />
        <SelectedWork />
        <Experience />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
