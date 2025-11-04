import React from 'react';
import { aboutTexts } from '../assets/aboutText';
import praisesData from '../assets/praises-2.json';
import PhraseDisplayPage from '../components/PhraseDisplayPage';
import type { PraisesData } from '../types/praisesTypes';

const SecondaryPraisesPage: React.FC = () => {
  return (
    <PhraseDisplayPage
      pageTitle='Extended Praises from the Quran'
      aboutTitle='About Extended Quranic Praises'
      aboutText={aboutTexts.secondaryPraises}
      phrases={praisesData as PraisesData}
      idPrefix='extended-phrase'
      sectionTitle='Extended Quranic Praise Phrases'
      collectionAriaLabel='Collection of extended Quranic praise phrases with translations'
    />
  );
};

export default SecondaryPraisesPage;
