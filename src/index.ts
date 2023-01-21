import 'dotenv/config';
import { startHttpServer } from './http_server/startHttpServer';
import wedSocketServer from './websocker_server/wedSocketServer';

startHttpServer();
wedSocketServer.start();