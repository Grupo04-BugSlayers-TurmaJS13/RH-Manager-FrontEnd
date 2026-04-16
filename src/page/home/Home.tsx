import { Link } from "react-router-dom";
import imgHome from "../../assets/img/imgHome.png";
import ListarColaboradores from "../../component/colaborador/listarColaboradores/ListarColaboradores";

function Home() {
  return (
    <>
      <section className="bg-purple font-sans text-custom-beige w-full min-h-screen flex items-center">
        <article className="container mx-auto px-8 md:px-16 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          <div className="flex flex-col gap-6 p-6 md:p-10">
            <div className="flex flex-col gap-1">
              <h1 className="text-6xl font-extrabold text-custom-beige tracking-widest uppercase leading-tight">
                RH<br />MANAGER
              </h1>
              <div className="w-16 h-1 bg-primary rounded-full mt-3" />
            </div>

            <p className="text-base md:text-lg leading-relaxed text-custom-beige/90 max-w-md">
              Otimize{" "}
              <span className="text-primary font-semibold">processos</span>, valorize{" "}
              <span className="text-primary font-semibold">talentos</span> e impulsione{" "}
              <span className="text-primary font-semibold">resultados</span>.{" "}
              Gestão de RH{" "}
              <span className="text-primary font-semibold">simples</span> e{" "}
              <span className="text-primary font-semibold">eficiente</span>,
              focada no que realmente importa:{" "}
              <span className="text-primary font-semibold">pessoas</span>!
            </p>

            <p className="text-sm text-custom-beige/70 tracking-wide">
              O futuro da gestão de recursos humanos começa aqui.
            </p>

            <div className="flex flex-wrap gap-4 mt-2">
              <Link
                to="/sobre"
                className="inline-flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors shadow-lg shadow-primary/30"
              >
                Saiba Mais
              </Link>
              <Link
                to="/colaboradores"
                className="inline-flex items-center justify-center text-sm font-semibold uppercase tracking-widest px-8 py-3 border-2 border-custom-beige text-custom-beige rounded-lg hover:bg-custom-beige hover:text-purple transition-colors"
              >
                Entrar
              </Link>
            </div>
          </div>

          <figure className="flex justify-center items-center order-first md:order-last">
            <img
              src={imgHome}
              alt="Profissionais de RH em reunião"
              className="w-full max-w-lg object-contain drop-shadow-2xl"
            />
          </figure>

        </article>
      </section>
      <ListarColaboradores />
    </>
  );
}

export default Home;