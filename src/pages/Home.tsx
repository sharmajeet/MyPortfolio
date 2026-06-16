import { useEffect } from "react";
import Snap from "lenis/snap";
import { useLenis } from "../context/SmoothScroll";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Skills } from "../components/Skills";
import { Experience } from "../components/Experience";
import { Projects } from "../components/Projects";
import { Education } from "../components/Education";
import { Contact } from "../components/Contact";

export function Home() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis || !window.matchMedia("(min-width: 768px)").matches) return;
    const snap = new Snap(lenis, { type: "mandatory", duration: 0.8, lerp: 0.1 });
    const targets = Array.from(document.querySelectorAll<HTMLElement>("main section[id], footer"));
    targets.forEach((el) => snap.addElement(el, { align: "start" }));
    return () => snap.destroy();
  }, [lenis]);

  return (
    <>
      <Hero />
      <Projects />
      <About />
      <Skills />
      <Experience />
      <Education />
      <Contact />
    </>
  );
}
