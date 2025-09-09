const { default: mongoose } = require('mongoose');
const app = require('./app');
require('dotenv').config();

const db_url = process.env.MONGODB_URI;

// Connection caching for serverless
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4
    };

    cached.promise = mongoose.connect(db_url, opts).then((mongoose) => {
      console.log("✅ DB CONNECTED SUCCESSFULLY");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.log("❌ Can't connect to the db due to this", e);
    throw e;
  }

  return cached.conn;
}

// Connect to database
connectDB().catch(console.dir);

// For local development
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`🚀 Server Connected On Port ${port}`);
  });
}

// Export the Express app for Vercel
module.exports = app;