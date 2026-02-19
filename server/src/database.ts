import * as mongodb from 'mongodb';
import { Station } from './station';

export const collections: {
  stations?: mongodb.Collection<Station>;
} = {};

export async function connectToDatabase(uri: string) {
  const client = new mongodb.MongoClient(uri);
  await client.connect();

  const db = client.db('meanStackMapApp');
  await applySchemaValidation(db);

  const stationsCollection = db.collection<Station>('stations');
  collections.stations = stationsCollection;
}

async function applySchemaValidation(db: mongodb.Db) {
  const jsonSchema = {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "description", "coordinates", "branch"],
      additionalProperties: false,
      properties: {
        _id: {},
        name: {
          bsonType: "string",
          description: "'name' is required and is a string",
        },
        description: {
          bsonType: "string",
          description: "'description' is required and is a string",
        },
        coordinates: {
          bsonType: "array",
          description: "'coordinates' is required and must be [lng, lat]",
          minItems: 2,
          maxItems: 2,
          items: {
            bsonType: ["double", "int", "long", "decimal"],
            description: "each coordinate must be numeric"
          }
        },
        branch: {
          bsonType: "string",
          description: "'branch' is required and is one of 'green', 'red', or 'blue'",
          enum: ["green", "red", "blue"],
        },
      },
    },
  };

  // Try applying the modification to the collection, if the collection doesn't exist, create it
  await db.command({
    collMod: "stations",
    validator: jsonSchema
  }).catch(async (error: mongodb.MongoServerError) => {
    if (error.codeName === "NamespaceNotFound") {
      await db.createCollection("stations", { validator: jsonSchema });
    }
  });
}