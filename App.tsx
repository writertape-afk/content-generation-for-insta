
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { GeneratedContent } from './components/GeneratedContent';
import { Footer } from './components/Footer';
import { generateContentFromPages } from './services/geminiService';

const App: React.FC = () => {
  const [instagramUrls, setInstagramUrls] = useState<string>('');
  const [generationPrompt, setGenerationPrompt] = useState<string>('a viral 30-second reel script');
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleGenerate = useCallback(async () => {
    if (!instagramUrls.trim() || !generationPrompt.trim()) {
      setError('Please provide at least one Instagram URL and a content request.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setGeneratedContent('');

    try {
      const content = await generateContentFromPages(instagramUrls, generationPrompt);
      setGeneratedContent(content);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to generate content: ${errorMessage}`);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [instagramUrls, generationPrompt]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
        <div className="w-full max-w-4xl space-y-8">
          <InputForm
            urls={instagramUrls}
            setUrls={setInstagramUrls}
            prompt={generationPrompt}
            setPrompt={setGenerationPrompt}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
          <GeneratedContent
            content={generatedContent}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
