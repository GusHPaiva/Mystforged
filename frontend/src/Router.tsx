import { Routes, Route } from 'react-router-dom'
import Login from './views/Login' 
import Register from './views/Register'
export function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}