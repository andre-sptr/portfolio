"use client";

import { useEffect, useRef } from "react";
import { profile } from "@/data/profile";

const VERTEX_SHADER = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision mediump float;
  varying vec2 v_uv;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_pointer;
  uniform float u_scroll;

  void main() {
    vec2 uv = v_uv;
    float aspect = u_resolution.x / max(u_resolution.y, 1.0);
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
    vec2 ptr = (u_pointer - 0.5) * vec2(aspect, 1.0);
    float t = u_time;

    // Obsidian Silk: 3D Dark Satin Waves reacting to time, pointer, and scroll
    vec2 w = p + ptr * 0.12 + vec2(0.0, -u_scroll * 0.35);
    float wave1 = sin(w.x * 2.4 + w.y * 1.8 + t * 0.65) * 0.5 + 0.5;
    float wave2 = sin(w.x * -1.9 + w.y * 3.1 - t * 0.5 + wave1 * 1.6) * 0.5 + 0.5;
    float wave3 = cos(w.x * 1.3 - w.y * 2.4 + t * 0.4 + wave2 * 1.4) * 0.5 + 0.5;
    float fold = smoothstep(0.15, 0.88, wave2 * 0.6 + wave3 * 0.4);
    float highlight = pow(max(0.0, sin(w.y * 3.6 + wave1 * 2.5 - t * 0.55)), 4.0);

    vec3 baseDark = vec3(0.015, 0.015, 0.018);
    vec3 satinMid = vec3(0.075, 0.072, 0.078);
    vec3 satinCrest = vec3(0.16, 0.145, 0.14);

    vec3 col = mix(baseDark, satinMid, fold);
    col += satinCrest * highlight * 0.85;

    // Soft vignette so edges blend into dark portfolio theme
    float vig = smoothstep(1.35, 0.25, length(uv - 0.5) * 1.45);
    col *= mix(0.35, 1.0, vig);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "u_time");
    const uRes = gl.getUniformLocation(program, "u_resolution");
    const uPtr = gl.getUniformLocation(program, "u_pointer");
    const uScroll = gl.getUniformLocation(program, "u_scroll");

    let pointerX = 0.5;
    let pointerY = 0.5;
    let targetX = 0.5;
    let targetY = 0.5;
    let scrollVal = window.scrollY / Math.max(window.innerHeight, 1);
    let targetScroll = scrollVal;
    let rafId = 0;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const handlePointerMove = (e: PointerEvent) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      targetX = e.clientX / w;
      targetY = 1.0 - e.clientY / h;
    };

    const handleScroll = () => {
      targetScroll = window.scrollY / Math.max(window.innerHeight, 1);
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    const render = (now: number) => {
      pointerX += (targetX - pointerX) * 0.05;
      pointerY += (targetY - pointerY) * 0.05;
      scrollVal += (targetScroll - scrollVal) * 0.08;

      gl.uniform1f(uTime, now * 0.001);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uPtr, pointerX, pointerY);
      gl.uniform1f(uScroll, scrollVal);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafId = window.requestAnimationFrame(render);
    };

    rafId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="obsidian-silk-canvas" aria-hidden="true" />
      <section
        className="hero hero-home"
        id="top"
        aria-labelledby="hero-title"
        tabIndex={-1}
      >
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Mulish:wght@500;600&family=Oswald:wght@700&display=swap"
        />

        <div className="hero-shell container">
          <div className="hero-title-wrap">
            <h1 className="hero-name" id="hero-title">{profile.name.toUpperCase()}</h1>
            <div className="hero-role">
              <svg
                className="hero-role-marker"
                width="36"
                height="30"
                viewBox="0 0 36 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 4c0 10 7 19 19 19h9m0 0l-5-5m5 5l-5 5" />
              </svg>
              <div className="hero-role-copy">
                <p>{profile.hero.role}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
