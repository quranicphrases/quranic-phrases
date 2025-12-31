import { type PageLink } from '../components/layout/ListOfPages';

// Navigation configuration for the application
export const pages: PageLink[] = [
  {
    path: '/overview',
    label: 'Overview',
    ariaLabel: 'Navigate to Overview of Quranic Phrases page',
  },
  {
    path: '/99-names',
    label: '99 Names',
    ariaLabel: 'Navigate to 99 Names of Allah page',
  },
  {
    path: '/praises',
    label: 'Praises',
    ariaLabel: 'Navigate to Praises from the Quran page',
  },
  {
    path: '/prayers',
    label: 'Prayers',
    ariaLabel: 'Navigate to Prayers from the Quran page',
  },
  {
    path: '/info',
    label: 'Info',
    ariaLabel: 'Navigate to Additional Information About Allah page',
  },
  {
    path: '/anonymous',
    label: 'Anonymous',
    ariaLabel: 'Navigate to Anonymous Quranic Phrases page',
  },
];