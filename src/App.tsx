/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ReactNode } from 'react';
import { 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Utensils, 
  Info, 
  Heart,
  Camera,
  MessageCircle,
  Phone,
  Droplets,
  PawPrint,
  X,
  Wind
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface Meal {
  time: string;
  type: string;
  title: string;
  isEssential: boolean;
  bowl: 'Purple Bowl' | 'Green Bowl' | 'Main Bowl';
  recipe: string;
  image: string;
  notes?: string;
}

// --- Data ---
const CAT_CARE = {
  name: 'Maske',
  breed: 'Tuxedo / European Short Hair',
  meals: [
    {
      time: '08:00 - 09:00',
      type: 'Essential',
      title: 'Morning Wet Food',
      isEssential: true,
      bowl: 'Main Bowl',
      recipe: '1/2 pack Lucky Lou + Sprinkle of Dry Freeze + 1 spoon Salmon Oil.',
      // Photo of Lucky Lou Wet Food
      image: 'lucky-lou-wet.png', 
      notes: 'If he leaves any, bag it and put in the fridge immediately.'
    },
    {
      time: '13:00',
      type: 'Optional',
      title: 'Hydration Fix (Milk)',
      isEssential: false,
      bowl: 'Purple Bowl',
      recipe: '1/2 pack of Hydration Helper milk. Only if he is awake.',
      // Photo of Almo Nature Milk
      image: 'almo-nature-milk.png'
    },
    {
      time: '15:00 - 17:00',
      type: 'Optional',
      title: 'Chicken Appetizer',
      isEssential: false,
      bowl: 'Green Bowl',
      recipe: '1/2 pack of Lilo\'s Chicken Filet meat. Serve when he wakes up from his afternoon nap.',
      // Photo of Lucky Lou Chicken Filet
      image: 'lucky-lou-chicken.png'
    },
    {
      time: '19:00',
      type: 'Essential',
      title: 'Evening Dry Food',
      isEssential: true,
      bowl: 'Main Bowl',
      recipe: '1/2 cup of Dry Food (The blue scoop is inside the pack).',
      // Photo of food cabinet/stash
      image: 'food-cabinet.png',
      notes: 'You can add morning leftovers on top if there are any.'
    }
  ] as Meal[],
  reheatInstructions: [
    { 
      condition: 'From Fridge', 
      action: 'Add 2 spoons of boiling water and mash it up well.' 
    },
    { 
      condition: 'Day Leftovers', 
      action: 'Add 1 spoon of hot water to refresh the texture.' 
    }
  ],
  checkpoints: [
    { icon: <Wind size={18} />, text: 'Open top windows for fresh air while you are there.' },
    { icon: <Utensils size={18} />, text: 'Cleaning gear is in a green mug/bowl next to the kitchen sink.' },
    { icon: <CheckCircle2 size={18} />, text: 'Check if water fountains are flowing correctly.' },
    { icon: <Droplets size={18} />, text: 'Always mash wet food thoroughly; never mix wet and dry in the same pile!' }
  ]
};

// --- Components ---

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean, onClose: () => void, children: ReactNode }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl overflow-hidden"
        >
          <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
          {children}
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

