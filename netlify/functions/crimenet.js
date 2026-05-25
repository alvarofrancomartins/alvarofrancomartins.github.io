const { MongoClient } = require('mongodb');

// Cache the database connection to prevent overloading MongoDB
let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }
  
  // Notice we are using your specific ALVARO variable here
  const client = new MongoClient(process.env.MONGODB_URI_ALVARO);
  await client.connect();
  cachedClient = client;
  return client;
}

exports.handler = async (event, context) => {
  // Prevent Netlify from timing out waiting for the DB connection to close
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const client = await connectToDatabase();
    const db = client.db('crimenet_db'); 
    
    // Grab query parameters
    const { action, page = 1, limit = 50, search, orgName } = event.queryStringParameters || {};

    // --- ENDPOINT 1: Fetch Organizations ---
    if (action === 'getOrgs') {
      const query = {};
      
      if (search) {
        query.$or = [
          { standard_name: { $regex: search, $options: 'i' } },
          { aliases: { $regex: search, $options: 'i' } }
        ];
      }

      const skip = (parseInt(page) - 1) * parseInt(limit);
      
      const organizations = await db.collection('organizations')
        .find(query)
        .skip(skip)
        .limit(parseInt(limit))
        .toArray();

      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*", // Allows your HTML to fetch this data
          "Content-Type": "application/json"
        },
        body: JSON.stringify(organizations)
      };
    }

    // --- ENDPOINT 2: Fetch Connections ---
    if (action === 'getConnections') {
      if (!orgName) {
        return { statusCode: 400, body: JSON.stringify({ error: "Missing orgName" }) };
      }

      const connections = await db.collection('relationships')
        .find({
          $or: [{ source: orgName }, { target: orgName }]
        })
        .toArray();

      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(connections)
      };
    }

    return { statusCode: 400, body: JSON.stringify({ error: "Invalid action" }) };

  } catch (error) {
    console.error("Database Error:", error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Database connection failed' }) };
  }
};