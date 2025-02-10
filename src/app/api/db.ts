
import { MongoClient, Db, ServerApiVersion } from 'mongodb';
import 'dotenv/config';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectDB(){
  
  const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@l2tools.75wop.mongodb.net/?retryWrites=true&w=majority&appName=L2Tools`;
  
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
