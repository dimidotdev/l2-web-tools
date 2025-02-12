import { NAD } from '../../types/nad';

export async function getNads() {
  try {
    const response = await fetch('/api/v1/nads', {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch NADs');
    }

    const data = await response.json();
    return data.nads || [];
  } catch (error) {
    console.error('Error fetching NADs:', error);
    return [];
  }
}

export async function getNadById(id: string) {
  try {
    const response = await fetch(`/api/v1/nads/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch NAD');
    }

    const data = await response.json();
    return data.nad;
  } catch (error) {
    console.error('Error fetching NAD:', error);
    return null;
  }
}

export async function createNad(nadData: Partial<NAD>) {
  try {
    const response = await fetch('/api/v1/nads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...nadData,
        createdAt: new Date().toISOString(),
        createdBy: 'dimidotdev'
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create NAD');
    }

    const data = await response.json();
    return data.nad;
  } catch (error) {
    console.error('Error creating NAD:', error);
    throw error;
  }
}

export async function updateNad(id: string, nadData: Partial<NAD>) {
  try {
    const response = await fetch(`/api/v1/nads/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...nadData,
        lastModifiedAt: new Date().toISOString(),
        lastModifiedBy: 'dimidotdev'
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update NAD');
    }

    const data = await response.json();
    return data.nad;
  } catch (error) {
    console.error('Error updating NAD:', error);
    throw error;
  }
}

export async function deleteNad(id: string) {
  try {
    const response = await fetch(`/api/v1/nads/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete NAD');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting NAD:', error);
    throw error;
  }
}

export async function getRecentNADs(limit: number = 5) {
  try {
    const response = await fetch(`/api/v1/nads/recent?limit=${limit}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch recent NADs');
    }

    const data = await response.json();
    return data.nads || [];
  } catch (error) {
    console.error('Error fetching recent NADs:', error);
    return [];
  }
}