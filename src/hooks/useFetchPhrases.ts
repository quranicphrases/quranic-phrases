import { useEffect, useState, useCallback, useRef } from 'react';
import type { PraisesData } from '../types/praisesTypes';

interface UseFetchPhrasesOptions {
  /** Callback executed before API request */
  onBeforeRequest?: () => boolean | void;
  /** Callback executed on successful fetch */
  onSuccess?: (data: PraisesData) => void;
  /** Callback executed on error */
  onError?: (error: Error) => void;
  /** Callback executed after request completes (success or error) */
  onFinally?: () => void;
}

interface UseFetchPhrasesReturn {
  /** Fetched phrases data */
  data: PraisesData | null;
  /** Loading state */
  loading: boolean;
  /** Error message if request failed */
  error: string | null;
  /** Force refetch the data */
  refetch: () => void;
}

/**
 * Custom hook to fetch Quranic phrases from public JSON files
 * 
 * @param url - The URL path to the JSON file (e.g., '/phrases-praise-0.json')
 * @param options - Optional callbacks for request lifecycle
 * @returns Object containing data, loading state, error, and refetch function
 * 
 * @example
 * ```tsx
 * const { data, loading, error, refetch } = useFetchPhrases('/phrases-praise-0.json', {
 *   onSuccess: (data) => console.log('Loaded', data.totalPhrases, 'phrases'),
 *   onError: (error) => console.error('Failed to load:', error.message),
 * });
 * ```
 */
const useFetchPhrases = (
  url: string,
  options: UseFetchPhrasesOptions = {}
): UseFetchPhrasesReturn => {
  const [data, setData] = useState<PraisesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchIndex, setRefetchIndex] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const {
    onBeforeRequest,
    onSuccess,
    onError,
    onFinally,
  } = options;

  /**
   * Trigger a refetch of the data
   */
  const refetch = useCallback(() => {
    setRefetchIndex((prev) => prev + 1);
  }, []);

  useEffect(() => {
    // Check if request should proceed
    if (onBeforeRequest) {
      const shouldCancel = onBeforeRequest();
      if (shouldCancel === true) return;
    }

    // Abort previous request if still pending
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          signal: abortController.signal,
          // force-cache: Use cached version if available, fetch only if not cached
          // In production: ETags handle updates automatically
          // In development: Cache persists, use hard refresh (Cmd+Shift+R) to clear
          cache: 'force-cache',
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch phrases: ${response.status} ${response.statusText}`
          );
        }

        const jsonData: PraisesData = await response.json();
        
        // Only update state if request wasn't aborted
        if (!abortController.signal.aborted) {
          setData(jsonData);
          if (onSuccess) {
            onSuccess(jsonData);
          }
        }
      } catch (err) {
        // Ignore abort errors
        if (err instanceof Error && err.name !== 'AbortError') {
          const errorMessage = err.message || 'Unknown error occurred';
          setError(errorMessage);
          
          if (onError) {
            onError(err);
          }
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
          if (onFinally) {
            onFinally();
          }
        }
      }
    };

    fetchData();

    // Cleanup: abort request on unmount or dependency change
    return () => {
      abortController.abort();
    };
  }, [url, refetchIndex, onBeforeRequest, onSuccess, onError, onFinally]);

  return {
    data,
    loading,
    error,
    refetch,
  };
};

export default useFetchPhrases;
