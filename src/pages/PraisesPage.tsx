import React from 'react';
import { aboutTexts } from '../assets/aboutText';
import PhrasePageTemplate from '../templates/PhrasePageTemplate';
import useFetchPhrases from '../features/phrases/hooks/useFetchPhrases';

const PraisesPage: React.FC = () => {
  const { data, loading, error } = useFetchPhrases('/phrases-praise-0.json');

  return (
    <PhrasePageTemplate
      pageTitle='Praises from the Quran'
      aboutTitle='About Quranic Praises'
      aboutText={aboutTexts.praises}
      phrases={data || { phrases: [], totalPhrases: 0, exportDate: '' }}
      idPrefix='praise-phrase'
      sectionTitle='Quranic Praise Phrases'
      collectionAriaLabel='Collection of Quranic praise phrases with translations'
      loading={loading}
      error={error}
    />
  );
};

export default PraisesPage;
