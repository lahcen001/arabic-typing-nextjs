import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  const uri = process.env.MONGODB_URI;
  
  if (!uri) {
    return NextResponse.json(
      { error: 'MongoDB URI not found in environment variables' },
      { status: 500 }
    );
  }

  const client = new MongoClient(uri);

  try {
    console.log('🔄 Connecting to MongoDB...');
    await client.connect();
    console.log('✅ Successfully connected to MongoDB!');

    // Test database access
    const db = client.db('arabizi');
    console.log('📁 Database "arabizi" accessed successfully');

    // List collections
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);

    return NextResponse.json({
      status: 'success',
      message: 'Successfully connected to MongoDB',
      database: 'arabizi',
      collections: collectionNames
    });

  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Failed to connect to MongoDB',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  } finally {
    await client.close();
    console.log('👋 Connection closed');
  }
} 