//calling out react 
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { PresentationFormData } from '@/types';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';// import diff forms
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';// selection option

const formSchema = z.object({
  topic: z.string().min(3, { message: 'Topic must be at least 3 characters' }),
  audience: z.string().min(3, { message: 'Please specify your audience' }),
  slides: z.number().min(3).max(20),
  style: z.enum(['professional', 'creative', 'minimal', 'educational']),
  additionalInfo: z.string().optional(),
});

interface PresentationFormProps {
  onSubmit: (data: PresentationFormData) => void;
  isLoading: boolean;
}

const PresentationForm: React.FC<PresentationFormProps> = ({ onSubmit, isLoading }) => {
  const [slideCount, setSlideCount] = useState<number>(8);
  
  const form = useForm<PresentationFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
      audience: '',
      slides: 8,
      style: 'professional',
      additionalInfo: '',
    },
  });
// slides number handling
  const handleSlideCountChange = (value: number[]) => {
    setSlideCount(value[0]);
    form.setValue('slides', value[0]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto glass-card rounded-xl p-8 animate-fade-in">
      <h2 className="text-2xl font-medium mb-6">Create Your Presentation</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Presentation Topic</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Introduction to Artificial Intelligence" {...field} />
                </FormControl>
                <FormDescription>
                  What is your presentation about?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="audience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Audience</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., College students, Business professionals" {...field} />
                </FormControl>
                <FormDescription>
                  Who will be viewing this presentation?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="slides"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Slides: {slideCount}</FormLabel>
                <FormControl>
                  <Slider
                    min={3}
                    max={20}
                    step={1}
                    value={[slideCount]}
                    onValueChange={handleSlideCountChange}
                    className="py-4"
                  />
                </FormControl>
                <FormDescription>
                  Select how many slides you want in your presentation
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="style"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Presentation Style</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a style" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="creative">Creative</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="educational">Educational</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose the overall tone and style of your presentation
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="additionalInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Information (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Add any specific details or requirements"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Include any special instructions or content you'd like to include
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button
            type="submit"
            className="w-full py-6"
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate Presentation'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PresentationForm;
