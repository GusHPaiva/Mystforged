import { useState } from 'react'
import { 
  ArrowLeft, Shield, Skull, Plus, Coins, Shirt, Box, Archive, Key, Weight,
  Activity, Bandage, Brain, HeartPulse, CheckCircle2, Fingerprint, Landmark, FileText, Backpack,
  User, X, Wind, AlertCircle
} from 'lucide-react'
import { Link } from 'react-router-dom'

// ==========================================
// 1. INTERFACES (Tipagens)
// ==========================================
interface SkillItem { key: string; label: string }
interface Wound { id: string; type: string; grade: number; primaryEffect: string; secondaryEffect: string; isTreated: boolean }
interface Trait { id: string; name: string; description: string }
interface Bond { id: string; faction: string; status: string; description: string; benefits: string[]; requisitions: string[] }
interface Lore { appearance: string; personality: string; backstory: string }
interface Condition { id: string; name: string; grade: number | null; effect: string }
interface ResidualTrauma { id: string; name: string; type: 'Mania' | 'Trauma' | 'Insanidade'; effect: string; isSuppressed: boolean }
interface Weapon { id: string; name: string; damage: string; critical: string; distance: string; typeAndGrade: string; weight: number; restricted: string }
interface Property { id: string; name: string; description: string }
interface InventoryItem { id: string; name: string; description: string; isEquipped: boolean; weight: number }
interface Ability { id: string; name: string; description: string }
interface AttributeLayout {
  id: keyof Character['attributeDetails']
  title: string
  color: string
  extraInfo: (data: Character['attributeDetails'][keyof Character['attributeDetails']]) => React.ReactNode
  skills: SkillItem[]
}

interface Character {
  name: string; origin: string; vocation: string; honor: number; posture: string; imgUrl: string
  sequence: { grade: string; name: string } | null
  vitals: {
    hp: { current: number; max: number; rec: string }
    pdc: { current: number; max: number; rec: string }
    es: { current: number; max: number; rec: string }
  }
  coreAttributes: Array<{ name: string; dice: string }>
  defenses: { displacement: string; guard: number; traumaThreshold: number }
  activeStatus: Array<{ id: number; type: 'ferimento' | 'condicao'; name: string; grade: number }>
  combat: { armor: string; weapons: Weapon[] }
  inventory: { currentLoad: number; maxLoad: number; money: string; properties: Property[]; items: InventoryItem[]; storedItems: InventoryItem[] }
  health: { wounds: Wound[]; conditions: Condition[]; traumas: ResidualTrauma[] }
  abilities: Ability[]
  traits: Trait[]
  bonds: Bond[]
  lore: Lore
  attributeDetails: {
    constitution: { level: number; pt: string; baseHp: string; skills: Record<string, number> }
    agility: { level: number; pt: string; actionReaction: string; skills: Record<string, number> }
    intelligence: { level: number; pt: string; skills: Record<string, number> }
    mentality: { level: number; pt: string; basePdc: string; skills: Record<string, number> }
    charisma: { level: number; pt: string; innateHonor: string; skills: Record<string, number> }
    soul: { level: number; pt: string; baseEs: string; skills: Record<string, number> }
  }
}

// ==========================================
// 2. CONSTANTES E MOCKS
// ==========================================
const TRAUMA_COLORS: Record<string, string> = {
  'Mania': 'text-yellow-400 border-yellow-700/50 bg-yellow-950/20',
  'Trauma': 'text-orange-400 border-orange-700/50 bg-orange-950/20',
  'Insanidade': 'text-red-500 border-red-700/50 bg-red-950/20'
};

const TABS = [
  { id: 'atributos', label: 'Atributos & Perícias' },
  { id: 'acao', label: 'Ação & Habilidades' },
  { id: 'inventario', label: 'Inventário & Equip.' },
  { id: 'saude', label: 'Saúde & Aflições' },
  { id: 'lore', label: 'Lore, Traços & Vínculos' }
] as const;

type TabType = typeof TABS[number]['id'];

