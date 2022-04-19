import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";
const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const ConfirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${id}`;
        const { data } = await clienteAxios(url);
        // console.log(data);
        setCuentaConfirmada(true);
        setAlerta({msg:data.msg, error:false})
      } catch (error) {
        // console.log(error.response);
        setAlerta({msg:error.response.data.msg, error:true});
      }

      setCargando(false);
    };
    ConfirmarCuenta();
  }, []);

  return (
    <>
      <div className="mb-12">
        <h1 className="text-indigo-600 font-black text-6xl">
          Confirma Tu Cuenta y Comienza a Administrar
          <span className="text-black"> Pacientes</span>
        </h1>
      </div>
      <div className="mt-20 ms:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
       {!cargando &&  <Alerta alerta={alerta}/>}

       {cuentaConfirmada && (
            <Link className="block text-center my-5 text-gray-500" to="/">Iniciar Sesión</Link>
       )}
      </div>
    </>
  );
};

export default ConfirmarCuenta;
