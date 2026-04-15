import { FaReact } from "react-icons/fa6"
import logorh from "../../assets/img/logoRH.png"
import Beneficios from "../../component/beneficio/beneficio/Beneficio"
import Funcionalidades from "../../component/funcionalidade/funcionalidade/Funcionalidade"
import { BsTypescript } from "react-icons/bs"
import { SiNestjs } from "react-icons/si"
import ListarEquipe from "../../component/equipe/listarequipe/ListarEquipe"
import Dashboard from "../../component/dashboard/Dashboard"
import Depoimentos from "../../component/depoimento/depoimento/Depoimento"

function Sobre() {
  return (
    <>
        <section className="max-w-[80vw] m-auto">
          <article className="flex flex-col justify-center py-30">
              <figure className="flex justify-center items-center">
                  <img src={logorh} alt="logo-rh" className="w-80 h-80 aspect-square object-contain rounded-full shadow-2xl border-4 border-[#c5a16f]/20"/>
              </figure>

              <div className="flex-col text-center ">
                <h1 className="text-3xl text-[#c5a16f] font-bold uppercase tracking-widest my-15">Sobre nós</h1>
                <p className="w-3xl m-auto text-gray-800 mt-3 ">
                  Gestão de RH simples, com resultados reais. 
                  Conectamos pessoas e oportunidades de forma rápida, inteligente e eficiente, reduzindo a burocracia e ampliando a estratégia. 
                  Utilizamos tecnologia para facilitar o dia a dia e apoiar decisões mais assertivas, 
                  tornando o seu RH mais ágil e sua equipe mais forte.

                </p>
              </div>

              <div className="flex flex-col justify-center items-center pt-20 ">
                <h2 className="text-3xl text-[#c5a16f] font-bold uppercase tracking-widest pb-6">Tecnologias</h2>
              
              <div className="flex  justify-between gap-15 mt-10 ">

                
                <p className="flex flex-col items-center  text-gray-800"><FaReact size={60}/>React</p>
                <p className="flex flex-col items-center text-gray-800"><BsTypescript size={60}/>Typescript</p>
                <p className="flex flex-col items-center text-gray-800"><SiNestjs size={60}/>Nest</p>
              </div>

              </div>
            </article>


              <Funcionalidades/>
              <Dashboard/>
              <Beneficios/>
              <Depoimentos/>
              <ListarEquipe/>
            
        </section>
   
    </>
  )
}

export default Sobre