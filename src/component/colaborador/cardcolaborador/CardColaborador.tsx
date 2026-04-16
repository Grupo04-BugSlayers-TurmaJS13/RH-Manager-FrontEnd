import { Link } from "react-router-dom";
import type Colaborador from "../../../models/Colaborador";

const STATUS_STYLE: Record<Colaborador["status"], string> = {
  Ativo: "bg-green-100 text-green-700",
  Férias: "bg-blue-100 text-blue-700",
  Afastado: "bg-red-100 text-red-600",
};

interface CardColaboradorProps {
  colaborador: Colaborador;
}

function CardColaborador({ colaborador }: CardColaboradorProps) {
  return (
    <div className="border border-gray-200 flex flex-col rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow animate-fade-in-up">
      <div className="flex flex-col items-center gap-3 py-10 px-4">
        <div className="relative">
          <img
            src={colaborador.foto}
            alt={`Foto de ${colaborador.nome}`}
            className="w-32 h-32 rounded-full aspect-square object-cover"
          />
          <span className={`absolute bottom-1 right-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
            STATUS_STYLE[colaborador.status]
          }`}>
            {colaborador.status}
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <h4 className="text-lg font-semibold uppercase tracking-widest">
            {colaborador.nome}
          </h4>
          <p className="text-gray-600 text-sm">{colaborador.cargo}</p>
          <p className="text-gray-400 text-xs">
            Admissão:{" "}
            {new Intl.DateTimeFormat("pt-BR").format(new Date(colaborador.dataAdimissao))}
          </p>
        </div>
        <Link
          to={`/colaboradores/${colaborador.id}`}
          className="mt-2 bg-purple hover:bg-purple-dark text-custom-beige! text-sm uppercase tracking-widest px-6 py-2 rounded-md transition-colors font-semibold shadow-sm hover:shadow-md"
        >
          Gerenciar
        </Link>
      </div>
    </div>
  );
}

export default CardColaborador;
