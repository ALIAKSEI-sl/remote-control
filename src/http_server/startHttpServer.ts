import { httpServer } from './httpServer';
//import { mouse } from "@nut-tree/nut-js";

const HTTP_PORT = parseInt(process.env.HTTP_PORT) || 8181;

export const startHttpServer = () => {
  console.log(`Start static http server on the ${HTTP_PORT} port!`);
  httpServer.listen(HTTP_PORT);
};