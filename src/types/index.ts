
export interface Slide {
  id: string;
  title: string;
  content: string[];
  imagePrompt?: string;
  imageUrl?: string;
}

export interface Presentation {
  id: string;
  title: string;
  description: string;
  slides: Slide[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PresentationFormData {
  topic: string;
  audience: string;
  slides: number;
  style: 'professional' | 'creative' | 'minimal' | 'educational';
  additionalInfo?: string;
}

export interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}
