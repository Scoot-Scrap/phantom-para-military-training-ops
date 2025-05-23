// File: app/page.js

import React, { Suspense } from "react";
import ClientOnly from "./components/ClientOnly";
import Loading from "./components/Loading";

export default function HomePage() {
  return (
    <main style={{ padding: "1rem" }}>
      <h1>Welcome</h1>
      <Suspense fallback={<Loading />}>
        <ClientOnly />
      </Suspense>
    </main>
  );
}
