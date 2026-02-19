import * as express from 'express';
import { ObjectId } from 'mongodb';
import { collections } from './database';

export const stationRouter = express.Router();
stationRouter.use(express.json());

stationRouter.get('/', async (_req, res) => {
  try {
    const stations = await collections?.stations?.find({}).toArray();
    res.status(200).send(stations);
  } catch (error) {
    res.status(500).send(error instanceof Error ? error.message : 'Unknown error');
  }
});

stationRouter.get('/:id', async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new ObjectId(id) };
    const employee = await collections?.stations?.findOne(query);

    if (employee) {
      res.status(200).send(employee);
    } else {
      res.status(404).send(`Failed to find an employee: ID ${id}`);
    }
  } catch (error) {
    res.status(404).send(`Failed to find an employee: ID ${req?.params?.id}`);
  }
});

stationRouter.post('/', async (req, res) => {
  try {
    const station = req.body;
    const result = await collections?.stations?.insertOne(station);

    if (result?.acknowledged) {
      res.status(201).send(`Created a new station description: ID ${result.insertedId}.`);
    } else {
      res.status(500).send('Failed to create a new station description.');
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error instanceof Error ? error.message : 'Unknown error');
  }
});

stationRouter.put('/:id', async (req, res) => {
  try {
    const id = req?.params?.id;
    const employee = req.body;
    const query = { _id: new ObjectId(id) };
    const result = await collections?.stations?.updateOne(query, { $set: employee });

    if (result && result.matchedCount) {
      res.status(200).send(`Updated a subway station: ID ${id}.`);
    } else if (!result?.matchedCount) {
      res.status(404).send(`Failed to find an employee: ID ${id}`);
    } else {
      res.status(304).send(`Failed to update an employee: ID ${id}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(message);
    res.status(400).send(message);
  }
});

stationRouter.delete('/:id', async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new ObjectId(id) };
    const result = await collections?.stations?.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Removed a station: ID ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove a station: ID ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Failed to find a station: ID ${id}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(message);
    res.status(400).send(message);
  }
});