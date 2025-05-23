import { useState } from "react";
import TacticalHUD from "./TacticalHUD";
import AfterActionReport from "./AfterActionReport";
import missionData from "../data/missions.json";

export default function MissionEngine() {
  const [step, setStep] = useState(0);
  const [decisions, setDecisions] = useState([]);

  const currentNode = missionData.scenario[step];

  const handleDecision = (choice) => {
    setDecisions([...decisions, choice]);
    if (currentNode.next[choice] !== null) {
      setStep(currentNode.next[choice]);
    } else {
      setStep(-1);
    }
  };

  return (
    <>
      {step >= 0 ? (
        <TacticalHUD node={currentNode} onDecision={handleDecision} />
      ) : (
        <AfterActionReport decisions={decisions} />
      )}
    </>
  );
}
