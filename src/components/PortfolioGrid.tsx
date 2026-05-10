/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { PortfolioItem } from '../types';
import { VideoLightbox } from './VideoLightbox';

interface PortfolioGridProps {
  items: PortfolioItem[];
  title?: string;
  subtitle?: string;
  showHeader?: boolean;
  showDetails?: boolean;
  isLoading?: boolean;
}

export const PortfolioGrid = ({ 
  items, 
  title = "Featured Stories", 
  subtitle = "The Dust & The Grit",
  showHeader = true,
  showDetails = true,
  isLoading = false
}: PortfolioGridProps) => {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  if (isLoading) {
    return (
      <section className={`${showHeader ? 'py-24' : 'pt-8 pb-24'} px-6 md:px-12 max-w-screen-2xl mx-auto`}>
        {showHeader && (
          <div className="mb-16 border-b border-natural-border pb-8">
            <div className="h-10 w-64 bg-natural-footer animate-pulse rounded mb-2" />
            <div className="h-4 w-32 bg-natural-footer animate-pulse rounded" />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-[4/5] bg-natural-footer animate-pulse rounded-lg" />
              <div className="h-6 w-3/4 bg-natural-footer animate-pulse rounded" />
              <div className="h-4 w-1/4 bg-natural-footer animate-pulse rounded" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="work" className={`${showHeader ? 'py-24' : 'pt-8 pb-24'} px-6 md:px-12 max-w-screen-2xl mx-auto`}>
        {showHeader && (
          <div className="mb-16 flex justify-between items-end border-b border-natural-border pb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-serif font-black mb-2 text-natural-ink">{title}</h2>
              <p className="text-xs uppercase tracking-widest text-natural-muted font-bold">{subtitle}</p>
            </motion.div>
          </div>
        )}

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 md:gap-12 space-y-8 md:space-y-12">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="break-inside-avoid group cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative overflow-hidden bg-natural-footer rounded-lg shadow-sm border border-natural-border/30">
                <img 
                  src={item.thumbnail} 
                  alt={item.title}
                  className="w-full h-auto transition-transform duration-1000 group-hover:scale-105 filter grayscale-[0.3] group-hover:grayscale-0 contrast-110"
                />
                <div className="absolute inset-0 bg-natural-olive/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                   <div className="w-14 h-14 rounded-full bg-natural-olive text-black flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-2xl">
                    <ArrowUpRight size={20} />
                   </div>
                </div>
                {item.type === 'video' && (
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-[9px] uppercase tracking-[0.2em] font-bold text-natural-olive border border-white/10">
                    Film
                  </div>
                )}
              </div>
              {showDetails && (
                <div className="flex justify-between items-start px-2 mt-4">
                  <div>
                    <h3 className="text-lg font-serif font-bold transition-colors group-hover:text-natural-olive text-natural-ink">{item.title}</h3>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-natural-muted mt-1 font-bold">{item.category}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>
      
      <VideoLightbox 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </>
  );
};
