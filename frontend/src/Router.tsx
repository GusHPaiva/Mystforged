import { Routes, Route } from 'react-router-dom'
import Login from './Login' 

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      
    </Routes>
  )
}