"use client";
export const dynamic = "force-dynamic";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function LoginContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const success = searchParams.get("success");

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Login</h1>
      {success && (
        <p style={{ color: "green" }}>
          Registration successful! Please log in.
        </p>
      )}
      {error && <p style={{ color: "red" }}>Invalid credentials. Try again.</p>}
      <form action="/api/login" method="POST">
        <input type="text" name="username" placeholder="Username" required />
        <br />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <br />
        <br />
        <button type="submit">Login</button>
      </form>
      <p>
        No account? <a href="/register">Register here</a>.
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
