import { useState } from 'react'
import './index.css'
import Axios from 'axios'
function Login() {
    async function LoginRequest(email:string, password:string) {
        try {
            const response = await Axios.post('http://localhost:8080/login', { email, password })
            response.data.token && localStorage.setItem('token', response.data.token)
        } catch (error) {
            console.error('Error logging in:', error)
        }
    }
    function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        LoginRequest(email, password)
    }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  return (
    <div className="bg-myst items-center justify-center flex min-h-[100dvh] w-full overflow-x-hidden bg-cover bg-center">
      <div className="bg-card/40 text-primary-txt justify-center items-center flex flex-col gap-6 p-10 rounded-lg shadow-lg backdrop-blur-[2px] border border-white/20">
      <div className="w-full flex justify-center select-none">
         <img src="/src/assets/MystLogo.png" alt="Logo MystForged" className="w-full max-w-[200px] sm:max-w-xs mx-auto h-auto object-contain select-none pointer-events-none" />
      </div>
        <div className="flex flex-col gap-4">
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="rounded-md bg-card text-primary-txt border border-border focus:outline-none focus:ring-2 focus:ring-action p-2" />
            <input value = {password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="rounded-md bg-card text-primary-txt border border-border focus:outline-none focus:ring-2 focus:ring-action p-2" />
            <button className="bg-action text-primary-txt hover:bg-hover rounded-md p-3">Login</button>
            </form>
        </div>
        <div className="flex flex-col items-center gap-2">
            <p className='text-sm text-primary-txt/80'>Don't have an account? <a href="#" className='text-secundary-txt hover:text-hover'>Sign up</a></p>
        </div>
        </div>
    </div>
  )
}

export default Login;
