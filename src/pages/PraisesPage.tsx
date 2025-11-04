import React from 'react';
import { aboutTexts } from '../assets/aboutText';
import praisesData from '../assets/praises.json';
import PhraseDisplayPage from '../components/PhraseDisplayPage';
import type { PraisesData } from '../types/praisesTypes';

const PraisesPage: React.FC = () => {
  return (
    <PhraseDisplayPage
      pageTitle='Praises from the Quran'
      aboutTitle='About Quranic Praises'
      aboutText={aboutTexts.praises}
      phrases={praisesData as PraisesData}
      idPrefix='praise-phrase'
      sectionTitle='Quranic Praise Phrases'
      collectionAriaLabel='Collection of Quranic praise phrases with translations'
    />
  );
};

export default PraisesPage;
