import type { FC } from 'react';
import PhrasePageTemplate from '../templates/PhrasePageTemplate';
import { aboutTexts } from '../assets/aboutText';
import useFetchPhrases from '../features/phrases/hooks/useFetchPhrases';

const NoteworthyPage: FC = () => {
  const { data, loading, error } = useFetchPhrases('/phrases-default.json');

  return (
    <PhrasePageTemplate
      pageTitle='Noteworthy Quranic Phrases'
      aboutTitle='About Noteworthy Phrases'
      aboutText={aboutTexts.noteworthy}
      phrases={data || { phrases: [], totalPhrases: 0, exportDate: '' }}
      sectionTitle='Noteworthy Collection'
      collectionAriaLabel='Noteworthy Quranic phrases collection with significant verses'
      idPrefix='noteworthy'
      loading={loading}
      error={error}
    />
  );
};

export default NoteworthyPage;
