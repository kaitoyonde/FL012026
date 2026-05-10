/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioItem, SiteConfig } from '../types';

interface PortfolioContextType {
  items: PortfolioItem[];
  config: SiteConfig | null;
  isLoading: boolean;
  error: string | null;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [portfolioRes, configRes] = await Promise.all([
          fetch('/portfolio.json'),
          fetch('/site-config.json')
        ]);

        if (!portfolioRes.ok || !configRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const [portfolioData, configData] = await Promise.all([
          portfolioRes.json(),
          configRes.json()
        ]);

        setItems(portfolioData);
        setConfig(configData);
      } catch (err) {
        console.error('Error loading data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <PortfolioContext.Provider value={{ items, config, isLoading, error }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
