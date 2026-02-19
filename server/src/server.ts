import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectToDatabase } from './database';
import { stationRouter } from './station.routes';

// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config();

const uri = process.env.MONGODB_ATLAS || process.env.MONGODB_URL;

if (!uri) {
  console.error(
    "No uri environment variable has been defined in config.env"
  );
  process.exit(1);
}

connectToDatabase(uri)
  .then(() => {
    const app = express();
    app.use(cors());
    app.use("/stations", stationRouter);

    // start the Express server
    app.listen(3000, () => {
      console.log(`Server running at http://localhost:3000...`);
    });
  })
  .catch((error) => console.error(error));