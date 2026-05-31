import React, { useRef, useEffect } from 'react';

// --- CONSTANTS ---
const CANVAS_WIDTH = 250;
const CANVAS_HEIGHT = 250;
const GLOBAL_SPEED = 0.5;
const MONOCHROME_FILL = (opacity) => `rgba(255, 255, 255, ${Math.max(0, Math.min(1, opacity))})`;
const MONOCHROME_STROKE = (opacity) => `rgba(255, 255, 255, ${Math.max(0, Math.min(1, opacity))})`;
const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// --- 1. SPHERE SCAN ---
const setupSphereScan = (ctx) => {
  let frameId;
  let time = 0;
  let lastTime = 0;
  const centerX = CANVAS_WIDTH / 2;
  const centerY = CANVAS_HEIGHT / 2;
  const radius = CANVAS_WIDTH * 0.4;
  const numDots = 200;
  const dots = Array.from({ length: numDots }, (_, i) => {
    const theta = Math.acos(1 - 2 * (i / numDots));
    const phi = Math.sqrt(numDots * Math.PI) * theta;
    return {
      x: radius * Math.sin(theta) * Math.cos(phi),
      y: radius * Math.sin(theta) * Math.sin(phi),
      z: radius * Math.cos(theta),
    };
  });

  const animate = (timestamp) => {
    if (!lastTime) lastTime = timestamp;
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    time += deltaTime * 0.0005 * GLOBAL_SPEED;
    
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    const rotX = Math.sin(time * 0.3) * 0.5;
    const rotY = time * 0.5;
    const bentoTime = easeInOutCubic((Math.sin(time * 2.5) + 1) / 2);
    const scanLine = (bentoTime * 2 - 1) * radius;
    const scanWidth = 25;

    dots.forEach((dot) => {
      let { x, y, z } = dot;
      let nX = x * Math.cos(rotY) - z * Math.sin(rotY);
      let nZ = x * Math.sin(rotY) + z * Math.cos(rotY);
      x = nX; z = nZ;
      let nY = y * Math.cos(rotX) - z * Math.sin(rotX);
      nZ = y * Math.sin(rotX) + z * Math.cos(rotX);
      y = nY; z = nZ;

      const scale = (z + radius * 1.5) / (radius * 2.5);
      const pX = centerX + x;
      const pY = centerY + y;
      const distToScan = Math.abs(y - scanLine);
      const scanInfluence = distToScan < scanWidth ? Math.cos((distToScan / scanWidth) * (Math.PI / 2)) : 0;
      const size = Math.max(0.5, scale * 1.8 + scanInfluence * 2.5);
      const opacity = Math.max(0, scale * 0.5 + scanInfluence * 0.4);

      ctx.beginPath();
      ctx.arc(pX, pY, size, 0, Math.PI * 2);
      ctx.fillStyle = MONOCHROME_FILL(opacity);
      ctx.fill();
    });
    frameId = requestAnimationFrame(animate);
  };
  frameId = requestAnimationFrame(animate);
  return () => cancelAnimationFrame(frameId);
};

// --- 2. CRYSTALLINE REFRACTION ---
const setupCrystallineRefraction = (ctx) => {
  let frameId;
  let time = 0;
  let lastTime = 0;
  const centerX = CANVAS_WIDTH / 2;
  const centerY = CANVAS_HEIGHT / 2;
  const gridSize = 12;
  const spacing = CANVAS_WIDTH / (gridSize - 1);
  const dots = Array.from({ length: gridSize * gridSize }, (_, i) => ({
    x: (i % gridSize) * spacing,
    y: Math.floor(i / gridSize) * spacing,
  }));

  const animate = (timestamp) => {
    if (!lastTime) lastTime = timestamp;
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    time += deltaTime * 0.16 * GLOBAL_SPEED;
    
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    const waveRadius = time % (CANVAS_WIDTH * 1.2);
    const waveWidth = 50;

    dots.forEach((dot) => {
      const dist = Math.hypot(dot.x - centerX, dot.y - centerY);
      const distToWave = Math.abs(dist - waveRadius);
      let displacement = 0;
      if (distToWave < waveWidth / 2) {
        const wavePhase = (distToWave / (waveWidth / 2)) * Math.PI;
        displacement = easeInOutCubic(Math.sin(wavePhase)) * 8;
      }
      const angleToCenter = Math.atan2(dot.y - centerY, dot.x - centerX);
      const dx = Math.cos(angleToCenter) * displacement;
      const dy = Math.sin(angleToCenter) * displacement;

      ctx.beginPath();
      ctx.arc(dot.x + dx, dot.y + dy, 1.0 + (Math.abs(displacement) / 8) * 1.8, 0, Math.PI * 2);
      ctx.fillStyle = MONOCHROME_FILL(0.12 + (Math.abs(displacement) / 8) * 0.8);
      ctx.fill();
    });
    frameId = requestAnimationFrame(animate);
  };
  frameId = requestAnimationFrame(animate);
  return () => cancelAnimationFrame(frameId);
};

