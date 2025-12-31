import React from 'react';
import { aboutTexts } from '../assets/aboutText';
import PhrasePageTemplate from '../templates/PhrasePageTemplate';
import useFetchPhrases from '../features/phrases/hooks/useFetchPhrases';

const InfoPage: React.FC = () => {
  const { data, loading, error } = useFetchPhrases('/phrases-praise-1.json');

  return (
    <PhrasePageTemplate
      pageTitle='Info: Additional Details About Allah'
      aboutTitle='About This Collection'
      aboutText={aboutTexts.info}
      phrases={data || { phrases: [], totalPhrases: 0, exportDate: '' }}
      idPrefix='info-phrase'
      sectionTitle='Additional Information About Allah'
      collectionAriaLabel='Collection of Quranic verses with additional information about Allah'
      loading={loading}
      error={error}
    />
  );
};

export default InfoPage;
