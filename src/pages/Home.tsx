/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ChevronDown, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { PortfolioGrid } from '../components/PortfolioGrid';
import { usePortfolio } from '../context/PortfolioContext';

export const Home = () => {
  const { items, config, isLoading } = usePortfolio();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);
    if (videoRef.current && !document.fullscreenElement) {
      videoRef.current.requestFullscreen().catch(err => {
        console.error("Fullscreen automatically failed:", err);
      });
    }
  };

  const handlePause = () => setIsPlaying(false);
  const handleVolumeChange = () => {
    if (videoRef.current) {
      setIsMuted(videoRef.current.muted);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      setIsPlaying(!video.paused);
      setIsMuted(video.muted);

      return () => {
        // Event listeners are now handled by JSX props
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

  const handleManualPlay = async () => {
    if (videoRef.current) {
      try {
        if (!document.fullscreenElement) {
          await videoRef.current.requestFullscreen();
        }
        
        if (videoRef.current.paused) {
          videoRef.current.muted = false; // Unmute when user explicitly plays in fullscreen
          await videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      } catch (err) {
        console.error("Interaction failed:", err);
        // Fallback for browsers that block play() or fullscreen
        videoRef.current.play().catch(() => {});
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
          className="relative w-full aspect-[4000/1920] bg-black overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-natural-border/30 rounded-xl"
        >
          <video 
            ref={videoRef}
            controls
            loop 
            playsInline
            preload="auto"
            className="w-full h-full object-cover opacity-90 shadow-2xl"
            onPlay={handlePlay}
            onPause={handlePause}
            onVolumeChange={handleVolumeChange}
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
