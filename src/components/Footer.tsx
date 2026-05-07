/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Mail, Instagram, Youtube, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <section id="contact" className="py-24 px-6 bg-natural-bg">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-7xl font-serif mb-12">Let's talk journey.</h2>
          
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 mb-24">
            <a href="mailto:gisellegskuy@gmail.com" className="group flex flex-col items-center gap-4 transition-transform hover:-translate-y-1">
              <div className="w-20 h-20 rounded-full border border-natural-border flex items-center justify-center group-hover:bg-natural-olive group-hover:text-white transition-all duration-500 shadow-sm">
                <Mail size={28} strokeWidth={1.2} />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-natural-muted">Inquiry</span>
            </a>
            <a href="#" className="group flex flex-col items-center gap-4 transition-transform hover:-translate-y-1">
              <div className="w-20 h-20 rounded-full border border-natural-border flex items-center justify-center group-hover:bg-natural-olive group-hover:text-white transition-all duration-500 shadow-sm">
                <Instagram size={28} strokeWidth={1.2} />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-natural-muted">Updates</span>
            </a>
            <a href="#" className="group flex flex-col items-center gap-4 transition-transform hover:-translate-y-1">
              <div className="w-20 h-20 rounded-full border border-natural-border flex items-center justify-center group-hover:bg-natural-olive group-hover:text-white transition-all duration-500 shadow-sm">
                <Youtube size={28} strokeWidth={1.2} />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-natural-muted">Films</span>
            </a>
          </div>

          <div className="pt-24 border-t border-natural-border flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-natural-muted font-bold">
            <div className="flex items-center gap-2">
              <MapPin size={12} className="text-natural-olive" />
              <span>Available Internationally</span>
            </div>
            <p>© 2024 — Giskuy Z. Zells. All Rights Reserved.</p>
            <div className="flex gap-6">
              <span className="hover:text-natural-olive cursor-pointer">Privacy</span>
              <span className="hover:text-natural-olive cursor-pointer">Terms</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
