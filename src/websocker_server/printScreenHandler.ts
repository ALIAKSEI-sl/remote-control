import { mouse, screen, Image } from '@nut-tree/nut-js';
import Jimp from 'jimp';

class PrintScreenHandler {
  private printScreenSize = 200;

  public async start() {
    const { printScreenPositionX, printScreenPositionY } = await this.getPositionPrintScreen();
    const image = await screen.grabRegion({ left: printScreenPositionX, top: printScreenPositionY, width: this.printScreenSize, height: this.printScreenSize, area() { return 4000; } });
    this.changingColor(image);

    const jimp = new Jimp({
      'data': image.data,
      'width': image.width,
      'height': image.height,
    });
    return jimp.getBase64Async(Jimp.MIME_PNG);
  }

  private async getPositionPrintScreen() {
    const { x: cursorPositionX, y: cursorPositionY } = await mouse.getPosition();
    const centerPrintScreen = this.printScreenSize / 2;
    const widthScreen = await screen.width();
    const heighScreen = await screen.height();

    let printScreenPositionX = cursorPositionX - centerPrintScreen;
    let printScreenPositionY = cursorPositionY - centerPrintScreen;

    const maxPrintScreenPositionX = widthScreen - this.printScreenSize;
    const maxPrintScreenPositionY = heighScreen - this.printScreenSize;

    printScreenPositionX = printScreenPositionX < 0 ? 0 : printScreenPositionX;
    printScreenPositionY = printScreenPositionY < 0 ? 0 : printScreenPositionY;
    printScreenPositionX = printScreenPositionX > maxPrintScreenPositionX ? maxPrintScreenPositionX : printScreenPositionX;
    printScreenPositionY = printScreenPositionY > maxPrintScreenPositionY ? maxPrintScreenPositionY : printScreenPositionY;

    return { printScreenPositionX, printScreenPositionY };
  }

  private changingColor(image: Image) {
    for (let i = 0; i < image.data.length; i += 4) {
      const r = image.data[i];
      const b = image.data[i + 2];
      const a = image.data[i + 3];
      image.data[i] = b;
      image.data[i + 2] = r;
      image.data[i + 3] = a;
    }
  }
}

export default new PrintScreenHandler;