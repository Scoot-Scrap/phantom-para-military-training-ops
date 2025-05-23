"use client";
import { useState } from "react";
import axios from "axios";

export default function ScreeningForm() {
  const [form, setForm] = useState({
    age: "",
    fitnessLevel: "",
    mentalHealth: "",
  });
  const [result, setResult] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await axios.post("/api/screening", form);
    setResult(
      data.passed
        ? "✅ You qualify for The Phantoms training."
        : "❌ You did not qualify.",
    );
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Elite Screening</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Age:
          <input
            name="age"
            type="number"
            value={form.age}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Fitness Level:
          <select
            name="fitnessLevel"
            value={form.fitnessLevel}
            onChange={handleChange}
            required
          >
            <option value="">Select…</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
            <option>Special Forces Candidate</option>
          </select>
        </label>
        <br />
        <label>
          Mental Resilience (1–10):
          <input
            name="mentalHealth"
            type="number"
            min="1"
            max="10"
            value={form.mentalHealth}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <br />
        <button type="submit">Submit Screening</button>
      </form>
      {result && <p style={{ marginTop: "1rem" }}>{result}</p>}
    </div>
  );
}