const ATTRIBUTE_LAYOUTS: AttributeLayout[] = [
  {
    id: 'constitution', title: 'Constituição', color: 'text-yellow-400',
    extraInfo: (data) => <span>HP BASE: {'baseHp' in data ? data.baseHp : '+0'}</span>,
    skills: [{ key: 'athletics', label: 'Atletismo' }, { key: 'strength', label: 'Força' }, { key: 'fortitude', label: 'Fortitude' }, { key: 'combat', label: 'Combate' }]
  },
  {
    id: 'agility', title: 'Agilidade', color: 'text-orange-400',
    extraInfo: (data) => <span>Ação: {'actionReaction' in data ? data.actionReaction : '-'}</span>,
    skills: [{ key: 'dexterity', label: 'Destreza' }, { key: 'acrobatics', label: 'Acrobacias' }, { key: 'marksmanship', label: 'Pontaria' }, { key: 'reflexes', label: 'Reflexos' }, { key: 'stealth', label: 'Furtividade' }, { key: 'agileCombat', label: 'Combate ágil' }]
  },
  {
    id: 'intelligence', title: 'Inteligência', color: 'text-pink-400',
    extraInfo: () => <span className="opacity-0">-</span>,
    skills: [{ key: 'investigation', label: 'Investigação' }, { key: 'studies', label: 'Estudos' }, { key: 'profession', label: 'Profissão' }, { key: 'survival', label: 'Sobrevivência' }]
  },
  {
    id: 'mentality', title: 'Mentalidade', color: 'text-yellow-600',
    extraInfo: (data) => <span>PDC BASE: {'basePdc' in data ? data.basePdc : '+0'}</span>,
    skills: [{ key: 'sanity', label: 'Sanidade' }, { key: 'willpower', label: 'Vontade' }, { key: 'perception', label: 'Percepção' }, { key: 'focus', label: 'Foco' }]
  },
  {
    id: 'charisma', title: 'Carisma', color: 'text-green-400',
    extraInfo: (data) => <span>Honra Inata: {'innateHonor' in data ? data.innateHonor : '0'}</span>,
    skills: [{ key: 'diplomacy', label: 'Diplomacia' }, { key: 'deception', label: 'Enganação' }, { key: 'hostility', label: 'Hostilidade' }, { key: 'leadership', label: 'Liderança' }]
  },
  {
    id: 'soul', title: 'Alma', color: 'text-gray-100',
    extraInfo: (data) => <span>ES BASE: {'baseEs' in data ? data.baseEs : '+0'}</span>,
    skills: [{ key: 'spiritualPerception', label: 'Percepção espiritual' }, { key: 'spiritualControl', label: 'Controle espiritual' }]
  }
];

