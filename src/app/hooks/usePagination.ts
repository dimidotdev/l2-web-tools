import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function usePagination(totalItems: number, itemsPerPage: number) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || 1
  );

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    const page = Number(searchParams.get('page')) || 1;
    setCurrentPage(page);
  }, [searchParams]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('page', page.toString());

    const search = current.toString();
    const query = search ? `?${search}` : '';

    router.push(`${window.location.pathname}${query}`);
  };

  return {
    currentPage,
    totalPages,
    handlePageChange,
    startIndex: (currentPage - 1) * itemsPerPage,
    endIndex: currentPage * itemsPerPage,
  };
}