import React, { useState } from 'react';
import { Users, BookOpen, Share2, Image, Menu, X, Home } from 'lucide-react';
import { KknLogo } from './KknLogo';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  setActiveSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Beranda', icon: Home },
    { id: 'struktural', label: 'Struktural', icon: Users },
    { id: 'proker', label: 'Program Kerja', icon: BookOpen },
    { id: 'sosmed', label: 'Sosial Media', icon: Share2 },
    { id: 'dokumentasi', label: 'Dokumentasi', icon: Image },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-emerald-950/90 backdrop-blur-md border-b border-emerald-800/50 text-white transition-all shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Branding */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <KknLogo size="md" className="group-hover:scale-105 transition-transform" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-emerald-300 transition-colors">
                  KKN MAs
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-800/80 text-emerald-200 border border-emerald-600/40 font-medium">
                  Kelompok 24
                </span>
              </div>
              <p className="text-[11px] text-emerald-300/80 hidden sm:block">
                Desa Wonoagung • KKN Muhammadiyah &apos;Aisyiyah
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-sm ring-1 ring-emerald-500/30'
                      : 'text-emerald-100 hover:bg-emerald-900/60 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-300' : 'text-emerald-400/80'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Hamburger Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-emerald-900 text-emerald-200 hover:text-white focus:outline-none border border-emerald-700/50"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-emerald-950/95 border-b border-emerald-800 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-800 text-white font-semibold'
                    : 'text-emerald-100 hover:bg-emerald-900/80'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-300' : 'text-emerald-400'}`} />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
