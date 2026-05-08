/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Instagram, Youtube } from 'lucide-react';

const NavItem = ({ label, to }: { label: string; to: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`group relative text-xs uppercase tracking-[0.2em] font-bold transition-colors text-natural-olive`}
    >
      {label}
      <span className={`absolute -bottom-1 left-0 h-[1px] bg-natural-olive transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
    </Link>
  );
};

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 flex flex-col items-center justify-center ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-md border-b border-natural-border shadow-2xl' 
          : 'bg-black/40 backdrop-blur-sm'
      }`}
    >
      <div className={`relative w-full flex justify-center items-center px-6 transition-all duration-500 ${isScrolled ? 'h-14 md:h-20' : 'h-20 md:h-28'}`}>
        {/* Desktop Menu */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden md:flex gap-10"
        >
          <NavItem label="Home" to="/" />
          <NavItem label="Images" to="/images" />
          <NavItem label="Films" to="/films" />
          <NavItem label="About" to="/about" />
          <NavItem label="Contact" to="/contact" />
        </motion.div>

        {/* Mobile Toggle */}
        <div 
          onClick={toggleMenu}
          className="md:hidden absolute inset-0 flex flex-col gap-[7px] cursor-pointer z-[70] items-center justify-center lg:pointer-events-none"
        >
          <motion.div 
            animate={isMenuOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
            className="w-8 h-0.5 bg-natural-ink origin-center transition-all duration-300" 
          />
          <motion.div 
            animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-8 h-0.5 bg-natural-ink transition-all duration-300" 
          />
          <motion.div 
            animate={isMenuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
            className="w-8 h-0.5 bg-natural-ink origin-center transition-all duration-300" 
          />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={isMenuOpen ? { opacity: 1, height: '100vh' } : { opacity: 0, height: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 w-full bg-natural-bg overflow-hidden flex flex-col items-center justify-center gap-12 z-[60] md:hidden pointer-events-auto"
      >
        <div className="flex flex-col items-center gap-10">
          <Link to="/" className="text-2xl font-serif italic text-natural-ink">Home</Link>
          <Link to="/images" className="text-2xl font-serif italic text-natural-ink">Images</Link>
          <Link to="/films" className="text-2xl font-serif italic text-natural-ink">Films</Link>
          <Link to="/about" className="text-2xl font-serif italic text-natural-ink">About</Link>
          <Link to="/contact" className="text-2xl font-serif italic text-natural-ink">Contact</Link>
        </div>
        
        <div className="mt-8 text-center px-12">
          <p className="text-[10px] uppercase tracking-widest text-natural-muted font-bold mb-6">Connect</p>
          <div className="flex gap-8 justify-center text-natural-olive">
            <Instagram size={20} />
            <Youtube size={20} />
            <Mail size={20} />
          </div>
        </div>
      </motion.div>
    </nav>
  );
};
