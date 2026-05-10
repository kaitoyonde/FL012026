/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PageHeader } from '../components/PageHeader';
import { PortfolioGrid } from '../components/PortfolioGrid';
import { usePortfolio } from '../context/PortfolioContext';

export const Images = () => {
  const { items, isLoading } = usePortfolio();
  const images = items.filter(item => item.type === 'image');
  
  return (
    <main>
      <PageHeader />
      <PortfolioGrid items={images} showHeader={false} showDetails={false} isLoading={isLoading} />
    </main>
  );
};
