/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PageHeader } from '../components/PageHeader';
import { PortfolioGrid } from '../components/PortfolioGrid';
import { PORTFOLIO_ITEMS } from '../constants';

export const Films = () => {
  const films = PORTFOLIO_ITEMS.filter(item => item.type === 'video');
  
  return (
    <main>
      <PageHeader />
      <PortfolioGrid items={films} showHeader={false} showDetails={false} />
    </main>
  );
};
