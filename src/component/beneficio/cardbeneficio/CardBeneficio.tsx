import type { ReactNode } from "react";

interface CardBeneficioProps {
    titulo: string;
    descricao: string;
    icone: ReactNode;
}

function CardBeneficio({
    titulo,
    descricao,
    icone,
}: CardBeneficioProps) {
    return (
        <div className="bg-custom-beige grid grid-cols-3 rounded overflow-hidden hover:scale-[1.02] hover:shadow-lg transition duration-300">

            <div className="col-span-1 flex justify-center items-center">
                <div className="text-green-500">{icone}</div>
            </div>

            <div className="col-span-2 p-4 flex flex-col justify-center">
                <h4 className="text-lg uppercase font-semibold">{titulo}</h4>
                <p className="text-sm text-gray-600 mt-1">{descricao}</p>
            </div>

        </div>
    );
}

export default CardBeneficio;