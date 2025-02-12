'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getNadById } from '@/app/lib/services/nadServices';
import { NAD } from '../../types/nad';
import { FaEdit, FaArrowLeft, FaClock, FaUser, FaExternalLinkAlt } from 'react-icons/fa';
import Link from 'next/link';
import NadDetailSkeleton from '../../components/NadDetailSkeleton';
import { toast } from 'react-hot-toast';

export default function NadDetailPage() {
  const [nad, setNad] = useState<NAD | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const fetchNad = async () => {
      try {
        const nadData = await getNadById(id);
        setNad(nadData);
      } catch (error) {
        console.error('Error fetching NAD:', error);
        toast.error('Failed to load NAD details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNad();
    }
  }, [id]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC'
      });
    } catch (error) {
      return dateString;
    }
  };

  if (loading) {
    return <NadDetailSkeleton />;
  }

  if (!nad) {
    return (
      <div className="min-h-screen bg-primary-100 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h1 className="text-2xl font-bold text-accent-800 mb-4">NAD Not Found</h1>
            <p className="text-accent-600 mb-6">The NAD you are looking for does not exist or has been removed.</p>
            <Link
              href="/nads"
              className="inline-flex items-center text-accent-600 hover:text-accent-800"
            >
              <FaArrowLeft className="mr-2" /> Back to NAD Board
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-100 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <Link
                  href="/nads"
                  className="text-accent-600 hover:text-accent-800 transition-colors"
                >
                  <FaArrowLeft className="h-5 w-5" />
                </Link>
                <h1 className="text-2xl font-bold text-accent-800">
                  NAD: {nad.ticketId}
                </h1>
              </div>
              <div className="flex items-center gap-6 text-sm text-accent-600">
                <div className="flex items-center gap-2">
                  <FaClock className="h-4 w-4" />
                  <span>Created: {formatDate(nad.createdAt!)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUser className="h-4 w-4" />
                  <span>By: {nad.createdBy}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <a
                href={nad.targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-accent-300 rounded-md shadow-sm text-sm font-medium text-accent-700 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500"
              >
                <FaExternalLinkAlt className="mr-2 h-4 w-4" />
                View Target
              </a>
              <Link
                href={`/nads/${nad.ticketId}/edit`}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-accent-800 hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500"
              >
                <FaEdit className="mr-2 h-4 w-4" />
                Edit NAD
              </Link>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <DetailCard title="Description">
              <div className="whitespace-pre-wrap">{nad.description}</div>
            </DetailCard>

            <DetailCard title="Justification">
              <div className="whitespace-pre-wrap">{nad.justification}</div>
            </DetailCard>

            <DetailCard title="Technical Details">
              <div className="whitespace-pre-wrap">{nad.technicalDetails}</div>
            </DetailCard>

            <DetailCard title="Implementation Steps">
              <div className="whitespace-pre-wrap">{nad.implementationSteps}</div>
            </DetailCard>

            <DetailCard title="Rollback Plan">
              <div className="whitespace-pre-wrap">{nad.rollbackPlan}</div>
            </DetailCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <DetailCard title="Customer Information">
              <div className="space-y-4">
                <InfoRow label="Customer Name" value={nad.customerName} />
                <InfoRow label="Risk Level" value={nad.riskLevel} />
                <InfoRow label="Affected Services" value={nad.affectedServices} />
              </div>
            </DetailCard>

            <DetailCard title="Implementation Details">
              <div className="space-y-4">
                <InfoRow
                  label="Emergency Change"
                  value={nad.isEmergency ? 'Yes' : 'No'}
                />
                <InfoRow
                  label="Requires Downtime"
                  value={nad.requiresDowntime ? 'Yes' : 'No'}
                />
                {nad.requiresDowntime && (
                  <InfoRow
                    label="Downtime Estimate"
                    value={nad.downtimeEstimate || 'Not specified'}
                  />
                )}
                <InfoRow
                  label="Testing Done"
                  value={nad.testingDone ? 'Yes' : 'No'}
                />
                {nad.testingDone && nad.testingDetails && (
                  <div className="mt-2">
                    <label className="block text-sm font-medium text-accent-700 mb-1">
                      Testing Details
                    </label>
                    <div className="text-sm text-accent-600 whitespace-pre-wrap">
                      {nad.testingDetails}
                    </div>
                  </div>
                )}
              </div>
            </DetailCard>

            {nad.additionalNotes && (
              <DetailCard title="Additional Notes">
                <div className="whitespace-pre-wrap">{nad.additionalNotes}</div>
              </DetailCard>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface DetailCardProps {
  title: string;
  children: React.ReactNode;
}

function DetailCard({ title, children }: DetailCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-accent-800 mb-4">{title}</h2>
      <div className="text-accent-600">{children}</div>
    </div>
  );
}

interface InfoRowProps {
  label: string;
  value: string;
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-accent-700">{label}</label>
      <div className="mt-1 text-sm text-accent-600">{value}</div>
    </div>
  );
}