// --- 3. SONAR SWEEP ---
const setupSonarSweep = (ctx) => {
  let frameId;
  const centerX = CANVAS_WIDTH / 2;
  const centerY = CANVAS_HEIGHT / 2;
  const fadeTime = 2000;
  const rings = [];

  for (let r = 25; r <= 110; r += 20) {
    const count = Math.floor(r / 2);
    for (let i = 0; i < count; i++) {
      rings.push({
        r,
        angle: (i / count) * Math.PI * 2,
        lastSeen: -fadeTime,
      });
    }
  }

  const animate = (timestamp) => {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    const scanAngle = (timestamp * 0.001 * (Math.PI / 2) * GLOBAL_SPEED) % (Math.PI * 2);

    // Draw scan line
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + 115 * Math.cos(scanAngle), centerY + 115 * Math.sin(scanAngle));
    ctx.strokeStyle = MONOCHROME_STROKE(0.4);
    ctx.lineWidth = 1;
    ctx.stroke();

    rings.forEach((dot) => {
      let angleDiff = Math.abs(dot.angle - scanAngle);
      if (angleDiff > Math.PI) angleDiff = Math.PI * 2 - angleDiff;
      if (angleDiff < 0.05) dot.lastSeen = timestamp;
      
      const timeSinceSeen = timestamp - dot.lastSeen;
      if (timeSinceSeen < fadeTime) {
        const opacity = 1 - easeInOutCubic(timeSinceSeen / fadeTime);
        const size = 1.0 + opacity * 1.5;
        const x = centerX + dot.r * Math.cos(dot.angle);
        const y = centerY + dot.r * Math.sin(dot.angle);

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = MONOCHROME_FILL(opacity * 0.85);
        ctx.fill();
      }
    });
    frameId = requestAnimationFrame(animate);
  };
  frameId = requestAnimationFrame(animate);
  return () => cancelAnimationFrame(frameId);
};

// --- 4. HELIX SCANNER ---
const setupHelixScanner = (ctx) => {
  let frameId;
  let time = 0;
  let lastTime = 0;
  const centerX = CANVAS_WIDTH / 2;
  const centerY = CANVAS_HEIGHT / 2;
  const numDots = 80;
  const radius = 45;
  const height = 180;
  const dots = Array.from({ length: numDots }, (_, i) => ({
    angle: i * 0.28,
    y: (i / numDots) * height - height / 2,
  }));

  const animate = (timestamp) => {
    if (!lastTime) lastTime = timestamp;
    time += (timestamp - lastTime) * 0.001 * GLOBAL_SPEED;
    lastTime = timestamp;
    
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    const loopDuration = 8;
    const seamlessProgress = Math.sin((time / loopDuration) * Math.PI * 2);
    const scanY = seamlessProgress * (height / 2);
    const scanWidth = 25;
    const trailLength = height * 0.3;

    dots.forEach((dot) => {
      const x = radius * Math.cos(dot.angle + time);
      const z = radius * Math.sin(dot.angle + time);
      const pX = centerX + x;
      const pY = centerY + dot.y;
      const scale = (z + radius) / (radius * 2);

      const distToScan = Math.abs(dot.y - scanY);
      const leadingEdgeInfluence = distToScan < scanWidth ? Math.cos((distToScan / scanWidth) * (Math.PI / 2)) : 0;
      let trailInfluence = 0;
      const distBehindScan = dot.y - scanY;
      const isMovingUp = Math.cos((time / loopDuration) * Math.PI * 2) > 0;

      if ((isMovingUp && distBehindScan < 0 && Math.abs(distBehindScan) < trailLength) || 
          (!isMovingUp && distBehindScan > 0 && Math.abs(distBehindScan) < trailLength)) {
        trailInfluence = Math.pow(1 - Math.abs(distBehindScan) / trailLength, 2) * 0.4;
      }

      const totalInfluence = Math.max(leadingEdgeInfluence, trailInfluence);

      ctx.beginPath();
      ctx.arc(pX, pY, Math.max(0.5, scale * 1.5 + totalInfluence * 2.5), 0, Math.PI * 2);
      ctx.fillStyle = MONOCHROME_FILL(Math.max(0, scale * 0.35 + totalInfluence * 0.65));
      ctx.fill();
    });
    frameId = requestAnimationFrame(animate);
  };
  frameId = requestAnimationFrame(animate);
  return () => cancelAnimationFrame(frameId);
};

