import { useState, useEffect } from 'react';

interface GoogleReviews {
  rating: number;
  totalReviews: number;
}

export function useGoogleReviews() {
  const [reviews, setReviews] = useState<GoogleReviews>({ rating: 0, totalReviews: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch('/api/google-reviews');
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching reviews');
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, []);

  return { ...reviews, loading, error };
}