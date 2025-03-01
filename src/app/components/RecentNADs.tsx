'use client';

import { useEffect, useState } from 'react';
import type { NAD } from '@/app/types/nad';
import Link from 'next/link';
import 'dotenv/config';

export const dynamic = 'force-dynamic';

export const RecentNADs = () => {
  const [recentNADs, setRecentNADs] = useState<NAD[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentNADs = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/nad/recent`);
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setRecentNADs(data.nads);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Error loading the NADs');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentNADs();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full max-w-md p-4 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
        {[...Array(5)].map((_, index) => (
          <div key={index} className="h-16 bg-gray-100 rounded-lg mb-2"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-md p-4">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Last NADs
      </h3>
      <div className="space-y-2">
        {recentNADs.map((nad) => (
          <div
            key={nad.ticketId}
            className="bg-white rounded-lg shadow-sm p-3 border border-gray-100 hover:border-blue-200 transition-colors"
          >
            <Link
              key={nad._id}
              href={`/nad/${nad._id}`}
              className="block hover:bg-gray-50 p-4 rounded-lg transition-colors"
            >
              <span className="font-medium text-blue-600">
                {nad.ticketId}
              </span>
              <span className="text-sm text-gray-500">
                {nad.creationTime instanceof Date ? nad.creationTime.toISOString() : nad.creationTime}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};