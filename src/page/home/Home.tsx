import { Link } from "react-router-dom"
import imgHome from "../../assets/img/imgHome.png"

import ListarColaboradores from "../../component/colaborador/listarColaboradores/ListarColaboradores"

function Home() {
    return (
        <>
            <section className="bg-purple font-sans text-custom-beige w-full min-h-screen flex items-center">
                <article className="container mx-auto px-8 md:px-16 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                    <div className="flex flex-col gap-5 text-custom-beige p-10">

                        <div className="flex flex-col gap-1">
                            <h1 className="text-5xl font-bold text-[#c5a16f] tracking-widest uppercase">RH</h1>
                            <span className="text-5xl font-bold text-[#c5a16f] tracking-widest uppercase">MANAGER</span>
                        </div>

                        <div className="w-16 h-1 bg-[#c5a16f] rounded-full" />

                        <p className="text-lg leading-relaxed text-custom-beige max-w-md">
                            Otimize <span className="text-[#c5a16f] font-medium tracking-widest uppercase">processos</span>, valorize{" "}
                            <span className="text-[#c5a16f] font-medium tracking-widest uppercase">talentos</span> e impulsione{" "}
                            <span className="text-[#c5a16f] font-medium tracking-widest uppercase">resultados</span>.
                            Gestão de RH <span className="text-[#c5a16f] font-medium tracking-widest uppercase">simples</span> e{" "}
                            <span className="text-[#c5a16f] font-medium tracking-widest uppercase">eficiente</span>,
                            focada no que realmente importa:{" "}
                            <span className="text-[#c5a16f] font-medium tracking-widest uppercase">pessoas</span>!
                        </p>

                        <p className="text-base text-custom-beige">
                            O futuro da gestão de recursos humanos começa aqui.
                        </p>

                        <div className="flex gap-4 mt-1">
                            <Link to="/sobre" className="flex justify-center text-sm items-center text-center uppercase tracking-widest
                        bg-[#c5a16f] text-white font-bold rounded-lg w-30 h-10 
                        hover:bg-[#c5a16f]/90 transition-colors ">
                                Saiba Mais
                            </Link>
                            <Link to="/login" className="flex justify-center text-sm items-center text-center uppercase tracking-widest w-30 h-10 
                        border-2 border-[#c5a16f] text-[#c5a16f] font-semibold
                        rounded-lg hover:bg-[#c5a16f] hover:text-white transition-colors">
                                Entrar
                            </Link>
                        </div>

                    </div>

                    <figure className="flex justify-center items-center order-first md:order-last text-custom-beige">
                        <img
                            src={imgHome}
                            alt="Imagem Página Home"
                            className="w-full max-w-md aspect-[3/2] object-cover rounded-2xl shadow-2xl"
                        />
                    </figure>

                </article>
            </section>
            <ListarColaboradores />

        </>
    )
}

export default Home