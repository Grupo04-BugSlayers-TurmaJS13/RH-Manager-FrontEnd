
import CardColaborador from '../cardcolaborador/CardColaborador'
import { Colaboradores } from '../../../util/DadosColaborador'

function ListarColaboradores() {
  return (
    <>
      <div className="flex justify-center flex-col w-full  h-full bg-gray-100 ">
        <div className="flex justify-center items-center h-20">
          <h2 className=" font-bold text-3xl ">Colaboradores</h2>
        </div>
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 w-2/3 ">
            {Colaboradores.map((colaborador) => (
              <CardColaborador key={colaborador.id} colaborador={colaborador} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ListarColaboradores