const mockCharacter: Character = {
  // ... [Insira aqui o mockCharacter idêntico ao que construímos na última resposta para economizar espaço visual]
  name: 'William Spencer', origin: 'Nobre', vocation: 'Investigador', honor: 20, posture: 'Nobre', sequence: null, imgUrl: '',
  vitals: { hp: { current: 10, max: 10, rec: '1d3' }, pdc: { current: 0, max: 6, rec: '1' }, es: { current: 4, max: 4, rec: '1d3' } },
  coreAttributes: [ { name: 'CON', dice: '1d20' }, { name: 'AGI', dice: '1d20' }, { name: 'INT', dice: '1d20' }, { name: 'MEN', dice: '1d20' }, { name: 'CAR', dice: '1d20' }, { name: 'ALM', dice: '1d20' } ],
  defenses: { displacement: '9m', guard: 12, traumaThreshold: 15 },
  activeStatus: [ { id: 1, type: 'ferimento', name: 'Laceramento', grade: 2 } ],
  combat: { 
    armor: 'Sobretudo de Couro Pesado (Defesa +2)', 
    weapons: [
      { id: 'w1', name: 'Revólver de Prata', damage: '2d6', critical: '19-20/x2', distance: '15m', typeAndGrade: 'Fogo / G1', weight: 1, restricted: 'Não' },
      { id: 'w2', name: 'Bengala Espada', damage: '1d8', critical: '20/x2', distance: 'Corpo a Corpo', typeAndGrade: 'Corte / G1', weight: 1, restricted: 'Não' }
    ] 
  },
  inventory: {
    currentLoad: 4, maxLoad: 10, money: '150 Libras, 5 Solis',
    properties: [
      { id: 'p1', name: 'Apartamento em Backlund', description: 'Um apartamento modesto no Distrito de Minsk. Contém um cofre escondido debaixo do assoalho.' },
      { id: 'p2', name: 'Conta no Banco de Loen', description: 'Conta anônima com fundos de emergência.' }
    ],
    items: [
      { id: 'i1', name: 'Relógio de Bolso', description: 'Um relógio de prata com engrenagens visíveis.', isEquipped: true, weight: 0 },
      { id: 'i2', name: 'Munição de Prata (x12)', description: 'Balas abençoadas para dano espiritual.', isEquipped: true, weight: 1 },
      { id: 'i3', name: 'Diário de Caça', description: 'Anotações sobre criaturas e ingredientes.', isEquipped: false, weight: 1 },
      { id: 'i4', name: 'Kit de Primeiros Socorros', description: 'Bandagens e poções estabilizadoras.', isEquipped: false, weight: 2 }
    ],
    storedItems: [
      { id: 's1', name: 'Artefato Selado 3-021', description: 'Espelho de prata envolto em panos pretos. Guardado no cofre.', isEquipped: false, weight: 3 },
      { id: 's2', name: 'Livro de Rituais', description: 'Tomos pesados sobre misticismo e fórmulas de poções.', isEquipped: false, weight: 2 }
    ]
  },
  abilities: [
    { id: 'ab1', name: 'Saque Rápido', description: 'Permite sacar uma arma como ação livre uma vez por turno.' },
    { id: 'ab2', name: 'Visão Noturna', description: 'Enxerga no escuro como se fosse luz plena.' }
  ],
  attributeDetails: {
    constitution: { level: 1, pt: '0/0', baseHp: '+2', skills: { athletics: 2, strength: 1, fortitude: 3, combat: 2 } },
    agility: { level: 1, pt: '0/0', actionReaction: '1 / Rea: 0.5', skills: { dexterity: 2, acrobatics: 1, marksmanship: 3, reflexes: 2, stealth: 1, agileCombat: 2 } },
    intelligence: { level: 1, pt: '0/0', skills: { investigation: 3, studies: 4, profession: 2, survival: 2 } },
    mentality: { level: 1, pt: '0/0', basePdc: '+1', skills: { sanity: 2, willpower: 3, perception: 4, focus: 2 } },
    charisma: { level: 1, pt: '0/0', innateHonor: '2', skills: { diplomacy: 3, deception: 2, hostility: 1, leadership: 4 } },
    soul: { level: 1, pt: '0/0', baseEs: '+3', skills: { spiritualPerception: 1, spiritualControl: 1 } }
  },
  health: {
    wounds: [
      { id: 'w1', type: 'Corte Profundo', grade: 2, primaryEffect: '-2 em testes de Força e Destreza.', secondaryEffect: 'Sangramento leve se fizer esforço.', isTreated: false },
      { id: 'w2', type: 'Osso Trincado', grade: 1, primaryEffect: 'Deslocamento reduzido em 3m.', secondaryEffect: 'Nenhum.', isTreated: true }
    ],
    conditions: [
      { id: 'c1', name: 'Envenenado', grade: 2, effect: 'Perde 1d6 HP por turno.' },
      { id: 'c2', name: 'Cego', grade: null, effect: 'Falha automática em testes de Percepção visual.' }
    ],
    traumas: [
      { id: 't1', name: 'Contar Munição', type: 'Mania', effect: 'Gatilho: Som de disparos. Ceder: Gasta a próxima ação contando balas. Reprimir: Teste de Sanidade.', isSuppressed: false },
      { id: 't2', name: 'Claustrofobia Extrema', type: 'Trauma', effect: 'Aversão a lugares apertados. Não pode investigar ou se aproximar.', isSuppressed: true }
    ]
  },
  traits: [
    { id: 'tr1', name: 'Memória Fotográfica', description: 'Lembra-se de detalhes de cenas de crime com exatidão após uma breve observação.' },
    { id: 'tr2', name: 'Insônia Funcional', description: 'Necessita de apenas 4 horas de sono para descanso longo, mas sofre leve penalidade em Carisma.' }
  ],
  bonds: [
    {
      id: 'b1', faction: 'Falcões Noturnos', status: 'Inspetor Especial', description: 'Atua como braço investigativo da Igreja em casos envolvendo o oculto em Backlund.',
      benefits: ['Acesso aos arquivos restritos', 'Suporte médico clandestino'], requisitions: ['Munição abençoada (1 cota semanal)', 'Cobertura policial para invasões']
    }
  ],
  lore: {
    appearance: 'Alto, esguio, com olheiras profundas que denunciam a falta de sono. Veste sempre um sobretudo escuro.',
    personality: 'Pragmático, metódico e silencioso. Tende a analisar as pessoas como se fossem engrenagens.',
    backstory: 'Nascido em um distrito operário, William ascendeu como investigador particular até que o caso do "Açougueiro de Tingen" o colocou frente a frente com o sobrenatural.'
  }
};

const calculateBonus = (level: number = 1): string => {
  const bonusMap: Record<number, number> = { 1: -2, 2: 0, 3: 2, 4: 5, 5: 8 };
  const bonus = bonusMap[level] ?? -2;
  return bonus > 0 ? `+${bonus}` : `${bonus}`;
};

// ==========================================
// 3. COMPONENTES DAS ABAS
// ==========================================

const AttributesTab = ({ character }: { character: Character }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {ATTRIBUTE_LAYOUTS.map((layout) => {
      const attributeData = character.attributeDetails[layout.id];
      return (
        <div key={layout.id} className="bg-black/30 border border-gray-700/50 rounded-lg p-4">
          <div className="flex justify-between items-center border-b border-gray-600 pb-2 mb-3">
            <h3 className={`font-bold uppercase tracking-widest text-sm ${layout.color}`}>{layout.title}</h3>
            <span className="bg-gray-800 px-2 py-1 rounded text-xs">Nível {attributeData.level}</span>
          </div>
          <div className="flex justify-between text-xs text-gray-400 mb-3">
            <span>PT: [{attributeData.pt}]</span>
            {layout.extraInfo(attributeData)}
          </div>
          <ul className="flex flex-col gap-2 text-sm">
            {layout.skills.map((skill) => {
              const skillLevel = attributeData.skills[skill.key] ?? 1;
              return (
                <li key={skill.key} className="flex justify-between items-center bg-gray-900/50 px-2 py-1 rounded">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-gray-400">{skill.label}</span>
                    <span className="text-[11px] text-gray-500 font-mono">(Nv.{skillLevel})</span>
                  </div>
                  <span className="text-gray-300 font-bold font-mono">{calculateBonus(skillLevel)}</span>
                </li>
              );
            })}
          </ul>
        </div>
      );
    })}
  </div>
);

