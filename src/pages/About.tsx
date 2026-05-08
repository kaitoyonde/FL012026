/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { PageHeader } from '../components/PageHeader';

export const About = () => {
  return (
    <main>
      <PageHeader />
      <section className="py-12 px-6 md:px-12 max-w-4xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 w-full max-w-md"
        >
          <div className="aspect-[3/4] bg-natural-footer overflow-hidden rounded-2xl shadow-2xl border-8 border-natural-border relative">
            <img 
              src="https://images.unsplash.com/photo-1614165939020-f71f06887df4?q=80&w=1974&auto=format&fit=crop" 
              className="w-full h-full object-cover filter grayscale-[0.2] contrast-110"
              alt="Mark F. Kirkland"
            />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-natural-olive rounded-full flex items-center justify-center text-black hidden md:flex shadow-xl">
               <span className="text-[8px] uppercase tracking-widest font-bold text-center p-2">Est. 2012</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-serif mb-8 text-natural-ink">The Story</h2>
          <p className="text-lg text-natural-muted leading-relaxed max-w-2xl mx-auto">
            Mark F. Kirkland is a visual storyteller documenting the grit, the dust, and the silence of the open road.
            Currently based on the road, exploring the intersection of human endurance and mechanical grace.
          </p>
        </motion.div>
      </section>
    </main>
  );
};
