import { createReadStream } from 'node:fs';
import { createServer } from 'node:http';
import { pipeline } from 'node:stream/promises';
import path from 'node:path';

export const httpServer = createServer(async (req, res) => {
  try {
    const dirname = path.resolve(path.dirname(''));
    const filePath = dirname + (req.url === '/' ? '/front/index.html' : '/front' + req.url);

    const readStream = createReadStream(filePath);
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });

    await pipeline(readStream, res);
  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(error));
  }
});
