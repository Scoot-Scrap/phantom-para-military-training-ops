// File: app/components/ClientOnly.jsx

"use client";

import React, { useState, useEffect } from "react";

export default function ClientOnly() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    setTime(new Date().toLocaleTimeString());
  }, []);

  return <div>Current time (client): {time}</div>;
}
