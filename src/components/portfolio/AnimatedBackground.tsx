import { useEffect, useRef } from "react";

interface Orb {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  color: string;
  glowIntensity: number;
  pulseSpeed: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

interface Shape {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  vx: number;
  vy: number;
  type: 'circle' | 'plus' | 'x' | 'ring';
  opacity: number;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let orbs: Orb[] = [];
    let particles: Particle[] = [];
    let shapes: Shape[] = [];
    let mouseX = 0;
    let mouseY = 0;

    const colors = [
      { main: "rgba(0, 255, 255, 0.15)", glow: "rgba(0, 255, 255, 0.4)" },
      { main: "rgba(138, 43, 226, 0.15)", glow: "rgba(138, 43, 226, 0.4)" },
      { main: "rgba(0, 191, 255, 0.15)", glow: "rgba(0, 191, 255, 0.4)" },
      { main: "rgba(64, 224, 208, 0.15)", glow: "rgba(64, 224, 208, 0.4)" },
    ];

    const createOrbs = () => {
      orbs = [];
      const orbCount = 10;
      
      for (let i = 0; i < orbCount; i++) {
        const colorSet = colors[Math.floor(Math.random() * colors.length)];
        orbs.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 100 + 50,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          color: colorSet.main,
          glowIntensity: Math.random() * 0.5 + 0.5,
          pulseSpeed: Math.random() * 0.002 + 0.001,
        });
      }
    };

    const createParticles = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 20000);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.3,
        });
      }
    };

    const createShapes = () => {
      shapes = [];
      const shapeCount = 15;
      const shapeTypes: Array<'circle' | 'plus' | 'x' | 'ring'> = ['circle', 'plus', 'x', 'ring'];
      
      for (let i = 0; i < shapeCount; i++) {
        shapes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 40 + 20,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
          opacity: Math.random() * 0.3 + 0.2,
        });
      }
    };

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        createOrbs();
        createParticles();
        createShapes();
      }
    };

    const drawOrb = (orb: Orb) => {
      const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
      gradient.addColorStop(0, orb.color.replace("0.15", String(0.3 * orb.glowIntensity)));
      gradient.addColorStop(0.5, orb.color);
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.beginPath();
      ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.shadowBlur = 50 * orb.glowIntensity;
      ctx.shadowColor = orb.color.replace("0.15", "0.5");
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, orb.radius * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = orb.color.replace("0.15", String(0.15 * orb.glowIntensity));
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    const drawParticle = (particle: Particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 255, 255, ${particle.opacity})`;
      ctx.fill();
    };

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 255, 255, ${0.2 * (1 - distance / 120)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const drawShape = (shape: Shape) => {
      ctx.save();
      ctx.translate(shape.x, shape.y);
      ctx.rotate(shape.rotation);
      ctx.strokeStyle = `rgba(0, 255, 255, ${shape.opacity})`;
      ctx.lineWidth = 2;

      switch (shape.type) {
        case 'circle':
          ctx.beginPath();
          ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
          ctx.stroke();
          break;
        case 'plus':
          ctx.beginPath();
          ctx.moveTo(-shape.size / 2, 0);
          ctx.lineTo(shape.size / 2, 0);
          ctx.moveTo(0, -shape.size / 2);
          ctx.lineTo(0, shape.size / 2);
          ctx.stroke();
          break;
        case 'x':
          ctx.beginPath();
          ctx.moveTo(-shape.size / 3, -shape.size / 3);
          ctx.lineTo(shape.size / 3, shape.size / 3);
          ctx.moveTo(shape.size / 3, -shape.size / 3);
          ctx.lineTo(-shape.size / 3, shape.size / 3);
          ctx.stroke();
          break;
        case 'ring':
          ctx.beginPath();
          ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(0, 0, shape.size / 3, 0, Math.PI * 2);
          ctx.stroke();
          break;
      }

      ctx.restore();
    };

    const updateOrbs = () => {
      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        const dx = mouseX - orb.x;
        const dy = mouseY - orb.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          orb.x -= dx * 0.001;
          orb.y -= dy * 0.001;
        }

        if (orb.x - orb.radius < 0 || orb.x + orb.radius > canvas.width) {
          orb.vx *= -1;
        }
        if (orb.y - orb.radius < 0 || orb.y + orb.radius > canvas.height) {
          orb.vy *= -1;
        }

        orb.glowIntensity = 0.5 + Math.sin(Date.now() * orb.pulseSpeed) * 0.3;
      });
    };

    const updateParticles = () => {
      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
      });
    };

    const updateShapes = () => {
      shapes.forEach((shape) => {
        shape.x += shape.vx;
        shape.y += shape.vy;
        shape.rotation += shape.rotationSpeed;

        if (shape.x < -50 || shape.x > canvas.width + 50) shape.vx *= -1;
        if (shape.y < -50 || shape.y > canvas.height + 50) shape.vy *= -1;
      });
    };

    const animate = () => {
      if (!canvas.width || !canvas.height) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      updateOrbs();
      updateParticles();
      updateShapes();

      orbs.forEach(drawOrb);
      drawConnections();
      particles.forEach(drawParticle);
      shapes.forEach(drawShape);

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    resizeCanvas();
    animate();

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.9 }}
    />
  );
}