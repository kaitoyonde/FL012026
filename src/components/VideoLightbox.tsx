/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { X, Maximize, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { PortfolioItem } from '../types';

interface VideoLightboxProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

export const VideoLightbox = ({ item, onClose }: VideoLightboxProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (item && videoRef.current) {
      videoRef.current.play().catch(err => console.warn("Lightbox play failed:", err));
    }
  }, [item]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        const video = videoRef.current;
        video.requestFullscreen().then(() => {
          if (screen.orientation && (screen.orientation as any).lock) {
            const isLandscape = video.videoWidth > video.videoHeight;
            (screen.orientation as any).lock(isLandscape ? 'landscape' : 'portrait').catch(() => {});
          }
        });
      }
    }
  };

  if (!item) return null;

  return (
    <AnimatePresence>
      {item && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
          onClick={onClose}
        >
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="absolute top-8 right-8 z-[110] text-white hover:text-natural-olive transition-colors"
          >
            <X size={32} />
          </button>

          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <video 
              ref={videoRef}
              src={item.url}
              className="w-full h-full object-contain"
              autoPlay
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            <div className="absolute bottom-6 right-6 flex gap-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
               <button 
                  onClick={toggleFullscreen}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
                  title="Fullscreen"
               >
                  <Maximize size={16} className="text-white" />
               </button>
               <button 
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.muted = !videoRef.current.muted;
                      setIsMuted(videoRef.current.muted);
                    }
                  }}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
                  title={isMuted ? "Unmute" : "Mute"}
               >
                  {isMuted ? <VolumeX size={16} className="text-white" /> : <Volume2 size={16} className="text-white" />}
               </button>
               <button 
                  onClick={() => {
                    if (videoRef.current) {
                      if (videoRef.current.paused) videoRef.current.play();
                      else videoRef.current.pause();
                    }
                  }}
                  className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
                  title={isPlaying ? "Pause" : "Play"}
               >
                  {isPlaying ? <Pause size={16} className="text-white" /> : <Play size={16} className="text-white ml-0.5" />}
               </button>
            </div>
            
            <div className="absolute top-6 left-6 text-white pointer-events-none">
              <h3 className="text-xl font-serif font-bold">{item.title}</h3>
              <p className="text-xs uppercase tracking-widest text-natural-muted font-bold mt-1">{item.category}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
