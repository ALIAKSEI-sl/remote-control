import { Duplex } from 'node:stream';
import { mouse, screen } from '@nut-tree/nut-js';
import drawShape from './drawShape';
import printScreenHandler from './printScreenHandler';

interface Navigation {
  command: string,
  width?: number,
  length?: number
}

class MessageHandler {
  public async start(duplexStream: Duplex, data: string) {
    const { command, width, length } = this.parseMessage(data);
    const { x: cursorPositionX, y: cursorPositionY } = await mouse.getPosition();
    const widthScreen = await screen.width();
    const heighScreen = await screen.height();

    switch (command) {
      case ('mouse_up'): {
        if (cursorPositionY > 0) {
          const newCursorPositionY = cursorPositionY - width > 0 ? cursorPositionY - width : 0;
          await mouse.setPosition({ x: cursorPositionX, y: newCursorPositionY });
        }
      }
        break;
      case ('mouse_down'): {
        if (cursorPositionY < heighScreen) {
          const newCursorPositionY = cursorPositionY + width < heighScreen ? cursorPositionY + width : heighScreen;
          await mouse.setPosition({ x: cursorPositionX, y: newCursorPositionY });
        }
      }
        break;
      case ('mouse_left'): {
        if (cursorPositionX > 0) {
          const newCursorPositionX = cursorPositionX - width > 0 ? cursorPositionX - width : 0;
          await mouse.setPosition({ x: newCursorPositionX, y: cursorPositionY });
        }
      }
        break;
      case ('mouse_right'): {
        if (cursorPositionX < widthScreen) {
          const newCursorPositionX = cursorPositionX + width < widthScreen ? cursorPositionX + width : widthScreen;
          await mouse.setPosition({ x: newCursorPositionX, y: cursorPositionY });
        }
      }
        break;
      case ('mouse_position'): duplexStream.write(`mouse_position ${cursorPositionX},${cursorPositionY}`);
        break;
      case ('draw_circle'): drawShape.circle(width);
        break;
      case ('draw_rectangle'): drawShape.rectangle(width, length);
        break;
      case ('draw_square'): drawShape.rectangle(width);
        break;
      case ('prnt_scrn'): {
        const jimp = await printScreenHandler.start();
        const stringBase64 = jimp.substring(22);
        duplexStream.write(`prnt_scrn ${stringBase64}`);
      }
        break;
    }

    if (!['mouse_position', 'prnt_scrn'].includes(command)) {
      duplexStream.write(command, 'utf8');
    }
    if (command) {
      console.log(`The command ${command} is executed`);
    }
  }

  private parseMessage(data: string) {
    const navigation: Navigation = {
      command: null,
    };
    const [command, width, length] = data.split(' ');
    navigation.command = command;
    if (width) navigation.width = parseInt(width);
    if (length) navigation.length = parseInt(length);
    return navigation;
  }
}

export default new MessageHandler();