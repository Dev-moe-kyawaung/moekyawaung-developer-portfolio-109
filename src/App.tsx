import { useCallback, useState } from "react";
import QuantumField from "./components/QuantumField";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import QuantumNodes from "./components/QuantumNodes";
import BlueprintDeck from "./components/BlueprintDeck";
import ReactorBay from "./components/ReactorBay";
import Protocol from "./components/Protocol";
import Network from "./components/Network";
import Contact from "./components/Contact";
import AIOrb from "./components/AIOrb";
import Boot from "./components/Boot";
import Cursor from "./components/Cursor";
import CommandPalette from "./components/CommandPalette";
import ProjectModal from "./components/ProjectModal";
import { useReveal, useScrollProgress } from "./hooks/useReveal";

export default function App() {
  const [booted, setBooted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [request, setRequest] = useState<string | null>(null);
  const [modal, setModal] = useState<string | null>(null);
  const [palette, setPalette] = useState(false);

  useReveal();
  useScrollProgress(useCallback((p: number) => setProgress(p), []));

  const ask = useCallback((q: string) => setRequest(q), []);

  return (
    <div className="relative min-h-screen grain">
      {!booted && <Boot onDone={() => setBooted(true)} />}
      <Cursor />
      <QuantumField />
      <Nav progress={progress} onCmd={() => setPalette(true)} />

      <main className={booted ? "opacity-100 transition-opacity duration-1000" : "opacity-0"}>
        <Hero />
        <QuantumNodes onOpen={setModal} />
        <BlueprintDeck />
        <ReactorBay />
        <Protocol />
        <Network />
        <Contact />
      </main>

      <AIOrb request={request} clearRequest={() => setRequest(null)} />
      <ProjectModal id={modal} onClose={() => setModal(null)} onAsk={ask} />
      <CommandPalette
        open={palette}
        setOpen={setPalette}
        onAsk={ask}
        onOpenProject={(id) => setModal(id)}
      />
    </div>
  );
}
