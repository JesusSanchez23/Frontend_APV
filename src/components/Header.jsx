import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const Header = () => {

  const {cerrarSesion} = useAuth();
  return (
    <>
    <header className="py-10 bg-indigo-600">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <h1 className="font-bold text-2xl text-indigo-200 text-center">Administrador de Pacientes {' '} <span className="text-white font-black">Veterinaria</span></h1>
        <nav className="flex gap-4 mt-10 md:mt-0 flex-col md:flex-row items-center">
          <Link to="/admin" className="text-white text-sm font-bold uppercase">Pacientes</Link>
          <Link to="/admin/perfil" className="text-white text-sm font-bold uppercase">Perfil</Link>
       

       <button
       type="button"
       className="text-white text-sm font-bold uppercase"
       onClick={cerrarSesion}
       >Cerrar Sesión</button>
        </nav>
      </div>
    </header>
    </>
  )
}

export default Header