import React, { useEffect, useState } from 'react';
import { aboutTexts } from '../assets/aboutText';
import PhraseDisplayPage from '../components/PhraseDisplayPage';
import type { PraisesData } from '../types/praisesTypes';

const AnonymousPage: React.FC = () => {
  const [phrasesData, setPhrasesData] = useState<PraisesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhrases = async () => {
      try {
        const response = await fetch('/phrases-anonymous.json');
        if (!response.ok) {
          throw new Error('Failed to fetch anonymous phrases');
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
      pageTitle='Anonymous Quranic Phrases'
      aboutTitle='About Anonymous Phrases'
      aboutText={aboutTexts.anonymous}
      phrases={phrasesData}
      idPrefix='anonymous-phrase'
      sectionTitle='Anonymous Quranic Phrases'
      collectionAriaLabel='Collection of anonymous Quranic phrases with translations'
    />
  );
};

export default AnonymousPage;
