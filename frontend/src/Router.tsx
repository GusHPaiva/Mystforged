import { Routes, Route } from 'react-router-dom'
import Login from './views/Login' 
import Register from './views/Register'
import Choice from './views/Choice'
import Characters from './views/CharacterPage'
import CharacterSheet from './views/CharacterSheet'
export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/choice" element={<Choice />} />
      <Route path="/characters/*" element={<Characters />} />
      <Route path="/character" element={<CharacterSheet />} />
    </Routes>
  )
}