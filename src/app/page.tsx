import Hero from "@/components/Hero/page";
import About from "@/components/About/page";
import Projects from "@/app/projects/page";
import Skills from "@/components/Skills/page";
import Contact from "@/components/Contact/page";
import Footer from "@/components/Footer/page";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
