
import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface GeneratedContentProps {
  content: string;
  isLoading: boolean;
  error: string;
}

const WelcomeMessage: React.FC = () => (
  <div className="text-center p-8 border-2 border-dashed border-gray-700 rounded-lg">
    <h3 className="text-xl font-semibold text-gray-400">Ready to Create?</h3>
    <p className="text-gray-500 mt-2">
      Your generated content will appear here once you provide some Instagram pages and a prompt.
    </p>
  </div>
);

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
  <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg" role="alert">
    <strong className="font-bold">Error: </strong>
    <span className="block sm:inline">{message}</span>
  </div>
);

// Simple markdown-like parser to handle **bold** text and newlines
const FormattedContent: React.FC<{ text: string }> = ({ text }) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);

  const formatted = parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="text-indigo-300">{part.slice(2, -2)}</strong>;
    }
    // Handle newlines correctly
    const lines = part.split('\n').map((line, lineIndex) => (
      <React.Fragment key={lineIndex}>
        {line}
        {lineIndex < part.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
    return <span key={index}>{lines}</span>;
  });

  return <div className="whitespace-pre-wrap leading-relaxed">{formatted}</div>;
};


export const GeneratedContent: React.FC<GeneratedContentProps> = ({ content, isLoading, error }) => {
  return (
    <div className="bg-gray-800/60 p-6 rounded-2xl border border-gray-700/50 shadow-lg min-h-[20rem] flex flex-col justify-center">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center text-gray-400">
          <LoadingSpinner />
          <p className="mt-4 text-lg">AI is crafting your content...</p>
        </div>
      ) : error ? (
        <ErrorDisplay message={error} />
      ) : content ? (
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
           <FormattedContent text={content} />
        </div>
      ) : (
        <WelcomeMessage />
      )}
    </div>
  );
};
