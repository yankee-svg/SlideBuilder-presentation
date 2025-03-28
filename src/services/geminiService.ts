import { Presentation, Slide, PresentationFormData, GeminiResponse } from '@/types';
// gemni model calling
const GEMINI_MODEL = 'gemini-2.0-flash';
const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';



class GeminiService {
  getApiKey(): string {
    return GEMINI_API_KEY;
  }

  async generatePresentation(formData: PresentationFormData): Promise<Presentation> {
    const apiKey = this.getApiKey();
    
    if (!apiKey) {
      throw new Error('Gemini API key is not set in environment variables (VITE_GEMINI_API_KEY)');
    }

    const prompt = this.buildPresentationPrompt(formData);
    
    try {
      const response = await fetch(
        `${GEMINI_BASE_URL}/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }]
              }
            ]
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json() as GeminiResponse;
      
      if (!data.candidates || data.candidates.length === 0) {
        throw new Error('No content generated');
      }

      const generatedText = data.candidates[0].content.parts[0].text;
      return this.parseGeminiResponse(generatedText, formData);
    } catch (error) {
      console.error('Error generating presentation:', error);
      throw error;
    }
  }


  //the generation results 
  private buildPresentationPrompt(formData: PresentationFormData): string {
    return `
Create a PowerPoint presentation about "${formData.topic}" for ${formData.audience}.
The presentation should have ${formData.slides} slides in a ${formData.style} style.
Additional information: ${formData.additionalInfo || 'None'}

Output the presentation in this exact JSON format structure:
{
  "title": "Main presentation title",
  "description": "Brief overview of the presentation",
  "slides": [
    {
      "title": "Slide title",
      "content": ["Bullet point 1", "Bullet point 2", "..."],
      "imagePrompt": "A descriptive prompt for an image that would work well with this slide"
    }
  ]
}

Each slide should have a title, content (as an array of bullet points), and an imagePrompt that describes what kind of image would work well for that slide.
`;
  }

  private parseGeminiResponse(text: string, formData: PresentationFormData): Presentation {
    // Extract JSON from the response (Gemini might include extra text)
    let jsonMatch = text.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error('Could not parse JSON response');
    }
    
    try {
      const parsedData = JSON.parse(jsonMatch[0]);
      
      // Transform into our Presentation type
      const presentation: Presentation = {
        id: this.generateId(),
        title: parsedData.title || formData.topic,
        description: parsedData.description || `A ${formData.style} presentation about ${formData.topic}`,
        slides: (parsedData.slides || []).map((slide: any, index: number) => ({
          id: this.generateId(),
          title: slide.title || `Slide ${index + 1}`,
          content: slide.content || [],
          imagePrompt: slide.imagePrompt || `Image related to ${slide.title}`
        })),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      return presentation;
    } catch (error) {
      console.error('Error parsing Gemini response:', error);
      throw new Error('Failed to parse presentation data');
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }
}

export const geminiService = new GeminiService();
