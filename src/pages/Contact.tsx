/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { PageHeader } from '../components/PageHeader';

export const Contact = () => {
  return (
    <main className="min-h-[60vh]">
      <PageHeader />
      
      <section className="py-12 px-6 md:px-12 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-[10px] uppercase tracking-widest font-bold text-natural-muted">Name</label>
                <input 
                  type="text" 
                  id="name"
                  placeholder="John Doe"
                  className="bg-transparent border-b border-natural-border py-3 px-1 focus:outline-none focus:border-natural-olive transition-colors text-natural-ink font-serif italic"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-[10px] uppercase tracking-widest font-bold text-natural-muted">Email</label>
                <input 
                  type="email" 
                  id="email"
                  placeholder="john@example.com"
                  className="bg-transparent border-b border-natural-border py-3 px-1 focus:outline-none focus:border-natural-olive transition-colors text-natural-ink font-serif italic"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="text-[10px] uppercase tracking-widest font-bold text-natural-muted">Subject</label>
              <input 
                type="text" 
                id="subject"
                placeholder="Collaboration Inquiry"
                className="bg-transparent border-b border-natural-border py-3 px-1 focus:outline-none focus:border-natural-olive transition-colors text-natural-ink font-serif italic"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-[10px] uppercase tracking-widest font-bold text-natural-muted">Message</label>
              <textarea 
                id="message"
                rows={4}
                placeholder="Tell me about your journey..."
                className="bg-transparent border-b border-natural-border py-3 px-1 focus:outline-none focus:border-natural-olive transition-colors text-natural-ink font-serif italic resize-none"
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-natural-olive text-black text-[10px] uppercase tracking-[0.3em] font-bold shadow-lg shadow-natural-olive/20 hover:bg-white hover:text-black transition-colors mt-8"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </section>
    </main>
  );
};
