import { motion } from 'motion/react';
import { ChevronDown, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { PortfolioGrid } from '../components/PortfolioGrid';
import { usePortfolio } from '../context/PortfolioContext';

export const Home = () => {
  const { items, config, isLoading } = usePortfolio();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleVideoClick = () => {
    if (videoRef.current && !document.fullscreenElement) {
      videoRef.current.requestFullscreen().catch(err => {
        console.error("Fullscreen request failed:", err);
      });
    }
  };

  return (
    <main>
      <PageHeader />
      
      {/* Featured Intro Video */}
      <section className="px-6 md:px-12 py-8 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full aspect-[4000/1920] bg-black overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-natural-border/30 rounded-xl cursor-pointer"
          onClick={handleVideoClick}
        >
          <video 
            ref={videoRef}
            controls
            autoPlay
            muted
            loop 
            playsInline
            preload="auto"
            className="w-full h-full object-cover opacity-90 shadow-2xl"
            key={config?.hero.videoUrl}
          >
            {config?.hero.videoUrl && <source src={config.hero.videoUrl} type="video/mp4" />}
          </video>
        </motion.div>
      </section>

      {/* Scroll indicator */}
      <section className="py-12 flex flex-col items-center">
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="flex flex-col items-center gap-2 opacity-50 text-natural-muted"
        >
          <span className="text-[10px] uppercase tracking-widest font-bold">Scroll to Explore</span>
          <ChevronDown size={14} />
        </motion.div>
      </section>

      <PortfolioGrid items={items.slice(0, 3)} title="Featured Stories" subtitle="Selected Works" isLoading={isLoading} />
    </main>
  );
};
