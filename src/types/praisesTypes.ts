/**
 * TypeScript interfaces for Quranic phrases data structure
 * Provides type safety for the praises.json data
 */

export interface QuranicReference {
  surahNumber: number;
  ayahNumber: number;
}

export interface QuranicPhrase {
  arabicText: string;
  englishText: string;
  hindiText: string;
  urduText: string;
  references: QuranicReference[];
}

export interface PraisesData {
  exportDate: string;
  totalPhrases: number;
  phrases: QuranicPhrase[];
}

/**
 * Utility function to convert QuranicReference to string format
 * @param reference - The Quranic reference object
 * @returns Formatted reference string (e.g., "2:32")
 */
export const formatReference = (reference: QuranicReference): string => {
  return `${reference.surahNumber}:${reference.ayahNumber}`;
};

/**
 * Utility function to convert array of QuranicReferences to string array
 * @param references - Array of Quranic reference objects
 * @returns Array of formatted reference strings
 */
export const formatReferences = (references: QuranicReference[]): string[] => {
  return references.map(formatReference);
};