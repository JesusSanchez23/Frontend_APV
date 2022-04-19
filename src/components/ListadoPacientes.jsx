import usePacientes from "../hooks/usePacientes";

import Paciente from "./Paciente";



const ListadoPacientes = () => {

  const {pacientes} = usePacientes();

  

  return (
    <>
    {pacientes.length ? (
      <>
        <h2 className="font-black text-3xl text-center">Listado de pacientes</h2>
      <p className="text-xl mt-5 mb-10 text-center">Administra tus pacientes<span className="text-indigo-600 font-bold"> Y citas</span></p>
   
      {pacientes.map((paciente)=>{
        return <Paciente
        key={paciente._id}
        paciente={paciente}
        />
      })}
      </>

    ) : 
    (
      <>
      <h2 className="font-black text-3xl text-center">No hay Pacientes</h2>
      <p className="text-xl mt-5 mb-10 text-center">Comienza agregando pacientes <span className="text-indigo-600 font-bold">Y apareceran en este lugar</span></p>
      </>
    )}
    </>
  )
}

export default ListadoPacientes