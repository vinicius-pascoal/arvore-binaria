"use client";

import { useState } from "react";
import { TreeNode } from "@/components/TreeNode";
import { TreeControls } from "@/components/TreeControls";
import { Traversals } from "@/components/Traversals";
import { TreeVisualizer } from "@/components/TreeVisualizer";
import { AVLTree } from "@/lib/Tree";
import { a } from "framer-motion/client";
import Starfield from "@/components/Starfield";

const arvore = new AVLTree();

export default function Home() {
  const [_, forceUpdate] = useState(0);

  const handleInsert = (valor: number) => {
    arvore.inserirValor(valor);
    forceUpdate((n) => n + 1);
  };

  const handleRemove = (valor: number) => {
    arvore.removerValor(valor);
    forceUpdate((n) => n + 1);
  };

  const handlebusca = (valor: number) => {
    const encontrado = arvore.buscarValor(valor);
    if (encontrado) {
      alert(`Valor ${valor} encontrado!`);
    } else {
      alert(`Valor ${valor} não encontrado.`);
    }
    forceUpdate((n) => n + 1);
  };

  return (
    <main className="p-6  mx-auto text-center">
      <Starfield starCount={200} />
      <h1 className="text-3xl font-bold">Árvore Binária Balanceada (AVL)</h1>
      <div className="flex items-center mx-auto justify-center ">
        <TreeVisualizer root={arvore.raiz} />
        <div className="w-1/3 ml-8">
          <TreeControls onInsert={handleInsert} tipo="inserir" />
          <TreeControls onInsert={handleRemove} tipo="remover" />
          <TreeControls onInsert={handlebusca} tipo="buscar" />
          <Traversals
            preorder={arvore.preorder()}
            inorder={arvore.inorder()}
            postorder={arvore.postorder()}
          />
        </div>
      </div>
    </main>
  );
}
