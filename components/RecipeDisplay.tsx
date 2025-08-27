
import React, { useState } from 'react';
import { Recipe } from '../types';

interface RecipeDisplayProps {
  recipe: Recipe;
}

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe }) => {
  const [showBreakdown, setShowBreakdown] = useState(false);

  return (
    <div className="bg-gray-800/60 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl animate-fade-in">
      <h2 className="text-4xl font-bold text-teal-300 mb-4">{recipe.recipeName}</h2>
      <p className="text-lg text-gray-300 mb-6">{recipe.description}</p>
      
      <div className="mb-8 flex flex-col items-center justify-center text-center bg-gray-900/40 rounded-lg p-4 gap-2 border border-teal-500/30">
        <div className="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7.014A8.003 8.003 0 0117.657 18.657z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
          </svg>
          <div>
              <span className="text-white font-semibold text-md">Estimated Calories Per Serving</span>
              <p className="text-teal-300 font-bold text-3xl">{recipe.estimatedCaloriesPerServing} kcal</p>
          </div>
        </div>
        <div className="mt-2">
            <button 
                onClick={() => setShowBreakdown(!showBreakdown)}
                className="text-sm text-teal-400 hover:text-teal-200 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 rounded px-2 py-1"
                aria-expanded={showBreakdown}
            >
                {showBreakdown ? 'Hide' : 'Show'} Calorie Breakdown
            </button>
        </div>
        {showBreakdown && (
            <div className="mt-3 w-full max-w-md text-left animate-fade-in-fast">
                <ul className="space-y-1 text-sm">
                    {recipe.calorieBreakdown.map((item, index) => (
                        <li key={index} className="flex justify-between items-center p-2 rounded bg-white/5">
                            <span className="text-gray-300">{item.ingredient}</span>
                            <span className="font-semibold text-white">{Math.round(item.calories)} kcal</span>
                        </li>
                    ))}
                </ul>
            </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-2">
          <h3 className="text-2xl font-semibold text-white mb-4 border-b-2 border-teal-400 pb-2">Ingredients</h3>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start">
                <span className="text-teal-400 mr-3 mt-1">&#10003;</span>
                <span className="text-gray-200">{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="md:col-span-3">
          <h3 className="text-2xl font-semibold text-white mb-4 border-b-2 border-teal-400 pb-2">Instructions</h3>
          <ol className="space-y-4">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 bg-teal-400 text-gray-900 w-8 h-8 rounded-full flex items-center justify-center font-bold text-md mr-4">{index + 1}</span>
                <p className="text-gray-200">{instruction}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
       <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
          }
          @keyframes fade-in-fast {
            from { opacity: 0; max-height: 0; }
            to { opacity: 1; max-height: 500px; }
          }
          .animate-fade-in-fast {
            animation: fade-in-fast 0.4s ease-out forwards;
            overflow: hidden;
          }
        `}</style>
    </div>
  );
};

export default RecipeDisplay;