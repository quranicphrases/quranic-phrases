import type { FC } from 'react';
import PhrasePageTemplate from '../templates/PhrasePageTemplate';
import { aboutTexts } from '../assets/aboutText';
import useFetchPhrases from '../features/phrases/hooks/useFetchPhrases';

const OverviewPage: FC = () => {
  const { data, loading, error } = useFetchPhrases('/phrases-default.json');

  return (
    <PhrasePageTemplate
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
