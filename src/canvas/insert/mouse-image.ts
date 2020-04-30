/**
 * @default mouse image
 */
import { EventEmitter } from 'events';
import Box from 'INSERT/image';

/**
 * default class
 */
export default class {
    public box: Box;
    private mouseEvent: string; // 处理后续move事件逻辑

    constructor(box: Box) {
        this.box = box;
        this.mouseEvent = 'crosshair'; // 鼠标点击状态 代表后续事件
    }

    public mouseDown(e: MouseEvent, cursorStyle: string = 'crosshair'): void {
        this.mouseEvent = cursorStyle;
    }

    public mouseMove(e: MouseEvent): void {
        // move
        const startX: number = this.box.property.position.x;
        const startY: number = this.box.property.position.y;
        const endX: number =
            this.box.property.position.x + this.box.property.width;
        const endY: number =
            this.box.property.position.y + this.box.property.height;
        switch (this.mouseEvent) {
            case 'crosshair':
                break;
            case 'all-scroll':
                this.box.setSize({
                    x: this.box.property.position.x + e.movementX,
                    y: this.box.property.position.y + e.movementY,
                });
                break;
            case 'nw-resize':
                this.box.setSize(
                    {
                        x: e.pageX,
                        y: e.pageY,
                    },
                    {
                        width:
                            this.box.property.position.x +
                            this.box.property.width -
                            e.pageX,
                        height:
                            this.box.property.position.y +
                            this.box.property.height -
                            e.pageY,
                    },
                );
                break;
            case 'w-resize':
                this.box.setSize(
                    {
                        x: e.pageX,
                        y: this.box.property.position.y,
                    },
                    {
                        width:
                            this.box.property.position.x +
                            this.box.property.width -
                            e.pageX,
                    },
                );
                break;
            case 'sw-resize':
                this.box.setSize(
                    {
                        x: e.pageX,
                        y: this.box.property.position.y,
                    },
                    {
                        width: endX - e.pageX,
                        height: e.pageY - startY,
                    },
                );
                break;
            case 's-resize':
                this.box.setSize(
                    {
                        x: this.box.property.position.x,
                        y: this.box.property.position.y,
                    },
                    {
                        height: e.pageY - this.box.property.position.y,
                    },
                );
                break;
            case 'se-resize':
                this.box.setSize(
                    {
                        x: startX,
                        y: startY,
                    },
                    {
                        width: e.pageX - startX,
                        height: e.pageY - startY,
                    },
                );
                break;
            case 'e-resize':
                this.box.setSize(
                    {
                        x: startX,
                        y: startY,
                    },
                    {
                        width: e.pageX - startX,
                    },
                );
                break;
            case 'ne-resize':
                this.box.setSize(
                    {
                        x: startX,
                        y: e.pageY,
                    },
                    {
                        width: e.pageX - startX,
                        height: endY - e.pageY,
                    },
                );
                // 触发resize
                break;
            case 'n-resize':
                this.box.setSize(
                    {
                        x: startX,
                        y: e.pageY,
                    },
                    {
                        height: endY - e.pageY,
                    },
                );
                break;
            default:
        }
    }

    public mouseUp(e: MouseEvent): void {
        this.mouseEvent = 'crosshair';
    }
}
