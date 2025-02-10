import { Suspense } from 'react';
import NadList from '../components/NadsList';
import NadActions from './NadActions';

export default function Nads() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">NADs</h1>
        <NadActions />
      </div>

      <Suspense fallback={<div>Carregando NADs...</div>}>
        <NadList />
      </Suspense>
    </div>
  );
}