import { Suspense } from 'react';
import { getNads } from '../lib/services/nadServices';
import NadSkeleton from '../components/NADSkeleton';
import NadsList from '../components/NadsList';
export const dynamic = 'force-dynamic';

export default async function NadList() {
  const result = await getNads();
  
  const nads = (result?.nads || [])
    .map(nad => ({
      ...nad,
      createdAt: nad.createdAt || new Date().toISOString()
    }));

  return (
    <div className="min-h-screen p-4">
      <Suspense fallback={<NadSkeleton />}>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">NADs</h1>
        <NadsList nads={nads} />
      </Suspense>
    </div>
  );
}