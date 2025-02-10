
import { MongoClient, Db, ServerApiVersion } from 'mongodb';
import 'dotenv/config';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectDB(){
  
  const uri = `${process.env.MONGODB_URI}`;
  
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb};
  }

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  await client.connect();

  cachedClient = client;
  cachedDb = client.db('l2tools');
  
  return { client, db: client.db('l2tools') };

}
