interface CardDepoimentoProps {
    nome: string;
    cargo: string;
    texto: string;
}

function CardDepoimento({ nome, cargo, texto }: CardDepoimentoProps) {
    return (
        <div className="bg-custom-beige p-6 rounded hover:shadow-lg transition">

            <p className="text-sm text-gray-600 italic">
                “{texto}”
            </p>

            <div className="mt-4">
                <h4 className="font-semibold">{nome}</h4>
                <span className="text-xs text-gray-500">{cargo}</span>
            </div>

        </div>
    );
}

export default CardDepoimento;