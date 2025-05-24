import React, { useState, useEffect, useRef } from 'react';
    import { Link } from 'react-router-dom';
    import { Moon, Sun, Menu, Volume2, VolumeX, Music2, Heart } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { useTheme } from '@/contexts/ThemeContext';
    import {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuItem,
      DropdownMenuTrigger,
      DropdownMenuSeparator
    } from "@/components/ui/dropdown-menu";
    import { useAuth } from '@/contexts/AuthContext';

    const Navbar = () => {
      const { theme, toggleTheme } = useTheme();
      const { user, logout } = useAuth();
      const [isSoundOn, setIsSoundOn] = useState(false);
      const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
      
      const audioTracks = useRef([
        { src: '/sounds/rain.mp3', name: 'Rain Sound' },
        { src: '/sounds/kango1.mp3', name: 'Kango Theme 1' },
        { src: '/sounds/kango2.mp3', name: 'Kango Beat 2' },
        { src: '/sounds/kango3.mp3', name: 'Kango Vibes 3' }
      ]);
      const audioRef = useRef(null);

      useEffect(() => {
        if (!audioRef.current) {
          audioRef.current = new Audio();
          audioRef.current.loop = true; 
        }
        
        const playAudio = async () => {
          try {
            audioRef.current.src = audioTracks.current[currentTrackIndex].src;
            if (isSoundOn) {
              await audioRef.current.play();
            }
          } catch (error) {
            console.error("Error playing audio:", error);
            // Potentially show a toast to the user or disable sound button
          }
        };
        playAudio();

      }, [currentTrackIndex, isSoundOn]);

      const toggleSound = () => {
        if (audioRef.current) {
          if (isSoundOn) {
            audioRef.current.pause();
          } else {
            // Ensure src is set before playing, especially if it's the first play
            audioRef.current.src = audioTracks.current[currentTrackIndex].src;
            audioRef.current.play().catch(error => console.error("Error playing audio on toggle:", error));
          }
          setIsSoundOn(!isSoundOn);
        }
      };

      const nextTrack = () => {
        // Pause current track before switching
        if (audioRef.current && isSoundOn) {
          audioRef.current.pause();
        }
        setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % audioTracks.current.length);
      };
      
      const navLinks = [
        { href: "/", label: "Home" },
        { href: "/contact", label: "Contact" },
        { href: "/support-me", label: "Support Me", icon: <Heart className="mr-2 h-4 w-4 text-red-500" /> },
      ];
      
      if (user) {
        navLinks.push({ href: "/admin", label: "Admin Panel" });
      }


      return (
        <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg">
          <div className="container mx-auto flex h-20 items-center justify-between px-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <img  src="/kango_logo.svg" alt="KANGO & CO Logo" className="h-12 w-12 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" src="https://images.unsplash.com/photo-1701929262617-65390e6abcae" />
              <div className="flex flex-col">
                <span className="font-orbitron font-bold text-2xl sm:text-3xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-500 via-cyan-400 to-teal-500 dark:from-sky-400 dark:via-cyan-300 dark:to-teal-400 transition-all duration-300 group-hover:text-shadow-lg">
                  KANGO & CO
                </span>
                <span className="text-xs text-muted-foreground -mt-1 uppercase tracking-widest">
                  Projects
                </span>
              </div>
            </Link>
            
            <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
              <span className="font-semibold">Made by Hector Manuel</span>
            </div>

            <div className="flex items-center space-x-1 sm:space-x-2">
              <nav className="hidden lg:flex space-x-1">
                {navLinks.map((link) => (
                  <Button key={link.label} variant="ghost" asChild>
                    <Link to={link.href} className="text-sm font-medium transition-colors hover:text-primary flex items-center">
                      {link.icon} {link.label}
                    </Link>
                  </Button>
                ))}
                {user && (
                  <Button variant="ghost" onClick={logout} className="text-sm font-medium transition-colors hover:text-destructive">
                    Logout
                  </Button>
                )}
              </nav>

              <Button variant="ghost" size="icon" onClick={toggleSound} aria-label="Toggle Sound">
                {isSoundOn ? <Volume2 className="h-5 w-5 text-primary" /> : <VolumeX className="h-5 w-5" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={nextTrack} aria-label="Next Track" title={`Now Playing: ${audioTracks.current[currentTrackIndex].name}`}>
                <Music2 className="h-5 w-5" />
              </Button>

              <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
                {theme === 'dark' ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-slate-600" />}
              </Button>
              
              <div className="lg:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 glassmorphism shadow-xl">
                    {navLinks.map((link) => (
                      <DropdownMenuItem key={link.label} asChild>
                        <Link to={link.href} className="flex items-center">{link.icon}{link.label}</Link>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    {user ? (
                       <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                        Logout
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem asChild>
                        <Link to="/login">Admin Login</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                     <DropdownMenuItem disabled>
                      <span className="text-xs text-muted-foreground">Made by Hector Manuel</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </header>
      );
    };

    export default Navbar;