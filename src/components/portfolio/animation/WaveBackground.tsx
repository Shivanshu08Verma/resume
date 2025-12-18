import { useEffect, useRef } from "react";

// Wave animation for About section - flowing, organic waves
export default function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    const drawWave = (
      yOffset: number,
      amplitude: number,
      frequency: number,
      phase: number,
      opacity: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);

      for (let x = 0; x < canvas.width; x++) {
        const y =
          yOffset +
          Math.sin((x * frequency + phase) / 100) * amplitude +
          Math.sin((x * frequency * 0.5 + phase * 1.3) / 150) * (amplitude * 0.5);
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.closePath();

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, `rgba(0, 255, 255, ${opacity * 0.3})`);
      gradient.addColorStop(1, `rgba(0, 255, 255, 0)`);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.strokeStyle = `rgba(0, 255, 255, ${opacity * 0.6})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const drawParticles = () => {
      const particleCount = 30;
      for (let i = 0; i < particleCount; i++) {
        const x = (i / particleCount) * canvas.width;
        const y = canvas.height * 0.3 + Math.sin(time * 0.001 + i) * 100;
        const size = 2 + Math.sin(time * 0.002 + i) * 1;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 255, ${0.6 + Math.sin(time * 0.003 + i) * 0.3})`;
        ctx.fill();
      }
    };

    const animate = () => {
      if (!canvas.width || !canvas.height) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      time += 1;

      drawWave(canvas.height * 0.6, 100, 1, time * 1.0, 0.6);
      drawWave(canvas.height * 0.5, 120, 0.8, time * 0.7, 0.4);
      drawWave(canvas.height * 0.4, 150, 0.6, time * 0.9, 0.3);
      
      drawParticles();

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
      style={{ opacity: 0.7 }}
    />
  );
}