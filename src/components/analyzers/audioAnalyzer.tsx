import { useMemo } from "react";
import { FFTAnalyzerControls } from "@/components/analyzers/fftAnalyzerControls";
import { ControlledAudioSource } from "@/components/audio/audioSource";
import {
  buildAudio,
  buildAudioContext,
} from "@/components/audio/sourceControls/common";
import { useAudioSourceContext } from "@/context/audioSource";
import FFTAnalyzer from "@/lib/analyzers/fft";

const InternalAudioAnalyzer = ({
  mode,
  audioSource,
}: {
  mode: "AUDIO";
  audioSource: "SOUNDCLOUD";
}) => {
  const audioCtx = useMemo(() => buildAudioContext(), []);
  const audio = useMemo(() => buildAudio(), []);
  const analyzer = useMemo(() => {
    console.log("Creating analyzer...");
    return new FFTAnalyzer(audio, audioCtx, 1.0);
  }, [mode, audio, audioCtx]);

  return (
    <>
      <ControlledAudioSource audio={audio} audioSource={audioSource} />
      <FFTAnalyzerControls analyzer={analyzer} />
    </>
  );
};

const AudioAnalyzer = ({ mode }: { mode: "AUDIO" }) => {
  const { audioSource } = useAudioSourceContext();

  return <InternalAudioAnalyzer mode={mode} audioSource={audioSource} />;
};

export default AudioAnalyzer;
