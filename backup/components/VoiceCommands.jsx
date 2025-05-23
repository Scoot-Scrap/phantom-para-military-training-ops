import { useEffect } from "react";

export default function VoiceCommands({
  onStartCalibration,
  onNextStep,
  onSelectObject,
  onToggleLeaderboard,
}) {
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("Web Speech API not supported");
      return;
    }
    const recog = new SpeechRecognition();
    recog.continuous = true;
    recog.lang = "en-US";
    recog.interimResults = false;
    recog.onresult = ({ results }) => {
      const transcript = results[results.length - 1][0].transcript
        .trim()
        .toLowerCase();
      console.log("Heard:", transcript);
      if (transcript.includes("start calibration")) onStartCalibration();
      else if (transcript.includes("next step")) onNextStep();
      else if (transcript.includes("select object")) onSelectObject();
      else if (transcript.includes("toggle leaderboard")) onToggleLeaderboard();
    };
    recog.onerror = (e) => console.error("Speech error", e);
    recog.start();
    return () => recog.stop();
  }, [onStartCalibration, onNextStep, onSelectObject, onToggleLeaderboard]);

  return null;
}
