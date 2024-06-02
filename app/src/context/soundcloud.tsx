import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
} from "react";
import { type SoundcloudTrack } from "@/lib/soundcloud/models";

export interface SoundcloudConfig {
  track: SoundcloudTrack | null;
}

export const SoundcloudContext = createContext<{
  config: SoundcloudConfig;
  setters: {
    setTrack: Dispatch<SetStateAction<SoundcloudTrack | null>>;
  };
} | null>(null);

export const SoundcloudContextProvider = ({
  initial = undefined,
  children,
}: PropsWithChildren<{
  initial?: Partial<SoundcloudConfig>;
}>) => {
  const [track, setTrack] = useState<SoundcloudTrack | null>(
    {
      "id": 1835614995,
      "title": "1 - 6-24 - B",
      "artwork_url": null,
      "playback_count": 0,
      "user": {
          "avatar_url": "https://i1.sndcdn.com/avatars-000004531309-k29pv9-large.jpg",
          "id": 5712347,
          "username": "robg213",
          "track_count": 2
      }
  },
  );

  return (
    <SoundcloudContext.Provider
      value={{
        config: {
          track: track,
        },
        setters: {
          setTrack: setTrack,
        },
      }}
    >
      {children}
    </SoundcloudContext.Provider>
  );
};

export function useSoundcloudContext() {
  const context = useContext(SoundcloudContext);
  if (!context) {
    throw new Error(
      "useSoundcloudContext must be used within a SoundcloudContextProvider",
    );
  }
  return context.config;
}

export function useSoundcloudContextSetters() {
  const context = useContext(SoundcloudContext);
  if (!context) {
    throw new Error(
      "useSoundcloudContext must be used within a SoundcloudContextProvider",
    );
  }
  return context.setters;
}
