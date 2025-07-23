"use client";

import { TreeNode as LogicNode } from "@/lib/Tree";
import { TreeNode } from "./TreeNode";
import { JSX } from "react/jsx-runtime";
import { div } from "framer-motion/client";

interface PositionedNode {
  node: LogicNode;
  x: number;
  y: number;
}

function calcularPosicoes(
  node: LogicNode | null,
  depth = 0,
  xOffset = 0,
  spacing = 100
): PositionedNode[] {
  if (!node) return [];

  const esquerda = calcularPosicoes(node.esquerda, depth + 1, xOffset, spacing / 1.8);
  const currentX =
    esquerda.length > 0 ? esquerda[esquerda.length - 1].x + spacing : xOffset;
  const direita = calcularPosicoes(node.direita, depth + 1, currentX + spacing, spacing / 1.8);

  return [
    ...esquerda,
    { node, x: currentX, y: depth * 100 },
    ...direita,
  ];
}

function LinhaConexao({ fromX, fromY, toX, toY }: { fromX: number; fromY: number; toX: number; toY: number }) {
  const deltaX = toX - fromX;
  const deltaY = toY - fromY;
  const length = Math.sqrt(deltaX ** 2 + deltaY ** 2);
  const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

  return (
    <div
      className="absolute bg-gray-400 h-[2px] origin-left"
      style={{
        left: fromX + 20,
        top: fromY + 20,
        width: `${length}px`,
        transform: `rotate(${angle}deg)`,
      }}
    />
  );
}

// fundo desfocado 
export function TreeVisualizer({ root }: { root: LogicNode | null }) {
  const posicoes = calcularPosicoes(root);

  const linhas = posicoes.flatMap((p) => {
    const linhas: JSX.Element[] = [];
    if (p.node.esquerda) {
      const filho = posicoes.find((n) => n.node === p.node.esquerda);
      if (filho)
        linhas.push(
          <LinhaConexao
            key={`linha-esq-${p.node.valor}`}
            fromX={p.x}
            fromY={p.y}
            toX={filho.x}
            toY={filho.y}
          />
        );
    }
    if (p.node.direita) {
      const filho = posicoes.find((n) => n.node === p.node.direita);
      if (filho)
        linhas.push(
          <LinhaConexao
            key={`linha-dir-${p.node.valor}`}
            fromX={p.x}
            fromY={p.y}
            toX={filho.x}
            toY={filho.y}
          />
        );
    }
    return linhas;
  });

  return (
    <div className="relative w-full min-h-[400px] mt-8  p-4 overflow-auto shadow-lg rounded-lg backdrop-blur-lg bg-white/10">
    <div className="relative w-full min-h-[400px] ">
      {linhas}
      {posicoes.map((p) => (
        <div
          key={p.node.valor}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
          }}
        >
          <TreeNode valor={p.node.valor} />
        </div>
      ))}
    </div>
    </div>
  );
}