// --- 5. INTERCONNECTING WAVES ---
const setupInterconnectingWaves = (ctx) => {
  let frameId;
  let time = 0;
  let lastTime = 0;
  const centerX = CANVAS_WIDTH / 2;
  const centerY = CANVAS_HEIGHT / 2;
  const dotRings = [
    { radius: 25, count: 12 },
    { radius: 60, count: 20 },
    { radius: 95, count: 32 },
  ];

  const animate = (timestamp) => {
    if (!lastTime) lastTime = timestamp;
    time += (timestamp - lastTime) * 0.001 * GLOBAL_SPEED;
    lastTime = timestamp;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw connecting lines
    dotRings.forEach((ring, ringIndex) => {
      if (ringIndex >= dotRings.length - 1) return;
      const nextRing = dotRings[ringIndex + 1];
      for (let i = 0; i < ring.count; i++) {
        const angle1 = (i / ring.count) * Math.PI * 2;
        const rPulse1 = Math.sin(time * 2 - ringIndex * 0.4) * 3;
        const x1 = centerX + Math.cos(angle1) * (ring.radius + rPulse1);
        const y1 = centerY + Math.sin(angle1) * (ring.radius + rPulse1);

        const nextRingRatio = nextRing.count / ring.count;
        for (let j = 0; j < nextRingRatio; j++) {
          const angle2 = ((i * nextRingRatio + j) / nextRing.count) * Math.PI * 2;
          const rPulse2 = Math.sin(time * 2 - (ringIndex + 1) * 0.4) * 3;
          const x2 = centerX + Math.cos(angle2) * (nextRing.radius + rPulse2);
          const y2 = centerY + Math.sin(angle2) * (nextRing.radius + rPulse2);

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.lineWidth = 0.5;
          ctx.strokeStyle = MONOCHROME_STROKE(0.06 + ((Math.sin(time * 3 - ringIndex * 0.5 + i * 0.3) + 1) / 2) * 0.18);
          ctx.stroke();
        }
      }
    });

    // Draw dots
    dotRings.forEach((ring, ringIndex) => {
      for (let i = 0; i < ring.count; i++) {
        const angle = (i / ring.count) * Math.PI * 2;
        const rPulse = Math.sin(time * 2 - ringIndex * 0.4) * 3;
        const x = centerX + Math.cos(angle) * (ring.radius + rPulse);
        const y = centerY + Math.sin(angle) * (ring.radius + rPulse);

        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = MONOCHROME_FILL(0.25 + Math.sin(time * 2 - ringIndex * 0.4 + i * 0.2) * 0.45);
        ctx.fill();
      }
    });
    frameId = requestAnimationFrame(animate);
  };
  frameId = requestAnimationFrame(animate);
  return () => cancelAnimationFrame(frameId);
};

// --- 6. VOXEL MATRIX MORPH ---
const setupVoxelMatrixMorph = (ctx) => {
  let frameId;
  let time = 0;
  let lastTime = 0;
  const centerX = CANVAS_WIDTH / 2;
  const centerY = CANVAS_HEIGHT / 2;
  const gridSize = 4;
  const spacing = 28;
  const totalSize = (gridSize - 1) * spacing;
  const points = [];

  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      for (let z = 0; z < gridSize; z++) {
        points.push({
          x: (x - (gridSize - 1) / 2) * spacing,
          y: (y - (gridSize - 1) / 2) * spacing,
          z: (z - (gridSize - 1) / 2) * spacing,
        });
      }
    }
  }

  const animate = (timestamp) => {
    if (!lastTime) lastTime = timestamp;
    time += (timestamp - lastTime) * 0.0005 * GLOBAL_SPEED;
    lastTime = timestamp;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    const rotX = time * 0.4;
    const rotY = time * 0.6;
    const bentoTime = easeInOutCubic((Math.sin(time * 2.0) + 1) / 2);
    const scanLine = (bentoTime * 2 - 1) * (totalSize / 2 + 10);
    const scanWidth = 30;

    points.forEach((p) => {
      let { x, y, z } = p;
      let nX = x * Math.cos(rotY) - z * Math.sin(rotY);
      let nZ = x * Math.sin(rotY) + z * Math.cos(rotY);
      x = nX; z = nZ;
      let nY = y * Math.cos(rotX) - z * Math.sin(rotX);
      nZ = y * Math.sin(rotX) + z * Math.cos(rotX);
      y = nY; z = nZ;

      const distToScan = Math.abs(y - scanLine);
      let scanInfluence = 0;
      let displacement = 1.0;

      if (distToScan < scanWidth) {
        scanInfluence = Math.cos((distToScan / scanWidth) * (Math.PI / 2));
        displacement = 1.0 + scanInfluence * 0.4;
      }

      const scale = (z + 100) / 200;
      ctx.beginPath();
      ctx.arc(
        centerX + x * displacement,
        centerY + y * displacement,
        Math.max(0.5, scale * 1.8 + scanInfluence * 1.8),
        0,
        Math.PI * 2
      );
      ctx.fillStyle = MONOCHROME_FILL(Math.max(0, scale * 0.55 + scanInfluence * 0.3));
      ctx.fill();
    });
    frameId = requestAnimationFrame(animate);
  };
  frameId = requestAnimationFrame(animate);
  return () => cancelAnimationFrame(frameId);
};

// --- ANIMATION ROUTER MAP ---
const animationMap = {
  'sphere-scan': setupSphereScan,
  'crystalline-refraction': setupCrystallineRefraction,
  'sonar-sweep': setupSonarSweep,
  'helix-scanner': setupHelixScanner,
  'interconnecting-waves': setupInterconnectingWaves,
  'voxel-matrix-morph': setupVoxelMatrixMorph,
};

export default function CanvasAnimation({ animationId }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Respect user motion accessibility preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setupFunction = animationMap[animationId];
    if (!setupFunction) return;

    const cleanup = setupFunction(ctx);
    return cleanup;
  }, [animationId]);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen"
    />
  );
}
