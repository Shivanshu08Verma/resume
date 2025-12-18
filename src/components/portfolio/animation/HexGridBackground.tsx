import { useEffect, useRef } from "react";

// Hexagonal grid animation for Skills section - tech/circuit board aesthetic
export default function HexGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const hexagons: Array<{ x: number; y: number; size: number; pulse: number }> = [];

    const initHexagons = () => {
      hexagons.length = 0;
      const hexSize = 30;
      const hexHeight = hexSize * Math.sqrt(3);
      const hexWidth = hexSize * 2;

      for (let row = -1; row < canvas.height / hexHeight + 1; row++) {
        for (let col = -1; col < canvas.width / (hexWidth * 0.75) + 1; col++) {
          const x = col * hexWidth * 0.75;
          const y = row * hexHeight + (col % 2 === 0 ? 0 : hexHeight / 2);
          hexagons.push({
            x,
            y,
            size: hexSize,
            pulse: Math.random() * Math.PI * 2,
          });
        }
      }
    };

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        initHexagons();
      }
    };

    const drawHexagon = (x: number, y: number, size: number, opacity: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const hx = x + size * Math.cos(angle);
        const hy = y + size * Math.sin(angle);
        if (i === 0) {
          ctx.moveTo(hx, hy);
        } else {
          ctx.lineTo(hx, hy);
        }
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(0, 255, 255, ${opacity})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    };

    const drawConnections = () => {
      for (let i = 0; i < hexagons.length; i++) {
        for (let j = i + 1; j < hexagons.length; j++) {
          const dx = hexagons[i].x - hexagons[j].x;
          const dy = hexagons[i].y - hexagons[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(hexagons[i].x, hexagons[i].y);
            ctx.lineTo(hexagons[j].x, hexagons[j].y);
            ctx.strokeStyle = `rgba(0, 255, 255, ${0.3 * (1 - distance / 100)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };

    const drawNodes = () => {
      hexagons.forEach((hex) => {
        const pulseIntensity = (Math.sin(hex.pulse) + 1) / 2;
        ctx.beginPath();
        ctx.arc(hex.x, hex.y, 3 + pulseIntensity * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 255, ${0.7 + pulseIntensity * 0.3})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(0, 255, 255, 0.8)";
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    };

    const animate = () => {
      if (!canvas.width || !canvas.height) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      hexagons.forEach((hex) => {
        const pulseIntensity = (Math.sin(hex.pulse) + 1) / 2;
        drawHexagon(hex.x, hex.y, hex.size, 0.1 + pulseIntensity * 0.15);
        hex.pulse += 0.05;
      });

      drawConnections();
      drawNodes();

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
      style={{ opacity: 0.4 }}
    />
  );
}