/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PageHeader } from '../components/PageHeader';
import { PortfolioGrid } from '../components/PortfolioGrid';
import { PORTFOLIO_ITEMS } from '../constants';

export const Images = () => {
  const images = PORTFOLIO_ITEMS.filter(item => item.type === 'image');
  
  return (
    <main>
      <PageHeader />
      <PortfolioGrid items={images} showHeader={false} showDetails={false} />
    </main>
  );
};
