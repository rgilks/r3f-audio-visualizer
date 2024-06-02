import { CurrentTrackPlayer } from "@/components/controls/audioSource/soundcloud/player";

export const ControlledAudioSource = ({
  audio
}: {
  audio: HTMLAudioElement;
  audioSource: "SOUNDCLOUD";
}) => {
  return <CurrentTrackPlayer audio={audio} />;
};
export default ControlledAudioSource;
