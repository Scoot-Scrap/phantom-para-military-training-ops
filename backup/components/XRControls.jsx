// components/XRControls.jsx
import { useXREvent } from "@react-three/xr";
import { useEffect } from "react";

export default function XRControls({ onSelect, onSqueeze }) {
  // Triggered when user “clicks” with controller
  useXREvent("select", () => {
    onSelect && onSelect();
  });

  // Triggered when user squeezes trigger/grip
  useXREvent("squeeze", () => {
    onSqueeze && onSqueeze();
  });

  return null;
}
