'use client';

import NadForm from '../../components/NadForm';
import ProtectedRoute from '@/app/components/ProtectedRoute';

export default function NewNadPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8 mt-16">
        <h1 className="text-2xl font-bold mb-6">Create New NAD</h1>
        <NadForm />
      </div>
    </ProtectedRoute>
  );
}