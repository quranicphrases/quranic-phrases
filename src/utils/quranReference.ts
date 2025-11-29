/**
 * Utility functions for handling Quran references and navigation
 */

/**
 * Translation IDs for Quran.com
 * Common translation identifiers used in Quran.com URL parameters
 */
export const QURAN_TRANSLATIONS = {
  SAHIH_INTERNATIONAL: 20,      // English - Sahih International
  BAYAN_UL_QURAN: 158,          // Urdu - Dr. Israr Ahmed (Bayan-ul-Quran)
  MAULANA_AZIZ_UL_HAQ: 122,     // Hindi - Maulana Aziz-ul-Haq al-Umari
} as const;

/**
 * Opens Quran.com page for a specific verse with pre-selected translations
 * @param surahNo - Surah number (1-114)
 * @param verseNo - Verse/Ayah number within the surah
 * @example
 * navigateToQuranVerse(2, 255) // Opens Ayat al-Kursi (2:255)
 */
export const navigateToQuranVerse = (surahNo: number, verseNo: number): void => {
  // Quran.com URL format with multiple translations
  // Translations: Sahih International (English), Bayan-ul-Quran (Urdu), Aziz-ul-Haq (Hindi)
  const translations = [
    QURAN_TRANSLATIONS.SAHIH_INTERNATIONAL,
    QURAN_TRANSLATIONS.BAYAN_UL_QURAN,
    QURAN_TRANSLATIONS.MAULANA_AZIZ_UL_HAQ,
  ].join(',');
  
  const url = `https://quran.com/${surahNo}/${verseNo}?translations=${translations}`;
  
  // Open in new tab with security features
  window.open(url, '_blank', 'noopener,noreferrer');
};

/**
 * Parse a reference string and navigate to the verse
 * @param reference - Reference string in format "surahNo:verseNo" (e.g., "2:255")
 * @example
 * navigateToQuranReference("2:255") // Opens Ayat al-Kursi
 */
export const navigateToQuranReference = (reference: string): void => {
  // Parse the reference string
  const [surahStr, verseStr] = reference.split(':');
  const surahNo = parseInt(surahStr, 10);
  const verseNo = parseInt(verseStr, 10);
  
  // Validate the parsed numbers
  if (isNaN(surahNo) || isNaN(verseNo)) {
    console.error(`Invalid reference format: ${reference}. Expected format: "surahNo:verseNo"`);
    return;
  }
  
  // Validate surah number range (1-114)
  if (surahNo < 1 || surahNo > 114) {
    console.error(`Invalid surah number: ${surahNo}. Must be between 1 and 114`);
    return;
  }
  
  // Navigate to the verse
  navigateToQuranVerse(surahNo, verseNo);
};

/**
 * Get the direct URL for a Quran verse without navigating
 * @param surahNo - Surah number (1-114)
 * @param verseNo - Verse/Ayah number within the surah
 * @returns The direct URL to the verse on Quran.com
 */
export const getQuranVerseUrl = (surahNo: number, verseNo: number): string => {
  const translations = [
    QURAN_TRANSLATIONS.SAHIH_INTERNATIONAL,
    QURAN_TRANSLATIONS.BAYAN_UL_QURAN,
    QURAN_TRANSLATIONS.MAULANA_AZIZ_UL_HAQ,
  ].join(',');
  
  return `https://quran.com/${surahNo}/${verseNo}?translations=${translations}`;
};
