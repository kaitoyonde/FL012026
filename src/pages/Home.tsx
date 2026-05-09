/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ChevronDown, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { PortfolioGrid } from '../components/PortfolioGrid';
import { PORTFOLIO_ITEMS } from '../constants';

export const Home = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      setIsPlaying(!video.paused);
      setIsMuted(video.muted);

      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleVolumeChange = () => setIsMuted(video.muted);

      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);
      video.addEventListener('volumechange', handleVolumeChange);

      // Explicitly set muted property to help bypass autoplay blocks
      video.muted = true;
      const attemptPlay = () => {
        video.play().then(() => setIsPlaying(true)).catch(error => {
          console.warn("Autoplay wait - interaction may be needed:", error);
          setIsPlaying(false);
        });
      };
      
      // Try immediate play
      attemptPlay();
      
      // Also try play on first user interaction with the document
      // which is a common pattern to "unlock" videos
      const handleFirstInteraction = () => {
        if (video.paused) {
          attemptPlay();
        }
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('scroll', handleFirstInteraction);
      };
      
      document.addEventListener('click', handleFirstInteraction);
      document.addEventListener('scroll', handleFirstInteraction);
      
      return () => {
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
        video.removeEventListener('volumechange', handleVolumeChange);
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('scroll', handleFirstInteraction);
      };
    }
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen().catch(err => {
          console.error("Fullscreen request failed:", err);
        });
      }
    }
  };

  const handleManualPlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
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
          className="relative w-full aspect-[4000/1920] bg-natural-footer overflow-hidden group cursor-pointer shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-natural-border/30"
          onClick={handleManualPlay}
        >
          <div className="absolute inset-0 z-0">
            <video 
              ref={videoRef}
              autoPlay 
              muted 
              loop 
              playsInline
              preload="auto"
              className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105"
            >
              <source src="/ANAMORPHIC.MP4" type="video/mp4" />
            </video>
          </div>
          
          <motion.div 
            initial={{ opacity: 1 }}
            animate={{ opacity: isPlaying ? 0 : 1 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-8 left-8 text-natural-ink z-10 transition-transform duration-500 group-hover:translate-x-2"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-80 mb-2 block">Featured Film</span>
            <h2 className="text-xl md:text-3xl font-serif font-bold">Across the Atlas: Morocco 2024</h2>
          </motion.div>

          <div className="absolute bottom-8 right-8 flex gap-4 z-20">
             <button 
                onClick={toggleFullscreen}
                className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
                title="Fullscreen"
             >
                <Maximize size={18} className="text-white" />
             </button>
             <button 
                onClick={toggleMute}
                className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
                title={isMuted ? "Unmute" : "Mute"}
             >
                {isMuted ? <VolumeX size={18} className="text-white" /> : <Volume2 size={18} className="text-white" />}
             </button>
             <div className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors">
                {isPlaying ? (
                  <Pause size={18} className="text-white" fill="white" />
                ) : (
                  <Play size={18} className="text-white ml-0.5" fill="white" />
                )}
             </div>
          </div>
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

      <PortfolioGrid items={PORTFOLIO_ITEMS.slice(0, 3)} title="Featured Stories" subtitle="Selected Works" />
    </main>
  );
};
