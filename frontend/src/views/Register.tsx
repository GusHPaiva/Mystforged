import { useState } from 'react'
import '../index.css'
import { api } from '../config/api'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
function Register() {
   const navigate = useNavigate();

    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    async function RegisterRequest(name: string, nickname: string, email: string, password: string) {
        try {
            const response = await api.post('/auth/register', { name, nickname, email, password });
            
            if (response.status === 201) {
                setSuccessMsg("User registered successfully! Redirecting to login...");
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }

        } catch (error: any) {
            console.error('Error registering:', error);
            if (error.response && error.response.status === 409) {
                setErrorMsg("This email or nickname are already in use. Please choose another.");
            } else {
                setErrorMsg("Error creating account. Please check your details.");
            }
        }
    }

    function handleRegister(e: React.FormEvent) {
        e.preventDefault();
        setErrorMsg('');
        setSuccessMsg('');
        
        RegisterRequest(name, nickname, email, password);
    }
  return (
    <div className="bg-myst items-center justify-center flex min-h-dvh w-full overflow-x-hidden bg-cover bg-center">
     <div className="bg-card/40 text-primary-txt w-[90%] max-w-sm justify-center items-center flex flex-col gap-6 p-10 rounded-lg shadow-lg backdrop-blur-[2px] border border-white/20">
      <div className="w-full flex justify-center select-none">
         <img src="/src/assets/MystLogo.png" alt="Logo MystForged" className="w-full max-w-50 sm:max-w-xs mx-auto h-auto object-contain select-none pointer-events-none" />
      </div>
        <div className="flex flex-col gap-4">
            <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" className="rounded-md bg-card text-primary-txt border border-border focus:outline-none focus:ring-2 focus:ring-action p-2" />
            <input value={nickname} onChange={(e) => setNickname(e.target.value)} type="text" placeholder="Nickname" className="rounded-md bg-card text-primary-txt border border-border focus:outline-none focus:ring-2 focus:ring-action p-2" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="rounded-md bg-card text-primary-txt border border-border focus:outline-none focus:ring-2 focus:ring-action p-2" />
            <input value = {password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="rounded-md bg-card text-primary-txt border border-border focus:outline-none focus:ring-2 focus:ring-action p-2" />
            <button className="bg-action text-primary-txt hover:bg-hover rounded-md p-3">Register</button>
            </form>
            {successMsg && <p className="text-green-500 font-bold text-sm text-center text-wrap">{successMsg}</p>}
            {errorMsg && <p className="text-red-500 font-bold text-sm text-center text-wrap">{errorMsg}</p>}
        </div>
        <div className="flex flex-col items-center gap-2">
            <p className='text-sm text-primary-txt/80'>Already have an account? <Link to="/login" className='text-secundary-txt hover:text-hover'>Sign in</Link></p>
        </div>
        </div>
    </div>
  )
}

export default Register;
