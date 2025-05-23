import React, { useEffect } from "react";
import { useXR } from "@react-three/xr";

export default function VitalsOverlay({ heartRate, oxygen }) {
  const { gl, scene, camera } = useXR();

  useEffect(() => {
    const el = document.createElement("div");
    el.id = "vitals";
    el.style.position = "absolute";
    el.style.top = "10px";
    el.style.left = "10px";
    el.style.padding = "8px";
    el.style.background = "rgba(0,0,0,0.5)";
    el.style.color = "#fff";
    document.body.appendChild(el);

    return () => document.body.removeChild(el);
  }, []);

  useEffect(() => {
    const el = document.getElementById("vitals");
    if (el) el.innerHTML = `❤️ ${heartRate} bpm   ⬤ ${oxygen}%`;
  }, [heartRate, oxygen]);

  return null;
}
