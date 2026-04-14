import CardMembroEquipe from "../../components/cardmembroequipe/CardMembroEquipe";
import { MembrosEquipe } from "../../util/DadosEquipe";

function Equipe() {
  return (
    <>
      <div className="flex justify-center flex-col w-full  h-full bg-gray-100 ">
        <div className="flex justify-center h-20">
          <h2 className="  font-bold text-3xl ">NOSSA EQUIPE</h2>
        </div>
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 w-2/3 ">
            {MembrosEquipe.map((membro) => (
              <CardMembroEquipe key={membro.id} membroEquipe={membro} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Equipe;
