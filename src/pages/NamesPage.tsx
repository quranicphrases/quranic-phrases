import React from 'react';
import { aboutTexts } from '../assets/aboutText';
import PhrasePageTemplate from '../templates/PhrasePageTemplate';
import useFetchPhrases from '../features/phrases/hooks/useFetchPhrases';

const NamesPage: React.FC = () => {
  const { data, loading, error } = useFetchPhrases('/phrases-99-names.json');

  return (
    <PhrasePageTemplate
      pageTitle='99 Names of Allah from the Quran'
      aboutTitle='About the 99 Names'
      aboutText={aboutTexts.names}
      phrases={data || { phrases: [], totalPhrases: 0, exportDate: '' }}
      idPrefix='names-phrase'
      sectionTitle="Allah's Names in Quranic Phrases"
      collectionAriaLabel='Collection of Quranic phrases containing the 99 Names of Allah'
      loading={loading}
      error={error}
    />
  );
};

export default NamesPage;
