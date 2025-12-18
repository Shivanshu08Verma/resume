import { useEffect, useRef } from "react";

// Ripple animation for Contact section - signal waves and communication
export default function RippleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const ripples: Array<{ x: number; y: number; radius: number; maxRadius: number; opacity: number }> = [];
    let time = 0;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    const createRipple = (x: number, y: number) => {
      ripples.push({
        x,
        y,
        radius: 0,
        maxRadius: 400 + Math.random() * 300,
        opacity: 0.8,
      });
    };

    const drawRipple = (ripple: { x: number; y: number; radius: number; opacity: number }) => {
      if (!isFinite(ripple.x) || !isFinite(ripple.y) || !isFinite(ripple.radius)) {
        return;
      }
      
      ctx.beginPath();
      ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0, 255, 255, ${ripple.opacity})`;
      ctx.lineWidth = 2;
      ctx.stroke();
      
      if (ripple.radius > 10) {
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius - 10, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 255, 255, ${ripple.opacity * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    };

    const drawSignalWaves = () => {
      if (!canvas.width || !canvas.height) return;
      
      const isMobile = canvas.width < 768;
      const isTablet = canvas.width >= 768 && canvas.width < 1280;
      
      let centerX: number;
      let waveCount: number;
      let baseLength: number;
      
      if (isMobile) {
        centerX = canvas.width / 2;
        waveCount = 8;
        baseLength = Math.min(canvas.width * 0.35, 200);
      } else if (isTablet) {
        centerX = canvas.width * 0.4;
        waveCount = 10;
        baseLength = Math.min(canvas.width * 0.3, 300);
      } else {
        centerX = canvas.width / 2;
        waveCount = 12;
        baseLength = Math.min(canvas.width * 0.3, 450);
      }
      
      const centerY = canvas.height / 2;
      
      for (let i = 0; i < waveCount; i++) {
        const angle = (i / waveCount) * Math.PI * 2 + time * 0.01;
        const length = baseLength + Math.sin(time * 0.05 + i) * (baseLength * 0.3);
        const endX = centerX + Math.cos(angle) * length;
        const endY = centerY + Math.sin(angle) * length;
        
        if (!isFinite(endX) || !isFinite(endY)) continue;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(endX, endY);
        
        const gradient = ctx.createLinearGradient(centerX, centerY, endX, endY);
        gradient.addColorStop(0, "rgba(0, 255, 255, 0.6)");
        gradient.addColorStop(1, "rgba(0, 255, 255, 0)");
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(endX, endY, 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 255, ${0.6 + Math.sin(time * 0.05 + i) * 0.4})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(0, 255, 255, 0.8)";
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    };

    const drawCenterPulse = () => {
      if (!canvas.width || !canvas.height) return;
      
      const isMobile = canvas.width < 768;
      const isTablet = canvas.width >= 768 && canvas.width < 1280;
      
      let centerX: number;
      
      if (isMobile) {
        centerX = canvas.width / 2;
      } else if (isTablet) {
        centerX = canvas.width * 0.4;
      } else {
        centerX = canvas.width / 2;
      }
      
      const centerY = canvas.height / 2;
      const pulseSize = 20 + Math.sin(time * 0.05) * 10;
      
      if (!isFinite(centerX) || !isFinite(centerY) || !isFinite(pulseSize)) return;
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseSize, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 255, 255, 0.5)";
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 255, 255, 0.9)";
      ctx.shadowBlur = 20;
      ctx.shadowColor = "rgba(0, 255, 255, 1)";
      ctx.fill();
      ctx.shadowBlur = 0;
      
      ctx.strokeStyle = "rgba(0, 255, 255, 1)";
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const drawFloatingDots = () => {
      if (!canvas.width || !canvas.height) return;
      
      const isMobile = canvas.width < 768;
      const isTablet = canvas.width >= 768 && canvas.width < 1280;
      
      let centerX: number;
      let dotCount: number;
      let baseDistance: number;
      
      if (isMobile) {
        centerX = canvas.width / 2;
        dotCount = 20;
        baseDistance = Math.min(canvas.width * 0.3, 150);
      } else if (isTablet) {
        centerX = canvas.width * 0.4;
        dotCount = 30;
        baseDistance = Math.min(canvas.width * 0.25, 250);
      } else {
        centerX = canvas.width / 2;
        dotCount = 40;
        baseDistance = Math.min(canvas.width * 0.25, 400);
      }
      
      const centerY = canvas.height / 2;
      
      for (let i = 0; i < dotCount; i++) {
        const angle = (i / dotCount) * Math.PI * 2;
        const distance = baseDistance + Math.sin(time * 0.02 + i) * (baseDistance * 0.4);
        const x = centerX + Math.cos(angle + time * 0.01) * distance;
        const y = centerY + Math.sin(angle + time * 0.01) * distance;
        const size = 2 + Math.sin(time * 0.03 + i) * 1;
        
        if (!isFinite(x) || !isFinite(y) || !isFinite(size)) continue;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 255, ${0.6 + Math.sin(time * 0.04 + i) * 0.4})`;
        ctx.fill();
      }
    };

    const animate = () => {
      if (!canvas.width || !canvas.height) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      time += 1;
      
      const isMobile = canvas.width < 768;
      const isTablet = canvas.width >= 768 && canvas.width < 1280;
      
      let centerX: number;
      
      if (isMobile) {
        centerX = canvas.width / 2;
      } else if (isTablet) {
        centerX = canvas.width * 0.4;
      } else {
        centerX = canvas.width / 2;
      }
      
      if (time % 30 === 0) {
        createRipple(centerX, canvas.height / 2);
      }
      
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        drawRipple(ripple);
        
        ripple.radius += 4;
        ripple.opacity -= 0.01;
        
        if (ripple.opacity <= 0 || ripple.radius > ripple.maxRadius) {
          ripples.splice(i, 1);
        }
      }
      
      drawFloatingDots();
      drawSignalWaves();
      drawCenterPulse();

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.3 }}
    />
  );
}