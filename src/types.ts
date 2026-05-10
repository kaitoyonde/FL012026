/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  type: 'video' | 'image';
  videoType?: 'direct' | 'youtube';
  url: string;
  thumbnail: string;
}

export interface SiteConfig {
  siteName: string;
  hero: {
    videoUrl: string;
    title: string;
    subtitle: string;
  };
  footer: {
    text: string;
    links: { label: string; url: string; }[];
  };
}
