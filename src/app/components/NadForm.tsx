'use client';

import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { NAD } from '../types/nad';
import { FaSpinner } from 'react-icons/fa';

const initialFormData: NAD = {
  ticketId: '',
  customerName: '',
  targetUrl: '',
  description: '',
  justification: '',
  impactAnalysis: '',
  technicalDetails: '',
  rollbackPlan: '',
  isEmergency: false,
  requiresDowntime: false,
  downtimeEstimate: '',
  affectedServices: '',
  testingDone: false,
  testingDetails: '',
  riskLevel: 'low',
  approvalRequired: false,
  approverName: '',
  implementationSteps: '',
  additionalNotes: ''
};

export default function NadForm() {
  const [formData, setFormData] = useState<NAD>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const currentDateTime = new Date().toISOString();
      
      const nadData = {
        ...formData,
        createdAt: currentDateTime,
        lastModifiedAt: currentDateTime,
        createdBy: user?.username || 'dimidotdev',
        lastModifiedBy: user?.username || 'dimidotdev'
      };

      const response = await fetch('/api/v1/nads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nadData),
      });

      if (!response.ok) {
        throw new Error('Failed to create NAD');
      }

      toast.success('NAD created successfully!');
      router.push('/nads');
    } catch (error) {
      console.error('Error creating NAD:', error);
      toast.error('Failed to create NAD. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <div className="p-6 space-y-8">
        <div className="space-y-6 border-b pb-6">
          <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ticket ID*
              </label>
              <input
                type="text"
                name="ticketId"
                required
                value={formData.ticketId}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter ticket ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Customer Name*
              </label>
              <input
                type="text"
                name="customerName"
                required
                value={formData.customerName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter customer name"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Target URL*
              </label>
              <input
                type="url"
                name="targetUrl"
                required
                value={formData.targetUrl}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                placeholder="https://example.com"
              />
            </div>
          </div>
        </div>
        <div className="space-y-6 border-b pb-6">
          <h2 className="text-xl font-semibold text-gray-900">Details and Justification</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description*
              </label>
              <textarea
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Detailed description of the NAD"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Justification*
              </label>
              <textarea
                name="justification"
                required
                value={formData.justification}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Business justification for this NAD"
              />
            </div>
          </div>
        </div>
        <div className="space-y-6 border-b pb-6">
          <h2 className="text-xl font-semibold text-gray-900">Technical Analysis</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Impact Analysis*
              </label>
              <textarea
                name="impactAnalysis"
                required
                value={formData.impactAnalysis}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Detailed analysis of potential impacts"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Technical Details*
              </label>
              <textarea
                name="technicalDetails"
                required
                value={formData.technicalDetails}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Technical specifications and details"
              />
            </div>
          </div>
        </div>
        <div className="space-y-6 border-b pb-6">
          <h2 className="text-xl font-semibold text-gray-900">Implementation and Rollback</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Implementation Steps*
              </label>
              <textarea
                name="implementationSteps"
                required
                value={formData.implementationSteps}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Step-by-step implementation instructions"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Rollback Plan*
              </label>
              <textarea
                name="rollbackPlan"
                required
                value={formData.rollbackPlan}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Detailed rollback procedures"
              />
            </div>
          </div>
        </div>
        <div className="space-y-6 border-b pb-6">
          <h2 className="text-xl font-semibold text-gray-900">Settings and Requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Risk Level*
              </label>
              <select
                name="riskLevel"
                required
                value={formData.riskLevel}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Affected Services
              </label>
              <input
                type="text"
                name="affectedServices"
                value={formData.affectedServices}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                placeholder="List affected services"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="isEmergency"
                checked={formData.isEmergency}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label className="text-sm text-gray-700">Emergency Change</label>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="requiresDowntime"
                checked={formData.requiresDowntime}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label className="text-sm text-gray-700">Requires Downtime</label>
            </div>

            {formData.requiresDowntime && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Downtime Estimate
                </label>
                <input
                  type="text"
                  name="downtimeEstimate"
                  value={formData.downtimeEstimate}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="e.g., 30 minutes"
                />
              </div>
            )}

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="testingDone"
                checked={formData.testingDone}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label className="text-sm text-gray-700">Testing Completed</label>
            </div>

            {formData.testingDone && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Testing Details
                </label>
                <textarea
                  name="testingDetails"
                  value={formData.testingDetails}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Describe the testing performed"
                />
              </div>
            )}
          </div>
        </div>

        {/* Seção: Notas Adicionais */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Additional Notes
            </label>
            <textarea
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Any additional information or notes"
            />
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-6 py-4 flex items-center justify-end space-x-4 rounded-b-lg">
        <button
          type="button"
          onClick={() => router.push('/nads')}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="animate-spin -ml-1 mr-2 h-4 w-4" />
              Creating...
            </>
          ) : (
            'Create NAD'
          )}
        </button>
      </div>
    </form>
  );
}