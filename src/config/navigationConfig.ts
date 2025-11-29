import { type PageLink } from '../components/ListOfPages';

// Navigation configuration for the application
export const pages: PageLink[] = [
  {
    path: '/overview',
    label: 'Overview',
    ariaLabel: 'Navigate to Overview of Quranic Phrases page',
  },
  {
    path: '/praises',
    label: 'Praises',
    ariaLabel: 'Navigate to Praises from the Quran page',
  },
  {
    path: '/extended-praises',
    label: 'Extended Praises',
    ariaLabel: 'Navigate to Extended Praises from the Quran page',
  },
  {
    path: '/prayers',
    label: 'Prayers',
    ariaLabel: 'Navigate to Prayers from the Quran page',
  },
  {
    path: '/anonymous',
    label: 'Anonymous',
    ariaLabel: 'Navigate to Anonymous Quranic Phrases page',
  },
];