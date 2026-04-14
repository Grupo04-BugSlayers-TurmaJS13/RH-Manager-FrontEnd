import { Link } from "react-router-dom"
import imgHome from "../../assets/img/imgHome.png"
import Funcionalidades from "../../component/funcionalidade/funcionalidade/Funcionalidade"
import Beneficios from "../../component/beneficio/beneficio/Beneficio"
import Dashboard from "../../component/dashboard/Dashboard"
import Funcionamento from "../../component/funcionamento/Funcionamento"
import Depoimentos from "../../component/depoimento/depoimento/Depoimento"

function Home() {
    return (
        <>
            <section className="bg-purple font-sans text-white w-full min-h-screen flex items-center">
                <article className="container mx-auto px-8 md:px-16 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    <div className="flex flex-col gap-5 text-gray-200 p-10">

                        <div className="flex flex-col gap-1">
                            <h1 className="text-5xl font-bold text-yellow tracking-tight">RH</h1>
                            <span className="text-5xl font-bold text-white tracking-tight">Manager</span>
                        </div>

                        <div className="w-16 h-1 bg-yellow rounded-full" />

                        <p className="text-lg leading-relaxed text-gray-200 max-w-md">
                            Otimize <span className="text-yellow font-medium">processos</span>, valorize{" "}
                            <span className="text-yellow font-medium">talentos</span> e impulsione{" "}
                            <span className="text-yellow font-medium">resultados</span>.
                            Gestão de RH <span className="text-yellow font-medium">simples</span> e{" "}
                            <span className="text-yellow font-medium">eficiente</span>,
                            focada no que realmente importa:{" "}
                            <span className="text-yellow font-medium">pessoas</span>!
                        </p>

                        <p className="text-base text-gray-300">
                            O futuro da gestão de recursos humanos começa aqui.
                        </p>

                        <div className="flex gap-4 mt-1">
                            <Link to="" className="flex justify-center text-sm items-center text-center
                        bg-yellow text-purple font-bold rounded-lg w-30 h-10 
                        hover:bg-yellow-dark transition-colors">
                                Saiba Mais
                            </Link>
                            <Link to="" className="flex justify-center text-sm items-center text-center w-30 h-10 
                        border-2 border-white text-white font-semibold
                        rounded-lg hover:bg-white hover:text-purple transition-colors">
                                Entrar
                            </Link>
                        </div>

                    </div>

                    <figure className="flex justify-center items-center order-first md:order-last">
                        <img
                            src={imgHome}
                            alt="Imagem Página Home"
                            className="w-80 h-80 md:w-105 md:h-105 object-cover rounded-full 
                            shadow-2xl shadow-yellow/40"
                        />
                    </figure>

                </article>
            </section>

            <Funcionalidades />

            <Beneficios />

            <Dashboard />

            <Funcionamento />

            <Depoimentos />
        </>
    )
}

export default Home