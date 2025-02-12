'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import NadsList from '../components/NadsList';
import NadSkeleton from '../components/NADSkeleton';
import { NAD } from '../types/nad';

export default function NadsPage() {
  const [nads, setNads] = useState<NAD[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchNads = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/nad`);
        if (!response.ok) {
          throw new Error('Failed to fetch NADs');
        }
        const data = await response.json();
        
        const formattedNads = (data.nads || []).map((nad: NAD) => ({
          ...nad,
          createdAt: nad.createdAt || new Date().toISOString(),
          createdBy: nad.createdBy || 'dimidotdev'
        }));
        
        setNads(formattedNads);
      } catch (error) {
        console.error('Error fetching NADs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchNads();
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 mt-16">
        <NadSkeleton />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h1 className="text-2xl font-bold mb-6">NAD Board</h1>
      <NadsList nads={nads} />
    </div>
  );
}