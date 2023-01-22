import { mouse } from '@nut-tree/nut-js';

export class DrawShape {
  public async rectangle(width: number, length: number = width) {
    const { x: cursorPositionX, y: cursorPositionY } = await mouse.getPosition();
    await mouse.drag([{ x: cursorPositionX, y: cursorPositionY }, { x: cursorPositionX + width, y: cursorPositionY }]);
    await mouse.drag([{ x: cursorPositionX + width, y: cursorPositionY }, { x: cursorPositionX + width, y: cursorPositionY + length }]);
    await mouse.drag([{ x: cursorPositionX + width, y: cursorPositionY + length }, { x: cursorPositionX, y: cursorPositionY + length }]);
    await mouse.drag([{ x: cursorPositionX, y: cursorPositionY + length }, { x: cursorPositionX, y: cursorPositionY }]);
  }

  public async circle(radius: number) {
    const { x: cursorPositionX, y: cursorPositionY } = await mouse.getPosition();
    for (let i = 0; i <= Math.PI * 2; i += 0.01) {
      const newPositionX = cursorPositionX - radius + (radius * Math.cos(i));
      const newPositionY = cursorPositionY + (radius * Math.sin(i));
      mouse.drag([{ x: newPositionX, y: newPositionY }]);
    }
  }
}

export default new DrawShape;