function Funcionamento() {
    const passos = [
        {
            titulo: "Cadastre sua empresa",
            descricao: "Crie sua conta e configure suas informações iniciais.",
        },
        {
            titulo: "Adicione colaboradores",
            descricao: "Cadastre todos os funcionários de forma simples.",
        },
        {
            titulo: "Gerencie tudo",
            descricao: "Controle processos, dados e relatórios em um só lugar.",
        },
    ];

    return (
        <section className="w-full py-20">
            <div className="container mx-auto px-6">

                <div className="text-center mb-12">
                    <h2 className="text-4xl text-purple font-bold uppercase">
                        Como Funciona
                    </h2>
                    <p className="text-gray-500 mt-3">
                        Comece em poucos passos simples
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {passos.map((item, index) => (
                        <div
                            key={index}
                            className="bg-custom-beige p-6 rounded text-center hover:scale-[1.02] transition"
                        >
                            <div className="text-3xl font-bold text-pink-500 mb-4">
                                {index + 1}
                            </div>

                            <h3 className="font-semibold text-lg mb-2">
                                {item.titulo}
                            </h3>

                            <p className="text-sm text-gray-600">
                                {item.descricao}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default Funcionamento;