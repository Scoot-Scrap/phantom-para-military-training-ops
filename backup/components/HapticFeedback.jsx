import { useController, useXREvent } from "@react-three/xr";
import { useEffect } from "react";

export default function HapticFeedback({ intensity = 0.5, duration = 20 }) {
  const { controller } = useController();

  // whenever user “select”s, give a pulse
  useXREvent("select", () => {
    if (
      controller &&
      controller.gamepad &&
      controller.gamepad.hapticActuators
    ) {
      controller.gamepad.hapticActuators[0].pulse(intensity, duration);
    }
  });

  // and on “squeeze”
  useXREvent("squeeze", () => {
    if (
      controller &&
      controller.gamepad &&
      controller.gamepad.hapticActuators
    ) {
      controller.gamepad.hapticActuators[0].pulse(intensity * 0.8, duration);
    }
  });

  return null;
}
