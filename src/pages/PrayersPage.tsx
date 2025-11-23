import React from 'react';
import { aboutTexts } from '../assets/aboutText';
import PhraseDisplayPage from '../components/PhraseDisplayPage';

const PrayersPage: React.FC = () => {
  return (
    <PhraseDisplayPage
      pageTitle='Prayers from the Quran'
      aboutTitle='About Quranic Prayers'
      aboutText={aboutTexts.prayers}
      phrases={[]}
      idPrefix='prayer-phrase'
      sectionTitle='Quranic Prayer Phrases'
      collectionAriaLabel='Collection of Quranic prayer phrases with translations'
    />
  );
};

export default PrayersPage;
