// pages/ar.jsx
import VoiceCommands from '../components/VoiceCommands';
import HapticFeedback from '../components/HapticFeedback';

export default function ARPage({ socket }) {
  // existing state/hooks…

+ // handlers for voice commands
+ const handleStartCal = () => window.location.href = '/dashboard';
+ const handleNextStep = () => alert('Voice → Next Step');
+ const handleSelectObj = () => alert('Voice → Select Object');
+ const handleToggleLB = () => setShowLeaderboard(v => !v);

  return (
    <>
-     <ObjectDetectionOverlay onDetect={handleLocalDetections} />
+     <VoiceCommands
+       onStartCalibration={handleStartCal}
+       onNextStep={handleNextStep}
+       onSelectObject={handleSelectObj}
+       onToggleLeaderboard={handleToggleLB}
+     />
+     <ObjectDetectionOverlay onDetect={handleLocalDetections} />
      <ARCanvas style={{ position:'absolute', inset: 0 }}>
        <ambientLight />
        <EducationalOverlay items={items} />
        <XRControls onSelect={handleSelect} onSqueeze={handleSqueeze} />
+       <HapticFeedback intensity={0.7} duration={30} />
      </ARCanvas>
      <VitalsOverlay heartRate={75} oxygen={97} />
+     {showLeaderboard && <Leaderboard />}
    </>
  );
}