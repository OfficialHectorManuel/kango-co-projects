
    import React from 'react';
    import { Github, Linkedin, Twitter } from 'lucide-react';

    const Footer = () => {
      const currentYear = new Date().getFullYear();
      return (
        <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto py-8 px-4 text-center text-muted-foreground">
            <p className="text-sm">
              &copy; {currentYear} KANGO & CO PROJECT. All rights reserved.
            </p>
            <p className="text-sm mt-1">
              Made by <span className="font-semibold text-foreground">Hector Manuel</span>
            </p>
            <div className="mt-4 flex justify-center space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
        </footer>
      );
    };

    export default Footer;
  