'use client';

import { useState } from 'react';
import { NAD } from '../types/nad';
import Link from 'next/link';
import { format } from 'date-fns';
import { DocumentIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { FaPlus } from 'react-icons/fa';

interface NadsListProps {
  nads: NAD[];
}

export default function NadsList({ nads }: NadsListProps) {
  const [sortBy, setSortBy] = useState<'createdAt' | 'ticketId'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedNads = [...nads].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    const order = sortOrder === 'asc' ? 1 : -1;
    
    return aValue < bValue ? -1 * order : aValue > bValue ? 1 * order : 0;
  });

  const handleSort = (field: 'createdAt' | 'ticketId') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'yyyy-MM-dd HH:mm:ss');
    } catch {
      return dateString;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Header */}
      <div className="px-4 py-5 border-b border-primary-200 sm:px-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg leading-6 font-medium text-accent-900">
            NADs ({nads.length})
          </h3>
          <div className="flex space-x-3">
            <button
              onClick={() => handleSort('createdAt')}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                sortBy === 'createdAt'
                  ? 'bg-accent-100 text-accent-700'
                  : 'text-accent-500 hover:text-accent-700'
              }`}
            >
              Sort by Date {sortBy === 'createdAt' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button
              onClick={() => handleSort('ticketId')}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                sortBy === 'ticketId'
                  ? 'bg-accent-100 text-accent-700'
                  : 'text-accent-500 hover:text-accent-700'
              }`}
            >
              Sort by Ticket {sortBy === 'ticketId' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <Link
              href="/nad/new"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-accent-600 hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500"
            >
              <FaPlus className="mr-2 h-4 w-4" />
              Create NAD
            </Link>
          </div>
        </div>
      </div>

      {/* NADs List */}
      <ul className="divide-y divide-primary-200">
        {sortedNads.map((nad) => (
          <li key={nad._id || nad.ticketId}>
            <Link 
              href={`/nad/${nad.ticketId}`}
              className="block hover:bg-primary-50"
            >
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DocumentIcon className="h-5 w-5 text-accent-400" />
                    <p className="ml-2 text-sm font-medium text-accent-900">
                      {nad.ticketId}
                    </p>
                    <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-accent-100 text-accent-800">
                      {nad.attackType}
                    </span>
                  </div>
                  <div className="flex items-center">
                    {nad.nadSolved === 'Yes' ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-500" title="Solved" />
                    ) : (
                      <XCircleIcon className="h-5 w-5 text-red-500" title="Not Solved" />
                    )}
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-accent-500">
                      {nad.targetUrl}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-accent-500 sm:mt-0">
                    <p>
                      Created by {nad.createdBy || 'dimidotdev'} on{' '}
                      {formatDate(nad.createdAt || '2025-02-12 04:18:09')}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Empty State */}
      {nads.length === 0 && (
        <div className="text-center py-12">
          <DocumentIcon className="mx-auto h-12 w-12 text-accent-400" />
          <h3 className="mt-2 text-sm font-medium text-accent-900">No NADs</h3>
          <p className="mt-1 text-sm text-accent-500">
            No NADs have been created yet.
          </p>
        </div>
      )}
    </div>
  );
}