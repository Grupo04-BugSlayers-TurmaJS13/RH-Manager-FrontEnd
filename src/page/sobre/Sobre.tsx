import { FaReact } from "react-icons/fa6";
import { BsTypescript } from "react-icons/bs";
import { SiNestjs } from "react-icons/si";
import logorh from "../../assets/img/logoRH.png";
import Beneficios from "../../component/beneficio/beneficio/Beneficio";
import Funcionalidades from "../../component/funcionalidade/funcionalidade/Funcionalidade";
import Funcionamento from "../../component/funcionamento/Funcionamento";
import ListarEquipe from "../../component/equipe/listarequipe/ListarEquipe";
import Dashboard from "../../component/dashboard/Dashboard";
import Depoimentos from "../../component/depoimento/depoimento/Depoimento";

function Sobre() {
  return (
    <main>
      <section className="max-w-4xl mx-auto px-6 py-24">
        <figure className="flex justify-center">
          <img
            src={logorh}
            alt="Logo RH Manager"
            className="w-64 h-64 aspect-square object-contain rounded-full shadow-2xl border-4 border-primary/20"
          />
        </figure>
        <div className="text-center mt-10 animate-fade-in-up">
          <h1 className="text-3xl text-primary font-bold uppercase tracking-widest">
            Sobre nós
          </h1>
          <p className="max-w-2xl mx-auto text-gray-800 mt-4 leading-relaxed">
            Somos uma gestão de RH simples, com resultados reais.
            Conectamos pessoas e oportunidades de forma rápida, inteligente e eficiente,
            reduzindo a burocracia e ampliando a estratégia.
            Utilizamos tecnologia para facilitar o dia a dia e apoiar decisões mais assertivas,
            tornando o seu RH mais ágil e sua equipe mais forte.
          </p>
        </div>
        <div className="flex flex-col items-center mt-16 animate-fade-in-up animate-delay-200">
          <h2 className="text-3xl text-primary font-bold uppercase tracking-widest mb-10">
            Tecnologias
          </h2>
          <div className="flex justify-center gap-12">
            <p className="flex flex-col items-center gap-2 text-gray-800"><FaReact size={60} />React</p>
            <p className="flex flex-col items-center gap-2 text-gray-800"><BsTypescript size={60} />Typescript</p>
            <p className="flex flex-col items-center gap-2 text-gray-800"><SiNestjs size={60} />Nest</p>
          </div>
        </div>
      </section>
      <Funcionamento />
      <Funcionalidades />
      <Dashboard />
      <Beneficios />
      <Depoimentos />
      <ListarEquipe />
    </main>
  );
}

export default Sobre;