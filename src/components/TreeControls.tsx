import { useState } from "react";

export function TreeControls({ onInsert }: { onInsert: (v: number) => void }) {
  const [valor, setValor] = useState("");

  return (
    <div className="flex gap-2 mt-4">
      <input
        type="number"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        className="border p-2 rounded"
        placeholder="Digite um número"
      />
      <button
        onClick={() => {
          const num = parseInt(valor);
          if (!isNaN(num)) onInsert(num);
          setValor("");
        }}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Inserir
      </button>
    </div>
  );
}
