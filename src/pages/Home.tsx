/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { PortfolioGrid } from '../components/PortfolioGrid';
import { PORTFOLIO_ITEMS } from '../constants';

export const Home = () => {
  return (
    <main>
      <PageHeader />
      
      {/* Featured Intro Video */}
      <section className="w-full">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="relative w-full aspect-video bg-natural-footer overflow-hidden group"
        >
          <div className="absolute inset-0 z-0">
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105"
              src="https://assets.mixkit.co/videos/39926/39926-720.mp4"
            >
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-natural-ink/40 via-transparent to-transparent" />
          </div>
          
          <div className="absolute bottom-8 left-8 text-white z-10 transition-transform duration-500 group-hover:translate-x-2">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-80 mb-2 block">Featured Film</span>
            <h2 className="text-xl md:text-3xl font-serif italic">Across the Atlas: Morocco 2024</h2>
          </div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
             <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
             </div>
          </div>
        </motion.div>
      </section>

      {/* Scroll indicator */}
      <section className="py-12 flex flex-col items-center">
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="flex flex-col items-center gap-2 opacity-50 text-natural-olive"
        >
          <span className="text-[10px] uppercase tracking-widest font-bold">Scroll to Explore</span>
          <ChevronDown size={14} />
        </motion.div>
      </section>

      <PortfolioGrid items={PORTFOLIO_ITEMS.slice(0, 3)} title="Featured Stories" subtitle="Selected Works" />
    </main>
  );
};
