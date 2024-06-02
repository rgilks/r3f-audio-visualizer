import VisualsDock from "@/components/controls/visualsDock";
import { Switch } from "@/components/ui/switch";
import { useModeContext, useModeContextSetters } from "@/context/mode";
import { APPLICATION_MODE } from "@/lib/applicationModes";
import { cn } from "@/lib/utils";

import SettingsDock from "./settingsDock";
import { useEffect } from "react";

export const ControlsPanel = () => {
  const { mode, showUI } = useModeContext();
  const { setShowUI, setMode } = useModeContextSetters();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        setMode("AUDIO");
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setMode]);

  return (showUI && (
    <>
      <div className="pointer-events-none absolute top-0 flex w-full flex-row items-center justify-end gap-2 p-4">
        <Switch
          defaultChecked={showUI}
          className="pointer-events-auto cursor-pointer"
          id="controls-visible"
          onCheckedChange={(e) => {
            setShowUI(e);
          }}
        />
      </div>
        <div className="pointer-events-none absolute bottom-0 flex w-full items-end justify-center gap-4 p-4">
          {mode !== APPLICATION_MODE.AUDIO_SCOPE && (
            <VisualsDock className="sm:max-w-[60%]" />
          )}
          <div
            className={cn({
              "absolute bottom-24 right-0 sm:static sm:bottom-0": true,
            })}
          >
            <SettingsDock />
          </div>
        </div>
    </>
  ));
};

export default ControlsPanel;
