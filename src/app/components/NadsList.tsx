'use client';

import { useState } from 'react';
import { NAD } from '../types/nad';
import Link from 'next/link';
import { FaEdit, FaTrash, FaEye, FaExternalLinkAlt } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';

interface NadsListProps {
  nads: NAD[];
}

export default function NadsList({ nads }: NadsListProps) {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof NAD;
    direction: 'asc' | 'desc';
  }>({ key: 'createdAt', direction: 'desc' });

  // Função de ordenação
  const sortedNads = [...nads].sort((a, b) => {
    if (a[sortConfig.key]! < b[sortConfig.key]!) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key]! > b[sortConfig.key]!) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Função de filtragem
  const filteredNads = sortedNads.filter(nad => 
    nad.ticketId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    nad.customerName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Função para mudar a ordenação
  const requestSort = (key: keyof NAD) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  // Função para formatar data
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return dateString;
    }
  };

  // Função para abrir NAD em nova aba
  const handleViewNad = (targetUrl: string) => {
    if (!targetUrl) {
      toast.error('URL not available');
      return;
    }
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  // Função para deletar NAD
  const handleDeleteNad = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this NAD?')) {
      return;
    }

    try {
      const response = await fetch(`/api/v1/nads/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete NAD');
      }

      toast.success('NAD deleted successfully');
      // Recarregar a página ou atualizar a lista
      window.location.reload();
    } catch (error) {
      console.error('Error deleting NAD:', error);
      toast.error('Failed to delete NAD');
    }
  };

  return (
    <div className="container mx-auto px-4">
      {/* Barra de pesquisa e botões */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search by Ticket ID or Customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-4">
          <Link
            href="/nads/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            New NAD
          </Link>
        </div>
      </div>

      {/* Tabela de NADs */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                onClick={() => requestSort('ticketId')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                Ticket ID
              </th>
              <th
                onClick={() => requestSort('customerName')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                Customer
              </th>
              <th
                onClick={() => requestSort('createdAt')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                Created At
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Created By
              </th>
              <th
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredNads.map((nad) => (
              <tr
                key={nad._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {nad.ticketId}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {nad.customerName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {formatDate(nad.createdAt!)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {nad.createdBy || user?.username || 'dimidotdev'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => handleViewNad(nad.targetUrl)}
                  className="text-green-600 hover:text-green-900"
                  title="View NAD"
                >
                  <FaExternalLinkAlt className="h-5 w-5" />
                </button>
                
                <Link
                  href={`/nads/${nad._id}`}
                  className="text-blue-600 hover:text-blue-900"
                  title="View Details"
                >
                  <FaEye className="h-5 w-5" />
                </Link>
                
                <Link
                  href={`/nads/${nad._id}/edit`}
                  className="text-indigo-600 hover:text-indigo-900"
                  title="Edit"
                >
                  <FaEdit className="h-5 w-5" />
                </Link>
                
                <button
                  onClick={() => handleDeleteNad(nad._id)}
                  className="text-red-600 hover:text-red-900"
                  title="Delete"
                >
                  <FaTrash className="h-5 w-5" />
                </button>
              </div>
            </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mensagem quando não há NADs */}
      {filteredNads.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No NADs found</p>
        </div>
      )}
    </div>
  );
}