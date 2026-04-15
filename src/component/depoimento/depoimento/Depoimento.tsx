import CardDepoimento from "../carddepoimento/CardDepoimento";

function Depoimentos() {
    const depoimentos = [
        {
            nome: "Ana Silva",
            cargo: "Gerente de RH",
            texto: "O sistema facilitou totalmente nossa gestão de equipe.",
        },
        {
            nome: "Carlos Souza",
            cargo: "Empresário",
            texto: "Agora consigo organizar tudo de forma simples e rápida.",
        },
        {
            nome: "Juliana Lima",
            cargo: "Analista de RH",
            texto: "Interface incrível e muito fácil de usar no dia a dia.",
        },
    ];

    return (
        <section className="w-full py-20 bg-gray-50">
            <div className="container mx-auto px-6">

                <div className="text-center mb-12">
                    <h2 className="text-4xl text-purple font-bold uppercase">
                        Depoimentos
                    </h2>
                    <p className="text-gray-500 mt-3">
                        Veja o que estão dizendo sobre o sistema
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {depoimentos.map((item, index) => (
                        <CardDepoimento
                            key={index}
                            nome={item.nome}
                            cargo={item.cargo}
                            texto={item.texto}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}

export default Depoimentos;