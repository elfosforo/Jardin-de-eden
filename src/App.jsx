import React, { useState, useEffect } from 'react';
import { 
  Leaf, Plus, Home, BookOpen, Droplets, 
  FlaskConical, Activity, Calendar as CalendarIcon, ArrowLeft, Ruler, 
  Trash2, ChevronRight, X, Sparkles, Scissors, Sun, Moon, AlertTriangle, Info, BookMarked, Search, Pencil, Settings, QrCode
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { wikiCategories, wikiArticles } from './data/wikiData';


// --- UTILIDADES ---
const calculateDays = (startDate) => {
  const start = new Date(startDate);
  const now = new Date();
  const diffTime = Math.abs(now - start);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const getCycleEstimate = (type) => {
  return type === 'Autofloreciente' ? 85 : 140; 
};

const getHarvestDate = (startDate, estCycle) => {
  const start = new Date(startDate);
  start.setDate(start.getDate() + estCycle);
  return start;
};

const getStageFromDays = (days, type) => {
  if (type === 'Autofloreciente') {
    if (days <= 7) return 'Germinación';
    if (days <= 30) return 'Vegetativo';
    if (days <= 70) return 'Floración';
    if (days <= 80) return 'Lavado';
    return 'Cosecha';
  } else {
    if (days <= 7) return 'Germinación';
    if (days <= 40) return 'Vegetativo';
    if (days <= 110) return 'Floración';
    if (days <= 130) return 'Lavado';
    return 'Cosecha';
  }
};

// --- BASE DE CONOCIMIENTOS (WIKI) importada de ./data/wikiData.js ---

// --- DATOS DE EJEMPLO INICIALES ---
const initialPlants = [
  {
    id: '1',
    name: 'OG KUSH #1',
    strain: 'OG Kush',
    type: 'Autofloreciente',
    startDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    logs: [
      { id: 'l1', date: new Date().toISOString(), type: 'Riego', note: 'Riego con 1L de agua', metrics: { ph: 6.2, ec: 0.8 } },
      { id: 'l2', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), type: 'Nutrientes', note: 'Añadido BioBloom', metrics: { ph: 6.4, ec: 1.5 } }
    ]
  },
  {
    id: '2',
    name: 'SOUR DIESEL',
    strain: 'Sour Diesel',
    type: 'Feminizada',
    startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    logs: []
  }
];

export default function App() {
  const [plants, setPlants] = useState(() => {
    const saved = localStorage.getItem('jardin_plants');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error('Error parsing saved plants', e); }
    }
    return initialPlants;
  });
  const [currentView, setCurrentView] = useState('home'); // home, add, detail, calendar, help
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('jardin_theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('jardin_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('jardin_theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('jardin_plants', JSON.stringify(plants));
  }, [plants]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // --- VISTAS ---
  const goHome = () => {
    setCurrentView('home');
    setSelectedPlant(null);
  };
  const goToAdd = () => setCurrentView('add');
  const goToCalendar = () => setCurrentView('calendar');
  const goToHelp = () => setCurrentView('help');
  const goToSettings = () => setCurrentView('settings');
  const goToDetail = (plant) => {
    setSelectedPlant(plant);
    setCurrentView('detail');
  };

  // --- ACCIONES ---
  const addPlant = (newPlant) => {
    setPlants([...plants, { ...newPlant, id: Date.now().toString(), logs: [] }]);
    goHome();
  };
  const updatePlant = (updatedPlant) => {
    setPlants(plants.map(p => p.id === updatedPlant.id ? { ...p, ...updatedPlant } : p));
    goHome();
  };
  const goToEdit = () => {
    setCurrentView('edit');
  };
  const deletePlant = (id) => {
    if(window.confirm("¿Estás seguro de eliminar esta planta? Se perderá todo su seguimiento.")) {
      setPlants(plants.filter(p => p.id !== id));
      goHome();
    }
  };
  const addLog = (plantId, newLog) => {
    setPlants(plants.map(p => {
      if (p.id === plantId) {
        return { ...p, logs: [{ ...newLog, id: Date.now().toString(), date: new Date().toISOString() }, ...p.logs] };
      }
      return p;
    }));
  };

  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  return (
    <div className="bg-bg-base text-text-primary min-h-screen font-sans pb-20 flex justify-center selection:bg-accent/30 transition-colors">
      <div className="w-full max-w-md bg-bg-base min-h-screen relative shadow-2xl overflow-x-hidden border-x-[3px] border-border transition-colors">
        
        {/* ENRUTADOR SIMPLE */}
        {currentView === 'home' && (
          <Dashboard 
            plants={plants} 
            onAddPlant={goToAdd} 
            onSelectPlant={goToDetail} 
            isDarkMode={isDarkMode} 
            toggleTheme={toggleTheme} 
            onGoToArchive={() => setCurrentView('archive')}
          />
        )}
        {currentView === 'add' && (
          <AddPlantForm onCancel={goHome} onSave={addPlant} showToast={showToast} />
        )}
        {currentView === 'detail' && selectedPlant && (
          <PlantDetail 
            plant={plants.find(p => p.id === selectedPlant.id) || selectedPlant} 
            onBack={goHome} 
            onAddLog={addLog}
            onDelete={deletePlant}
            onEdit={goToEdit}
            onUpdatePlant={updatePlant}
            showToast={showToast}
          />
        )}
        {currentView === 'edit' && selectedPlant && (
          <AddPlantForm 
            onCancel={() => setCurrentView('detail')} 
            onSave={(updatedData) => updatePlant({ ...selectedPlant, ...updatedData })} 
            initialData={plants.find(p => p.id === selectedPlant.id) || selectedPlant} 
            showToast={showToast}
          />
        )}
        {currentView === 'calendar' && (
          <CalendarView plants={plants} onBack={goHome} onSelectPlant={goToDetail} />
        )}
        {currentView === 'help' && (
          <HelpWikiView onBack={goHome} />
        )}
        {currentView === 'settings' && (
          <SettingsView onBack={goHome} isDarkMode={isDarkMode} toggleTheme={toggleTheme} plants={plants} setPlants={setPlants} showToast={showToast} />
        )}
        {currentView === 'archive' && (
          <ArchiveView plants={plants.filter(p => p.status === 'harvested')} onBack={goHome} onSelectPlant={goToDetail} />
        )}

        {/* NAVEGACIÓN INFERIOR STREETWEAR */}
        {['home', 'calendar', 'help', 'settings'].includes(currentView) && (
          <div className="fixed bottom-0 w-full max-w-md bg-bg-surface border-t-[3px] border-border grid grid-cols-5 items-center p-2 pb-6 z-40 transition-colors">
            <button 
              onClick={goHome} 
              className={`flex flex-col items-center transition-transform active:scale-90 ${currentView === 'home' ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'}`}
            >
              <Home size={24} strokeWidth={currentView === 'home' ? 3 : 2} />
              <span className="font-impact text-sm mt-1">PANEL</span>
            </button>
            
            <button 
              onClick={goToCalendar} 
              className={`flex flex-col items-center transition-transform active:scale-90 ${currentView === 'calendar' ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'}`}
            >
              <CalendarIcon size={24} strokeWidth={currentView === 'calendar' ? 3 : 2} />
              <span className="font-impact text-sm mt-1">DIARIO</span>
            </button>
            
            {/* FAB button in grid space */}
            <div className="flex justify-center -mt-10 relative z-10">
              <button 
                onClick={goToAdd} 
                className="brutalist-button bg-accent text-accent-text flex items-center justify-center rounded-full"
                style={{ width: '64px', height: '64px', borderRadius: '50%' }}
              >
                <Plus size={28} strokeWidth={3} />
              </button>
            </div>

            <button 
              onClick={goToHelp} 
              className={`flex flex-col items-center transition-transform active:scale-90 ${currentView === 'help' ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'}`}
            >
              <BookMarked size={24} strokeWidth={currentView === 'help' ? 3 : 2} />
              <span className="font-impact text-sm mt-1">MANUAL</span>
            </button>
            
            <button 
              onClick={goToSettings} 
              className={`flex flex-col items-center transition-transform active:scale-90 ${currentView === 'settings' ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'}`}
            >
              <Settings size={24} strokeWidth={currentView === 'settings' ? 3 : 2} />
              <span className="font-impact text-sm mt-1">AJUSTES</span>
            </button>
          </div>
        )}

        {/* TOAST GLOBAL */}
        {toast.show && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
            <div className={`px-4 py-3 border-[3px] border-border shadow-[4px_4px_0px_0px_var(--color-border)] font-impact text-sm tracking-wider flex items-center gap-2 ${toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-accent text-accent-text'}`}>
              {toast.type === 'error' ? <AlertTriangle size={18} /> : <Sparkles size={18} />}
              {toast.message}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- COMPONENTE: AJUSTES ---
function SettingsView({ onBack, isDarkMode, toggleTheme, plants, setPlants, showToast }) {
  const handleExportData = () => {
    const dataStr = JSON.stringify(plants, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `jardin_de_eden_backup_${new Date().toISOString().split('T')[0]}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleDeleteAll = () => {
    if (window.confirm("¡CUIDADO! ¿Estás absolutamente seguro de que quieres borrar TODOS los datos? Esta acción no se puede deshacer.")) {
      setPlants([]);
      localStorage.removeItem('jardin_plants');
      showToast("DATOS BORRADOS CORRECTAMENTE");
    }
  };

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        if (Array.isArray(importedData)) {
          setPlants(importedData);
          showToast("BACKUP IMPORTADO CON ÉXITO");
        } else {
          showToast("FORMATO DE ARCHIVO INCORRECTO", 'error');
        }
      } catch (error) {
        showToast("ERROR AL LEER EL ARCHIVO JSON", 'error');
      }
    };
    reader.readAsText(file);
    // Reset input
    event.target.value = null;
  };

  return (
    <div className="min-h-screen bg-bg-base flex flex-col animate-in fade-in duration-300 pb-24">
      <header className="p-5 sticky top-0 z-20 bg-bg-surface border-b-[3px] border-border flex items-center">
        <h2 className="text-3xl font-impact text-text-primary pt-1">AJUSTES</h2>
      </header>
      
      <div className="p-5 space-y-6">
        <div className="brutalist-card bg-bg-surface p-5">
          <h3 className="font-impact text-xl text-text-primary mb-4 border-b-2 border-border pb-2">APARIENCIA</h3>
          
          <div className="flex justify-between items-center">
            <span className="font-bold text-text-secondary">TEMA OSCURO</span>
            <button 
              onClick={toggleTheme}
              className={`w-14 h-8 border-[3px] border-border flex items-center p-1 transition-colors ${isDarkMode ? 'bg-accent' : 'bg-bg-base'}`}
            >
              <div className={`w-5 h-5 border-[3px] border-border bg-text-primary transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </button>
          </div>
        </div>

        <div className="brutalist-card bg-bg-surface p-5">
          <h3 className="font-impact text-xl text-text-primary mb-4 border-b-2 border-border pb-2">SISTEMA</h3>
          
          <div className="space-y-4">
            <button onClick={handleExportData} className="w-full brutalist-button bg-bg-base text-text-primary py-3 font-impact text-lg">
              EXPORTAR DATOS
            </button>
            <label className="w-full brutalist-button bg-bg-base text-text-primary py-3 font-impact text-lg text-center block cursor-pointer">
              IMPORTAR BACKUP
              <input type="file" accept=".json" onChange={handleImportData} className="hidden" />
            </label>
            <button onClick={handleDeleteAll} className="w-full brutalist-button bg-red-500 text-white py-3 font-impact text-lg mt-4">
              BORRAR TODO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- COMPONENTE: MANUAL DEL BARRIO (FEED + CATEGORÍAS) ---
function HelpWikiView({ onBack }) {
  const [activeCategory, setActiveCategory] = useState('TODO');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = wikiArticles.filter(a => {
    const matchesCategory = activeCategory === 'TODO' || a.category === activeCategory;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = searchQuery === '' || 
      a.title.toLowerCase().includes(searchLower) || 
      a.snippet.toLowerCase().includes(searchLower) || 
      a.content.toLowerCase().includes(searchLower);
    return matchesCategory && matchesSearch;
  });

  if (selectedArticle) {
    const Icon = selectedArticle.icon;
    return (
      <div className="min-h-screen bg-bg-base flex flex-col animate-in slide-in-from-right-8 duration-300 pb-24">
        <header className="flex items-center p-5 sticky top-0 z-20 bg-bg-surface border-b-[3px] border-border">
          <button onClick={() => setSelectedArticle(null)} className="p-2 -ml-2 text-text-primary mr-2 active:scale-90 transition-transform">
            <ArrowLeft size={28} strokeWidth={3} />
          </button>
          <h2 className="text-3xl font-impact text-text-primary pt-1">ARCHIVO</h2>
        </header>

        <div className="p-5">
          <div className="brutalist-card bg-bg-surface p-5 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-accent p-3 border-2 border-border shadow-[2px_2px_0px_0px_var(--color-border)] text-accent-text">
                <Icon size={32} strokeWidth={2.5} />
              </div>
              <span className="px-3 py-1 bg-bg-base border-2 border-border font-impact text-text-secondary text-xs shadow-[2px_2px_0px_0px_var(--color-border)]">
                {selectedArticle.category}
              </span>
            </div>
            <h1 className="text-3xl font-impact text-text-primary uppercase leading-none mb-4">
              {selectedArticle.title}
            </h1>
            <div className="space-y-4 text-text-primary font-bold leading-relaxed whitespace-pre-line">
              {selectedArticle.content}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-base flex flex-col animate-in fade-in duration-300 pb-24">
      <header className="p-5 sticky top-0 z-20 bg-bg-surface border-b-[3px] border-border flex justify-between items-center">
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="w-10 h-10 mr-3" />
          <h2 className="text-3xl font-impact text-text-primary pt-1">EL MANUAL</h2>
        </div>
      </header>

      {/* Categorías deslizables y Buscador */}
      <div className="bg-bg-surface border-b-[3px] border-border sticky top-[80px] z-10 pt-4 pb-4">
        <div className="px-5 mb-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder="BUSCAR CASO, PLAGA, TIPS..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="brutalist-input bg-bg-base text-text-primary w-full p-3 pl-10 font-bold uppercase placeholder:text-text-secondary shadow-none"
            />
            <Search size={20} strokeWidth={3} className="absolute left-3 top-3 text-text-secondary" />
          </div>
        </div>
        <div className="flex space-x-3 overflow-x-auto px-5 scrollbar-hide pb-2">
          {wikiCategories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 font-impact text-lg transition-all border-[3px] border-border shadow-[2px_2px_0px_0px_var(--color-border)] ${
                activeCategory === cat 
                  ? 'bg-text-primary text-bg-base' 
                  : 'bg-bg-base text-text-secondary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Feed de Artículos */}
      <div className="p-5 space-y-5">
        {filteredArticles.map(article => {
          const Icon = article.icon;
          return (
            <div 
              key={article.id} 
              onClick={() => setSelectedArticle(article)}
              className="brutalist-card bg-bg-surface p-0 cursor-pointer overflow-hidden group flex flex-col"
            >
              <div className="p-4 border-b-2 border-border bg-bg-base flex justify-between items-center">
                <span className="font-impact text-xs text-text-secondary tracking-widest">{article.category}</span>
                <Icon size={16} className="text-text-primary" />
              </div>
              <div className="p-5">
                <h3 className="text-2xl font-impact text-text-primary uppercase leading-tight mb-2 group-hover:text-accent transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-text-secondary font-bold line-clamp-2 mb-4">
                  {article.snippet}
                </p>
                <div className="flex items-center text-xs font-impact text-accent tracking-widest">
                  LEER CASO <ChevronRight size={14} className="ml-1" strokeWidth={3} />
                </div>
              </div>
            </div>
          );
        })}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12 brutalist-card bg-bg-surface border-dashed">
            <Info size={40} className="mx-auto text-text-secondary mb-4" />
            <p className="text-text-primary font-impact text-xl">NO HAY ARTÍCULOS</p>
          </div>
        )}
      </div>
    </div>
  );
}

// --- COMPONENTE: PANEL PRINCIPAL (DASHBOARD) ---
function Dashboard({ plants, onAddPlant, onSelectPlant, isDarkMode, toggleTheme, onGoToArchive }) {
  const activePlantsArray = plants.filter(p => p.status !== 'harvested');
  const activePlants = activePlantsArray.length;

  const alerts = [];
  activePlantsArray.forEach(p => {
    const days = calculateDays(p.startDate);
    const estCycle = p.estCycle || getCycleEstimate(p.type);
    if (days >= estCycle) {
      alerts.push({ id: p.id, type: 'harvest', text: `¡${p.name} lista para cosechar!`, plant: p });
    }
    const lastLog = p.logs[0];
    if (lastLog) {
      const daysSinceLog = calculateDays(lastLog.date);
      if (daysSinceLog >= 5) {
        alerts.push({ id: `${p.id}-log`, type: 'warning', text: `${p.name} lleva ${daysSinceLog} días sin registros.`, plant: p });
      }
    } else if (days > 3) {
      alerts.push({ id: `${p.id}-nolog`, type: 'warning', text: `${p.name} no tiene ningún registro aún.`, plant: p });
    }
  });

  return (
    <div className="p-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <header className="flex justify-between items-center mb-6 pt-4">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Jardín de Edén" className="w-14 h-14" />
          <div>
            <h1 className="text-3xl font-impact text-text-primary leading-none">JARDÍN DE EDÉN</h1>
            <p className="text-accent text-sm font-bold tracking-widest uppercase">Seguimiento</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={toggleTheme} className="brutalist-card bg-bg-surface p-2 text-text-primary cursor-pointer active:scale-95">
            {isDarkMode ? <Sun size={20} strokeWidth={2.5} /> : <Moon size={20} strokeWidth={2.5} />}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="brutalist-card p-4 flex flex-col items-start bg-accent">
          <div className="bg-bg-surface border-2 border-border p-2 rounded-xl text-text-primary mb-2 shadow-[2px_2px_0px_0px_var(--color-border)]">
            <Leaf size={24} strokeWidth={2.5} />
          </div>
          <p className="text-4xl font-impact text-accent-text leading-none mt-1">{activePlants}</p>
          <p className="text-sm text-accent-text font-bold uppercase">Plantas Activas</p>
        </div>
        
        <div className="brutalist-card p-4 flex flex-col items-start bg-bg-surface">
          <div className="bg-accent border-2 border-border p-2 rounded-xl text-accent-text mb-2 shadow-[2px_2px_0px_0px_var(--color-border)]">
            <Activity size={24} strokeWidth={2.5} />
          </div>
          <p className="text-4xl font-impact text-text-primary leading-none mt-1">
            {activePlantsArray.reduce((acc, p) => acc + p.logs.length, 0)}
          </p>
          <p className="text-sm text-text-secondary font-bold uppercase">Registros</p>
        </div>
      </div>

      {alerts.length > 0 && (
        <div className="mb-8 space-y-3">
          <h2 className="text-sm font-impact text-text-secondary tracking-widest">ALERTAS DEL CULTIVO</h2>
          {alerts.map(alert => (
            <div key={alert.id} onClick={() => onSelectPlant(alert.plant)} className={`brutalist-card p-3 flex items-center gap-3 cursor-pointer ${alert.type === 'harvest' ? 'bg-accent text-accent-text' : 'bg-red-500 text-white'}`}>
              <AlertTriangle size={20} strokeWidth={3} />
              <p className="font-bold text-sm uppercase">{alert.text}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between items-end mb-4">
        <h2 className="text-2xl font-impact text-text-primary">TU CULTIVO</h2>
        {plants.length > activePlants && (
          <button onClick={onGoToArchive} className="text-xs font-impact border-b-2 border-text-primary">VER ARCHIVO</button>
        )}
      </div>

      <div className="space-y-4">
        {activePlantsArray.length === 0 ? (
          <div className="text-center py-12 brutalist-card bg-bg-surface border-dashed">
            <Sparkles size={40} className="mx-auto text-text-secondary mb-4" />
            <p className="text-text-primary font-impact text-2xl">NO HAY PLANTAS</p>
            <p className="text-sm text-text-secondary mt-1 mb-4 font-bold">Planta tu primera semilla.</p>
            <button onClick={onAddPlant} className="brutalist-button bg-accent text-accent-text px-6 py-2">Comenzar</button>
          </div>
        ) : (
          activePlantsArray.map(plant => {
            const days = calculateDays(plant.startDate);
            const estCycle = plant.estCycle || getCycleEstimate(plant.type);
            const progress = Math.min(100, Math.round((days / estCycle) * 100));
            const stage = getStageFromDays(days, plant.type);

            return (
              <div 
                key={plant.id} 
                onClick={() => onSelectPlant(plant)}
                className="brutalist-card bg-bg-surface p-4 cursor-pointer relative overflow-hidden group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-impact text-text-primary tracking-wide leading-none">
                      {plant.name}
                    </h3>
                    <p className="text-sm text-text-secondary font-bold uppercase">{plant.strain}</p>
                  </div>
                  <span className="text-xs px-2 py-1 border-2 border-border font-impact uppercase bg-bg-base text-text-primary shadow-[2px_2px_0px_0px_var(--color-border)]">
                    {plant.type === 'Autofloreciente' ? 'AUTO' : 'FEM'}
                  </span>
                </div>

                <div className="w-full bg-bg-base border-2 border-border h-4 mb-4 relative overflow-hidden">
                  <div 
                    className="h-full bg-accent border-r-2 border-border" 
                    style={{ width: `${progress}%` }} 
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center text-xs font-bold uppercase text-text-primary bg-bg-base border-2 border-border px-2 py-1 shadow-[2px_2px_0px_0px_var(--color-border)]">
                       Día {days}
                    </div>
                    <div className="flex items-center text-xs font-bold uppercase text-text-primary bg-bg-base border-2 border-border px-2 py-1 shadow-[2px_2px_0px_0px_var(--color-border)]">
                       {stage}
                    </div>
                  </div>
                  <div className="w-8 h-8 flex items-center justify-center text-text-primary">
                    <ChevronRight size={24} strokeWidth={3} />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

// --- COMPONENTE: CALENDARIO ---
function CalendarView({ plants, onBack, onSelectPlant }) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const monthNames = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];

  const getEventsForDate = (day) => {
    const dateStr = new Date(currentYear, currentMonth, day).toISOString().split('T')[0];
    let events = [];

    plants.forEach(plant => {
      plant.logs.forEach(log => {
        if (log.date.startsWith(dateStr)) events.push({ type: 'log', plant, log });
      });
      if (plant.startDate === dateStr) events.push({ type: 'start', plant });
      
      const estCycle = plant.estCycle || getCycleEstimate(plant.type);
      const harvestDate = getHarvestDate(plant.startDate, estCycle);
      if (harvestDate.toISOString().split('T')[0] === dateStr) events.push({ type: 'harvest', plant });
    });
    return events;
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else { setCurrentMonth(m => m - 1); }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else { setCurrentMonth(m => m + 1); }
  };

  const selectedDateEvents = getEventsForDate(selectedDate.getDate()).filter(e => 
    new Date(currentYear, currentMonth, selectedDate.getDate()).getMonth() === currentMonth
  );

  return (
    <div className="min-h-screen bg-bg-base flex flex-col animate-in slide-in-from-right-8 duration-300 pb-24">
      <header className="flex items-center p-5 sticky top-0 z-20 bg-bg-surface border-b-[3px] border-border">
        <button onClick={onBack} className="p-2 -ml-2 text-text-primary mr-2 active:scale-90 transition-transform">
          <ArrowLeft size={28} strokeWidth={3} />
        </button>
        <h2 className="text-3xl font-impact text-text-primary pt-1">CALENDARIO</h2>
      </header>

      <div className="p-5">
        <div className="brutalist-card bg-bg-surface p-4 mb-6">
          <div className="flex justify-between items-center mb-6">
            <button onClick={handlePrevMonth} className="brutalist-card bg-bg-base p-1 active:scale-90 text-text-primary"><ChevronRight size={24} strokeWidth={3} className="rotate-180" /></button>
            <h3 className="text-2xl font-impact text-text-primary">{monthNames[currentMonth]} {currentYear}</h3>
            <button onClick={handleNextMonth} className="brutalist-card bg-bg-base p-1 active:scale-90 text-text-primary"><ChevronRight size={24} strokeWidth={3} /></button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'].map(d => (
              <div key={d} className="text-xs font-impact text-text-secondary">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="h-10"></div>
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
              const isSelected = day === selectedDate.getDate() && currentMonth === selectedDate.getMonth() && currentYear === selectedDate.getFullYear();
              const events = getEventsForDate(day);
              const hasHarvest = events.some(e => e.type === 'harvest');
              const hasLog = events.some(e => e.type === 'log');

              return (
                <button 
                  key={day}
                  onClick={() => setSelectedDate(new Date(currentYear, currentMonth, day))}
                  className={`h-10 rounded border-[2px] relative flex items-center justify-center text-sm font-bold transition-all ${
                    isSelected ? 'bg-accent border-border text-accent-text shadow-[2px_2px_0px_0px_var(--color-border)]' : 
                    isToday ? 'bg-bg-surface border-text-primary text-text-primary' : 
                    'bg-bg-base border-transparent text-text-secondary hover:border-border'
                  }`}
                >
                  {day}
                  <div className="absolute -bottom-1 flex gap-1">
                    {hasHarvest && <div className={`w-2 h-2 border border-border ${isSelected ? 'bg-bg-surface' : 'bg-red-500'}`}></div>}
                    {hasLog && !hasHarvest && <div className={`w-2 h-2 border border-border ${isSelected ? 'bg-bg-surface' : 'bg-accent'}`}></div>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-impact text-text-primary mb-3 uppercase">
            EVENTOS - {selectedDate.getDate()} {monthNames[selectedDate.getMonth()]}
          </h3>
          
          <div className="space-y-3">
            {selectedDateEvents.length === 0 ? (
              <div className="text-center py-6 brutalist-card bg-bg-surface border-dashed">
                <p className="text-text-secondary font-bold uppercase">Ningún evento este día.</p>
              </div>
            ) : (
              selectedDateEvents.map((event, idx) => (
                <div key={idx} onClick={() => onSelectPlant(event.plant)} className="brutalist-card bg-bg-surface p-3 cursor-pointer flex items-start gap-3">
                  <div className={`p-2 border-2 border-border shadow-[2px_2px_0px_0px_var(--color-border)] ${
                    event.type === 'harvest' ? 'bg-red-400 text-white' : 
                    event.type === 'start' ? 'bg-accent text-accent-text' : 
                    'bg-bg-base text-text-primary'
                  }`}>
                    {event.type === 'harvest' ? <Scissors size={20} /> : event.type === 'start' ? <Leaf size={20} /> : <BookOpen size={20} />}
                  </div>
                  
                  <div>
                    <h4 className="text-text-primary font-impact text-lg leading-none mt-1">
                      {event.type === 'harvest' ? 'CORTE ESTIMADO' : event.type === 'start' ? 'GERMINACIÓN' : event.log.type}
                    </h4>
                    <p className="text-xs text-text-secondary font-bold uppercase mt-1">{event.plant.name}</p>
                    {event.type === 'log' && <p className="text-sm text-text-primary font-bold mt-1">{event.log.note}</p>}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- COMPONENTE: FORMULARIO NUEVA PLANTA ---
function AddPlantForm({ onCancel, onSave, initialData, showToast }) {
  const [formData, setFormData] = useState(initialData ? {
    ...initialData,
    ageMode: 'date',
    cycleMode: initialData.estCycle ? 'custom' : 'auto',
    customCycle: initialData.estCycle || (initialData.type === 'Autofloreciente' ? 85 : 140)
  } : {
    name: '',
    strain: '',
    bank: 'Desconocido / A Granel',
    type: 'Feminizada',
    medium: 'Tierra',
    ageMode: 'days',
    ageDays: 1,
    cycleMode: 'auto',
    customCycle: 140,
    startDate: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let finalStartDate = formData.startDate;
    if (formData.ageMode === 'days') {
      const start = new Date();
      start.setDate(start.getDate() - parseInt(formData.ageDays || 0));
      finalStartDate = start.toISOString().split('T')[0];
    }
    if(formData.name && formData.strain) {
      onSave({ 
        name: formData.name,
        strain: formData.strain,
        bank: formData.bank,
        type: formData.type,
        medium: formData.medium,
        startDate: finalStartDate,
        estCycle: formData.cycleMode === 'custom' ? parseInt(formData.customCycle) : (formData.type === 'Autofloreciente' ? 85 : 140)
      });
      if (showToast) showToast(initialData ? "CAMBIOS GUARDADOS" : "PLANTA SEMBRADA");
    }
  };

  return (
    <div className="min-h-screen bg-bg-base flex flex-col animate-in slide-in-from-right-8 duration-300">
      <header className="flex items-center p-5 sticky top-0 z-10 bg-bg-surface border-b-[3px] border-border">
        <button onClick={onCancel} className="p-2 -ml-2 text-text-primary mr-2 active:scale-90 transition-transform">
          <ArrowLeft size={28} strokeWidth={3} />
        </button>
        <h2 className="text-3xl font-impact text-text-primary pt-1">{initialData ? 'EDITAR' : 'SEMBRAR'}</h2>
      </header>

      <div className="p-5 flex-1 overflow-y-auto pb-24">
        <form id="addPlantForm" onSubmit={handleSubmit} className="space-y-8">
          
          {/* SECCIÓN: IDENTIDAD */}
          <div className="brutalist-card bg-bg-surface p-4">
            <h3 className="font-impact text-xl text-text-primary mb-4 border-b-2 border-border pb-2">1. IDENTIDAD</h3>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-impact text-text-secondary tracking-widest">IDENTIFICADOR (Apodo)</label>
                <input 
                  type="text" required placeholder="Ej. LA REINA #1"
                  className="brutalist-input bg-bg-base text-text-primary w-full p-3 font-bold uppercase text-sm"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value.toUpperCase()})}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-impact text-text-secondary tracking-widest">GENÉTICA / CEPA</label>
                <input 
                  type="text" required placeholder="Ej. OG KUSH"
                  className="brutalist-input bg-bg-base text-text-primary w-full p-3 font-bold uppercase text-sm"
                  value={formData.strain}
                  onChange={(e) => setFormData({...formData, strain: e.target.value.toUpperCase()})}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-impact text-text-secondary tracking-widest">BANCO DE SEMILLAS</label>
                <select 
                  className="brutalist-input bg-bg-base text-text-primary w-full p-3 font-bold uppercase text-sm appearance-none"
                  value={formData.bank}
                  onChange={(e) => setFormData({...formData, bank: e.target.value})}
                >
                  <option value="Desconocido / A Granel">A GRANEL / DESCONOCIDO</option>
                  <option value="Propia (Cruza)">PROPIA (CRUZA)</option>
                  <option value="Royal Queen Seeds">ROYAL QUEEN SEEDS</option>
                  <option value="Barneys Farm">BARNEY'S FARM</option>
                  <option value="Sweet Seeds">SWEET SEEDS</option>
                  <option value="Dutch Passion">DUTCH PASSION</option>
                  <option value="Sensi Seeds">SENSI SEEDS</option>
                </select>
                <p className="text-[10px] text-text-secondary mt-1 font-bold">Si es a granel, el sistema usará la info estándar de la cepa.</p>
              </div>
            </div>
          </div>

          {/* SECCIÓN: ADN */}
          <div className="brutalist-card bg-bg-surface p-4">
            <h3 className="font-impact text-xl text-text-primary mb-4 border-b-2 border-border pb-2">2. ADN Y ENTORNO</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-impact text-text-secondary tracking-widest">TIPO DE SEMILLA</label>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    type="button" onClick={() => setFormData({...formData, type: 'Autofloreciente'})}
                    className={`p-4 flex flex-col items-center justify-center gap-2 border-[3px] shadow-[4px_4px_0px_0px_var(--color-border)] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all ${formData.type === 'Autofloreciente' ? 'bg-accent border-border text-accent-text' : 'bg-bg-base border-border text-text-secondary opacity-70 hover:opacity-100'}`}
                  >
                    <Activity size={32} strokeWidth={2.5} />
                    <span className="font-impact text-lg">AUTO</span>
                  </button>
                  <button 
                    type="button" onClick={() => setFormData({...formData, type: 'Feminizada'})}
                    className={`p-4 flex flex-col items-center justify-center gap-2 border-[3px] shadow-[4px_4px_0px_0px_var(--color-border)] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all ${formData.type === 'Feminizada' ? 'bg-accent border-border text-accent-text' : 'bg-bg-base border-border text-text-secondary opacity-70 hover:opacity-100'}`}
                  >
                    <Leaf size={32} strokeWidth={2.5} />
                    <span className="font-impact text-lg">FOTO</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-impact text-text-secondary tracking-widest">MEDIO DE CULTIVO</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Tierra', 'Coco', 'Hidroponía'].map(med => (
                    <button 
                      key={med} type="button" onClick={() => setFormData({...formData, medium: med})}
                      className={`p-2 border-[3px] shadow-[2px_2px_0px_0px_var(--color-border)] transition-colors ${formData.medium === med ? 'bg-text-primary border-border text-bg-base' : 'bg-bg-base border-border text-text-secondary'}`}
                    >
                      <span className="font-impact text-sm uppercase">{med}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SECCIÓN: EDAD */}
          <div className="brutalist-card bg-bg-surface p-4">
            <h3 className="font-impact text-xl text-text-primary mb-4 border-b-2 border-border pb-2">3. EDAD</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <button 
                  type="button" onClick={() => setFormData({...formData, ageMode: 'days'})}
                  className={`p-2 border-[3px] shadow-[2px_2px_0px_0px_var(--color-border)] transition-colors ${formData.ageMode === 'days' ? 'bg-text-primary border-border text-bg-base' : 'bg-bg-base border-border text-text-secondary'}`}
                >
                  <span className="font-impact text-sm">CALCULAR DÍAS</span>
                </button>
                <button 
                  type="button" onClick={() => setFormData({...formData, ageMode: 'date'})}
                  className={`p-2 border-[3px] shadow-[2px_2px_0px_0px_var(--color-border)] transition-colors ${formData.ageMode === 'date' ? 'bg-text-primary border-border text-bg-base' : 'bg-bg-base border-border text-text-secondary'}`}
                >
                  <span className="font-impact text-sm">FECHA EXACTA</span>
                </button>
              </div>

              {formData.ageMode === 'days' ? (
                <div className="space-y-1 p-3 bg-bg-base border-2 border-border">
                  <label className="text-xs font-impact text-text-secondary tracking-widest">DÍAS DESDE GERMINACIÓN</label>
                  <div className="flex items-center gap-3 mt-2">
                    <input 
                      type="number" min="0" max="200" required
                      className="brutalist-input bg-bg-surface text-text-primary w-24 p-3 font-bold text-center text-xl"
                      value={formData.ageDays}
                      onChange={(e) => setFormData({...formData, ageDays: e.target.value})}
                    />
                    <span className="text-sm font-bold text-text-secondary uppercase">Días de vida hoy</span>
                  </div>
                  <p className="text-[10px] text-text-secondary mt-2 font-bold uppercase">Calcularemos la fecha de siembra por ti.</p>
                </div>
              ) : (
                <div className="space-y-1 p-3 bg-bg-base border-2 border-border">
                  <label className="text-xs font-impact text-text-secondary tracking-widest">FECHA DE INICIO</label>
                  <input 
                    type="date" required
                    className="brutalist-input bg-bg-surface text-text-primary w-full p-3 font-bold mt-2"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-4 mt-6 pt-6 border-t-2 border-border border-dashed">
              <label className="text-xs font-impact text-text-secondary tracking-widest block">CICLO ESTIMADO (HASTA COSECHA)</label>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  type="button" onClick={() => setFormData({...formData, cycleMode: 'auto'})}
                  className={`p-2 border-[3px] shadow-[2px_2px_0px_0px_var(--color-border)] transition-colors ${formData.cycleMode === 'auto' ? 'bg-text-primary border-border text-bg-base' : 'bg-bg-base border-border text-text-secondary'}`}
                >
                  <span className="font-impact text-sm">ESTÁNDAR</span>
                </button>
                <button 
                  type="button" onClick={() => setFormData({...formData, cycleMode: 'custom'})}
                  className={`p-2 border-[3px] shadow-[2px_2px_0px_0px_var(--color-border)] transition-colors ${formData.cycleMode === 'custom' ? 'bg-text-primary border-border text-bg-base' : 'bg-bg-base border-border text-text-secondary'}`}
                >
                  <span className="font-impact text-sm">PERSONALIZADO</span>
                </button>
              </div>

              {formData.cycleMode === 'custom' && (
                <div className="space-y-4 p-4 bg-bg-base border-2 border-border mt-3 shadow-[inset_2px_2px_0px_0px_var(--color-border)]">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-impact text-text-secondary tracking-widest">DÍAS TOTALES DEL CICLO</label>
                    <span className="font-impact text-2xl text-text-primary bg-bg-surface px-3 py-1 border-2 border-border shadow-[2px_2px_0px_0px_var(--color-border)]">
                      {formData.customCycle}
                    </span>
                  </div>
                  <input 
                    type="range" min="30" max="300" step="1"
                    className="w-full accent-accent h-3 bg-bg-surface border-2 border-border appearance-none cursor-pointer"
                    value={formData.customCycle}
                    onChange={(e) => setFormData({...formData, customCycle: e.target.value})}
                  />
                  <div className="flex justify-between text-xs font-bold text-text-secondary uppercase">
                    <span>Rápido (30d)</span>
                    <span>Largo (300d)</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>

      <div className="fixed bottom-[72px] w-full max-w-md p-5 bg-bg-surface border-t-[3px] border-border z-20">
        <button 
          type="submit" form="addPlantForm"
          className="brutalist-button bg-accent text-accent-text w-full py-4 text-2xl"
        >
          {initialData ? 'GUARDAR CAMBIOS' : 'SEMBRAR PLANTA'}
        </button>
      </div>
    </div>
  );
}

// --- COMPONENTE: DETALLE DE PLANTA Y BITÁCORA ---
function PlantDetail({ plant, onBack, onAddLog, onDelete, onEdit, onUpdatePlant, showToast }) {
  const [showLogModal, setShowLogModal] = useState(false);
  const [logType, setLogType] = useState('Riego');
  const [logData, setLogData] = useState({ note: '', ph: '', ec: '', height: '', photo: null });
  
  const [showHarvestModal, setShowHarvestModal] = useState(false);
  const [harvestData, setHarvestData] = useState({ yield: '', rating: '10', note: '' });
  const [showQrModal, setShowQrModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const days = calculateDays(plant.startDate);
  const estCycle = plant.estCycle || getCycleEstimate(plant.type);
  const progress = Math.min(100, Math.round((days / estCycle) * 100));
  const harvestDate = getHarvestDate(plant.startDate, estCycle).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
  const currentStage = getStageFromDays(days, plant.type);

  const handleSaveLog = () => {
    const metrics = {};
    if(logData.ph) metrics.ph = parseFloat(logData.ph);
    if(logData.ec) metrics.ec = parseFloat(logData.ec);
    if(logData.height) metrics.height = parseFloat(logData.height);

    onAddLog(plant.id, { 
      type: logType, 
      note: logData.note, 
      metrics: Object.keys(metrics).length > 0 ? metrics : null,
      photo: logData.photo
    });
    setShowLogModal(false);
    setLogData({ note: '', ph: '', ec: '', height: '', photo: null });
    if (showToast) showToast("REGISTRO AÑADIDO");
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const MAX_SIZE = 800;

        if (width > height) {
          if (width > MAX_SIZE) {
            height *= MAX_SIZE / width;
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width *= MAX_SIZE / height;
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        setLogData({ ...logData, photo: dataUrl });
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleHarvestSubmit = () => {
    if (onUpdatePlant) {
      onUpdatePlant({
        ...plant,
        status: 'harvested',
        harvestData: {
          yield: parseFloat(harvestData.yield),
          rating: parseInt(harvestData.rating),
          note: harvestData.note,
          date: new Date().toISOString()
        }
      });
      if (showToast) showToast("¡COSECHA REGISTRADA!");
    }
  };

  const stages = ['Germinación', 'Vegetativo', 'Floración', 'Lavado', 'Cosecha'];

  return (
    <div className="min-h-screen bg-bg-base flex flex-col animate-in slide-in-from-right-8 duration-300 pb-24">
      <header className="flex justify-between items-center p-5 sticky top-0 z-20 bg-bg-surface border-b-[3px] border-border">
        <div className="flex items-center">
          <button onClick={onBack} className="p-2 -ml-2 text-text-primary mr-2 active:scale-90">
            <ArrowLeft size={28} strokeWidth={3} />
          </button>
          <div className="pt-1">
            <h2 className="text-3xl font-impact text-text-primary leading-none uppercase">{plant.name}</h2>
            <p className="text-sm text-text-secondary font-bold uppercase tracking-wider">{plant.strain}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowQrModal(true)} className="brutalist-card bg-bg-base p-2 text-text-primary active:scale-90">
            <QrCode size={24} strokeWidth={2.5} />
          </button>
          <button onClick={onEdit} className="brutalist-card bg-bg-base p-2 text-text-primary active:scale-90">
            <Pencil size={24} strokeWidth={2.5} />
          </button>
          <button onClick={() => onDelete(plant.id)} className="brutalist-card bg-bg-base p-2 text-red-500 active:scale-90">
            <Trash2 size={24} strokeWidth={2.5} />
          </button>
        </div>
      </header>

      <div className="p-5 space-y-6">
        <div className="brutalist-card bg-bg-surface p-5">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-impact text-text-secondary tracking-widest">DÍAS DE VIDA</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-6xl font-impact text-text-primary leading-none">{days}</span>
                <span className="text-text-secondary font-impact text-xl">/ {estCycle}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs px-3 py-1 border-[3px] border-border font-impact uppercase bg-accent text-accent-text shadow-[2px_2px_0px_0px_var(--color-border)]">
                {plant.type}
              </span>
            </div>
          </div>

          <div className="w-full bg-bg-base border-[3px] border-border h-6 mb-3 relative overflow-hidden shadow-[2px_2px_0px_0px_var(--color-border)]">
            <div 
              className="h-full bg-accent border-r-[3px] border-border relative overflow-hidden" 
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 2px, transparent 8px)' }}></div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm font-impact text-text-secondary">{progress}% COMPLETO</p>
            <div className="flex items-center text-sm font-impact text-text-primary bg-bg-base border-2 border-border px-2 py-0.5 shadow-[2px_2px_0px_0px_var(--color-border)]">
              <Scissors size={14} strokeWidth={3} className="mr-1" /> {harvestDate}
            </div>
          </div>
          
          {plant.status !== 'harvested' && (
            <button 
              onClick={() => setShowHarvestModal(true)}
              className="w-full mt-4 brutalist-button bg-text-primary text-bg-base py-3 text-lg font-impact flex items-center justify-center gap-2"
            >
              <Scissors size={20} strokeWidth={3} />
              COSECHAR PLANTA
            </button>
          )}

          {plant.status === 'harvested' && plant.harvestData && (
            <div className="mt-4 p-4 bg-accent text-accent-text border-2 border-border shadow-[2px_2px_0px_0px_var(--color-border)]">
              <h3 className="font-impact text-xl mb-2 flex items-center gap-2"><Sparkles size={20} /> COSECHADA</h3>
              <div className="grid grid-cols-2 gap-2 text-sm font-bold uppercase">
                <div>RENDIMIENTO: {plant.harvestData.yield}g</div>
                <div>NOTA: {plant.harvestData.rating}/10</div>
              </div>
              {plant.harvestData.note && <p className="mt-2 text-xs opacity-90">{plant.harvestData.note}</p>}
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t-2 border-border border-dashed">
            <div>
              <p className="text-[10px] font-impact text-text-secondary tracking-widest uppercase">BANCO DE SEMILLAS</p>
              <p className="text-sm font-bold text-text-primary uppercase truncate">{plant.bank || 'A GRANEL / DESCONOCIDO'}</p>
            </div>
            <div>
              <p className="text-[10px] font-impact text-text-secondary tracking-widest uppercase">MEDIO DE CULTIVO</p>
              <p className="text-sm font-bold text-text-primary uppercase truncate">{plant.medium || 'NO REGISTRADO'}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-impact text-text-secondary tracking-widest mb-3">ETAPA ACTUAL</h3>
          <div className="flex space-x-3 overflow-x-auto pb-4 scrollbar-hide">
            {stages.map(s => (
              <div 
                key={s}
                className={`whitespace-nowrap px-4 py-2 font-impact text-lg transition-all border-[3px] shadow-[2px_2px_0px_0px_var(--color-border)] ${
                  currentStage === s 
                    ? 'bg-text-primary text-bg-base border-border' 
                    : 'bg-bg-surface text-text-secondary border-transparent shadow-none opacity-50'
                }`}
              >
                {s.toUpperCase()}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-impact text-text-secondary tracking-widest mb-4">LOGS</h3>

          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:w-1 before:bg-border">
            {plant.logs.length === 0 ? (
              <p className="text-center text-text-secondary py-6 font-impact text-xl brutalist-card bg-bg-surface border-dashed">AÚN NO HAY REGISTROS.</p>
            ) : (
              plant.logs.map((log) => {
                const isRiego = log.type === 'Riego';
                const isNutrientes = log.type === 'Nutrientes';
                const isMedicion = log.type === 'Medición';
                
                let iconColorClass = 'bg-bg-surface text-text-primary border-border';
                if (isRiego) iconColorClass = 'bg-[#3b82f6] text-white border-[#1d4ed8]';
                else if (isNutrientes) iconColorClass = 'bg-[#f97316] text-white border-[#c2410c]';
                else if (isMedicion) iconColorClass = 'bg-[#a855f7] text-white border-[#7e22ce]';

                return (
                  <div key={log.id} className="relative flex items-start group">
                    <div className={`flex items-center justify-center w-10 h-10 border-[3px] shrink-0 z-10 shadow-[2px_2px_0px_0px_var(--color-border)] mt-1 ml-0.5 ${iconColorClass}`}>
                      {isRiego ? <Droplets size={20} strokeWidth={2.5} /> : isNutrientes ? <FlaskConical size={20} strokeWidth={2.5} /> : <BookOpen size={20} strokeWidth={2.5} />}
                    </div>
                    
                    <div className="w-[calc(100%-3rem)] ml-4 brutalist-card bg-bg-surface p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xl font-impact text-text-primary leading-none">{log.type.toUpperCase()}</span>
                        <time className="text-xs font-bold px-2 py-1 bg-border text-bg-base border-2 border-border">
                          {new Date(log.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }).toUpperCase()}
                        </time>
                      </div>
                      {log.photo && (
                        <div 
                          className="mb-3 border-[3px] border-border shadow-[2px_2px_0px_0px_var(--color-border)] cursor-pointer active:scale-[0.98] transition-transform"
                          onClick={() => setSelectedPhoto(log.photo)}
                        >
                          <img src={log.photo} alt="Log" className="w-full h-auto object-cover" />
                        </div>
                      )}
                    <p className="text-text-secondary font-bold text-sm mb-3">{log.note}</p>
                    
                    {log.metrics && (
                      <div className="flex gap-2 flex-wrap mt-2 pt-3 border-t-[3px] border-border">
                        {log.metrics.ph && (
                          <div className="bg-bg-base px-2 py-1 border-2 border-border shadow-[2px_2px_0px_0px_var(--color-border)] text-xs font-bold text-text-primary">
                            PH: {log.metrics.ph}
                          </div>
                        )}
                        {log.metrics.ec && (
                          <div className="bg-bg-base px-2 py-1 border-2 border-border shadow-[2px_2px_0px_0px_var(--color-border)] text-xs font-bold text-text-primary">
                            EC: {log.metrics.ec}
                          </div>
                        )}
                        {log.metrics.height && (
                          <div className="bg-bg-base px-2 py-1 border-2 border-border shadow-[2px_2px_0px_0px_var(--color-border)] text-xs font-bold text-text-primary">
                            ALT: {log.metrics.height}CM
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {plant.status !== 'harvested' && (
        <button 
          onClick={() => setShowLogModal(true)}
          className="fixed bottom-8 right-6 lg:right-[calc(50%-12rem)] brutalist-button bg-accent text-accent-text rounded-full w-16 h-16 flex items-center justify-center z-40"
        >
          <Plus size={32} strokeWidth={3} />
        </button>
      )}

      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-bg-base/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-bg-surface w-full max-w-md border-t-[4px] border-border p-6 pb-10 shadow-[0_-10px_0px_0px_var(--color-border)] max-h-[90vh] overflow-y-auto flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-3xl font-impact text-text-primary pt-1">NUEVO LOG</h3>
              <button onClick={() => setShowLogModal(false)} className="brutalist-card p-2 bg-bg-base active:scale-90 text-text-primary">
                <X size={24} strokeWidth={3} />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-6">
              {[
                { type: 'Riego', icon: Droplets },
                { type: 'Nutrientes', icon: FlaskConical },
                { type: 'Medición', icon: Ruler },
                { type: 'Otro', icon: BookOpen }
              ].map(item => {
                const Icon = item.icon;
                const isSelected = logType === item.type;
                return (
                  <button 
                    key={item.type} onClick={() => setLogType(item.type)}
                    className={`brutalist-card p-3 flex flex-col items-center justify-center gap-1 ${isSelected ? 'bg-accent text-accent-text border-border shadow-[2px_2px_0px_0px_var(--color-border)]' : 'bg-bg-base text-text-secondary border-transparent shadow-none'}`}
                  >
                    <Icon size={24} strokeWidth={isSelected ? 3 : 2} />
                    <span className="text-[10px] font-impact mt-1 tracking-wider">{item.type.toUpperCase()}</span>
                  </button>
                )
              })}
            </div>

            <div className="space-y-4 mb-6">
              {(logType === 'Riego' || logType === 'Nutrientes' || logType === 'Medición') && (
                <div className="grid grid-cols-3 gap-3">
                  <input type="number" step="0.1" placeholder="PH" value={logData.ph} onChange={e => setLogData({...logData, ph: e.target.value})} className="brutalist-input bg-bg-surface text-text-primary p-3 font-bold text-center" />
                  <input type="number" step="0.1" placeholder="EC" value={logData.ec} onChange={e => setLogData({...logData, ec: e.target.value})} className="brutalist-input bg-bg-surface text-text-primary p-3 font-bold text-center" />
                  <input type="number" placeholder="ALT(CM)" value={logData.height} onChange={e => setLogData({...logData, height: e.target.value})} className="brutalist-input bg-bg-surface text-text-primary p-3 font-bold text-center" />
                </div>
              )}
              
              <div className="brutalist-card bg-bg-base p-0 border-dashed relative">
                <input 
                  type="file" 
                  accept="image/*" 
                  capture="environment" 
                  onChange={handlePhotoUpload} 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center py-4 text-text-secondary">
                  {logData.photo ? (
                    <img src={logData.photo} alt="Preview" className="h-24 w-auto object-cover border-2 border-border mb-2 shadow-[2px_2px_0px_0px_var(--color-border)]" />
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Plus size={24} strokeWidth={2.5} />
                      <span className="font-impact text-sm">AÑADIR FOTO</span>
                    </div>
                  )}
                </div>
              </div>

              <textarea placeholder="DETALLES..." value={logData.note} onChange={e => setLogData({...logData, note: e.target.value})} className="brutalist-input bg-bg-surface text-text-primary w-full p-4 font-bold min-h-[100px] resize-none" />
            </div>

            <button onClick={handleSaveLog} disabled={!logData.note} className="brutalist-button bg-accent text-accent-text w-full py-4 text-2xl disabled:bg-bg-base disabled:text-text-secondary disabled:border-border disabled:shadow-none">
              GUARDAR LOG
            </button>
          </div>
        </div>
      )}

      {showHarvestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-base/80 backdrop-blur-sm p-5 animate-in fade-in duration-200">
          <div className="bg-bg-surface w-full max-w-sm border-t-[4px] border-border p-6 shadow-[0_10px_0px_0px_var(--color-border)] max-h-[90vh] overflow-y-auto flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-3xl font-impact text-text-primary pt-1">COSECHAR</h3>
              <button onClick={() => setShowHarvestModal(false)} className="brutalist-card p-2 bg-bg-base active:scale-90 text-text-primary">
                <X size={24} strokeWidth={3} />
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="space-y-1">
                <label className="text-xs font-impact text-text-secondary tracking-widest uppercase">Rendimiento Seco (Gramos)</label>
                <input 
                  type="number" required placeholder="Ej. 50"
                  className="brutalist-input bg-bg-base text-text-primary w-full p-3 font-bold text-xl"
                  value={harvestData.yield}
                  onChange={(e) => setHarvestData({...harvestData, yield: e.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-impact text-text-secondary tracking-widest uppercase">Nota Final (1-10)</label>
                <input 
                  type="number" min="1" max="10" required placeholder="Ej. 10"
                  className="brutalist-input bg-bg-base text-text-primary w-full p-3 font-bold text-xl"
                  value={harvestData.rating}
                  onChange={(e) => setHarvestData({...harvestData, rating: e.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-impact text-text-secondary tracking-widest uppercase">Reseña / Cata</label>
                <textarea 
                  placeholder="Sabor, aroma, efecto..."
                  className="brutalist-input bg-bg-base text-text-primary w-full p-3 font-bold resize-none min-h-[80px]"
                  value={harvestData.note}
                  onChange={(e) => setHarvestData({...harvestData, note: e.target.value})}
                />
              </div>
            </div>

            <button 
              onClick={handleHarvestSubmit}
              disabled={!harvestData.yield || !harvestData.rating}
              className="brutalist-button bg-text-primary text-bg-base w-full py-4 text-xl flex justify-center gap-2 disabled:bg-bg-base disabled:text-text-secondary"
            >
              <Scissors size={24} strokeWidth={3} />
              CONFIRMAR COSECHA
            </button>
          </div>
        </div>
      )}

      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-base/80 backdrop-blur-sm p-5 animate-in fade-in duration-200">
          <div className="bg-bg-surface w-full max-w-sm border-t-[4px] border-border p-6 shadow-[0_10px_0px_0px_var(--color-border)] flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-6">
              <h3 className="text-3xl font-impact text-text-primary pt-1">CARNET QR</h3>
              <button onClick={() => setShowQrModal(false)} className="brutalist-card p-2 bg-bg-base active:scale-90 text-text-primary">
                <X size={24} strokeWidth={3} />
              </button>
            </div>
            
            <div className="bg-white p-4 border-[3px] border-black shadow-[4px_4px_0px_0px_#000] mb-6">
              <QRCodeSVG 
                value={`jardin-de-eden://plant/${plant.id}`} 
                size={200}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                level={"M"}
              />
            </div>
            
            <p className="font-impact text-xl text-text-primary mb-2 uppercase text-center">{plant.name}</p>
            <p className="font-bold text-sm text-text-secondary uppercase text-center mb-6">{plant.strain}</p>
            
            <button onClick={() => window.print()} className="brutalist-button bg-accent text-accent-text w-full py-3 text-lg font-impact flex justify-center gap-2">
              IMPRIMIR CARNET
            </button>
          </div>
        </div>
      )}

      {/* FULL SCREEN PHOTO MODAL */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in zoom-in-95 duration-200">
          <button 
            onClick={() => setSelectedPhoto(null)} 
            className="absolute top-6 right-6 p-3 bg-white text-black border-[3px] border-black shadow-[4px_4px_0px_0px_#555] active:translate-y-1 active:translate-x-1 active:shadow-none z-[70] transition-all"
          >
            <X size={24} strokeWidth={4} />
          </button>
          <img 
            src={selectedPhoto} 
            alt="Fullscreen preview" 
            className="max-w-full max-h-[85vh] object-contain border-[4px] border-white shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]" 
          />
        </div>
      )}
    </div>
  );
}

// --- COMPONENTE: ARCHIVO (SALÓN DE LA FAMA) ---
function ArchiveView({ plants, onBack, onSelectPlant }) {
  return (
    <div className="min-h-screen bg-bg-base flex flex-col animate-in slide-in-from-right-8 duration-300 pb-24">
      <header className="p-5 sticky top-0 z-20 bg-bg-surface border-b-[3px] border-border flex items-center">
        <button onClick={onBack} className="p-2 -ml-2 text-text-primary mr-2 active:scale-90 transition-transform">
          <ArrowLeft size={28} strokeWidth={3} />
        </button>
        <h2 className="text-3xl font-impact text-text-primary pt-1">ARCHIVO</h2>
      </header>

      <div className="p-5 space-y-4">
        {plants.length === 0 ? (
          <div className="text-center py-12 brutalist-card bg-bg-surface border-dashed">
            <Sparkles size={40} className="mx-auto text-text-secondary mb-4" />
            <p className="text-text-primary font-impact text-xl">SALÓN VACÍO</p>
            <p className="text-sm text-text-secondary font-bold">Aún no has cosechado ninguna planta.</p>
          </div>
        ) : (
          plants.map(plant => (
            <div 
              key={plant.id} 
              onClick={() => onSelectPlant(plant)}
              className="brutalist-card bg-bg-surface p-4 cursor-pointer relative overflow-hidden group border-2 border-text-primary"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-impact text-text-primary tracking-wide leading-none flex items-center gap-2">
                    {plant.name} <Sparkles size={16} className="text-accent" />
                  </h3>
                  <p className="text-sm text-text-secondary font-bold uppercase">{plant.strain}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-impact text-accent block leading-none">
                    {plant.harvestData?.yield || '?'}g
                  </span>
                  <span className="text-xs font-bold text-text-secondary uppercase">Rendimiento</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2 pt-3 border-t-2 border-border border-dashed">
                <span className="text-xs px-2 py-1 bg-text-primary text-bg-base font-bold">
                  NOTA: {plant.harvestData?.rating || '?'}/10
                </span>
                <span className="text-xs font-bold text-text-secondary">
                  {plant.harvestData?.date ? new Date(plant.harvestData.date).toLocaleDateString() : ''}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
