import { Hero } from "../components/Hero";
import { Marquee } from "../components/Marquee";
import { About } from "../components/About";
import { Skills } from "../components/Skills";
import { Experience } from "../components/Experience";
import { Projects } from "../components/Projects";
import { Education } from "../components/Education";
import { QnA } from "../components/QnA";
import { Contact } from "../components/Contact";
import { usePageView } from "../hooks/usePageView";

export function Home() {
  usePageView();

  return (
    <>
      <Hero />
      <Marquee />
      <Projects />
      <About />
      <Skills />
      <Experience />
      <Education />
      <QnA />
      <Contact />
    </>
  );
}
