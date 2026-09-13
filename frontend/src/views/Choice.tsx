import { useState } from 'react'
import '../index.css'
import { api } from '../config/api'
import { Link, useNavigate } from 'react-router-dom'
function Choice() {
  const navigate = useNavigate();

return (
<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-950 via-purple-900 to-gray-900 text-white">
  <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl mx-auto h-[50vh] p-6">
      
      {/* Weaver Panel (GM) */}
      <div className="flex-1 rounded-2xl border border-purple-500/40 bg-purple-900/30 hover:bg-purple-800/40 hover:shadow-[0_0_50px_rgba(147,51,234,0.4)] transition-all duration-700 cursor-pointer flex flex-col justify-center items-center text-center p-8 group relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <h2 className="text-3xl font-bold text-purple-100 z-10 tracking-wider">Weaver's Sight</h2>
        <p className="text-purple-200 z-10 mt-2">Control the world's gears and guide the tales.</p>
      </div>

      {/* Fog Panel (Player) */}
      <div className="flex-1 rounded-2xl border border-gray-500/40 bg-gray-900/60 hover:bg-gray-800/70 backdrop-blur-sm transition-all duration-700 cursor-pointer flex flex-col justify-center items-center text-center p-8 group relative overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-gray-400/10 via-gray-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <h2 className="text-3xl font-bold text-gray-200 z-10 tracking-wider">Path in the Fog</h2>
        <p className="text-gray-300 z-10 mt-2">Awaken your entity and face the abyss.</p>
      </div>
      
    </div>
</div>
)
}
export default Choice