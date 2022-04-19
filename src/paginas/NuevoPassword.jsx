import Alerta from "../components/Alerta";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import clienteAxios from "../config/axios";
import { Link } from "react-router-dom";

const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [confirmado, setConfirmado] = useState(false);

  const params = useParams();

  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
        try {
            await clienteAxios(`/veterinarios/olvide-password/${token}`);
            setAlerta({msg:'Coloca tu Nuevo Password'})
            setTokenValido(true);
        } catch (error) {
            setAlerta({msg:'Hubo un error en el enlace, intentalo nuevamente', error:true})
        }
    };
    comprobarToken();
  }, []);

  const handleSubmit = async(e) =>{
      e.preventDefault();

      if(password.length < 6){
          setAlerta({msg:'Password muy insegura, intenta con otra', error:true});
          return;
      }

      try {
          const url = `/veterinarios/olvide-password/${token}`
          const {data} = await clienteAxios.post(url,{password} );

        setConfirmado(true);
          setAlerta({msg:data.msg})
      } catch (error) {
          setAlerta({
              msg:error.response.date.msg, error:true
          })
      }
  }

  const {msg} = alerta;

  return (
    <>
      <div className="mb-12">
        <h1 className="text-indigo-600 font-black text-6xl">
          Reestablece Tu Contraseña y Administra Tus
          <span className="text-black"> Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
       {tokenValido && (<form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Nuevo Password:
            </label>
            <input
              type="text"
              placeholder="Ingresa 
                Tu password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Cambiar Password"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto md:block"
          />
        </form>)}

        {confirmado &&  <Link className="block text-center my-5 text-gray-500" to="/">
           Inicia sesión
          </Link>}
      </div>
    </>
  );
};

export default NuevoPassword;
