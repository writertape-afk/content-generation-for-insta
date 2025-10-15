
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
          InstaGenius
        </h1>
        <p className="text-gray-400 mt-1 md:text-lg">
          AI-Powered Content Generation for Instagram
        </p>
      </div>
    </header>
  );
};
