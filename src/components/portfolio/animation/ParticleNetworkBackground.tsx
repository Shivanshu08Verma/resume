import { useEffect, useRef } from "react";

// Particle Network animation - interconnected nodes forming dynamic constellations
export default function ParticleNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      connections: number;
    }
    
    const particles: Particle[] = [];
    // Dynamic particle count based on area
    let particleCount = 80;
    const connectionDistance = 150;
    const maxConnections = 3;

    const initParticles = () => {
      particles.length = 0;
      particleCount = Math.floor((canvas.width * canvas.height) / 15000);
      // Clamp particle count to reasonable limits
      particleCount = Math.max(40, Math.min(particleCount, 150));

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
          connections: 0,
        });
      }
    };

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        initParticles();
      }
    };

    const drawParticle = (particle: Particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      
      const gradient = ctx.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        particle.radius * 3
      );
      gradient.addColorStop(0, "rgba(15, 76, 129, 1)");
      gradient.addColorStop(0.5, "rgba(15, 76, 129, 0.6)");
      gradient.addColorStop(1, "rgba(15, 76, 129, 0)");
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 255, 255, 0.8)";
      ctx.fill();
    };

    const drawConnection = (p1: Particle, p2: Particle, distance: number) => {
      const opacity = 1 - distance / connectionDistance;
      
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      
      const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
      gradient.addColorStop(0, `rgba(0, 255, 255, ${opacity * 0.4})`);
      gradient.addColorStop(0.5, `rgba(15, 76, 129, ${opacity * 0.6})`);
      gradient.addColorStop(1, `rgba(0, 255, 255, ${opacity * 0.4})`);
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1;
      ctx.stroke();
      
      const midX = (p1.x + p2.x) / 2;
      const midY = (p1.y + p2.y) / 2;
      const pulseRadius = (Math.sin(Date.now() * 0.003 + distance) + 1) * 2;
      
      ctx.beginPath();
      ctx.arc(midX, midY, pulseRadius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 255, 255, ${opacity * 0.3})`;
      ctx.fill();
    };

    const updateParticle = (particle: Particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

      particle.x = Math.max(0, Math.min(canvas.width, particle.x));
      particle.y = Math.max(0, Math.min(canvas.height, particle.y));
    };

    const animate = () => {
      if (!canvas.width || !canvas.height) return;

      ctx.fillStyle = "rgba(26, 26, 46, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.connections = 0;
      });

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          
          if (p1.connections >= maxConnections || p2.connections >= maxConnections) {
            continue;
          }
          
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            drawConnection(p1, p2, distance);
            p1.connections++;
            p2.connections++;
          }
        }
      }

      particles.forEach((particle) => {
        updateParticle(particle);
        drawParticle(particle);
      });

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