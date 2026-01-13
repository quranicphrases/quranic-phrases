import type { FC } from 'react';
import PhrasePageTemplate from '../templates/PhrasePageTemplate';
import { aboutTexts } from '../assets/aboutText';

const OverviewPage: FC = () => {
  return (
    <PhrasePageTemplate
      pageTitle='Quranic Phrases Overview'
      aboutTitle='About This Collection'
      aboutText={aboutTexts.overview}
      phrases={{ phrases: [], totalPhrases: 0, exportDate: '' }}
      sectionTitle='Overview Collection'
      collectionAriaLabel='Quranic phrases overview collection with diverse verses and themes'
      idPrefix='overview'
      loading={false}
      error={null}
      hidePhrasesList={true}
    />
  );
};

export default OverviewPage;
