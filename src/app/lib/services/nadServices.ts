import { connectDB } from "@/app/api/db";
import { NAD } from "@/app/types/nad";
import clientPromise from "../mongodb";

export async function getNads() {
  const { db } = await connectDB();
  const nads = await db.collection('quicknads').find().toArray();
  return JSON.parse(JSON.stringify(nads));
}

export async function GetNAD(ticketId: string) {
  const { db } = await connectDB();
  const nad = await db.collection('quicknads').findOne({ ticketId });
  return JSON.parse(JSON.stringify(nad));
}

export async function createNad(nadData: Omit<NAD, '_id'>) {
  const client = await clientPromise;
  const db = client.db('l2tools');
  const result = await db.collection('quicknads').insertOne(nadData);
  return result;
}

export async function getRecentNADs() {
  try {
    const { db } = await connectDB();

    const nads = await db
      .collection('quicknads')
      .find({})
      .sort({ creationTime: -1 })
      .limit(5)
      .toArray();

    return { nads, error: null };
  } catch (error) {
    console.error('Erro ao buscar NADs recentes:', error);
    return { nads: [], error: 'Falha ao carregar NADs recentes' };
  }
}