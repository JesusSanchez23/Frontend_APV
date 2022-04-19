import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";

const Perfil = () => {

    const {auth, actualizarPerfil} = useAuth();
    const [perfil,setPerfil] = useState({});
    const [alerta, setAlerta] = useState({});
    

    

   useEffect(() =>{
    setPerfil(auth);
   }, [auth])

   const handleSubmit =async(e)=>{
    e.preventDefault();
    const {nombre, email} = perfil;

    if([nombre,email].includes('')){
     setAlerta({
         msg:'El nombre y email son oblitarios', error:true
     })
     return
    }
    const resultado = await actualizarPerfil(perfil);
    setAlerta(resultado)
    console.log(perfil);
   }

   const {msg} = alerta;

   
  return (
    <>
      <AdminNav />
      <h2 className="font-black text-center text-3xl mt-10">Editar Perfil</h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Modifica tu{" "}
        <span className="text-indigo-600 font-bold">Informaciób</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white rounded-lg p-5">
            {msg && <Alerta alerta={alerta}/>}
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label
                htmlFor="nombre"
                className="text-gray-700 uppercase font-bold"
              >
                Nombre:
              </label>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md bg-gray-50"
                value={perfil.nombre || ''}
                onChange={(e)=> setPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value
                })}
              />
            </div>

            <div className="my-3">
              <label
                htmlFor="web"
                className="text-gray-700 uppercase font-bold"
              >
                Sitio Web:
              </label>
              <input
                type="text"
                name="web"
                placeholder="Sitio Web"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md bg-gray-50"
                value={perfil.web || ''}
                onChange={(e)=> setPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value
                })}
              />
            </div>

            <div className="my-3">
              <label
                htmlFor="telefono"
                className="text-gray-700 uppercase font-bold"
              >
                Telefono:
              </label>
              <input
                type="text"
                id="telefono"
                name="telefono"
                placeholder="Telefono"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md bg-gray-50"
                value={perfil.telefono || ''}
                onChange={(e)=> setPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value
                })}
              />
            </div>

            <div className="my-3">
              <label
                htmlFor="email"
                className="text-gray-700 uppercase font-bold"
              >
                Email:
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Nombre"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md bg-gray-50"
                value={perfil.email || ''}
                onChange={(e)=> setPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value
                })}
              />
            </div>

            
        <input
          type="submit"
          value="Guardar Cambios"
          className="bg-indigo-600 p-3 rounded text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors w-full"
        />
          </form>
        </div>
      </div>
    </>
  );
};

export default Perfil;
