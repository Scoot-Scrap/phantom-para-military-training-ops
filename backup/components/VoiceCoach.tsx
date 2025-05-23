'use client';
import React, { useEffect } from 'react';

export default function VoiceCoach({ message }: { message: string }) {
  useEffect(() => {
    const u = new SpeechSynthesisUtterance(message);
    speechSynthesis.speak(u);
  }, [message]);

  return null;
}