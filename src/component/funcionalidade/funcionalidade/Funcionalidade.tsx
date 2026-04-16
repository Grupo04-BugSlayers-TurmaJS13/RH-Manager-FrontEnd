import { FaChartBar } from "react-icons/fa6";
import { FaBriefcase, FaCalendar, FaFile, FaUser } from "react-icons/fa";
import CardFuncionalidade from "../cardfuncionalidade/CardFuncionalidade";

const FUNCIONALIDADES = [
  { titulo: "Gestão de Colaboradores", descricao: "Cadastre, edite e gerencie todos os colaboradores em um só lugar.", icone: <FaUser size={40} className="text-primary" /> },
  { titulo: "Admissões e Demissões", descricao: "Controle completo dos processos de entrada e saída de funcionários.", icone: <FaFile size={40} className="text-primary" /> },
  { titulo: "Relatórios Inteligentes", descricao: "Visualize métricas importantes e tome decisões estratégicas.", icone: <FaChartBar size={40} className="text-primary" /> },
  { titulo: "Controle de Férias", descricao: "Gerencie períodos de férias com organização e praticidade.", icone: <FaCalendar size={40} className="text-primary" /> },
  { titulo: "Cargos e Salários", descricao: "Organize cargos, salários e a estrutura da empresa facilmente.", icone: <FaBriefcase size={40} className="text-primary" /> },
];

function Funcionalidades() {
  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl text-purple font-bold uppercase tracking-widest">Funcionalidades</h2>
          <p className="text-gray-500 mt-3">Tudo o que você precisa para gerenciar seu RH de forma eficiente</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FUNCIONALIDADES.map((item) => (
            <CardFuncionalidade key={item.titulo} titulo={item.titulo} descricao={item.descricao} icone={item.icone} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Funcionalidades;