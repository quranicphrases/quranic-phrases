import React from 'react';
import { aboutTexts } from '../assets/aboutText';
import PhraseDisplayPage from '../components/PhraseDisplayPage';
import useFetchPhrases from '../hooks/useFetchPhrases';

const SecondaryPraisesPage: React.FC = () => {
  const { data, loading, error } = useFetchPhrases('/phrases-praise-1.json');

  return (
    <PhraseDisplayPage
      pageTitle='Extended Praises from the Quran'
      aboutTitle='About Extended Quranic Praises'
      aboutText={aboutTexts.secondaryPraises}
      phrases={data || { phrases: [], totalPhrases: 0, exportDate: '' }}
      idPrefix='extended-phrase'
      sectionTitle='Extended Quranic Praise Phrases'
      collectionAriaLabel='Collection of extended Quranic praise phrases with translations'
      loading={loading}
      error={error}
    />
  );
};

export default SecondaryPraisesPage;
