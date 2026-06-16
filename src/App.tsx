import { Routes, Route } from "react-router-dom";
import { SmoothScrollProvider } from "./context/SmoothScroll";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Cursor } from "./components/Cursor";
import { ScrollBackground } from "./components/ScrollBackground";
import { Home } from "./pages/Home";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";

export default function App() {
  return (
    <SmoothScrollProvider>
      <Cursor />
      <ScrollBackground />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        </Routes>
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
