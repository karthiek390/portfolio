"use client";

import { useRef, useState, useCallback, useEffect } from "react";

interface AudioNodes {
  ctx: AudioContext;
  droneGain: GainNode;
  droneOsc: OscillatorNode;
  droneOsc2: OscillatorNode;
}

export function useMatrixAudio() {
  const nodesRef  = useRef<AudioNodes | null>(null);
  const [on, setOn] = useState(false);

  const boot = useCallback(() => {
    if (nodesRef.current) return;
    const ctx       = new AudioContext();
    const droneGain = ctx.createGain();
    droneGain.gain.setValueAtTime(0, ctx.currentTime);
    droneGain.connect(ctx.destination);

    // Primary sub-bass drone
    const droneOsc = ctx.createOscillator();
    droneOsc.type = "sine";
    droneOsc.frequency.setValueAtTime(36, ctx.currentTime);
    droneOsc.connect(droneGain);
    droneOsc.start();

    // Subtle overtone for texture
    const droneOsc2 = ctx.createOscillator();
    droneOsc2.type = "sine";
    droneOsc2.frequency.setValueAtTime(72, ctx.currentTime);
    const g2 = ctx.createGain();
    g2.gain.setValueAtTime(0.3, ctx.currentTime);
    droneOsc2.connect(g2);
    g2.connect(droneGain);
    droneOsc2.start();

    nodesRef.current = { ctx, droneGain, droneOsc, droneOsc2 };
  }, []);

  const enable = useCallback(() => {
    boot();
    const n = nodesRef.current;
    if (!n) return;
    if (n.ctx.state === "suspended") n.ctx.resume();
    n.droneGain.gain.cancelScheduledValues(n.ctx.currentTime);
    n.droneGain.gain.linearRampToValueAtTime(0.06, n.ctx.currentTime + 1.2);
    setOn(true);
  }, [boot]);

  const disable = useCallback(() => {
    const n = nodesRef.current;
    if (!n) return;
    n.droneGain.gain.cancelScheduledValues(n.ctx.currentTime);
    n.droneGain.gain.linearRampToValueAtTime(0, n.ctx.currentTime + 0.8);
    setOn(false);
  }, []);

  const toggle = useCallback(() => {
    if (on) disable(); else enable();
  }, [on, enable, disable]);

  const setEnabled = useCallback((value: boolean) => {
    if (value) enable();
    else disable();
  }, [enable, disable]);

  // Key-strike: short noise burst on hover
  const strike = useCallback(() => {
    if (!on || !nodesRef.current) return;
    const { ctx } = nodesRef.current;
    const buf  = ctx.createBuffer(1, ctx.sampleRate * 0.06, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.15;
    const src  = ctx.createBufferSource();
    src.buffer = buf;
    const g    = ctx.createGain();
    g.gain.setValueAtTime(0.4, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
    src.connect(g);
    g.connect(ctx.destination);
    src.start();
  }, [on]);

  // EMP reset: brief noise blast + fade to silence + resume
  const emp = useCallback(() => {
    if (!on || !nodesRef.current) return;
    const { ctx, droneGain } = nodesRef.current;
    const buf  = ctx.createBuffer(1, ctx.sampleRate * 0.3, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1);
    const src  = ctx.createBufferSource();
    src.buffer = buf;
    const g    = ctx.createGain();
    g.gain.setValueAtTime(0.5, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    src.connect(g);
    g.connect(ctx.destination);
    src.start();
    droneGain.gain.setValueAtTime(0, ctx.currentTime + 0.31);
    droneGain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 1.8);
  }, [on]);

  useEffect(() => {
    return () => {
      nodesRef.current?.droneOsc.stop();
      nodesRef.current?.droneOsc2.stop();
      nodesRef.current?.ctx.close();
    };
  }, []);

  return { on, toggle, setEnabled, strike, emp };
}
