import { GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react";
import type MembroEquipe from "../../../models/MembroEquipe";

interface CardMembroEquipeProps {
  membroEquipe: MembroEquipe;
}

function CardMembroEquipe({ membroEquipe }: CardMembroEquipeProps) {
  return (
    <div className=" bg-custom-beige border-0 h-fit grid grid-cols-3 rounded overflow-hidden">
      <div className="col-span-1">
        <div className="flex justify-center items-center h-full">
          <img
            src={membroEquipe.foto}
            alt="Foto do membro da equipe"
            className="h-2/3 max-h-36 p-4 rounded-full"
          />
        </div>
      </div>

      <div className="col-span-2 p-4 flex flex-col  justify-center">
        <div>
          <h4 className="text-lg uppercase">{membroEquipe.nome}</h4>
          <p>{membroEquipe.cargo}</p>
        </div>

        <div className="flex gap-2 mt-3">
          <a href={membroEquipe.linkedin} target="_blank" rel="noreferrer" 
          className="hover:drop-shadow-2xl hover:drop-shadow-purple-900 hover:text-purple">
          <LinkedinLogoIcon size={35} />
          </a>
          
          <a href={membroEquipe.github} target="_blank" rel="noreferrer"
          className="hover:drop-shadow-2xl hover:drop-shadow-purple-900 hover:text-purple">
          <GithubLogoIcon size={35} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default CardMembroEquipe;
