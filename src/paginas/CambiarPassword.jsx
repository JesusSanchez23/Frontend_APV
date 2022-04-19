import { useState } from "react";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";

const CambiarPassword = () => {
 const {guardarPassword} = useAuth();
  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState({
      pwd_actual:'',
      pwd_nuevo:''
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(Object.values(password).some(campo => campo === '')){
        setAlerta({
            msg:'Todos los campos son obligatorios',
            error:true
        })
        return
    }

    if(password.pwd_nuevo.length < 6){
        setAlerta({
            msg:'Contraseña insegura, intenta con otra',
            error:true
        })
        return
    }

    const resultado = await guardarPassword(password);

    console.log(resultado);

    setAlerta(resultado);
  };

  const { msg } = alerta;
  return (
    <>
      <AdminNav />
      <h2 className="font-black text-center text-3xl mt-10">
        Cambiar password
      </h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Modifica tu <span className="text-indigo-600 font-bold">Password</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white rounded-lg p-5">
          {msg && <Alerta alerta={alerta} />}
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label
                htmlFor="nombre"
                className="text-gray-700 uppercase font-bold"
              >
                Password Actual:
              </label>
              <input
                type="password"
                name="pwd_actual"
                placeholder="Escribe tu password Actual"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md bg-gray-50"
                onChange={(e) =>
                  setPassword({ ...password, [e.target.name]: e.target.value })
                }
              />
            </div>

            <div className="my-3">
              <label
                htmlFor="web"
                className="text-gray-700 uppercase font-bold"
              >
                Nuevo Password:
              </label>
              <input
                type="password"
                name="pwd_nuevo"
                placeholder="Ecribe tu nueva password"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md bg-gray-50"
                onChange={(e) =>
                  setPassword({ ...password, [e.target.name]: e.target.value })
                }
              />
            </div>

            <input
              type="submit"
              value="Actualizar Password"
              className="bg-indigo-600 p-3 rounded text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors w-full"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default CambiarPassword;
