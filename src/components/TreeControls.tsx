import { useState } from "react";

//TODO mudar a cor do botao dependendo do tipo
export function TreeControls({
  onInsert,
  tipo,
}: {
  onInsert: (v: number) => void;
  tipo: string;
}) {
  const [valor, setValor] = useState("");

  return (
    <div className="flex mt-4">
      <input
        type="number"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        className="border p-2 rounded w-full text-center border-r-0 rounded-r-none"
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
        className={
          "text-white p-2 rounded w-32 rounded-l-none " +
          (tipo === "inserir"
            ? "bg-green-500 hover:bg-green-600"
            : tipo === "remover"
            ? "bg-red-500 hover:bg-red-600"
            : tipo === "buscar"
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-gray-500 hover:bg-gray-600")
        }
      >
        {tipo}
      </button>
    </div>
  );
}
