import React from 'react';
import { aboutTexts } from '../assets/aboutText';
import PhrasePageTemplate from '../templates/PhrasePageTemplate';
import useFetchPhrases from '../features/phrases/hooks/useFetchPhrases';

const PrayersPage: React.FC = () => {
  const { data, loading, error } = useFetchPhrases('/phrases-prayer.json');

  return (
    <PhrasePageTemplate
      pageTitle='Prayers from the Quran'
      aboutTitle='About Quranic Prayers'
      aboutText={aboutTexts.prayers}
      phrases={data || { phrases: [], totalPhrases: 0, exportDate: '' }}
      idPrefix='prayer-phrase'
      sectionTitle='Quranic Prayer Phrases'
      collectionAriaLabel='Collection of Quranic prayer phrases with translations'
      loading={loading}
      error={error}
    />
  );
};

export default PrayersPage;
