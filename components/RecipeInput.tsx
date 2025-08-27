
import React from 'react';

interface RecipeInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  isLoading: boolean;
  servings: number;
  onServingsChange: (servings: number) => void;
}

const RecipeInput: React.FC<RecipeInputProps> = ({ value, onChange, onSubmit, isLoading, servings, onServingsChange }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
        {/* Group for input and button */}
        <div className="w-full lg:w-auto flex-grow flex flex-col gap-4">
          <input
            type="text"
            value={value}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            placeholder="e.g., beef and chickpeas"
            disabled={isLoading}
            className="w-full px-5 py-4 text-lg bg-gray-800/50 text-white rounded-lg border-2 border-transparent focus:border-teal-400 focus:ring-0 focus:outline-none transition-all duration-300 placeholder-gray-400 disabled:opacity-50"
            aria-label="Protein ingredients"
          />
          <button
            onClick={onSubmit}
            disabled={isLoading}
            className="w-full flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-900 bg-teal-400 rounded-lg hover:bg-teal-300 focus:outline-none focus:ring-4 focus:ring-teal-400 focus:ring-opacity-50 transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed transform hover:scale-105 active:scale-100"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              'Generate Recipe'
            )}
          </button>
        </div>

        {/* Vertical slider group */}
        <div className="flex flex-col items-center justify-center gap-3 p-4 rounded-lg bg-black/20 self-stretch">
          <label htmlFor="servings-slider" className="font-semibold text-teal-200 tracking-wider text-sm">SERVINGS</label>
          <div className="relative flex justify-center items-center h-48 w-20">
            <input
              id="servings-slider"
              type="range"
              min="1"
              max="6"
              step="1"
              value={servings}
              onChange={(e) => onServingsChange(Number(e.target.value))}
              className="w-48 h-3 -rotate-90 appearance-none cursor-pointer bg-gray-700 rounded-lg focus:outline-none slider-thumb"
              aria-orientation="vertical"
            />
          </div>
          <span className="text-3xl font-bold text-white w-16 text-center bg-gray-900/50 rounded-lg py-1" aria-live="polite">{servings}</span>
        </div>
      </div>
       <style>{`
        .slider-thumb::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 28px;
          height: 28px;
          background: #2dd4bf; /* teal-400 */
          cursor: pointer;
          border-radius: 50%;
          border: 4px solid #1f2937; /* gray-800 */
          margin-top: -8px; /* Adjusted for perfect centering */
        }

        .slider-thumb::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #2dd4bf; /* teal-400 */
          cursor: pointer;
          border-radius: 50%;
          border: 4px solid #1f2937; /* gray-800 */
        }
      `}</style>
    </>
  );
};

export default RecipeInput;