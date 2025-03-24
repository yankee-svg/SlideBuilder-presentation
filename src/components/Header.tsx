
import React from 'react';
import { Presentation } from '@/components/ui/presentation';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-8 flex items-center justify-between border-b border-border animate-fade-in">
      <div className="flex items-center gap-2">
        <Presentation className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-medium tracking-tight">Slide<span className="text-primary">Builder</span></h1>
      </div>
      <nav className="flex gap-6">
        <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          Home
        </a>
        <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          Templates
        </a>
        <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          About
        </a>
      </nav>
    </header>
  );
};

export default Header;
