import { useState } from 'react'
import { Link } from 'react-router-dom'
import { User, Plus } from 'lucide-react' // Recomendação: npm install lucide-react para ícones Sênior

// Mock de dados para você testar a interface antes de ligar o back-end
const mockCharacters = [
  { 
    id: 1, 
    name: "Alistair Blackwood", 
    campaign: "Shadows of Oakhaven", 
    hp: 45, maxHp: 100, 
    pdc: 12, maxPdc: 50, 
    imgUrl: null
  },
  { 
    id: 2, 
    name: "Lyra Vance", 
    campaign: "The Clockwork Awakening", 
    hp: 80, maxHp: 80, 
    pdc: 40, maxPdc: 40, 
    imgUrl: null
  },
  { 
    id: 3, 
    name: "Serafina", 
    campaign: null, // Personagem solto
    hp: 100, maxHp: 100, 
    pdc: 50, maxPdc: 50, 
    imgUrl: null 
  }
]

export default function CharacterPage() {
  const [characters] = useState(mockCharacters)

  return (
    <div className="bg-myst min-h-dvh w-full overflow-x-hidden bg-cover bg-center p-6 md:p-12">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        
        {/* Header Section */}
        <div className="flex justify-between items-end border-b border-white/10 pb-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-100 tracking-wider">Awakened Entities</h1>
            <p className="text-gray-400 text-sm mt-1">Select your character to enter the abyss.</p>
          </div>
          <Link to="/characters/new" className="bg-action text-primary-txt hover:bg-hover flex items-center gap-2 rounded-md px-4 py-2 transition-colors">
            <Plus size={18} />
            <span className="hidden sm:inline">Forged New Entity</span>
          </Link>
        </div>

        {/* Character Grid/List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {characters.map((char) => {
            const isLost = !char.campaign;
            const hpPercent = (char.hp / char.maxHp) * 100;
            const pdcPercent = (char.pdc / char.maxPdc) * 100;

            return (
              <div 
                key={char.id} 
                className={`flex rounded-lg border bg-card/60 backdrop-blur-md overflow-hidden transition-all duration-300 hover:bg-card/80 cursor-pointer ${
                  isLost ? 'border-gray-700/50 opacity-80 hover:opacity-100 grayscale hover:grayscale-0' : 'border-gray-500/30 hover:border-gray-400/50'
                }`}
              >
                {/* Character Avatar */}
                <div className="w-32 sm:w-40 bg-gray-900/80 flex-shrink-0 flex items-center justify-center border-r border-white/5">
                  {char.imgUrl ? (
                    <img src={char.imgUrl} alt={char.name} className="w-full h-full object-cover" />
                  ) : (
                    <User size={48} className="text-gray-600" />
                  )}
                </div>

                {/* Character Data */}
                <div className="flex flex-col flex-grow p-4 sm:p-5 gap-3">
                  <div>
                    <h2 className="text-xl font-bold text-gray-100 truncate">{char.name}</h2>
                    <p className={`text-xs font-semibold uppercase tracking-wider mt-1 ${isLost ? 'text-gray-500' : 'text-secundary-txt'}`}>
                      {isLost ? 'Lost in the Fog' : `Campaign: ${char.campaign}`}
                    </p>
                  </div>

                  {/* Status Bars */}
                  <div className="flex flex-col gap-2 mt-auto">
                    {/* HP Bar */}
                    <div className="w-full">
                      <div className="flex justify-between text-[10px] text-gray-400 mb-1 font-mono">
                        <span>HP</span>
                        <span>{char.hp} / {char.maxHp}</span>
                      </div>
                      <div className="h-2 w-full bg-red-950/50 rounded-full overflow-hidden border border-red-900/30">
                        <div 
                          className="h-full bg-red-600 transition-all duration-500" 
                          style={{ width: `${hpPercent}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* PDC Bar */}
                    <div className="w-full">
                      <div className="flex justify-between text-[10px] text-gray-400 mb-1 font-mono">
                        <span>PDC</span>
                        <span>{char.pdc} / {char.maxPdc}</span>
                      </div>
                      <div className="h-2 w-full bg-teal-950/50 rounded-full overflow-hidden border border-teal-900/30">
                        <div 
                          className="h-full bg-teal-500 transition-all duration-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]" 
                          style={{ width: `${pdcPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}