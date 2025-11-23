import React, { useEffect, useState } from 'react';
import { aboutTexts } from '../assets/aboutText';
import PhraseDisplayPage from '../components/PhraseDisplayPage';
import type { PraisesData } from '../types/praisesTypes';

const PraisesPage: React.FC = () => {
  const [phrasesData, setPhrasesData] = useState<PraisesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhrases = async () => {
      try {
        const response = await fetch('/phrases-praise-0.json');
        if (!response.ok) {
          throw new Error('Failed to fetch praise phrases');
        }
        const data = await response.json();
        setPhrasesData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPhrases();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        Loading...
      </div>
    );
  }

  if (error || !phrasesData) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        Error: {error || 'No data available'}
      </div>
    );
  }

  return (
    <PhraseDisplayPage
      pageTitle='Praises from the Quran'
      aboutTitle='About Quranic Praises'
      aboutText={aboutTexts.praises}
      phrases={phrasesData}
      idPrefix='praise-phrase'
      sectionTitle='Quranic Praise Phrases'
      collectionAriaLabel='Collection of Quranic praise phrases with translations'
    />
  );
};

export default PraisesPage;
