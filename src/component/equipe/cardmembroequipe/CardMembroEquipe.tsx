import { GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react";
import type MembroEquipe from "../../../models/MembroEquipe";

interface CardMembroEquipeProps {
  membroEquipe: MembroEquipe;
}

function CardMembroEquipe({ membroEquipe }: CardMembroEquipeProps) {
  return (
    <div className="bg-custom-beige grid grid-cols-3 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="col-span-1 flex justify-center items-center p-4">
        <img
          src={membroEquipe.foto}
          alt={`Foto de ${membroEquipe.nome}`}
          className="w-20 h-20 aspect-square object-cover rounded-full"
        />
      </div>
      <div className="col-span-2 p-4 flex flex-col justify-center">
        <h4 className="text-base uppercase font-bold tracking-widest">{membroEquipe.nome}</h4>
        <p className="text-sm text-gray-600">{membroEquipe.cargo}</p>
        <div className="flex gap-2 mt-3">
          <a href={membroEquipe.linkedin} target="_blank" rel="noreferrer" aria-label={`LinkedIn de ${membroEquipe.nome}`}
            className="hover:text-primary transition-colors">
            <LinkedinLogoIcon size={28} />
          </a>
          <a href={membroEquipe.github} target="_blank" rel="noreferrer" aria-label={`GitHub de ${membroEquipe.nome}`}
            className="hover:text-primary transition-colors">
            <GithubLogoIcon size={28} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default CardMembroEquipe;
