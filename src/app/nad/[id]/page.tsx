'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getNadById } from '@/app/lib/services/nadServices';
import { NAD } from '../../types/nad';
import { FaArrowLeft, FaClock, FaUser, FaExternalLinkAlt, FaTimesCircle, FaCheckCircle } from 'react-icons/fa';
import Link from 'next/link';
import NadDetailSkeleton from '../../components/NadDetailSkeleton';
import { toast } from 'react-hot-toast';

export default function NadDetailPage() {
  const [nad, setNad] = useState<NAD | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  useEffect(() => {
    const fetchNad = async () => {
      try {
        setLoading(true);
        setError(null);
        const nadData = await getNadById(id);
        setNad(nadData);
      } catch (error) {
        console.error('Error fetching NAD:', error);
        setError(error instanceof Error ? error.message : 'Failed to load NAD details');
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

  if (error || !nad) {
    return (
      <div className="min-h-screen bg-primary-100 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h1 className="text-2xl font-bold text-accent-800 mb-4">
              {error || 'NAD Not Found'}
            </h1>
            <p className="text-accent-600 mb-6">
              {error 
                ? 'An error occurred while loading the NAD details.' 
                : 'The NAD you are looking for does not exist or has been removed.'}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center text-accent-600 hover:text-accent-800"
              >
                <FaArrowLeft className="mr-2" /> Go Back
              </button>
              <Link
                href="/nad"
                className="inline-flex items-center text-accent-600 hover:text-accent-800"
              >
                Return to NAD Board
              </Link>
            </div>
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
                  href="/nad"
                  className="text-accent-600 hover:text-accent-800 transition-colors"
                >
                  <FaArrowLeft className="h-5 w-5" />
                </Link>
                <h1 className="text-2xl font-bold text-accent-800">
                  NAD Details: {nad?.ticketId}
                </h1>
                {nad?.nadSolved === 'Yes' ? (
                  <FaCheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <FaTimesCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
              <div className="flex items-center gap-6 text-sm text-accent-600">
                <div className="flex items-center gap-2">
                  <FaClock className="h-4 w-4" />
                  <span>Created: {formatDate(nad?.createdAt || '')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUser className="h-4 w-4" />
                  <span>By: {nad?.createdBy}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <a
                href={nad?.targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-accent-300 rounded-md shadow-sm text-sm font-medium text-accent-700 bg-white hover:bg-primary-50"
              >
                <FaExternalLinkAlt className="mr-2 h-4 w-4" />
                View Target
              </a>
              <a
                href={nad?.endingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-accent-300 rounded-md shadow-sm text-sm font-medium text-accent-700 bg-white hover:bg-primary-50"
              >
                <FaExternalLinkAlt className="mr-2 h-4 w-4" />
                View Ending URL
              </a>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <DetailCard title="Attack Basic Information">
              <div className="space-y-4">
                <InfoRow label="Attack Type" value={nad?.attackType || ''} />
                <InfoRow label="HTML Captured" value={nad?.htmlCaptured || ''} />
                <InfoRow label="Active Incident" value={nad?.isActiveIncident || ''} />
                <InfoRow label="Ends at Client Page" value={nad?.endsAtClientPage || ''} />
                {nad?.ipAddress && <InfoRow label="IP Address" value={nad.ipAddress} />}
                {nad?.basicObservations && (
                  <div>
                    <label className="block text-sm font-medium text-accent-700">Observations</label>
                    <div className="mt-1 text-sm text-accent-600 whitespace-pre-wrap">
                      {nad.basicObservations}
                    </div>
                  </div>
                )}
              </div>
            </DetailCard>

            <DetailCard title="Detection">
              <div className="space-y-4">
                <InfoRow label="Detected by DMS Script" value={nad?.detectedByDMS || ''} />
                <InfoRow label="DMS in Source Code" value={nad?.dmsInSourceCode || ''} />
                <InfoRow label="Thread Alerts" value={nad?.hasThreadAlerts || ''} />
                {nad?.threadAlertsDate && (
                  <InfoRow label="Thread Alerts Date" value={formatDate(nad.threadAlertsDate)} />
                )}
                <InfoRow label="Customer Creation" value={formatDate(nad?.customerCreationDate || '')} />
              </div>
            </DetailCard>

            <DetailCard title="Phishing Resources">
              <div className="space-y-4">
                <InfoRow label="Found in DNPedia" value={nad?.foundInDNPedia || ''} />
                {nad?.dnpediaDate && (
                  <InfoRow label="DNPedia Date" value={formatDate(nad.dnpediaDate)} />
                )}
                <InfoRow label="Found in DBI Suspicious Domain" value={nad?.foundInDBISuspiciousDomain || ''} />
                <InfoRow label="Found in URLScan" value={nad?.foundInURLScan || ''} />
                {nad?.urlscanDate && (
                  <InfoRow label="URLScan Date" value={formatDate(nad.urlscanDate)} />
                )}
                {nad?.scanLink && (
                  <div>
                    <label className="block text-sm font-medium text-accent-700">Scan Link</label>
                    <a
                      href={nad.scanLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 text-sm text-accent-600 hover:text-accent-800"
                    >
                      {nad.scanLink}
                    </a>
                  </div>
                )}
                <InfoRow label="Found in Virus Total" value={nad?.foundInVirusTotal || ''} />
                <InfoRow label="Found in Finsin" value={nad?.foundInFinsin || ''} />
                <InfoRow label="Reported to PhishTank" value={nad?.reportedToPhishTank || ''} />
                {nad?.phishTankUser && <InfoRow label="PhishTank User" value={nad.phishTankUser} />}
                {nad?.phishTankReportLink && (
                  <div>
                    <label className="block text-sm font-medium text-accent-700">PhishTank Report</label>
                    <a
                      href={nad.phishTankReportLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 text-sm text-accent-600 hover:text-accent-800"
                    >
                      {nad.phishTankReportLink}
                    </a>
                  </div>
                )}
                <InfoRow label="Found in Meta ADs" value={nad?.foundInMetaAds || ''} />
                <InfoRow label="Found in Google ADs" value={nad?.foundInGoogleAds || ''} />
                <InfoRow label="Found in Twitter/X" value={nad?.foundInTwitter || ''} />
                {nad?.twitterUser && <InfoRow label="Twitter/X User" value={nad.twitterUser} />}
                {nad?.twitterTags && (
                  <div>
                    <label className="block text-sm font-medium text-accent-700">Twitter/X Tags</label>
                    <div className="mt-1 text-sm text-accent-600 whitespace-pre-wrap">
                      {nad.twitterTags}
                    </div>
                  </div>
                )}
                <InfoRow label="Detected by Weblogs" value={nad?.detectedByWeblogs || ''} />
                {nad?.phishingObservations && (
                  <div>
                    <label className="block text-sm font-medium text-accent-700">Observations</label>
                    <div className="mt-1 text-sm text-accent-600 whitespace-pre-wrap">
                      {nad.phishingObservations}
                    </div>
                  </div>
                )}
              </div>
            </DetailCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <DetailCard title="Keywords">
              <div className="space-y-4">
                {nad?.keywordsInDomain && (
                  <InfoRow label="Found in Domain" value={nad.keywordsInDomain} />
                )}
                {nad?.keywordsInSubdomain && (
                  <InfoRow label="Found in Subdomain" value={nad.keywordsInSubdomain} />
                )}
                <InfoRow label="Keywords Configured" value={nad?.keywordsConfigured || ''} />
                {nad?.keywordsObservations && (
                  <div>
                    <label className="block text-sm font-medium text-accent-700">Observations</label>
                    <div className="mt-1 text-sm text-accent-600 whitespace-pre-wrap">
                      {nad.keywordsObservations}
                    </div>
                  </div>
                )}
              </div>
            </DetailCard>

            <DetailCard title="Manual Searches">
              <div className="space-y-2">
                {nad?.manualSearches && Object.entries(nad.manualSearches).map(([key, value]) => (
                  <div key={key} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={value}
                      disabled
                      className="h-4 w-4 text-accent-600 border-primary-300 rounded"
                    />
                    <label className="ml-2 text-sm text-accent-700">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </DetailCard>

            <DetailCard title="Final Analysis">
              <div className="space-y-4">
                <InfoRow label="NAD Solved" value={nad?.nadSolved || ''} />
                {nad?.finalObservations && (
                  <div>
                    <label className="block text-sm font-medium text-accent-700">Observations</label>
                    <div className="mt-1 text-sm text-accent-600 whitespace-pre-wrap">
                      {nad.finalObservations}
                    </div>
                  </div>
                )}
                {nad?.qa && (
                  <div>
                    <label className="block text-sm font-medium text-accent-700">Q/A</label>
                    <div className="mt-1 text-sm text-accent-600 whitespace-pre-wrap">
                      {nad.qa}
                    </div>
                  </div>
                )}
                {nad?.actionsToTake && (
                  <div>
                    <label className="block text-sm font-medium text-accent-700">Actions to Take</label>
                    <div className="mt-1 text-sm text-accent-600 whitespace-pre-wrap">
                      {nad.actionsToTake}
                    </div>
                  </div>
                )}
              </div>
            </DetailCard>
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