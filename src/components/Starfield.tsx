"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Star {
  id: number;
  baseX: number;
  baseY: number;
  size: number;
  delay: number;
  layer: number;
  phase: number;
}

interface Comet {
  id: number;
  startX: number;
  startY: number;
  angle: number;
  speed: number;
  createdAt: number;
}

const generateStars = (count: number): Star[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    baseX: Math.random() * 100,
    baseY: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 5,
    layer: Math.floor(Math.random() * 3),
    phase: Math.random() * Math.PI * 2,
  }));
};

export default function Starfield({ starCount = 150 }: { starCount?: number }) {
  const [stars, setStars] = useState<Star[]>([]);
  const [time, setTime] = useState(0);
  const [comets, setComets] = useState<Comet[]>([]);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    setStars(generateStars(starCount));
  }, [starCount]);

  // Tempo contínuo
  useEffect(() => {
    const animate = (t: number) => {
      setTime(t / 1000);
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, []);

  // Cometas a cada X segundos
  useEffect(() => {
    const interval = setInterval(() => {
      const newComet: Comet = {
        id: Date.now(),
        startX: Math.random() * 100,
        startY: Math.random() * 50,
        angle: 45 + Math.random() * 30, // entre 45º e 75º
        speed: 25 + Math.random() * 25, // velocidade em segundos
        createdAt: performance.now(),
      };
      setComets((prev) => [...prev, newComet]);

      // Remover cometas antigos após 10s
      setTimeout(() => {
        setComets((prev) => prev.filter((c) => c.id !== newComet.id));
      }, 10000);
    }, 7000); // a cada ~7 segundos aparece um cometa

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] bg-black overflow-hidden">
      {/* Estrelas com movimento natural */}
      {stars.map((star) => {
        const floatX = Math.sin(time + star.phase) * 1.5;
        const floatY = Math.cos(time + star.phase) * 1.5;

        const finalX = star.baseX + floatX;
        const finalY = star.baseY + floatY;

        return (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white opacity-80 pointer-events-none"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${finalX}%`,
              top: `${finalY}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: star.delay,
            }}
          />
        );
      })}

      {/* Cometas */}
      {comets.map((comet) => {
        const length = 300; // px que o cometa vai percorrer
        const angleRad = (comet.angle * Math.PI) / 180;
        const dx = Math.cos(angleRad) * length;
        const dy = Math.sin(angleRad) * length;

        return (
          <motion.div
            key={comet.id}
            className="absolute w-[2px] h-[2px] bg-white shadow-white shadow-lg pointer-events-none"
            style={{
              left: `${comet.startX}%`,
              top: `${comet.startY}%`,
              transformOrigin: "center",
              rotate: `${comet.angle}deg`,
              borderRadius: "50%",
            }}
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{
              x: dx,
              y: dy,
              opacity: [1, 0],
              scaleX: [1, 2],
              scaleY: [1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}
