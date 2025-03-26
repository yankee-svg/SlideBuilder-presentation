
import React from 'react';
// explains the props for the Loader component.

interface LoaderProps {
  text?: string;
}
//function def
const Loader: React.FC<LoaderProps> = ({ text = 'Generating your presentation...' }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-12 animate-fade-in">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-muted rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-primary rounded-full animate-spin"></div>
      </div>
      <p className="text-lg font-medium animate-pulse-soft">{text}</p>
      <div className="mt-8 w-full max-w-md">
        <div className="h-2 bg-muted rounded shimmer mb-4"></div>
        <div className="h-2 bg-muted rounded shimmer mb-4 w-5/6 mx-auto"></div>
        <div className="h-2 bg-muted rounded shimmer w-3/4 mx-auto"></div>
      </div>
    </div>
  );
};

export default Loader;
