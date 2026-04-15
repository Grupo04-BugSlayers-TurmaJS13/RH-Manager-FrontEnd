import { FaCheck } from "react-icons/fa";

function Dashboard() {
    return (
        <section className="w-full py-20 bg-gray-50">
            <div className="container mx-auto px-6">

                <div className="text-center mb-12">
                    <h2 className="text-3xl text-purple font-bold uppercase">
                        Visão do Sistema
                    </h2>
                    <p className="text-gray-500 mt-3">
                        Uma interface simples e poderosa para gerenciar seu RH
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="bg-gradient-to-r from-[#c5a16f]/10 to-amber-50 border border-[#c5a16f]/20 p-6 rounded-lg hover:shadow-md transition-all">
                        <h3 className="text-sm text-gray-500 font-semibold tracking-widest uppercase text-xs">Colaboradores</h3>
                        <p className="text-3xl font-bold mt-2 text-[#c5a16f]">128</p>
                    </div>

                    <div className="bg-gradient-to-r from-[#c5a16f]/10 to-amber-50 border border-[#c5a16f]/20 p-6 rounded-lg hover:shadow-md transition-all">
                        <h3 className="text-sm text-gray-500 font-semibold tracking-widest uppercase text-xs">Férias Ativas</h3>
                        <p className="text-3xl font-bold mt-2 text-[#c5a16f]">12</p>
                    </div>

                    <div className="bg-gradient-to-r from-[#c5a16f]/10 to-amber-50 border border-[#c5a16f]/20 p-6 rounded-lg hover:shadow-md transition-all">
                        <h3 className="text-sm text-gray-500 font-semibold tracking-widest uppercase text-xs">Novas Contratações</h3>
                        <p className="text-3xl font-bold mt-2 text-[#c5a16f]">5</p>
                    </div>

                    <div className="col-span-1 md:col-span-3 bg-amber-50 border-l-4 border-[#c5a16f] p-6 rounded-lg">
                        <h3 className="text-sm text-gray-500 mb-4 font-semibold tracking-widest uppercase text-xs">Atividade Recente</h3>
                        <p className="text-xs text-gray-400 italic mb-4 col-span-full">*Dados Fictícios para Demonstração (Compliance LGPD)</p>

                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex gap-2"><FaCheck size={18}/> Novo colaborador cadastrado</li>
                            <li className="flex gap-2"><FaCheck size={18}/> Férias aprovadas</li>
                            <li className="flex gap-2"><FaCheck size={18}/> Atualização de cargo</li>
                        </ul>
                    </div>

                </div>

            </div>
        </section>
    );
}

export default Dashboard;