const ActionTab = ({ character }: { character: Character }) => (
  <div className="flex flex-col gap-8">
    <div className="bg-black/30 border border-gray-700/50 rounded-lg p-6">
      <div className="flex justify-between items-center border-b border-gray-600 pb-2 mb-4">
        <h2 className="text-lg font-bold uppercase tracking-widest text-red-400">Armas e Arsenal</h2>
        <button className="text-gray-400 hover:text-white"><Plus size={16}/></button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-600 text-gray-400">
              {['Arma', 'Dano', 'Crítico', 'Distância', 'Tipo e Grau', 'Peso', 'Restrito'].map(h => (
                <th key={h} className="p-2 font-bold uppercase tracking-wider text-xs">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {character.combat.weapons.map((w) => (
              <tr key={w.id} className="border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors">
                <td className="p-2 text-gray-200 font-bold">{w.name}</td>
                <td className="p-2 text-red-400 font-mono">{w.damage}</td>
                <td className="p-2 text-gray-300 font-mono">{w.critical}</td>
                <td className="p-2 text-gray-400">{w.distance}</td>
                <td className="p-2 text-gray-400">{w.typeAndGrade}</td>
                <td className="p-2 text-gray-400">{w.weight}</td>
                <td className="p-2 text-gray-400">{w.restricted}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <div className="bg-black/30 border border-gray-700/50 rounded-lg p-6">
      <div className="flex justify-between items-center border-b border-gray-600 pb-2 mb-4">
        <h2 className="text-lg font-bold uppercase tracking-widest text-blue-400">Habilidades e Poderes</h2>
        <button className="text-gray-400 hover:text-white"><Plus size={16}/></button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {character.abilities.map((ability) => (
          <div key={ability.id} className="bg-gray-900/40 p-4 rounded border border-gray-700/50">
            <h3 className="font-bold text-gray-200 mb-1">{ability.name}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{ability.description}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const InventoryTab = ({ character, onOpenDrawer }: { character: Character, onOpenDrawer: (s: string) => void }) => (
  <div className="flex flex-col gap-6">
    <div className="bg-black/30 border border-gray-700/50 rounded-lg p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-600 pb-4 mb-6 gap-4">
        <h2 className="text-lg font-bold uppercase tracking-widest text-teal-400 flex items-center gap-2"><Backpack size={18} /> Inventário Físico</h2>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-yellow-950/20 px-3 py-1.5 rounded border border-yellow-900/50 shadow-sm">
            <Coins size={14} className="text-yellow-500" />
            <span className="text-sm font-mono text-yellow-400 font-bold">{character.inventory.money}</span>
          </div>
          <div className="flex items-center gap-2 bg-black/50 px-3 py-1.5 rounded border border-gray-700 shadow-inner">
            <Weight size={14} className="text-gray-400" />
            <span className="text-sm font-mono text-gray-400">Carga: <span className="text-gray-200 font-bold">{character.inventory.currentLoad}</span> / {character.inventory.maxLoad}</span>
          </div>
          <button className="text-gray-400 hover:text-white bg-black/40 p-1.5 rounded border border-gray-700 transition-colors ml-1"><Plus size={16}/></button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-sm font-bold text-teal-400 mb-4 flex items-center gap-2"><Shirt size={16} /> Vestindo / Equipado</h3>
          <ul className="flex flex-col gap-3">
            <li className="bg-teal-950/10 border border-teal-900/30 p-3 rounded-lg flex flex-col gap-1 shadow-sm">
              <span className="font-bold text-teal-300 text-sm">{character.combat.armor}</span>
              <span className="text-teal-500/60 text-[10px] uppercase tracking-wider">Armadura Base</span>
            </li>
            {character.inventory.items.filter(i => i.isEquipped).map(item => (
              <li key={item.id} className="bg-gray-900/40 border border-gray-700/50 p-3 rounded-lg flex flex-col gap-1 shadow-sm group">
                <div className="flex justify-between items-start w-full">
                  <span className="font-bold text-gray-200 text-sm">{item.name}</span>
                  <span className="text-[10px] text-gray-500 font-mono bg-black/50 px-1.5 py-0.5 rounded border border-gray-700">Peso {item.weight}</span>
                </div>
                <span className="text-gray-400 text-xs leading-relaxed">{item.description}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-400 mb-4 flex items-center gap-2"><Backpack size={16} /> Na Mochila</h3>
          <ul className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2">
            {character.inventory.items.filter(i => !i.isEquipped).map(item => (
              <li key={item.id} className="bg-gray-900/40 border border-gray-700/50 p-3 rounded-lg flex flex-col gap-1 shadow-sm group">
                <div className="flex justify-between items-start w-full">
                  <span className="font-bold text-gray-300 text-sm">{item.name}</span>
                  <span className="text-[10px] text-gray-500 font-mono bg-black/50 px-1.5 py-0.5 rounded border border-gray-700">Peso {item.weight}</span>
                </div>
                <span className="text-gray-500 text-xs leading-relaxed">{item.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    <div className="bg-black/30 border border-gray-700/50 rounded-lg p-6">
      <div className="flex justify-between items-center border-b border-gray-600 pb-3 mb-6">
        <h2 className="text-lg font-bold uppercase tracking-widest text-indigo-400 flex items-center gap-2"><Archive size={18} /> Armazém & Posses</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-sm font-bold text-gray-400 mb-4 flex items-center gap-2"><Box size={16} /> Itens Armazenados (Esconderijo)</h3>
          <ul className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2">
            {character.inventory.storedItems.map(item => (
              <li key={item.id} className="bg-gray-900/40 border border-gray-700/50 p-3 rounded-lg flex flex-col gap-1 shadow-sm group">
                <div className="flex justify-between items-start w-full">
                  <span className="font-bold text-gray-300 text-sm">{item.name}</span>
                  <span className="text-[10px] text-gray-500 font-mono bg-black/50 px-1.5 py-0.5 rounded border border-gray-700">Peso {item.weight}</span>
                </div>
                <span className="text-gray-500 text-xs leading-relaxed">{item.description}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-400 mb-4 flex items-center gap-2"><Key size={16} /> Propriedades</h3>
          <ul className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2">
            {character.inventory.properties.map(prop => (
              <li key={prop.id} onClick={() => onOpenDrawer(prop.name)} className="bg-indigo-950/10 border border-indigo-900/30 p-3 rounded-lg flex flex-col gap-1 hover:bg-indigo-900/20 transition-colors cursor-pointer shadow-sm group">
                <span className="font-bold text-indigo-300 text-sm">{prop.name}</span>
                <span className="text-gray-500 text-xs leading-relaxed truncate">{prop.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const HealthTab = ({ character }: { character: Character }) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div className="bg-black/30 border border-gray-700/50 rounded-lg p-6 flex flex-col h-full">
      <div className="flex justify-between items-center border-b border-gray-600 pb-3 mb-4">
        <h2 className="text-lg font-bold uppercase tracking-widest text-red-400 flex items-center gap-2"><HeartPulse size={18} /> Ferimentos</h2>
        <button className="text-gray-400 hover:text-white bg-black/40 p-1.5 rounded border border-gray-700 transition-colors"><Plus size={16}/></button>
      </div>
      <ul className="flex flex-col gap-4 overflow-y-auto pr-2 max-h-[500px]">
        {character.health.wounds.map(wound => (
          <li key={wound.id} className={`p-4 rounded-lg border flex flex-col gap-2 shadow-sm ${wound.isTreated ? 'bg-gray-900/30 border-gray-700/50 opacity-80' : 'bg-red-950/10 border-red-900/30'}`}>
            <div className="flex justify-between items-start">
              <span className={`font-bold text-sm ${wound.isTreated ? 'text-gray-400' : 'text-red-400'}`}>
                {wound.type} <span className="text-xs font-mono ml-1 px-1.5 py-0.5 rounded bg-black/50 border border-gray-700 text-gray-500">G{wound.grade}</span>
              </span>
              <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded flex items-center gap-1 ${wound.isTreated ? 'bg-green-950/30 text-green-500 border border-green-900/50' : 'bg-red-900/30 text-red-400 border border-red-800/50'}`}>
                {wound.isTreated ? <><Bandage size={12}/> Tratado</> : <><AlertCircle size={12}/> Aberto</>}
              </span>
            </div>
            <div className="flex flex-col gap-1 text-xs text-gray-400 mt-1">
              <p><span className="font-bold text-gray-500">Primário:</span> {wound.primaryEffect}</p>
              <p><span className="font-bold text-gray-500">Secundário:</span> {wound.secondaryEffect}</p>
            </div>
          </li>
        ))}
        {character.health.wounds.length === 0 && <span className="text-sm text-gray-500 italic">Nenhum ferimento ativo.</span>}
      </ul>
    </div>

    <div className="bg-black/30 border border-gray-700/50 rounded-lg p-6 flex flex-col h-full">
      <div className="flex justify-between items-center border-b border-gray-600 pb-3 mb-4">
        <h2 className="text-lg font-bold uppercase tracking-widest text-orange-400 flex items-center gap-2"><Activity size={18} /> Condições</h2>
        <button className="text-gray-400 hover:text-white bg-black/40 p-1.5 rounded border border-gray-700 transition-colors"><Plus size={16} /></button>
      </div>
      <ul className="flex flex-col gap-3 overflow-y-auto pr-2 max-h-[500px]">
        {character.health.conditions.map((condition) => (
          <li key={condition.id} className="bg-orange-950/10 border border-orange-900/30 p-3 rounded-lg flex flex-col gap-1 shadow-sm">
            <div className="flex justify-between items-start w-full">
              <span className="font-bold text-sm text-orange-300 flex items-center gap-2">
                {condition.name}
                {condition.grade !== null ? (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/50 border border-orange-900/50 text-orange-400">G{condition.grade}</span>
                ) : (
                  <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded border border-gray-700 text-gray-400 bg-gray-900/50">Binária</span>
                )}
              </span>
              <button className="p-1 rounded text-gray-500 hover:text-red-400 hover:bg-black/50 transition-colors"><X size={14} /></button>
            </div>
            <span className="text-xs text-gray-400 leading-relaxed mt-1">{condition.effect}</span>
          </li>
        ))}
        {character.health.conditions.length === 0 && <span className="text-sm text-gray-500 italic">Nenhuma condição ativa.</span>}
      </ul>
    </div>

    <div className="bg-black/30 border border-gray-700/50 rounded-lg p-6 flex flex-col h-full">
      <div className="flex justify-between items-center border-b border-gray-600 pb-3 mb-4">
        <h2 className="text-lg font-bold uppercase tracking-widest text-purple-400 flex items-center gap-2"><Brain size={18} /> Traumas Residuais</h2>
        <button className="text-gray-400 hover:text-white bg-black/40 p-1.5 rounded border border-gray-700 transition-colors"><Plus size={16}/></button>
      </div>
      <ul className="flex flex-col gap-4 overflow-y-auto pr-2 max-h-[500px]">
        {character.health.traumas.map(trauma => (
          <li key={trauma.id} className={`p-4 rounded-lg border flex flex-col gap-2 shadow-sm ${trauma.isSuppressed ? 'bg-gray-900/30 border-gray-700/50' : 'bg-purple-950/10 border-purple-900/30'}`}>
            <div className="flex justify-between items-start">
              <span className={`font-bold text-sm ${trauma.isSuppressed ? 'text-gray-400' : 'text-purple-300'}`}>{trauma.name}</span>
              <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded border ${trauma.isSuppressed ? 'text-gray-500 border-gray-700 bg-gray-900/50' : TRAUMA_COLORS[trauma.type]}`}>{trauma.type}</span>
            </div>
            <div className="text-xs text-gray-400 leading-relaxed mt-1">{trauma.effect}</div>
            {trauma.isSuppressed && <div className="mt-2 text-[10px] font-bold text-indigo-400 bg-indigo-950/30 border border-indigo-900/50 px-2 py-1 rounded self-start uppercase tracking-widest">Suprimido (Terapia)</div>}
          </li>
        ))}
        {character.health.traumas.length === 0 && <span className="text-sm text-gray-500 italic">Mente intacta... por enquanto.</span>}
      </ul>
    </div>
  </div>
);

const LoreTab = ({ character }: { character: Character }) => (
  <div className="flex flex-col lg:flex-row gap-6">
    <div className="flex-1 bg-black/30 border border-gray-700/50 rounded-lg p-6 h-fit">
      <div className="flex justify-between items-center border-b border-gray-600 pb-3 mb-6">
        <h2 className="text-lg font-bold uppercase tracking-widest text-gray-300 flex items-center gap-2"><FileText size={18} /> Lore e Histórico</h2>
      </div>
      <div className="flex flex-col gap-6 text-gray-300 text-sm leading-relaxed">
        <div>
          <h3 className="font-bold text-gray-400 mb-2 uppercase tracking-widest text-xs border-l-2 border-gray-600 pl-2">Aparência</h3>
          <p className="pl-2">{character.lore.appearance}</p>
        </div>
        <div>
          <h3 className="font-bold text-gray-400 mb-2 uppercase tracking-widest text-xs border-l-2 border-gray-600 pl-2">Personalidade</h3>
          <p className="pl-2">{character.lore.personality}</p>
        </div>
        <div>
          <h3 className="font-bold text-gray-400 mb-2 uppercase tracking-widest text-xs border-l-2 border-gray-600 pl-2">Background</h3>
          <p className="pl-2 whitespace-pre-wrap">{character.lore.backstory}</p>
        </div>
      </div>
    </div>
    <div className="w-full lg:w-[45%] flex flex-col gap-6">
      <div className="bg-black/30 border border-gray-700/50 rounded-lg p-6">
        <div className="flex justify-between items-center border-b border-gray-600 pb-3 mb-6">
          <h2 className="text-lg font-bold uppercase tracking-widest text-gray-300 flex items-center gap-2"><Fingerprint size={18} /> Traços</h2>
          <button className="text-gray-400 hover:text-white bg-black/40 p-1.5 rounded border border-gray-700 transition-colors"><Plus size={16}/></button>
        </div>
        <ul className="flex flex-col gap-3">
          {character.traits.map(trait => (
            <li key={trait.id} className="bg-gray-900/40 border border-gray-700/50 p-4 rounded-lg flex flex-col gap-1 shadow-sm">
              <span className="font-bold text-gray-200 text-sm">{trait.name}</span>
              <span className="text-gray-400 text-xs leading-relaxed">{trait.description}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-black/30 border border-gray-700/50 rounded-lg p-6">
        <div className="flex justify-between items-center border-b border-gray-600 pb-3 mb-6">
          <h2 className="text-lg font-bold uppercase tracking-widest text-blue-400 flex items-center gap-2"><Landmark size={18} /> Vínculos & Organizações</h2>
          <button className="text-gray-400 hover:text-white bg-black/40 p-1.5 rounded border border-gray-700 transition-colors"><Plus size={16}/></button>
        </div>
        <ul className="flex flex-col gap-6">
          {character.bonds.map(bond => (
            <li key={bond.id} className="bg-blue-950/10 border border-blue-900/30 p-4 rounded-lg shadow-sm flex flex-col gap-3">
              <div className="flex flex-col border-b border-blue-900/30 pb-2">
                <span className="font-bold text-blue-300">{bond.faction}</span>
                <span className="text-[10px] text-blue-400/80 uppercase tracking-widest">{bond.status}</span>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">{bond.description}</p>
              <div className="grid grid-cols-1 gap-3 mt-2">
                <div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Benefícios Ativos</span>
                  <ul className="list-disc list-inside text-gray-300 text-xs flex flex-col gap-1">
                    {bond.benefits.map((benefit, idx) => <li key={idx}>{benefit}</li>)}
                  </ul>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Requisições & Cotas</span>
                  <ul className="list-disc list-inside text-gray-300 text-xs flex flex-col gap-1">
                    {bond.requisitions.map((req, idx) => <li key={idx}>{req}</li>)}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);


// ==========================================
// 4. COMPONENTE PRINCIPAL
// ==========================================
export default function CharacterSheet() {
  const [activeTab, setActiveTab] = useState<TabType>('atributos');
  const [drawerContent, setDrawerContent] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);
  
  const character = mockCharacter;

  return (
    <div className="bg-myst min-h-dvh w-full overflow-x-hidden bg-cover bg-center p-6 text-gray-200 font-sans relative">
      
      {/* Drawer */}
      {drawerContent && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setDrawerContent(null)} />
          <div className="relative w-[400px] h-full bg-card border-l border-gray-600/50 shadow-2xl p-6 flex flex-col transform transition-transform animate-in slide-in-from-right">
            <button onClick={() => setDrawerContent(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-red-400 mb-2 uppercase tracking-wider">{drawerContent}</h2>
            <div className="w-full h-px bg-red-900/50 mb-4" />
            <p className="text-gray-300 text-sm leading-relaxed">
              Descrição completa do status ou item...
            </p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* Cabeçalho */}
{/* Cabeçalho */}
        <div className="bg-card/60 backdrop-blur-md border border-gray-600/40 rounded-xl p-4 shadow-xl flex flex-col gap-4">
         <div className="flex items-center w-full">
            
            {/* Identidade (40% com borda na direita) */}
            <div className="flex items-center gap-4 w-[40%] border-r border-gray-600/40 pr-6">
              <Link to="/characters" className="text-gray-400 hover:text-white transition-colors">
                <ArrowLeft size={24} />
              </Link>
              <div className="w-16 h-16 bg-gray-900 rounded-md border border-gray-600 overflow-hidden flex-shrink-0 flex items-center justify-center">
                {character.imgUrl && !imgError ? (
                  <img src={character.imgUrl} alt="Retrato" className="w-full h-full object-cover" onError={() => setImgError(true)} />
                ) : (
                  <User size={28} className="text-gray-500" />
                )}
              </div>
              <div className="flex flex-col w-full">
                <h1 className="text-2xl font-bold text-gray-100 uppercase tracking-widest leading-none truncate">{character.name}</h1>
                <div className="flex justify-between text-secundary-txt text-xs mt-1">
                  <span>Origem: {character.origin}</span>
                  <span>Ofício: {character.vocation}</span>
                </div>
                <div className="flex justify-between text-gray-400 text-xs mt-1">
                  <span>Honra: {character.honor}</span>
                  <span>Postura: {character.posture}</span>
                </div>
              </div>
            </div>

            {/* Emblema Central (Dinâmico: Sequência ou Mundano) */}
            <div className="w-[20%] flex justify-center flex-shrink-0">
              {character.sequence ? (
                <div className="flex flex-col items-center justify-center border border-purple-900/50 bg-purple-950/20 px-6 py-2 rounded-lg shadow-[0_0_15px_rgba(147,51,234,0.1)] whitespace-nowrap">
                  <span className="text-[10px] uppercase tracking-widest text-purple-400">Sequência</span>
                  <span className="text-xl font-bold text-gray-100 font-serif">
                    {character.sequence.grade} - {character.sequence.name}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center border border-stone-600/50 bg-stone-900/40 px-6 py-2 rounded-lg shadow-inner whitespace-nowrap">
                  <span className="text-[10px] uppercase tracking-widest text-stone-500">
                    Cidadão de Loen
                  </span>
                  <span className="text-lg font-bold text-stone-300 font-serif">
                    {character.vocation}
                  </span>
                </div>
              )}
            </div>

            {/* Barras de Vitals (40% com borda na esquerda para espelhar) */}
            <div className="flex gap-4 w-[40%] justify-end border-l border-gray-600/40 pl-6">
              <div className="w-24 text-right">
                <div className="flex justify-between text-[10px] font-bold text-red-400 mb-1">
                  <span>HP</span>
                  <span>{character.vitals.hp.current}/{character.vitals.hp.max}</span>
                </div>
                <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
                  <div className="h-full bg-red-600" style={{ width: `${(character.vitals.hp.current / character.vitals.hp.max) * 100}%` }} />
                </div>
                <div className="text-[9px] text-gray-500 mt-1">Rec: {character.vitals.hp.rec}</div>
              </div>

              <div className="w-24 text-right">
                <div className="flex justify-between text-[10px] font-bold text-teal-400 mb-1">
                  <span>PDC</span>
                  <span>{character.vitals.pdc.current}/{character.vitals.pdc.max}</span>
                </div>
                <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500" style={{ width: `${(character.vitals.pdc.current / character.vitals.pdc.max) * 100}%` }} />
                </div>
                <div className="text-[9px] text-gray-500 mt-1">Rec: {character.vitals.pdc.rec}</div>
              </div>

              <div className="w-24 text-right">
                <div className="flex justify-between text-[10px] font-bold text-purple-400 mb-1">
                  <span>ES</span>
                  <span>{character.vitals.es.current}/{character.vitals.es.max}</span>
                </div>
                <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500" style={{ width: `${(character.vitals.es.current / character.vitals.es.max) * 100}%` }} />
                </div>
                <div className="text-[9px] text-gray-500 mt-1">Rec: {character.vitals.es.rec}</div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gray-600/40" />

          {/* Atributos e Defesas */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {character.coreAttributes.map((attr) => (
                <div key={attr.name} className="flex flex-col items-center justify-center bg-black/40 border border-gray-700 rounded px-3 py-1">
                  <span className="text-[9px] text-gray-400">{attr.name}</span>
                  <span className="text-sm font-bold text-gray-200">{attr.dice}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 border-r border-gray-600/40 pr-6">
                <div className="flex items-center gap-1 text-xs">
                  <Wind size={14} className="text-gray-400" /> Desl: <span className="font-bold">{character.defenses.displacement}</span>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <Shield size={14} className="text-gray-400" /> Guarda: <span className="font-bold">{character.defenses.guard}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-orange-400">
                  <Skull size={14} /> LT: <span className="font-bold">{character.defenses.traumaThreshold}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                {character.activeStatus.map((status) => (
                  <button 
                    key={status.id} 
                    onClick={() => setDrawerContent(status.name)} 
                    className="flex items-center gap-1 bg-red-950/40 border border-red-900/50 text-red-400 px-2 py-1 rounded text-[10px] uppercase font-bold hover:bg-red-900/60 transition-colors"
                  >
                    {status.type === 'ferimento' && <AlertCircle size={14}/>} 
                    {status.name} [G{status.grade}]
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Abas */}
        <div className="flex gap-2 border-b border-gray-600/50 pb-px">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-bold uppercase tracking-wider rounded-t-lg transition-colors ${
                activeTab === tab.id 
                  ? 'bg-card/60 text-primary-txt border-t border-l border-r border-gray-500/50' 
                  : 'bg-black/20 text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Painel de Conteúdo de Abas Isoladas */}
        <div className="bg-card/60 backdrop-blur-md border border-gray-600/40 rounded-b-xl rounded-tr-xl p-6 shadow-xl min-h-[50vh]">
          {activeTab === 'atributos' && <AttributesTab character={character} />}
          {activeTab === 'acao' && <ActionTab character={character} />}
          {activeTab === 'inventario' && <InventoryTab character={character} onOpenDrawer={setDrawerContent} />}
          {activeTab === 'saude' && <HealthTab character={character} />}
          {activeTab === 'lore' && <LoreTab character={character} />}
        </div>

      </div>
    </div>
  );
}