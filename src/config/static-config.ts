import * as dotenv from 'dotenv';
dotenv.config();

const missEnvError = (envName) =>
  new Error(`Required ENV not found: ${envName}`);

const subgraphUrl = process.env.URL_SUBGRAPH;
if (!subgraphUrl) throw missEnvError('URL_SUBGRAPH');

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const logLevel = process.env.LOG_LEVEL
  ? process.env.LOG_LEVEL.toLowerCase()
  : 'info';

/*
 This configuration is used directly only when dependency injection is not working,
 e.g. during application startup and its setup.
 Also, it fulfills dynamic (dependency-injection-based, main) configuration.
 */
export const staticConfig = {
  port,
  logLevel,
  subgraphUrl
};
