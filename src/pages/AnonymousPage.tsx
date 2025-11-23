import React from 'react';
import { aboutTexts } from '../assets/aboutText';
import PhraseDisplayPage from '../components/PhraseDisplayPage';
import useFetchPhrases from '../hooks/useFetchPhrases';

const AnonymousPage: React.FC = () => {
  const { data, loading, error } = useFetchPhrases('/phrases-anonymous.json');

  return (
    <PhraseDisplayPage
      pageTitle='Anonymous Quranic Phrases'
      aboutTitle='About Anonymous Phrases'
      aboutText={aboutTexts.anonymous}
      phrases={data || { phrases: [], totalPhrases: 0, exportDate: '' }}
      idPrefix='anonymous-phrase'
      sectionTitle='Anonymous Quranic Phrases'
      collectionAriaLabel='Collection of anonymous Quranic phrases with translations'
      loading={loading}
      error={error}
    />
  );
};

export default AnonymousPage;
