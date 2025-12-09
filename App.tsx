import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Home, Heart, ChefHat, ArrowLeft, Clock, Users, Flame, BarChart, Trash2, Edit2 } from 'lucide-react';
import { Recipe, RecipeContextType, ViewState } from './types';

// --- Mock Data ---
const INITIAL_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Chicken Caesar Salad',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=800&q=80',
    description: 'A classic Chicken Caesar Salad with crisp romaine lettuce, crunchy croutons, and creamy dressing. Perfect for a light lunch or dinner.',
    time: '35 Mins',
    servings: '03 Servings',
    calories: '103 Cal',
    difficulty: 'Medium',
    isFavorite: false,
    isUserCreated: false,
  },
  {
    id: '2',
    title: 'Lemon Pie',
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=800&q=80',
    description: 'To make a lemon pie, start by preparing the crust: combine 1 1/2 cups of graham cracker crumbs, 1/2 cup of melted unsalted butter...',
    time: '50 Mins',
    servings: '08 Servings',
    calories: '320 Cal',
    difficulty: 'Hard',
    isFavorite: true,
    isUserCreated: true,
  },
  {
    id: '3',
    title: 'Grilled Salmon',
    image: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&w=800&q=80',
    description: 'Fresh Atlantic salmon grilled to perfection with lemon butter sauce and asparagus.',
    time: '25 Mins',
    servings: '02 Servings',
    calories: '450 Cal',
    difficulty: 'Easy',
    isFavorite: false,
    isUserCreated: false,
  }
];

// --- Context ---
const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) throw new Error("useRecipes must be used within a RecipeProvider");
  return context;
};

