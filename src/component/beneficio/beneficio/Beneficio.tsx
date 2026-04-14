import { FaClock, FaDatabase, FaRobot, FaUser } from "react-icons/fa";
import { FaShield } from "react-icons/fa6";
import CardBeneficio from "../cardbeneficio/CardBeneficio";

function Beneficios() {
    const beneficios = [
        {
            titulo: "Aumento de Produtividade",
            descricao:
                "Automatize processos e reduza tarefas manuais no dia a dia.",
            icone: <FaRobot size={40} />,
        },
        {
            titulo: "Economia de Tempo",
            descricao:
                "Centralize informações e ganhe agilidade nas operações de RH.",
            icone: <FaClock size={40} />,
        },
        {
            titulo: "Segurança de Dados",
            descricao:
                "Mantenha as informações organizadas e protegidas.",
            icone: <FaShield size={40} />,
        },
        {
            titulo: "Melhor Gestão de Pessoas",
            descricao:
                "Acompanhe colaboradores e tome decisões mais estratégicas.",
            icone: <FaUser size={40} />,
        },
        {
            titulo: "Informação Centralizada",
            descricao:
                "Todos os dados importantes em um único lugar.",
            icone: <FaDatabase size={40} />,
        },
    ];

    return (
        <section className="w-full py-20">
            <div className="container mx-auto px-6">

                <div className="text-center mb-12">
                    <h2 className="text-4xl text-purple font-bold uppercase">
                        Benefícios
                    </h2>
                    <p className="text-gray-500 mt-3">
                        Vantagens que fazem a diferença na gestão do seu RH
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {beneficios.map((item, index) => (
                        <CardBeneficio
                            key={index}
                            titulo={item.titulo}
                            descricao={item.descricao}
                            icone={item.icone}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}

export default Beneficios;