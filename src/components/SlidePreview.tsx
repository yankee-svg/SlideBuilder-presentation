
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Download, FileType } from 'lucide-react';
import { Presentation, Slide } from '@/types';
import pptxgen from 'pptxgenjs';
import { toast } from 'sonner';

interface SlidePreviewProps {
  presentation: Presentation;
  onDownload: () => void;
}

const SlidePreview: React.FC<SlidePreviewProps> = ({ presentation, onDownload }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const currentSlide = presentation.slides[currentSlideIndex];
  
  const goToPreviousSlide = () => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };
  
  const goToNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev < presentation.slides.length - 1 ? prev + 1 : prev));
  };

  const downloadAsPptx = async () => {
    try {
      // Create a new presentation
      const pptx = new pptxgen();
      
      // Set presentation properties
      pptx.author = "SlideBuilder AI";
      pptx.title = presentation.title;
      pptx.subject = presentation.description;
      
      // Add slides
      presentation.slides.forEach((slide) => {
        // Create a new slide
        const pptxSlide = pptx.addSlide();
        
        // Add title
        pptxSlide.addText(slide.title, { 
          x: 0.5, 
          y: 0.5, 
          w: '90%', 
          fontSize: 24, 
          bold: true,
          color: "ffffff" 
        });
        
        // Add bullet points
        if (slide.content && slide.content.length > 0) {
          const bulletPoints = slide.content.map(point => ({ text: point }));
          
          pptxSlide.addText(bulletPoints, { 
            x: 0.5, 
            y: 1.5, 
            w: '45%',
            h: 3, 
            fontSize: 14,
            color: "ffffff",
            bullet: true 
          });
        }
        
        // Add image placeholder with the prompt as a text box
        if (slide.imagePrompt) {
          pptxSlide.addText(`[Image Placeholder]\n\n${slide.imagePrompt}`, { 
            x: 6, 
            y: 1.5, 
            w: 3.5, 
            h: 3, 
            fontSize: 12,
            color: "aaaaaa",
            italic: true,
            align: "center",
            valign: "middle",
            fill: { color: "333333" }
            // Removing the border property that's causing the TypeScript error
          });
        }
      });
      
      // Save the presentation
      pptx.writeFile({ fileName: `${presentation.title.replace(/\s+/g, '-').toLowerCase()}.pptx` });
      toast.success('PPTX file downloaded successfully!');
    } catch (error) {
      console.error('Error creating PPTX:', error);
      toast.error('Failed to create PPTX file');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-medium">{presentation.title}</h2>
        <div className="flex gap-2">
          <Button onClick={downloadAsPptx} className="flex items-center gap-2" variant="default">
            <FileType className="h-4 w-4" />
            Download PPTX
          </Button>
          <Button onClick={onDownload} variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download JSON
          </Button>
        </div>
      </div>
      
      <p className="text-muted-foreground mb-8">{presentation.description}</p>
      
      <Card className="aspect-[16/9] w-full overflow-hidden relative bg-gradient-to-br from-accent/20 to-background p-8 flex flex-col">
        <div className="absolute top-4 right-4 text-sm font-medium text-muted-foreground">
          Slide {currentSlideIndex + 1} of {presentation.slides.length}
        </div>
        
        <h3 className="text-3xl font-medium mb-8 text-center">{currentSlide.title}</h3>
        
        <div className="flex-1 flex">
          <div className="flex-1 flex flex-col justify-center">
            <ul className="space-y-4">
              {currentSlide.content.map((point, i) => (
                <li key={i} className="flex items-start gap-2 animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                  <span className="inline-block h-2 w-2 mt-2 rounded-full bg-primary"></span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {currentSlide.imagePrompt && (
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full max-w-xs p-4 border border-dashed border-border rounded-md bg-secondary/30 text-center">
                <p className="text-sm text-muted-foreground italic">
                  {currentSlide.imagePrompt}
                </p>
              </div>
            </div>
          )}
        </div>
      </Card>
      
      <div className="flex items-center justify-between mt-6">
        <Button
          variant="outline"
          onClick={goToPreviousSlide}
          disabled={currentSlideIndex === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        
        <div className="flex space-x-1">
          {presentation.slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlideIndex(i)}
              className={`h-2 w-2 rounded-full transition-all ${
                i === currentSlideIndex ? 'bg-primary w-4' : 'bg-muted'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        
        <Button
          variant="outline"
          onClick={goToNextSlide}
          disabled={currentSlideIndex === presentation.slides.length - 1}
          className="flex items-center gap-2"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SlidePreview;
