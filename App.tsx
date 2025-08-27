
import React, { useState, useCallback } from 'react';
import { Recipe } from './types';
import { generateRecipe } from './services/geminiService';
import RecipeInput from './components/RecipeInput';
import RecipeDisplay from './components/RecipeDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import Hero from './components/Hero';

const App: React.FC = () => {
  const [ingredients, setIngredients] = useState<string>('');
  const [servings, setServings] = useState<number>(2);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateRecipe = useCallback(async () => {
    if (!ingredients.trim()) {
      setError('Please enter at least one protein ingredient.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setRecipe(null);

    try {
      const generatedRecipe = await generateRecipe(ingredients, servings);
      setRecipe(generatedRecipe);
    } catch (err) {
      console.error(err);
      setError('Sorry, we couldn\'t generate a recipe at this time. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [ingredients, servings]);

  return (
    <div className="min-h-screen bg-gray-900 text-white selection:bg-teal-400 selection:text-gray-900">
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(https://picsum.photos/seed/food/1920/1080)`, filter: 'blur(8px) brightness(0.4)'}}
      />
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <main className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8 py-10">
          <Hero />
          
          <div className="w-full max-w-3xl bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
            <RecipeInput
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              onSubmit={handleGenerateRecipe}
              isLoading={isLoading}
              servings={servings}
              onServingsChange={setServings}
            />
          </div>

          <div className="w-full max-w-4xl mt-4">
            {isLoading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            {recipe && <RecipeDisplay recipe={recipe} />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
