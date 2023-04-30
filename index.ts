import 'reflect-metadata';
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const interactionRouter = require('./src/server/features/interaction/interaction.route');

app.get('/', async (req: Request, res: Response) => {   
  res.send("Hello World");
});

app.use('/api/interaction', interactionRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
