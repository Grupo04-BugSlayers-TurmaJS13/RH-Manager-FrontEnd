import type Colaborador from "../../../models/Colaborador";

interface CardColaboradorProps {
  colaborador: Colaborador 
}

function CardColaborador({ colaborador }: CardColaboradorProps) {
  return (
    <div
      className={"border-slate-900 border flex flex-col rounded overflow-hidden justify-center min-h-[25vh]  bg-white "}
    >
      <div className="flex flex-col justify-center items-center gap-2">
        <img
          src={colaborador.foto}
          alt="Foto do Colaborador"
          className="h-36 rounded-full"
        />

        <div className="px-4 py-2 flex flex-col items-center justify-center gap-1">
          <h4 className="text-lg  font-semibold uppercase">
            {colaborador.nome}
          </h4>
          <p className="">{colaborador.cargo}</p>

          <p className="">
            Data de Adimissão:{" "}
            {new Intl.DateTimeFormat("pt-BR", {
              dateStyle: "short",
              timeStyle: undefined,
            }).format(new Date(colaborador.dataAdimissao))}
          </p>
        </div>

        <div className="text-black bg-amber-400 hover:bg-amber-700 min-w-30 rounded-md flex items-center justify-center h-8">
          <button>Gerenciar</button>
        </div>
      </div>
    </div>
  );
}

export default CardColaborador;
