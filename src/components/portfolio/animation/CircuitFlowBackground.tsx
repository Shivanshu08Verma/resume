import { useEffect, useRef } from "react";

// Circuit Flow animation - animated circuit board with flowing energy
export default function CircuitFlowBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    
    interface CircuitNode {
      x: number;
      y: number;
      size: number;
      pulse: number;
      type: 'junction' | 'chip' | 'capacitor';
    }
    
    interface CircuitPath {
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      progress: number;
      speed: number;
      horizontal: boolean;
    }
    
    const nodes: CircuitNode[] = [];
    const paths: CircuitPath[] = [];
    const gridSize = 100;

    const initCircuit = () => {
      nodes.length = 0;
      paths.length = 0;
      
      const cols = Math.ceil(canvas.width / gridSize);
      const rows = Math.ceil(canvas.height / gridSize);
      
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          if (Math.random() > 0.5) {
            const types: Array<'junction' | 'chip' | 'capacitor'> = ['junction', 'chip', 'capacitor'];
            nodes.push({
              x: i * gridSize + gridSize / 2,
              y: j * gridSize + gridSize / 2,
              size: Math.random() * 4 + 3,
              pulse: Math.random() * Math.PI * 2,
              type: types[Math.floor(Math.random() * types.length)],
            });
          }
        }
      }
      
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const nearbyNodes = nodes.filter((n) => {
          const dx = n.x - node.x;
          const dy = n.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          return dist > 0 && dist < gridSize * 2;
        });
        
        nearbyNodes.slice(0, 2).forEach((target) => {
          const horizontal = Math.abs(node.x - target.x) > Math.abs(node.y - target.y);
          paths.push({
            x1: node.x,
            y1: node.y,
            x2: target.x,
            y2: target.y,
            progress: Math.random(),
            speed: 0.01 + Math.random() * 0.01,
            horizontal,
          });
        });
      }
    };

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        initCircuit();
      }
    };

    const drawCircuitPath = (path: CircuitPath) => {
      ctx.beginPath();
      
      if (path.horizontal) {
        const midY = path.y1;
        ctx.moveTo(path.x1, path.y1);
        ctx.lineTo(path.x2, midY);
        ctx.lineTo(path.x2, path.y2);
      } else {
        const midX = path.x1;
        ctx.moveTo(path.x1, path.y1);
        ctx.lineTo(midX, path.y2);
        ctx.lineTo(path.x2, path.y2);
      }
      
      ctx.strokeStyle = "rgba(15, 76, 129, 0.3)";
      ctx.lineWidth = 2;
      ctx.stroke();
      
      const totalLength = Math.abs(path.x2 - path.x1) + Math.abs(path.y2 - path.y1);
      const currentLength = totalLength * path.progress;
      
      let flowX: number;
      let flowY: number;
      
      if (path.horizontal) {
        const dx = Math.abs(path.x2 - path.x1);
        const dy = Math.abs(path.y2 - path.y1);
        
        if (currentLength < dx) {
          flowX = path.x1 + (path.x2 - path.x1) * (currentLength / dx);
          flowY = path.y1;
        } else {
          flowX = path.x2;
          flowY = path.y1 + (path.y2 - path.y1) * ((currentLength - dx) / dy);
        }
      } else {
        const dx = Math.abs(path.x2 - path.x1);
        const dy = Math.abs(path.y2 - path.y1);
        
        if (currentLength < dy) {
          flowX = path.x1;
          flowY = path.y1 + (path.y2 - path.y1) * (currentLength / dy);
        } else {
          flowX = path.x1 + (path.x2 - path.x1) * ((currentLength - dy) / dx);
          flowY = path.y2;
        }
      }
      
      const gradient = ctx.createRadialGradient(flowX, flowY, 0, flowX, flowY, 15);
      gradient.addColorStop(0, "rgba(0, 255, 255, 0.9)");
      gradient.addColorStop(0.5, "rgba(15, 76, 129, 0.5)");
      gradient.addColorStop(1, "rgba(0, 255, 255, 0)");
      
      ctx.beginPath();
      ctx.arc(flowX, flowY, 8, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(flowX, flowY, 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 255, 255, 1)";
      ctx.fill();
    };

    const drawNode = (node: CircuitNode) => {
      const pulseSize = Math.sin(node.pulse) * 2 + node.size;
      
      if (node.type === 'chip') {
        ctx.fillStyle = "rgba(15, 76, 129, 0.6)";
        ctx.fillRect(node.x - pulseSize, node.y - pulseSize, pulseSize * 2, pulseSize * 2);
        
        ctx.strokeStyle = "rgba(0, 255, 255, 0.8)";
        ctx.lineWidth = 1;
        ctx.strokeRect(node.x - pulseSize, node.y - pulseSize, pulseSize * 2, pulseSize * 2);
        
        ctx.fillStyle = "rgba(0, 255, 255, 0.4)";
        ctx.fillRect(node.x - pulseSize * 0.6, node.y - pulseSize * 0.6, pulseSize * 1.2, pulseSize * 1.2);
      } else if (node.type === 'capacitor') {
        ctx.strokeStyle = "rgba(0, 255, 255, 0.7)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(node.x - pulseSize, node.y - pulseSize);
        ctx.lineTo(node.x - pulseSize, node.y + pulseSize);
        ctx.moveTo(node.x + pulseSize, node.y - pulseSize);
        ctx.lineTo(node.x + pulseSize, node.y + pulseSize);
        ctx.stroke();
      } else {
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, pulseSize * 2);
        gradient.addColorStop(0, "rgba(0, 255, 255, 0.8)");
        gradient.addColorStop(0.5, "rgba(15, 76, 129, 0.6)");
        gradient.addColorStop(1, "rgba(0, 255, 255, 0)");
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseSize * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 255, 255, 1)";
        ctx.fill();
      }
    };

    const drawGrid = () => {
      ctx.strokeStyle = "rgba(15, 76, 129, 0.1)";
      ctx.lineWidth = 1;
      
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const animate = () => {
      if (!canvas.width || !canvas.height) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      time += 0.01;
      
      drawGrid();
      
      paths.forEach((path) => {
        path.progress += path.speed;
        if (path.progress > 1) {
          path.progress = 0;
        }
        drawCircuitPath(path);
      });
      
      nodes.forEach((node) => {
        node.pulse += 0.05;
        drawNode(node);
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
      style={{ opacity: 0.2 }}
    />
  );
}