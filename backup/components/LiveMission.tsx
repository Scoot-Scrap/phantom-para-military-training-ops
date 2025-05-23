// components/LiveMission.tsx
"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket: ReturnType<typeof io>;

export default function LiveMission() {
  const [updates, setUpdates] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket = io("http://localhost:4000"); // match SOCKET_PORT
    socket.on("mission update", (msg: string) => {
      setUpdates((u) => [...u, msg]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;
    socket.emit("mission update", input);
    setInput("");
  };

  return (
    <div style={{ padding: 16, border: "1px solid #444", margin: "1rem 0" }}>
      <h2>Live Mission Updates</h2>
      <ul>
        {updates.map((u, i) => (
          <li key={i}>{u}</li>
        ))}
      </ul>
      <form onSubmit={send}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type update…"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
