import type { FC } from 'react';
import PhraseDisplayPage from '../components/PhraseDisplayPage';
import { aboutTexts } from '../assets/aboutText';
import useFetchPhrases from '../hooks/useFetchPhrases';

const OverviewPage: FC = () => {
  const { data, loading, error } = useFetchPhrases('/phrases-overview.json');

  return (
    <PhraseDisplayPage
      pageTitle='Quranic Phrases Overview'
      aboutTitle='About This Collection'
      aboutText={aboutTexts.overview}
      phrases={data || { phrases: [], totalPhrases: 0, exportDate: '' }}
      sectionTitle='Overview Collection'
      collectionAriaLabel='Quranic phrases overview collection with diverse verses and themes'
      idPrefix='overview'
      loading={loading}
      error={error}
    />
  );
};

export default OverviewPage;