export default function App() {
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-32">
      {/* Header */}
      <nav className="bg-white shadow-sm sticky top-0 z-40 px-6 py-4">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-600">
             <Heart size={20} className="fill-indigo-600" />
             <h1 className="text-lg font-black tracking-tight text-gray-900 uppercase italic">Maske Care</h1>
          </div>
          <div className="flex gap-2">
             <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
                <PawPrint size={16} className="text-indigo-600" />
             </div>
          </div>
        </div>
      </nav>

      <main className="max-w-xl mx-auto px-4 mt-6">
        {/* Profile Card */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-200 mb-8 flex items-center gap-6">
          <div className="relative">
             <img 
                src="maske-main.png" 
                alt="Maske the Cat" 
                className="w-24 h-24 rounded-full border-4 border-indigo-50 object-cover shadow-inner bg-gray-100"
             />
             <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                <CheckCircle2 size={12} className="text-white" />
             </div>
          </div>
          <div>
              <h2 className="text-2xl font-black text-gray-900 leading-tight">Maske</h2>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{CAT_CARE.breed}</p>
              <div className="flex gap-2 mt-2">
                <span className="text-[10px] font-black bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full border border-indigo-100">HOME VISITOR APP</span>
              </div>
          </div>
        </div>

        {/* Calendar Highlighting */}
        <section className="mb-10">
           <div className="bg-indigo-600 p-6 rounded-[2.5rem] text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 opacity-5 rotate-12">
                 <PawPrint size={120} />
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest opacity-70 mb-2">Visiting Window</h3>
              <p className="text-2xl font-black mb-4">May 17 – 20, 2026</p>
              <div className="flex gap-2">
                {[15, 16, 17, 18, 19, 20, 21].map((d) => (
                  <div key={d} className={`flex flex-col items-center justify-center w-10 h-10 rounded-xl text-[10px] font-black ${[17, 18, 19, 20].includes(d) ? 'bg-rose-500 text-white shadow-lg' : 'bg-white/10 text-white/50'}`}>
                    <span>{d}</span>
                    <span className="uppercase text-[6px]">MAY</span>
                  </div>
                ))}
              </div>
           </div>
        </section>

        {/* Meal Pipeline */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6 px-2">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
              <Clock size={14} />
              Feeding Routine
            </h3>
          </div>

          <div className="space-y-4">
            {CAT_CARE.meals.map((meal, idx) => (
              <div key={idx} className="relative pl-12 group">
                {/* Timeline connector */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 -z-10 group-last:h-4" />
                <div className={`absolute left-4 top-2 w-4 h-4 rounded-full border-2 border-white shadow-sm z-10 ${meal.isEssential ? 'bg-indigo-600' : 'bg-gray-300'}`} />
                
                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-200 relative overflow-hidden">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs font-black text-indigo-600 tracking-wider">{meal.time}</span>
                    <div className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${meal.isEssential ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                      {meal.type.toUpperCase()}
                    </div>
                  </div>
                  
                  <h4 className="font-black text-gray-900 text-lg leading-tight mb-2">{meal.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{meal.recipe}</p>

                  <div className="flex flex-wrap gap-2">
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black border ${
                      meal.bowl === 'Purple Bowl' ? 'bg-purple-100 text-purple-700 border-purple-200' : 
                      meal.bowl === 'Green Bowl' ? 'bg-green-100 text-green-700 border-green-200' : 
                      'bg-gray-50 text-gray-700 border-gray-200'
                    }`}>
                      <Utensils size={12} />
                      {meal.bowl}
                    </div>
                    <button 
                      onClick={() => setSelectedMeal(meal)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white rounded-xl text-[10px] font-black shadow-md shadow-gray-200 hover:bg-black transition-colors"
                    >
                      <Camera size={12} />
                      VIEW PACKAGING
                    </button>
                  </div>

                  {meal.notes && (
                    <div className="mt-4 p-3 bg-amber-50 rounded-2xl border border-amber-100 flex gap-2">
                       <Info size={14} className="text-amber-500 shrink-0" />
                       <p className="text-[11px] text-amber-800 font-medium italic leading-tight">{meal.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* House Map (Real Photo) */}
        <section className="mb-10">
           <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-6 px-2 flex items-center gap-2">
              <MapPin size={14} />
              The House Map & Stash
           </h3>
           <div className="bg-white rounded-[2.5rem] border border-gray-200 shadow-sm overflow-hidden">
              <img 
                src="house-layout.jpeg" 
                alt="House Map" 
                className="w-full h-auto"
              />
              <div className="p-6">
                <div className="grid grid-cols-2 gap-3 mb-6">
                   <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-500">
                      <div className="w-3 h-3 rounded-full bg-[#59ba98]" /> Feeding Area
                   </div>
                   <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-500">
                      <div className="w-3 h-3 rounded-full bg-[#031b2b]" /> Water Fountains
                   </div>
                   <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-500">
                      <div className="w-3 h-3 rounded-full bg-[#e74c3c]" /> Kitchen Stash
                   </div>
                   <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-500">
                      <div className="w-3 h-3 rounded-full bg-[#f1c40f]" /> Fav Toys
                   </div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  <p className="text-xs text-gray-600 font-medium italic leading-relaxed">
                    Check the "Kitchen Stash" (Red dot) for all the Lucky Lou packs and freeze-dried treats (Lamb Lung/Raw).
                  </p>
                </div>
              </div>
           </div>
        </section>

        {/* Critical Instructions (Real Photo of Sink) */}
        <section className="mb-10">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-6 px-2 flex items-center gap-2">
            <Droplets size={14} />
            Daily Chores & Cleaning
          </h3>
          <div className="bg-white p-6 rounded-[2.5rem] border border-gray-200 shadow-sm">
            <div className="mb-6 rounded-[1.5rem] overflow-hidden border border-gray-100">
               <img src="cleaning-stash.png" alt="Cleaning Stash" className="w-full h-48 object-cover" />
               <div className="p-3 bg-gray-50 text-[10px] font-black text-center text-gray-400">KITCHEN CLEANING GEAR</div>
            </div>

            <div className="space-y-4">
              {CAT_CARE.checkpoints.map((cp, i) => (
                <div key={i} className="flex gap-4 items-center bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100/50">
                  <div className="text-indigo-600 shrink-0">{cp.icon}</div>
                  <p className="text-xs text-indigo-900 font-bold leading-relaxed">{cp.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100">
               <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-4">Reheating Guide</span>
               <div className="grid grid-cols-1 gap-3">
                  {CAT_CARE.reheatInstructions.map((rule, idx) => (
                    <div key={idx} className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center shrink-0">
                        <Droplets className="text-white" size={20} />
                      </div>
                      <div>
                        <h5 className="font-black text-amber-900 text-[10px] uppercase mb-0.5">{rule.condition}</h5>
                        <p className="text-xs text-amber-800 font-bold leading-tight">{rule.action}</p>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </section>
      </main>

      {/* Food Modal */}
      <Modal isOpen={!!selectedMeal} onClose={() => setSelectedMeal(null)}>
        {selectedMeal && (
          <div className="space-y-6">
            <div className="relative rounded-3xl overflow-hidden shadow-lg border-2 border-indigo-50">
              <img 
                src={selectedMeal.image} 
                alt={selectedMeal.title} 
                className="w-full h-72 object-cover"
              />
            </div>
            
            <div>
              <h3 className="text-xl font-black text-gray-900 mb-1">{selectedMeal.title}</h3>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{selectedMeal.type}</p>
            </div>

            <div className="bg-indigo-50 p-5 rounded-3xl border border-indigo-100">
              <h5 className="text-[10px] font-black text-indigo-600 uppercase mb-2 tracking-[0.2em] flex items-center gap-2">
                <Utensils size={12} />
                Serving Tip
              </h5>
              <p className="text-sm text-indigo-900 font-bold leading-relaxed">
                {selectedMeal.recipe}
              </p>
            </div>

            <button 
              onClick={() => setSelectedMeal(null)}
              className="w-full py-5 bg-gray-900 text-white rounded-[1.5rem] font-black uppercase text-xs tracking-widest hover:bg-black transition-all shadow-xl shadow-gray-200 active:scale-95"
            >
              OK, GOT IT!
            </button>
          </div>
        )}
      </Modal>

      {/* Floating Bottom Contact */}
      <div className="fixed bottom-0 left-0 right-0 p-4 z-40 bg-gradient-to-t from-gray-50/90 to-transparent">
        <div className="max-w-xl mx-auto bg-white border border-gray-200 shadow-2xl rounded-[2rem] p-4 flex items-center justify-between">
           <div className="flex items-center gap-4 px-2">
              <div className="flex -space-x-3">
                 <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover" src="maske-face.png" alt="Maske" />
                 <div className="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-indigo-500 flex items-center justify-center text-white text-[10px] font-black">HOST</div>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Emergency Line</p>
                <p className="text-xs font-black text-gray-900 tracking-tight">+41 78 258 93 23</p>
              </div>
           </div>
           <div className="flex gap-2">
              <a href="tel:+41782589323" className="bg-gray-900 text-white w-12 h-12 rounded-2xl shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
                <Phone size={22} />
              </a>
              <a href="https://signal.me/#p/+41782589323" className="bg-[#3A76F0] text-white w-12 h-12 rounded-2xl shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
                <MessageCircle size={22} />
              </a>
           </div>
        </div>
      </div>
    </div>
  );
}
