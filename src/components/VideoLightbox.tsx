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
    // Initial effect removed to respect no autoplay
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
          await videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      } catch (err) {
        console.error("Interaction failed:", err);
        videoRef.current.play().catch(() => {});
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
            className="relative w-auto h-auto max-w-[95vw] max-h-[85vh] bg-black rounded-lg overflow-hidden shadow-2xl flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {item.type === 'video' ? (
              item.videoType === 'youtube' ? (
                <div className="w-full aspect-video md:w-[75vw] lg:w-[65vw]">
                  <iframe
                    src={`${item.url}?autoplay=1`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <video 
                  ref={videoRef}
                  src={item.url}
                  className="w-auto h-auto max-w-full max-h-[85vh] object-contain"
                  controls
                  playsInline
                  onPlay={() => {
                    setIsPlaying(true);
                    if (videoRef.current && !document.fullscreenElement) {
                      videoRef.current.requestFullscreen().catch(() => {});
                    }
                  }}
                  onPause={() => setIsPlaying(false)}
                />
              )
            ) : (
              <img 
                src={item.url} 
                alt={item.title}
                className="w-auto h-auto max-w-full max-h-[85vh] object-contain"
              />
            )}




            
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
