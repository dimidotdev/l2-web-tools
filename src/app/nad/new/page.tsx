'use client';

import CreateNadForm from '@/app/components/CreateNadForm';
import ProtectedRoute from '@/app/components/ProtectedRoute';

export default function NewNadPage() {
  return (
    <ProtectedRoute>
        <CreateNadForm />
    </ProtectedRoute>
  );
}