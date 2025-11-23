import React from 'react';
import { aboutTexts } from '../assets/aboutText';
import PhraseDisplayPage from '../components/PhraseDisplayPage';
import useFetchPhrases from '../hooks/useFetchPhrases';

const PraisesPage: React.FC = () => {
  const { data, loading, error } = useFetchPhrases('/phrases-praise-0.json');

  return (
    <PhraseDisplayPage
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
