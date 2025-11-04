import type { FC } from 'react';
import PhraseDisplayPage from '../components/PhraseDisplayPage';
import overviewData from '../assets/overview.json';
import { aboutTexts } from '../assets/aboutText';

const OverviewPage: FC = () => {
  return (
    <PhraseDisplayPage
      pageTitle='Quranic Phrases Overview'
      aboutTitle='About This Collection'
      aboutText={aboutTexts.overview}
      phrases={overviewData}
      sectionTitle='Overview Collection'
      collectionAriaLabel='Quranic phrases overview collection with diverse verses and themes'
      idPrefix='overview'
    />
  );
};

export default OverviewPage;