// --- Components ---

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  const NavItem = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => {
    const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));
    return (
      <Link to={to} className={`flex flex-col items-center justify-center w-full py-2 ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
        <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
        <span className="text-xs mt-1 font-medium">{label}</span>
      </Link>
    );
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50 shadow-2xl overflow-hidden relative border-x border-gray-200">
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {children}
      </div>
      <div className="h-16 bg-white border-t border-gray-200 flex justify-around items-center shrink-0 z-50">
        <NavItem to="/" icon={Home} label="Home" />
        <NavItem to="/favorites" icon={Heart} label="Favorites" />
        <NavItem to="/my-food" icon={ChefHat} label="My Food" />
      </div>
    </div>
  );
};

const RecipeCard: React.FC<{ recipe: Recipe; onClick: () => void }> = ({ recipe, onClick }) => (
  <div onClick={onClick} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-4 cursor-pointer hover:shadow-md transition-shadow mx-4 mt-4">
    <div className="h-48 w-full relative">
      <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
      {recipe.isFavorite && (
        <div className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md">
          <Heart size={16} className="text-black fill-black" />
        </div>
      )}
    </div>
    <div className="p-4">
      <h3 className="font-bold text-gray-800 text-lg mb-1">{recipe.title}</h3>
      <div className="flex items-center text-gray-500 text-xs gap-4 mt-2">
        <span className="flex items-center gap-1"><Clock size={14} className="text-gray-400" /> {recipe.time}</span>
        <span className="flex items-center gap-1"><Flame size={14} className="text-gray-400" /> {recipe.calories}</span>
      </div>
    </div>
  </div>
);

// --- Pages ---

const HomePage = () => {
  const { recipes } = useRecipes();
  const navigate = useNavigate();

  return (
    <div className="pb-20 pt-2">
      <h1 className="text-2xl font-bold text-gray-900 mb-2 px-4 pt-4">Discover Recipes</h1>
      <div className="space-y-0">
        {recipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} onClick={() => navigate(`/recipe/${recipe.id}`)} />
        ))}
      </div>
    </div>
  );
};

const RecipeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes, toggleFavorite } = useRecipes();
  const recipe = recipes.find(r => r.id === id);

  if (!recipe) return <div>Recipe not found</div>;

  const StatItem = ({ icon: Icon, label }: { icon: any, label: string }) => (
    <div className="flex flex-col items-center justify-center gap-1">
      <div className="bg-orange-50 p-2 rounded-full mb-1">
         <Icon size={20} className="text-orange-500" />
      </div>
      <span className="text-xs font-semibold text-gray-700">{label}</span>
    </div>
  );

  return (
    <div className="bg-white min-h-full pb-20">
      {/* Hero Image */}
      <div className="relative h-64 w-full">
        <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
        
        {/* Back Button - Pill Shape */}
        <button 
          onClick={() => navigate(-1)} 
          className="absolute top-6 left-4 bg-white px-4 py-1.5 rounded-full text-xs font-bold shadow-sm flex items-center gap-1 hover:bg-gray-50 transition-colors text-gray-800"
        >
          Back
        </button>

        {/* Favorite Button - Square/Box Shape */}
        <button 
          onClick={() => toggleFavorite(recipe.id)}
          className="absolute top-6 right-4 bg-white p-2 rounded shadow-sm hover:bg-gray-50 transition-colors border-0"
        >
          <Heart size={20} className={recipe.isFavorite ? "text-black fill-black" : "text-gray-400"} />
        </button>
      </div>

      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-900 mb-1">{recipe.title}</h1>
        <p className="text-gray-400 text-xs mb-6 capitalize">{recipe.difficulty || 'Chicken'}</p>

        {/* Stats Row */}
        <div className="flex justify-between items-center mb-8 px-2">
          <StatItem icon={Clock} label={recipe.time} />
          <StatItem icon={Users} label={recipe.servings} />
          <StatItem icon={Flame} label={recipe.calories} />
          <StatItem icon={BarChart} label={recipe.difficulty} />
        </div>

        {/* Description */}
        <div className="space-y-4">
           <p className="text-gray-600 text-sm leading-7">
             {recipe.description}
           </p>
        </div>
      </div>
    </div>
  );
};

const FavoritesPage = () => {
  const { recipes } = useRecipes();
  const navigate = useNavigate();
  const favRecipes = recipes.filter(r => r.isFavorite);

  return (
    <div className="p-4 pb-20 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-normal text-gray-800 mb-4">My Favorite Recipes</h2>
      
      <div className="mb-6">
        <button onClick={() => navigate(-1)} className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
          Go back
        </button>
      </div>
      
      <div className="space-y-4">
        {favRecipes.map((recipe) => (
            <div 
              key={recipe.id} 
              onClick={() => navigate(`/recipe/${recipe.id}`)}
              className="bg-white p-4 rounded-xl shadow-sm flex gap-4 cursor-pointer"
            >
              <img src={recipe.image} alt={recipe.title} className="w-24 h-24 rounded-xl object-cover" />
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="font-bold text-gray-800 text-sm mb-2">{recipe.title}</h3>
                {/* Could add more details here if needed to match exact screenshot, but screenshot 5 implies a simple list item or similar card */}
              </div>
            </div>
        ))}
        {favRecipes.length === 0 && (
            <p className="text-gray-400 text-center mt-10">No favorites yet.</p>
        )}
      </div>
    </div>
  );
};

const MyFoodPage = () => {
  const { recipes, addRecipe, updateRecipe, deleteRecipe } = useRecipes();
  const navigate = useNavigate();
  const [view, setView] = useState<ViewState>('LIST');
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form State
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  // User created recipes only
  const myRecipes = recipes.filter(r => r.isUserCreated);

  const resetForm = () => {
    setTitle('');
    setImage('');
    setDescription('');
    setEditingId(null);
  };

  const handleSave = () => {
    if (!title) return; 

    const recipeData: Recipe = {
      id: editingId || Date.now().toString(),
      title,
      image: image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80', // Default food image
      description,
      time: '30 Mins', 
      servings: '02 Servings',
      calories: '250 Cal',
      difficulty: 'Medium',
      isFavorite: false,
      isUserCreated: true,
    };

    if (editingId) {
      updateRecipe(recipeData);
    } else {
      addRecipe(recipeData);
    }
    
    resetForm();
    setView('LIST');
  };

  const handleEdit = (recipe: Recipe) => {
    setTitle(recipe.title);
    setImage(recipe.image);
    setDescription(recipe.description);
    setEditingId(recipe.id);
    setView('EDIT');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this recipe?')) {
      deleteRecipe(id);
    }
  };

  const RecipeForm = ({ mode }: { mode: 'ADD' | 'EDIT' }) => (
    <div className="bg-white min-h-screen">
      <div className="p-4 border-b border-gray-100 mb-4">
        <button onClick={() => { setView('LIST'); resetForm(); }} className="text-blue-500 text-sm">
           Back
        </button>
      </div>

      <div className="px-4 space-y-6">
        {/* Title */}
        <div className="border-b border-gray-200 pb-2">
          <label className="block text-sm text-gray-900 mb-1">Title</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full py-2 bg-gray-50 px-2 rounded focus:outline-none focus:bg-white transition-colors"
          />
        </div>

        {/* Image URL Section */}
        <div className="border-b border-gray-200 pb-2">
           <label className="block text-sm text-gray-900 mb-2">Image URL</label>
           <div className="relative">
             <input 
                type="text" 
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full h-24 bg-gray-100 rounded-lg text-center flex items-center justify-center text-gray-500 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 placeholder-gray-500"
                placeholder="Upload Image URL"
             />
           </div>
        </div>

        {/* Description */}
        <div className="border-b border-gray-200 pb-2">
             <label className="block text-sm text-gray-900 mb-1">Description</label>
             <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full py-2 bg-gray-50 px-2 rounded focus:outline-none focus:bg-white transition-colors resize-none"
             />
        </div>

        {/* Save Button */}
        <button 
            onClick={handleSave}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded shadow-sm transition-colors mt-8"
        >
            Save recipe
        </button>
      </div>
    </div>
  );

  if (view === 'ADD' || view === 'EDIT') {
      return <RecipeForm mode={view} />;
  }

  return (
    <div className="p-4 pb-20 bg-gray-50 min-h-screen">
      <div className="mb-4">
        <button onClick={() => navigate(-1)} className="text-blue-500 text-sm hover:underline">
          Back
        </button>
      </div>

      <button 
        onClick={() => { resetForm(); setView('ADD'); }}
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md shadow-sm hover:bg-blue-700 transition-colors mb-8"
      >
        Add New recipe
      </button>

      <div className="space-y-6">
        {myRecipes.map((recipe) => (
            <div key={recipe.id} className="bg-white p-4 rounded-xl shadow-sm">
                <div className="h-40 w-full rounded-lg overflow-hidden mb-3 bg-gray-200">
                    <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-medium text-gray-800 mb-4">{recipe.title}</h3>
                
                <div className="flex gap-4">
                        <button 
                        onClick={() => handleEdit(recipe)}
                        className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-1.5 px-3 rounded text-sm font-medium transition-colors"
                        >
                        Edit
                        </button>
                        <button 
                        onClick={() => handleDelete(recipe.id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1.5 px-3 rounded text-sm font-medium transition-colors"
                        >
                        Delete
                        </button>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

// --- App Container ---

const AppContent = () => {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/recipe/:id" element={<RecipeDetailPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/my-food" element={<MyFoodPage />} />
            </Routes>
        </Layout>
    );
}

const App = () => {
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    const saved = localStorage.getItem('recipes');
    return saved ? JSON.parse(saved) : INITIAL_RECIPES;
  });

  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  const addRecipe = (recipe: Recipe) => {
    setRecipes(prev => [...prev, recipe]);
  };

  const updateRecipe = (updatedRecipe: Recipe) => {
    setRecipes(prev => prev.map(r => r.id === updatedRecipe.id ? updatedRecipe : r));
  };

  const deleteRecipe = (id: string) => {
    setRecipes(prev => prev.filter(r => r.id !== id));
  };

  const toggleFavorite = (id: string) => {
    setRecipes(prev => prev.map(r => {
        if (r.id === id) {
            return { ...r, isFavorite: !r.isFavorite };
        }
        return r;
    }));
  };

  return (
    <RecipeContext.Provider value={{ recipes, addRecipe, updateRecipe, deleteRecipe, toggleFavorite }}>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </RecipeContext.Provider>
  );
};

export default App;
