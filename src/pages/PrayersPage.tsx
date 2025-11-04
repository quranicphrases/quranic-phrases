import React from 'react';
import { aboutTexts } from '../assets/aboutText';
import prayersData from '../assets/prayers.json';
import PhraseDisplayPage from '../components/PhraseDisplayPage';
import type { PraisesData } from '../types/praisesTypes';

const PrayersPage: React.FC = () => {
  return (
    <PhraseDisplayPage
      pageTitle='Prayers from the Quran'
      aboutTitle='About Quranic Prayers'
      aboutText={aboutTexts.prayers}
      phrases={prayersData as PraisesData}
      idPrefix='prayer-phrase'
      sectionTitle='Quranic Prayer Phrases'
      collectionAriaLabel='Collection of Quranic prayer phrases with translations'
    />
  );
};

export default PrayersPage;
