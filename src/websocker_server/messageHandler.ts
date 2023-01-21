import { Duplex } from 'node:stream';

interface Navigation {
  command: string,
  width?: number,
  length?: number
}

class MessageHandler {
  private sizeImage = 200;

  public start(duplexStream: Duplex, data: string) {
    const { command, width, length } = this.parseMessage(data);
    console.log(command, width, length);

    switch (command) {
      case ('mouse_up'):
        break;
      case ('mouse_down'):
        break;
      case ('mouse_left'):
        break;
      case ('mouse_right'):
        break;
      case ('mouse_position'):
        break;
      case ('draw_circle'):
        break;
      case ('draw_rectangle'):
        break;
      case ('draw_square'):
        break;
      case ('prnt_scrn'):
        break;
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