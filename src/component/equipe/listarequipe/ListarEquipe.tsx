import { MembrosEquipe } from "../../../util/DadosEquipe";
import CardMembroEquipe from "../cardmembroequipe/CardMembroEquipe";

function ListarEquipe() {
  return (
    <section className="w-full py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl text-purple font-bold uppercase tracking-widest">Nossa Equipe</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {MembrosEquipe.map((membro) => (
            <CardMembroEquipe key={membro.id} membroEquipe={membro} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ListarEquipe;
