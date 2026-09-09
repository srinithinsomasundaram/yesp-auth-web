"use client";

import { useMemo } from "react";
// @ts-ignore — qrcode has no bundled ESM types but works fine
import QR from "qrcode";

interface QRCodeProps {
  value: string;
  size?: number;
}

type Matrix = boolean[][];

function getMatrix(value: string): Matrix {
  // Generate raw QR data matrix synchronously via createData internal API
  // Fall back to empty if generation fails
  try {
    const segments = QR.create(value, { errorCorrectionLevel: "M" });
    const data = segments.modules.data as Uint8Array;
    const size = segments.modules.size as number;
    const matrix: Matrix = [];
    for (let r = 0; r < size; r++) {
      matrix[r] = [];
      for (let c = 0; c < size; c++) {
        matrix[r][c] = !!data[r * size + c];
      }
    }
    return matrix;
  } catch {
    return [];
  }
}

// The three 7×7 finder patterns sit at top-left, top-right, bottom-left
function isFinderZone(r: number, c: number, size: number): boolean {
  const inTL = r < 9 && c < 9;
  const inTR = r < 9 && c >= size - 8;
  const inBL = r >= size - 8 && c < 9;
  return inTL || inTR || inBL;
}

// Eye outer square (7×7 border ring)
function EyeOuter({ x, y, cell }: { x: number; y: number; cell: number }) {
  const r = cell * 1.2; // corner radius
  const size = cell * 7;
  return (
    <rect
      x={x + cell * 0.5}
      y={y + cell * 0.5}
      width={size - cell}
      height={size - cell}
      rx={r}
      ry={r}
      fill="none"
      stroke="url(#eyeGrad)"
      strokeWidth={cell * 1.1}
    />
  );
}

// Eye inner dot (3×3 rounded square)
function EyeInner({ x, y, cell }: { x: number; y: number; cell: number }) {
  const r = cell * 0.8;
  const s = cell * 3;
  return (
    <rect
      x={x + cell * 2 + cell * 0.15}
      y={y + cell * 2 + cell * 0.15}
      width={s - cell * 0.3}
      height={s - cell * 0.3}
      rx={r}
      ry={r}
      fill="url(#dotGrad)"
    />
  );
}

function renderEyes(matrix: Matrix, cell: number) {
  const n = matrix.length;
  const eyes = [
    { r: 0,     c: 0     },   // top-left
    { r: 0,     c: n - 7 },   // top-right
    { r: n - 7, c: 0     },   // bottom-left
  ];
  return eyes.map((e, i) => (
    <g key={i}>
      <EyeOuter x={e.c * cell} y={e.r * cell} cell={cell} />
      <EyeInner x={e.c * cell} y={e.r * cell} cell={cell} />
    </g>
  ));
}

// Render data dots as small rounded squares
function renderDots(matrix: Matrix, cell: number) {
  const n = matrix.length;
  const r = cell * 0.38; // corner radius for each dot
  const pad = cell * 0.12; // gap between dots
  const paths: JSX.Element[] = [];

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (!matrix[row][col]) continue;
      if (isFinderZone(row, col, n)) continue;

      const x = col * cell + pad;
      const y = row * cell + pad;
      const s = cell - pad * 2;

      paths.push(
        <rect key={`${row}-${col}`} x={x} y={y} width={s} height={s} rx={r} ry={r} fill="url(#dotGrad)" />
      );
    }
  }
  return paths;
}

export function CustomQRCode({ value, size = 240 }: QRCodeProps) {
  const matrix = useMemo(() => getMatrix(value), [value]);

  if (!matrix.length) return null;

  const n = matrix.length;
  const cell = size / n;
  const logoSize = cell * 5;
  const logoOffset = (size - logoSize) / 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
    >
      <defs>
        {/* Dot gradient: deep navy → electric blue */}
        <linearGradient id="dotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#1e3a5f" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>

        {/* Eye gradient: slightly darker */}
        <linearGradient id="eyeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>

        {/* Logo background blur circle */}
        <filter id="logoGlow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <clipPath id="logoClip">
          <rect
            x={logoOffset}
            y={logoOffset}
            width={logoSize}
            height={logoSize}
            rx={logoSize * 0.22}
          />
        </clipPath>
      </defs>

      {/* White background */}
      <rect width={size} height={size} fill="#ffffff" />

      {/* Data dots */}
      {renderDots(matrix, cell)}

      {/* Custom eye markers */}
      {renderEyes(matrix, cell)}

      {/* Logo background pill */}
      <rect
        x={logoOffset - 4}
        y={logoOffset - 4}
        width={logoSize + 8}
        height={logoSize + 8}
        rx={logoSize * 0.26}
        fill="#ffffff"
      />

      {/* Logo */}
      <image
        href="/logo.png"
        x={logoOffset}
        y={logoOffset}
        width={logoSize}
        height={logoSize}
        clipPath="url(#logoClip)"
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  );
}
