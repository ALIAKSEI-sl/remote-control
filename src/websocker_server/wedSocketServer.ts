import { WebSocketServer, WebSocket, createWebSocketStream } from 'ws';
import messageHandler from './messageHandler';

class WedSocketServer {
  public start() {
    const port = Number(process.env.WEBSOCKER_PORT) || 8080;
    const wss = new WebSocketServer({ port });
    this.createWedSocketStream(wss, port);

    process.on('SIGINT', () => process.exit());
    process.on('exit', () => this.closingWss(wss));
  }

  private createWedSocketStream(wss: WebSocketServer, port: number) {
    wss.on('listening', () => console.log(`WebSocket server started on the ${port} port.`));
    wss.on('headers', (headers) => {
      console.log('Received headers:');
      headers.forEach(header => console.log(header));
    });

    wss.on('connection', (websocket: WebSocket) => {
      const webSocketStream = createWebSocketStream(websocket, {
        encoding: 'utf8',
        decodeStrings: false,
      });

      webSocketStream.on('readable', function () {
        let data = '';
        let chunk = '';
        while ((chunk = this.read()) !== null) {
          data += chunk;
        }
        messageHandler.start(webSocketStream, data);
      });

      websocket.on('close', () => {
        console.log('WebSocket was closed');
        webSocketStream.destroy();
      });
    });
  }

  private closingWss(wss: WebSocketServer) {

    wss.clients.forEach((websocket: WebSocket) => {
      websocket.close();
      console.log('WebSocket was closed');
    });
    wss.close();
    console.log('WebSocket server was closed');
  }
}

export default new WedSocketServer();