/**
 * @default mouse circle
 */
import Circle from 'INSERT/circle';

/**
 * default class
 */
export default class {
    public box: Circle;
    private mouseEvent: string;

    constructor(circle: Circle) {
        this.box = circle;
    }

    public mouseDown(e: MouseEvent, cursorStyle: string = 'crosshair'): void {
        this.mouseEvent = cursorStyle;
    }
    public mouseMove(e: MouseEvent): void {
        // move
        switch (this.mouseEvent) {
            case 'crosshair':
                break;
            case 'all-scroll':
                this.box.setPosition(
                    {
                        startX: this.box.property.rect.startX + e.movementX,
                        startY: this.box.property.rect.startY + e.movementY,
                        endX: this.box.property.rect.endX + e.movementX,
                        endY: this.box.property.rect.endY + e.movementY,
                    },
                    true,
                );
                break;
            case 'nw-resize':
                this.box.setPosition(
                    {
                        startX: e.pageX,
                        startY: e.pageY,
                    },
                    true,
                );
                break;
            case 'w-resize':
                this.box.setPosition(
                    {
                        startX: e.pageX,
                    },
                    true,
                );
                break;
            case 'sw-resize':
                this.box.setPosition(
                    {
                        startX: e.pageX,
                        endY: e.pageY,
                    },
                    true,
                );
                break;
            case 's-resize':
                this.box.setPosition(
                    {
                        endY: e.pageY,
                    },
                    true,
                );
                break;
            case 'se-resize':
                this.box.setPosition(
                    {
                        endX: e.pageX,
                        endY: e.pageY,
                    },
                    true,
                );
                break;
            case 'e-resize':
                this.box.setPosition(
                    {
                        endX: e.pageX,
                    },
                    true,
                );
                // 触发resize
                break;
            case 'ne-resize':
                this.box.setPosition(
                    {
                        startY: e.pageY,
                        endX: e.pageX,
                    },
                    true,
                );
                // 触发resize
                break;
            case 'n-resize':
                this.box.setPosition(
                    {
                        startY: e.pageY,
                    },
                    true,
                );
                break;
            default:
        }
    }

    public mouseUp(e: MouseEvent): void {
        this.mouseEvent = 'crosshair';
    }
}
