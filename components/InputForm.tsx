
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface InputFormProps {
  urls: string;
  setUrls: (urls: string) => void;
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ urls, setUrls, prompt, setPrompt, onGenerate, isLoading }) => {
  return (
    <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700/50 shadow-lg space-y-6">
      <div>
        <label htmlFor="instagram-urls" className="block text-lg font-semibold text-gray-300 mb-2">
          Instagram Pages to Analyze
        </label>
        <p className="text-sm text-gray-500 mb-3">Enter one Instagram page URL per line.</p>
        <textarea
          id="instagram-urls"
          rows={4}
          className="w-full bg-gray-900/70 border border-gray-600 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 resize-y"
          placeholder="e.g., https://www.instagram.com/nasa&#x000A;https://www.instagram.com/natgeotravel"
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
          disabled={isLoading}
        />
      </div>
      
      <div>
        <label htmlFor="content-prompt" className="block text-lg font-semibold text-gray-300 mb-2">
          Content Request
        </label>
         <p className="text-sm text-gray-500 mb-3">What kind of content do you want to create?</p>
        <input
          id="content-prompt"
          type="text"
          className="w-full bg-gray-900/70 border border-gray-600 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
          placeholder="e.g., an educational carousel post about space"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <button
        onClick={onGenerate}
        disabled={isLoading}
        className="w-full flex items-center justify-center bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-900 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-100 focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
      >
        <SparklesIcon className="w-5 h-5 mr-2" />
        {isLoading ? 'Generating...' : 'Generate Content'}
      </button>
    </div>
  );
};
