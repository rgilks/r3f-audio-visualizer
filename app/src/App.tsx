import { Suspense, useEffect } from "react";
import AudioAnalyzer from "@/components/analyzers/audioAnalyzer";
import Visual3DCanvas from "@/components/canvas/Visual3D";
import { useModeContext, useModeContextSetters } from "@/context/mode";
import { APPLICATION_MODE, type ApplicationMode } from "@/lib/applicationModes";

import { useAppStateActions } from "./lib/appState";

const getAnalyzerComponent = (mode: ApplicationMode) => {
  switch (mode) {
    case APPLICATION_MODE.AUDIO:
      return <AudioAnalyzer mode={mode} />;
    case APPLICATION_MODE.WAVE_FORM:
      return null;
    default:
      return mode satisfies never;
  }
};

const App = () => {
  const { mode } = useModeContext();
  const { noteCanvasInteraction } = useAppStateActions();
  const { setMode } = useModeContextSetters();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        setMode("AUDIO");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setMode]);

  return (
    <main className="relative h-[100dvh] w-[100dvw] bg-black">
      <div
        className="absolute h-[100dvh] w-[100dvw]"
        onMouseDown={noteCanvasInteraction}
        onTouchStart={noteCanvasInteraction}
      >
        <Suspense fallback={<span>loading...</span>}>
        <Visual3DCanvas mode={mode} />
        </Suspense>
      </div>
      <div className="pointer-events-none absolute h-[100dvh] w-[100dvw]">
        <Suspense fallback={<span>loading...</span>}>
          {getAnalyzerComponent(mode)}
        </Suspense>
      </div>
    </main>
  );
};

export default App;
