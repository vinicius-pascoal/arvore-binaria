"use client";
import { useState } from "react";
import { TreeNode } from "@/components/TreeNode";
import { TreeControls } from "@/components/TreeControls";
import { Traversals } from "@/components/Traversals";
import { AVLTree } from "@/lib/Tree";

const arvore = new AVLTree();

export default function Home() {
  const [_, forceUpdate] = useState(0);

  const handleInsert = (valor: number) => {
    arvore.inserirValor(valor);
    forceUpdate((n) => n + 1);
  };

  return (
    <main className="p-6 max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold">Árvore Binária Balanceada (AVL)</h1>
      <TreeControls onInsert={handleInsert} />

      <div className="flex justify-center gap-2 mt-8 flex-wrap">
        {arvore.inorder().map((valor) => (
          <TreeNode key={valor} valor={valor} />
        ))}
      </div>

      <Traversals
        preorder={arvore.preorder()}
        inorder={arvore.inorder()}
        postorder={arvore.postorder()}
      />
    </main>
  );
}
