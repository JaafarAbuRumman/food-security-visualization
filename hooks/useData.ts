import { useState, useEffect } from 'react';
import type { AppData } from '../types.ts';

type DataState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

// Cache the data to avoid re-fetching on every component mount
let cachedData: AppData | null = null;

export function useData<T>(dataKey: keyof AppData): DataState<T> {
  const [state, setState] = useState<DataState<T>>({
    data: cachedData ? (cachedData[dataKey] as T) : null,
    loading: !cachedData,
    error: null,
  });

  useEffect(() => {
    if (cachedData) {
      return;
    }

    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData: AppData = await response.json();
        cachedData = jsonData;
        if (isMounted) {
          setState({
            data: jsonData[dataKey] as T,
            loading: false,
            error: null,
          });
        }
      } catch (e) {
        if (isMounted) {
          setState({ data: null, loading: false, error: e as Error });
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [dataKey]);

  return state;
}