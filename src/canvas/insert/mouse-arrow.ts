import Arrow from './arrow';

export default class {
    box: Arrow;
    mouseEvent: string;

    constructor(arrow: Arrow) {
        this.box = arrow;
    }

    mouseDown(e: MouseEvent, cursorStyle = 'crosshair') {
        this.mouseEvent = cursorStyle;
    }
    mouseMove(e: MouseEvent) {
        let startX;
        let startY;
        let endX;
        let endY;
        // move
        switch (this.mouseEvent) {
            case 'crosshair':
                break;
            case 'all-scroll':
                this.box.setPosition(
                    {
                        startX: this.box.arrow.rect.startX + e.movementX,
                        startY: this.box.arrow.rect.startY + e.movementY,
                        endX: this.box.arrow.rect.endX + e.movementX,
                        endY: this.box.arrow.rect.endY + e.movementY,
                    },
                    true,
                );
                break;
            case 'nw-resize':
                this.box.setPosition(
                    {
                        startX: e.clientX,
                        startY: e.clientY,
                    },
                    true,
                );
                break;
            case 'se-resize':
                this.box.setPosition(
                    {
                        endX: e.clientX,
                        endY: e.clientY,
                    },
                    true,
                );
                break;
            default:
                break;
        }
    }

    mouseUp(e: MouseEvent) {
        this.mouseEvent = 'crosshair';
    }
}
