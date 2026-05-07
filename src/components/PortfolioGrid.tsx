/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { PortfolioItem } from '../types';

interface PortfolioGridProps {
  items: PortfolioItem[];
  title?: string;
  subtitle?: string;
  showHeader?: boolean;
  showDetails?: boolean;
}

export const PortfolioGrid = ({ 
  items, 
  title = "Featured Stories", 
  subtitle = "The Dust & The Grit",
  showHeader = true,
  showDetails = true
}: PortfolioGridProps) => {
  return (
    <section id="work" className={`${showHeader ? 'py-24' : 'pt-8 pb-24'} px-6 md:px-12 max-w-screen-2xl mx-auto`}>
      {showHeader && (
        <div className="mb-16 flex justify-between items-end border-b border-natural-border pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-serif mb-2">{title}</h2>
            <p className="text-xs uppercase tracking-widest text-natural-muted font-bold">{subtitle}</p>
          </motion.div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-natural-footer rounded-lg shadow-sm border border-natural-border">
              <img 
                src={item.thumbnail} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter saturate-[0.7] sepia-[0.1] group-hover:saturate-100 group-hover:sepia-0"
              />
              <div className="absolute inset-0 bg-natural-olive/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                 <div className="w-14 h-14 rounded-full bg-white/90 text-natural-ink flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-xl">
                  <ArrowUpRight size={20} />
                 </div>
              </div>
              {item.type === 'video' && (
                <div className="absolute top-4 right-4 bg-natural-bg/80 backdrop-blur-md px-3 py-1 rounded text-[9px] uppercase tracking-[0.2em] font-bold text-natural-olive border border-natural-border">
                  Film
                </div>
              )}
            </div>
            {showDetails && (
              <div className="flex justify-between items-start px-2 mt-4">
                <div>
                  <h3 className="text-lg font-serif transition-colors group-hover:text-natural-olive">{item.title}</h3>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-natural-muted mt-1 font-bold">{item.category}</p>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};
