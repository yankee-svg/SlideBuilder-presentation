
import React, { useState } from 'react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import PresentationForm from '@/components/PresentationForm';
import SlidePreview from '@/components/SlidePreview';
import Loader from '@/components/Loader';
import { Presentation, PresentationFormData } from '@/types';
import { geminiService } from '@/services/geminiService';

const Index = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [presentation, setPresentation] = useState<Presentation | null>(null);

  const handleFormSubmit = async (data: PresentationFormData) => {
    setIsLoading(true);
    
    try {
      const generatedPresentation = await geminiService.generatePresentation(data);
      setPresentation(generatedPresentation);
      toast.success('Presentation generated successfully!');
    } catch (error) {
      console.error('Error generating presentation:', error);
      toast.error('Failed to generate presentation. Please check the API key in your environment variables.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!presentation) return;
    
    // In a real app, we would generate PowerPoint file here
    // For now, let's just download the JSON
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(presentation, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${presentation.title.replace(/\s+/g, '-').toLowerCase()}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    
    toast.success('Presentation data downloaded successfully!');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8 px-4 md:px-8">
        {!presentation && !isLoading && (
          <div className="max-w-2xl mx-auto mt-8">
            <h1 className="text-4xl font-bold mb-4 text-center">Create Your Presentation</h1>
            <p className="text-lg text-center text-muted-foreground mb-12">
              Fill in the details below and let AI generate your presentation.
            </p>
            <PresentationForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </div>
        )}
        
        {isLoading && <Loader />}
        
        {presentation && !isLoading && (
          <SlidePreview presentation={presentation} onDownload={handleDownload} />
        )}
      </main>
      
      <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        <div className="container">
          <p>SlideBuilder AI Presentation Generator</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
