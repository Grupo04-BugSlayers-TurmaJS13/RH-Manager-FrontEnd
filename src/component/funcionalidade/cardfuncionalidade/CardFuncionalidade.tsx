import type { ReactNode } from "react";

interface CardFuncionalidadeProps {
    titulo: string;
    descricao: string;
    icone: ReactNode;
}

function CardFuncionalidade({
    titulo,
    descricao,
    icone,
}: CardFuncionalidadeProps) {
    return (
        <div className="bg-custom-beige grid grid-cols-3 rounded overflow-hidden hover:scale-[1.02] hover:shadow-lg transition duration-300">

            <div className="col-span-1 flex justify-center items-center">
                {icone}
            </div>

            <div className="col-span-2 p-4 flex flex-col justify-center">
                <h4 className="text-lg uppercase font-semibold">{titulo}</h4>
                <p className="text-sm text-gray-600 mt-1">{descricao}</p>
            </div>

        </div>
    );
}

export default CardFuncionalidade;