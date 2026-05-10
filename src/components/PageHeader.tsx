/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';

export const PageHeader = () => {
  const { config } = usePortfolio();

  return (
    <section className="relative pt-24 md:pt-28 pb-12 px-6 md:px-12 max-w-screen-2xl mx-auto flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-8xl font-serif font-black leading-none tracking-[-0.04em] mb-4 text-natural-ink uppercase">
          {config?.hero.title || "KHARISMA.LIFE"}
        </h1>
        <p className="text-sm md:text-lg tracking-wide text-natural-muted">
          {config?.hero.subtitle || "Motorcycle Touring • Visual Storyteller • Explorer"}
        </p>
      </motion.div>
    </section>
  );
};
