import React, { useState, useEffect } from "react";

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    // pretend fetch
    setLeaders([
      { name: "Agent A", score: 92 },
      { name: "Agent B", score: 88 },
      { name: "You", score: 85 },
    ]);
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Agent</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {leaders.map((u, i) => (
          <tr key={i}>
            <td>{u.name}</td>
            <td>{u.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
