import { Link } from "react-router-dom"
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const OlvidePassword = () => {
  const [email,setEmail] = useState('');
  const [alerta,setAlerta] = useState({})

const handleSubmit = async(e)=>{
  e.preventDefault();
  if(email === '' || email.length < 6){
    setAlerta({msg:'Email incorrecto', error: true})
    return;
  }

  try {
    const {data} = await clienteAxios.post('/veterinarios/olvide-password',{email})
    setAlerta({msg:data.msg})
  } catch (error) {
    setAlerta({msg:error.response.data.msg, error:true})
  }
 
}
const {msg} = alerta;

  return (
    <>
      <div className='mb-12'>
            <h1 className='text-indigo-600 font-black text-6xl'>Recupera Tu Password e Inicia <span className='text-black'>Sesión</span></h1>
          </div>
          <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
           { msg && <Alerta alerta={alerta}/>}
            <form onSubmit={handleSubmit}>
              <div className='my-5'>
                <label className="uppercase text-gray-600 block text-xl font-bold">Email:</label>
                <input type="text" placeholder='Ingresa Email' className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' value={email} onChange={e => setEmail(e.target.value)} />
              </div>

            <input type="submit" value="Recuperar Password" className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto md:block' />
            </form>
            <nav className="mt-10 lg:flex lg:justify-between">
              <Link className="block text-center my-5 text-gray-500" to="/registrar">¿No tienes una cuenta? Registrate</Link>
              <Link className="block text-center my-5 text-gray-500" to="/">Iniciar Sesión</Link>
            </nav>
          </div>
    </>
  )
}

export default OlvidePassword