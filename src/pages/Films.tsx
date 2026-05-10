/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PageHeader } from '../components/PageHeader';
import { PortfolioGrid } from '../components/PortfolioGrid';
import { usePortfolio } from '../context/PortfolioContext';

export const Films = () => {
  const { items, isLoading } = usePortfolio();
  const films = items.filter(item => item.type === 'video');
  
  return (
    <main>
      <PageHeader />
      <PortfolioGrid items={films} showHeader={false} showDetails={false} isLoading={isLoading} />
    </main>
  );
};
