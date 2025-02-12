'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getNadById, updateNad } from '@/app/lib/services/nadServices';
import { NAD } from '../../../types/nad';
import { toast } from 'react-hot-toast';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import Link from 'next/link';

export default function EditNadPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<NAD>>({
    ticketId: '',
    customerName: '',
    description: '',
    justification: '',
    technicalDetails: '',
    implementationSteps: '',
    rollbackPlan: '',
    affectedServices: '',
    riskLevel: 'low',
    isEmergency: false,
    requiresDowntime: false,
    downtimeEstimate: '',
    testingDone: false,
    testingDetails: '',
    additionalNotes: '',
    targetUrl: '',
  });

  const params = useParams();
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    const fetchNad = async () => {
      try {
        const nadData = await getNadById(id as string);
        if (nadData) {
          setFormData(nadData);
        } else {
          toast.error('NAD not found');
          router.push('/nads');
        }
      } catch (error) {
        console.error('Error fetching NAD:', error);
        toast.error('Failed to load NAD');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNad();
    }
  }, [id, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await updateNad(id as string, {
        ...formData,
        lastModifiedAt: new Date().toISOString(),
        lastModifiedBy: 'dimidotdev'
      });
      toast.success('NAD updated successfully');
      router.push(`/nads/${id}`);
    } catch (error) {
      console.error('Error updating NAD:', error);
      toast.error('Failed to update NAD');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-100 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-primary-200 rounded w-1/4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-primary-200 rounded"></div>
                <div className="h-4 bg-primary-200 rounded w-5/6"></div>
              </div>
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
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link
                href={`/nads/${id}`}
                className="text-accent-600 hover:text-accent-800 transition-colors"
              >
                <FaArrowLeft className="h-5 w-5" />
              </Link>
              <h1 className="text-2xl font-bold text-accent-800">
                Edit NAD: {formData.ticketId}
              </h1>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-accent-800 mb-6">Main Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="Ticket ID"
                name="ticketId"
                value={formData.ticketId}
                onChange={handleChange}
                required
              />
              <FormField
                label="Customer Name"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                required
              />
              <FormField
                label="Target URL"
                name="targetUrl"
                value={formData.targetUrl}
                onChange={handleChange}
                type="url"
                required
              />
              <FormField
                label="Risk Level"
                name="riskLevel"
                value={formData.riskLevel}
                onChange={handleChange}
                type="select"
                options={[
                  { value: 'low', label: 'Low' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'high', label: 'High' },
                ]}
                required
              />
            </div>
          </div>

          {/* Details */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-accent-800 mb-6">Details</h2>
            <div className="space-y-6">
              <FormField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                type="textarea"
                required
              />
              <FormField
                label="Justification"
                name="justification"
                value={formData.justification}
                onChange={handleChange}
                type="textarea"
                required
              />
              <FormField
                label="Technical Details"
                name="technicalDetails"
                value={formData.technicalDetails}
                onChange={handleChange}
                type="textarea"
                required
              />
            </div>
          </div>

          {/* Implementation */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-accent-800 mb-6">Implementation</h2>
            <div className="space-y-6">
              <FormField
                label="Implementation Steps"
                name="implementationSteps"
                value={formData.implementationSteps}
                onChange={handleChange}
                type="textarea"
                required
              />
              <FormField
                label="Rollback Plan"
                name="rollbackPlan"
                value={formData.rollbackPlan}
                onChange={handleChange}
                type="textarea"
                required
              />
              <FormField
                label="Affected Services"
                name="affectedServices"
                value={formData.affectedServices}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-accent-800 mb-6">Additional Information</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Emergency Change"
                  name="isEmergency"
                  checked={formData.isEmergency}
                  onChange={handleChange}
                  type="checkbox"
                />
                <FormField
                  label="Requires Downtime"
                  name="requiresDowntime"
                  checked={formData.requiresDowntime}
                  onChange={handleChange}
                  type="checkbox"
                />
              </div>
              
              {formData.requiresDowntime && (
                <FormField
                  label="Downtime Estimate"
                  name="downtimeEstimate"
                  value={formData.downtimeEstimate}
                  onChange={handleChange}
                />
              )}

              <FormField
                label="Testing Done"
                name="testingDone"
                checked={formData.testingDone}
                onChange={handleChange}
                type="checkbox"
              />

              {formData.testingDone && (
                <FormField
                  label="Testing Details"
                  name="testingDetails"
                  value={formData.testingDetails}
                  onChange={handleChange}
                  type="textarea"
                />
              )}

              <FormField
                label="Additional Notes"
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                type="textarea"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4">
            <Link
              href={`/nads/${id}`}
              className="px-6 py-2 border border-accent-300 rounded-md shadow-sm text-accent-700 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-accent-800 hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaSave className="h-4 w-4" />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface FormFieldProps {
  label: string;
  name: string;
  value?: string | number;
  checked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  type?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
}

function FormField({
  label,
  name,
  value,
  checked,
  onChange,
  type = 'text',
  required = false,
  options = []
}: FormFieldProps) {
  const id = `field-${name}`;

  if (type === 'checkbox') {
    return (
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          className="h-4 w-4 text-accent-600 focus:ring-accent-500 border-primary-300 rounded"
        />
        <label htmlFor={id} className="text-sm font-medium text-accent-700">
          {label}
        </label>
      </div>
    );
  }

  if (type === 'textarea') {
    return (
      <div>
        <label htmlFor={id} className="block text-sm font-medium text-accent-700 mb-1">
          {label}
        </label>
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          rows={4}
          className="block w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
        />
      </div>
    );
  }

  if (type === 'select') {
    return (
      <div>
        <label htmlFor={id} className="block text-sm font-medium text-accent-700 mb-1">
          {label}
        </label>
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="block w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-accent-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="block w-full rounded-md border-primary-300 shadow-sm focus:border-accent-500 focus:ring-accent-500"
      />
    </div>
  );
}