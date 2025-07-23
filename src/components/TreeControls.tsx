import { useState } from "react";

//TODO pegar o tipo de inserção (inserir ou remover) e usar o mesmo componente
export function TreeControls({ onInsert, tipo }: { onInsert: (v: number) => void; tipo: string }) {
  const [valor, setValor] = useState("");

  return (
    <div className="flex gap-2 mt-4">
      <input
        type="number"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        className="border p-2 rounded"
        placeholder="Digite um número"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const num = parseInt(valor);
            if (!isNaN(num)) onInsert(num);
            setValor("");
          }
        }}
      />
      <button
        onClick={() => {
          const num = parseInt(valor);
          if (!isNaN(num)) onInsert(num);
          setValor("");
        }}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {tipo === "inserir" ? "Inserir" : "Remover"}
      </button>
    </div>
  );
}
