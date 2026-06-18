import { Routes, Route, useLocation } from "react-router-dom";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { SmoothScrollProvider } from "./context/SmoothScroll";
import { ToastProvider } from "./components/Toast";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Cursor } from "./components/Cursor";
import { ScrollBackground } from "./components/ScrollBackground";
import { Home } from "./pages/Home";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { AdminPage } from "./pages/AdminPage";

export default function App() {
  // The admin panel is a standalone tool — no portfolio chrome, smooth scroll, or custom cursor.
  if (useLocation().pathname.startsWith("/admin")) {
    return <AdminPage />;
  }

  return (
    <SmoothScrollProvider>
      <TooltipPrimitive.Provider delayDuration={150} skipDelayDuration={300}>
        <ToastProvider>
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
        </ToastProvider>
      </TooltipPrimitive.Provider>
    </SmoothScrollProvider>
  );
}
