import { connectDB } from "@/app/api/db";
import { NAD } from "@/app/types/nad";
import 'dotenv/config';
interface NADError extends Error {
  code?: string;
}

interface GetNadsOptions {
  page?: number;
  itemsPerPage?: number;
}

export async function getNads({ page = 1, itemsPerPage = 12 }: GetNadsOptions = {}) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/nads?page=${page}&limit=${itemsPerPage}`, {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch NADs');
    }

    const data = await response.json();
    return {
      nads: data.nads || [],
      total: data.total,
      currentPage: page,
      totalPages: Math.ceil((data.total || 0) / itemsPerPage)
    };
  } catch (error) {
    console.error('Error fetching NADs:', error);
    return {
      nads: [],
      total: 0,
      currentPage: 1,
      totalPages: 0
    };
  }
}

export async function createNad(nadData: Partial<NAD>) {
  try {
    // Primeiro, verifica se já existe uma NAD com o mesmo ticketId
    const existingNad = await checkExistingTicketId(nadData.ticketId);
    
    if (existingNad) {
      const error = new Error('TicketId já existe') as NADError;
      error.code = 'DUPLICATE_TICKET_ID';
      throw error;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/nads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...nadData,
        createdAt: new Date().toISOString(),
        author: 'Admin', // ou pegar do contexto de autenticação
      }),
    });

    if (!response.ok) {
      const error = new Error('Erro ao criar NAD') as NADError;
      error.code = response.status === 409 ? 'DUPLICATE_TICKET_ID' : 'CREATE_ERROR';
      throw error;
    }

    const data = await response.json();
    return { success: true, nad: data.nad };
  } catch (error) {
    console.error('Error creating NAD:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      code: (error as NADError).code || 'UNKNOWN_ERROR'
    };
  }
}

async function checkExistingTicketId(ticketId?: string): Promise<boolean> {
  if (!ticketId) return false;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/nads/check/${ticketId}`);
    const data = await response.json();
    return data.exists;
  } catch (error) {
    console.error('Error checking ticketId:', error);
    return false;
  }
}

export async function GetNAD(ticketId: string) {
  const { db } = await connectDB();
  const nad = await db.collection('quicknads').findOne({ ticketId });
  return JSON.parse(JSON.stringify(nad));
}

export async function getRecentNADs() {
  try {
    const { db } = await connectDB();

    const nads = await db
      .collection('quicknads')
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    return { nads, error: null };
  } catch (error) {
    console.error('Erro ao buscar NADs recentes:', error);
    return { nads: [], error: 'Falha ao carregar NADs recentes' };
  }
}