'use client';

import { useForm } from 'react-hook-form';
import Modal from './Modal';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import 'dotenv/config';

interface NADFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NADFormData {
  ticketId: string;
  customerName: string;
  targetUrl: string;
  creationTime: string;
}


export default function NADForm({ isOpen, onClose }: NADFormProps) {

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<NADFormData>();

  const onSubmit = async (data: NADFormData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/nads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Fail on creating NAD');
      }

      const result = await response.json();
      
      if (result.success) {
        toast.success('NAD succcessfuly created!');
        reset();
        onClose();
        router.refresh();
      } else {
        throw new Error(result.error || 'Error creating NAD');
      }
    } catch (error) {
      console.error('Erro:', error);
      toast.error('Error creating NAD');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h2 className="text-xl font-bold mb-4">New NAD</h2>
        
        <div>
          <label className="block text-sm font-medium mb-1">Ticket ID</label>
          <input
            {...register('ticketId', { required: 'Ticket ID is required' })}
            className="w-full border rounded-md px-3 py-2"
          />
          {errors.ticketId && (
            <span className="text-red-500 text-sm">{errors.ticketId.message}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Customer Name</label>
          <input
            {...register('customerName', { required: 'Customer name is required' })}
            className="w-full border rounded-md px-3 py-2"
          />
          {errors.customerName && (
            <span className="text-red-500 text-sm">{errors.customerName.message}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Target URL</label>
          <input
            {...register('targetUrl', { required: 'Target URL is required' })}
            className="w-full border rounded-md px-3 py-2"
          />
          {errors.targetUrl && (
            <span className="text-red-500 text-sm">{errors.targetUrl.message}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Creation time</label>
          <input
            type="datetime-local"
            {...register('creationTime')}
            className="w-full border rounded-md px-3 py-2"
          />
          {errors.creationTime && (
            <span className="text-red-500 text-sm">{errors.creationTime.message}</span>
          )}
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </Modal>
  );
}