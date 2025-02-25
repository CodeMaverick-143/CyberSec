import React, { useState, useEffect, useCallback } from 'react';
import { Shield, Users, Terminal, Network, Github, BookOpen, ChevronRight, Menu, X, ExternalLink, Code, Lock } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [trails, setTrails] = useState<{ x: number; y: number; id: number }[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  const updateCursor = useCallback((e: MouseEvent) => {
    const cursor = document.querySelector('.cursor-dot') as HTMLElement;
    const cursorOutline = document.querySelector('.cursor-dot-outline') as HTMLElement;
    
    if (cursor && cursorOutline) {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
      cursorOutline.style.left = `${mouseX}px`;
      cursorOutline.style.top = `${mouseY}px`;

      // Add trail effect
      const newTrail = {
        x: mouseX,
        y: mouseY,
        id: Date.now()
      };

      setTrails(prevTrails => [...prevTrails, newTrail].slice(-5));
    }
  }, []);

  const handleLinkHover = useCallback((isHovering: boolean) => {
    const cursor = document.querySelector('.cursor-dot') as HTMLElement;
    const cursorOutline = document.querySelector('.cursor-dot-outline') as HTMLElement;

    if (cursor && cursorOutline) {
      if (isHovering) {
        cursor.classList.add('cursor-hover');
        cursorOutline.classList.add('cursor-hover');
        cursor.style.transform = 'scale(1.5)';
        cursorOutline.style.transform = 'scale(1.5)';
      } else {
        cursor.classList.remove('cursor-hover');
        cursorOutline.classList.remove('cursor-hover');
        cursor.style.transform = 'scale(1)';
        cursorOutline.style.transform = 'scale(1)';
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', updateCursor);
    
    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
      link.addEventListener('mouseenter', () => handleLinkHover(true));
      link.addEventListener('mouseleave', () => handleLinkHover(false));
    });

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      links.forEach(link => {
        link.removeEventListener('mouseenter', () => handleLinkHover(true));
        link.removeEventListener('mouseleave', () => handleLinkHover(false));
      });
    };
  }, [updateCursor, handleLinkHover]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] circuit-background">
      <div className="cursor-dot"></div>
      <div className="cursor-dot-outline"></div>
      {trails.map(trail => (
        <div
          key={trail.id}
          className="cursor-trail"
          style={{
            left: `${trail.x}px`,
            top: `${trail.y}px`,
            animation: 'trail-fade 0.5s forwards'
          }}
        />
      ))}

      {/* Navigation */}
      <nav className="glass-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-500 animate-pulse-slow" />
              <span className="ml-2 text-xl font-bold neon-text">CyberGuard</span>
            </div>
            
            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="cyber-button !p-2"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

            {/* Desktop menu */}
            <div className="hidden sm:flex sm:items-center sm:space-x-8">
              <a href="#" className="text-gray-300 hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors duration-300">Home</a>
              <a href="#" className="text-gray-300 hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors duration-300">About</a>
              <a href="#" className="text-gray-300 hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors duration-300">Events</a>
              <a href="#" className="text-gray-300 hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors duration-300">Resources</a>
              <a href="#" className="cyber-button">Join Now</a>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#" className="block px-3 py-2 text-gray-300 hover:text-blue-400 text-sm font-medium transition-colors duration-300">Home</a>
            <a href="#" className="block px-3 py-2 text-gray-300 hover:text-blue-400 text-sm font-medium transition-colors duration-300">About</a>
            <a href="#" className="block px-3 py-2 text-gray-300 hover:text-blue-400 text-sm font-medium transition-colors duration-300">Events</a>
            <a href="#" className="block px-3 py-2 text-gray-300 hover:text-blue-400 text-sm font-medium transition-colors duration-300">Resources</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              <span className="neon-text animate-glow">Secure the Future</span>
              <br />
              <span className="text-gray-100">Master Cybersecurity</span>
            </h1>
            <p className="mt-6 text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto">
              Join our elite community of cybersecurity enthusiasts. Learn advanced techniques,
              participate in CTF challenges, and build your skills in our state-of-the-art lab environment.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <a href="#" className="cyber-button group">
                Start Your Journey
                <ChevronRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#" className="cyber-button !bg-gray-800">
                Explore Resources
                <ExternalLink className="inline-block ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold neon-text">Why Choose CyberGuard?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Terminal className="h-6 w-6" />,
                title: "Hands-on Labs",
                description: "Practice in our secure environment with real-world scenarios and challenges."
              },
              {
                icon: <Users className="h-6 w-6" />,
                title: "Expert Community",
                description: "Connect with skilled professionals and like-minded security enthusiasts."
              },
              {
                icon: <Network className="h-6 w-6" />,
                title: "CTF Competitions",
                description: "Participate in Capture The Flag events and prove your skills."
              }
            ].map((feature, index) => (
              <div key={index} className="glass-card p-6 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500/20 text-blue-400 mb-4 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-center mb-4">{feature.title}</h3>
                <p className="text-gray-400 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Latest Events Section */}
      <div className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold neon-text">Upcoming Events</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Web Security Workshop",
                date: "March 15, 2024",
                icon: <Code className="h-6 w-6" />,
                description: "Learn about common web vulnerabilities and how to protect against them."
              },
              {
                title: "Cryptography Masterclass",
                date: "March 22, 2024",
                icon: <Lock className="h-6 w-6" />,
                description: "Deep dive into modern cryptographic techniques and their applications."
              }
            ].map((event, index) => (
              <div key={index} className="glass-card p-6 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-500/20 text-blue-400">
                    {event.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">{event.title}</h3>
                    <p className="text-gray-400 text-sm">{event.date}</p>
                  </div>
                </div>
                <p className="text-gray-400">{event.description}</p>
                <a href="#" className="mt-4 inline-flex items-center text-blue-400 hover:text-blue-300">
                  Learn more
                  <ChevronRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="glass-card mt-20">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center">
                <Shield className="h-8 w-8 text-blue-500" />
                <span className="ml-2 text-xl font-bold neon-text">CyberGuard</span>
              </div>
              <p className="mt-4 text-gray-400">
                Empowering the next generation of cybersecurity professionals.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Events</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Resources</a></li>
                <li><a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  <Github className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800">
            <p className="text-center text-gray-400">
              &copy; 2024 CyberGuard Club. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;