import { dragCircle, Circle, Rect } from 'LIB/interface';
import { config } from '../config';
import { getCircleMap } from 'LIB/help';
import Mouse from './mouse-circle';
import { pointInRectangular } from 'LIB/geometric';

const circlePath = 10; // 手势范围 认为这个范围内就是可以使用新手势

const inCircle = (
    x: number,
    y: number,
    positionX: number,
    positinY: number,
): boolean => {
    return !!(
        Math.pow(x - positionX, 2) + Math.pow(y - positinY, 2) <=
        Math.pow(circlePath, 2)
    );
};

interface circle {
    rect?: Rect;
    circles?: Array<dragCircle>;
    color: string;
    borderColor: string;
    auxLineColor: string;
    borderWidth: number;
    circleWidth: number;
}

export default class {
    id: number;
    ctx: CanvasRenderingContext2D;
    mouse: Mouse;
    isFocus: boolean;

    mouseDown: EventListener;
    mouseMove: EventListener;
    mouseUp: EventListener;
    circle: circle;
    saveArray: Array<circle>;

    constructor(ctx: CanvasRenderingContext2D, color: string) {
        this.ctx = ctx;
        this.isFocus = true;
        this.circle = {
            borderColor: color,
            borderWidth: 1,
            color,
            auxLineColor: 'gray',
            circleWidth: 3,
        };
        this.saveArray = [];
        this.id = config.uid++;
        this.mouse = new Mouse(this);

        this.initCircle();
        this.event();
    }

    save() {
        this.saveArray.push(JSON.parse(JSON.stringify(this.circle)));
    }

    back() {
        if (this.saveArray.length) {
            this.saveArray.pop();
            this.circle = this.saveArray[this.saveArray.length - 1];
        }
        if (!this.circle) {
            this.destroyed();
        }
    }

    destroyed() {
        config.emitter.off('mousedown', this.mouseDown);
        config.emitter.off('mousemove', this.mouseMove);
        config.emitter.off('mouseup', this.mouseUp);
        config.emitter.emit('removeItem', this);
    }

    setColor(color: string) {
        this.circle.color = color;
        this.circle.borderColor = color;
        this.save();
        config.emitter.emit('draw-all');
    }

    initCircle() {
        this.circle.rect = {
            startX: undefined,
            startY: undefined,
            endX: undefined,
            endY: undefined,
        };
    }

    setPosition(rect: Rect, isDraw = false) {
        Object.assign(this.circle.rect, rect);

        if (isDraw) {
            config.emitter.emit('draw-all');
        }
    }

    getCursor(e: MouseEvent, type?: string) {
        let result = 'crosshair'; // 判断鼠标位置结果 默认即crosshair
        for (let i of this.circle.circles) {
            if (inCircle(i.x, i.y, e.clientX, e.clientY)) {
                // 在这个范围内 对应的手势图标
                //result = `${i.cssPosition}-resize`;
                if (type === 'eve') {
                    result = `${i.cssPositionEve}-resize`;
                } else {
                    result = `${i.cssPosition}-resize`;
                }
            }
        }
        if (result === 'crosshair') {
            // 如果还是十字 如果在边上 则可以拖动
            if (this.inBoxBorder(e.clientX, e.clientY)) {
                result = 'all-scroll';
            }
        }

        return result;
    }

    inBoxBorder(positionX: number, positionY: number) {
        const inCircle = () => {
            const margin = 0.1;
            let a;
            let b;
            const radiusX =
                Math.abs(this.circle.rect.endX - this.circle.rect.startX) / 2;
            const radiusY =
                Math.abs(this.circle.rect.endY - this.circle.rect.startY) / 2;
            const centerX =
                (this.circle.rect.startX + this.circle.rect.endX) / 2;
            const centerY =
                (this.circle.rect.startY + this.circle.rect.endY) / 2;
            if (radiusX > radiusY) {
                a = radiusX;
                b = radiusY;
            } else {
                a = radiusY;
                b = radiusX;
            }
            const res =
                Math.pow(positionX - centerX, 2) / Math.pow(a, 2) +
                Math.pow(positionY - centerY, 2) / Math.pow(b, 2);
            return Math.abs(res - 1) < margin;
        };

        const inBorder = () => {
            const margin = 3;
            const radiusX =
                Math.abs(this.circle.rect.endX - this.circle.rect.startX) / 2;
            const radiusY =
                Math.abs(this.circle.rect.endY - this.circle.rect.startY) / 2;
            const centerX =
                (this.circle.rect.startX + this.circle.rect.endX) / 2;
            const centerY =
                (this.circle.rect.startY + this.circle.rect.endY) / 2;
            const p1 = {
                x: centerX - radiusX + margin,
                y: centerY - radiusY + margin,
            };
            const p2 = {
                x: centerX + radiusX - margin,
                y: centerY - radiusY + margin,
            };
            const p3 = {
                x: centerX - radiusX + margin,
                y: centerY + radiusY - margin,
            };
            const p4 = {
                x: centerX + radiusX - margin,
                y: centerY + radiusY - margin,
            };
            const P1 = {
                x: centerX - radiusX - this.circle.borderWidth - margin,
                y: centerY - radiusY - this.circle.borderWidth - margin,
            };
            const P2 = {
                x: centerX + radiusX + this.circle.borderWidth + margin,
                y: centerY - radiusY - this.circle.borderWidth - margin,
            };
            const P3 = {
                x: centerX - radiusX - this.circle.borderWidth - margin,
                y: centerY + radiusY + this.circle.borderWidth + margin,
            };
            const P4 = {
                x: centerX + radiusX + this.circle.borderWidth + margin,
                y: centerY + radiusY + this.circle.borderWidth + margin,
            };
            const p = {
                x: positionX,
                y: positionY,
            };
            return (
                !pointInRectangular(p1, p2, p3, p4, p) &&
                pointInRectangular(P1, P2, P3, P4, p)
            );
        };

        return inCircle() || inBorder();
    }

    inCircle() {}
    hasBox() {
        return !!(
            this.circle.rect.startX !== undefined &&
            this.circle.rect.startY !== undefined &&
            this.circle.rect.endX !== undefined &&
            this.circle.rect.endY !== undefined
        );
    }

    event() {
        this.mouseDown = (e: MouseEvent) => {
            if (this.isFocus && this.hasBox()) {
                this.mouse.mouseDown(e, this.getCursor(e, 'eve'));
            }
        };
        this.mouseMove = (e: MouseEvent) => {
            if (this.isFocus) {
                this.mouse.mouseMove(e);
            }
        };
        this.mouseUp = (e: MouseEvent) => {
            if (this.isFocus && this.hasBox()) {
                this.mouse.mouseUp(e);
            }
        };

        config.emitter.on('mousedown', this.mouseDown);
        config.emitter.on('mousemove', this.mouseMove);
        config.emitter.on('mouseup', this.mouseUp);
    }

    draw() {
        const circleMap = getCircleMap(
            this.circle.rect,
            this.circle.borderWidth,
        );
        this.circle.circles = circleMap;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.circle.color;
        this.ctx.lineWidth = this.circle.borderWidth;
        const ellipse = (circle: Circle) => {
            const r =
                circle.radiusX > circle.radiusY
                    ? circle.radiusX
                    : circle.radiusY;
            var ratioX = circle.radiusX / r;
            var ratioY = circle.radiusY / r;
            this.ctx.strokeStyle = this.circle.borderColor;
            this.ctx.lineWidth = this.circle.borderWidth;
            this.ctx.beginPath();
            this.ctx.scale(ratioX, ratioY);
            this.ctx.arc(
                circle.centerX / ratioX,
                circle.centerY / ratioY,
                r,
                0,
                2 * Math.PI,
                false,
            );
            this.ctx.stroke();
            this.ctx.restore();
        };

        // 画椭圆
        if (this.isFocus) {
            const startX = this.circle.rect.startX;
            const startY = this.circle.rect.startY;
            const endX = this.circle.rect.endX;
            const endY = this.circle.rect.endY;

            this.ctx.lineWidth = 1;
            this.ctx.strokeStyle = this.circle.auxLineColor;
            this.ctx.strokeRect(
                startX - this.circle.borderWidth,
                startY - this.circle.borderWidth,
                endX - startX + this.circle.borderWidth * 2,
                endY - startY + this.circle.borderWidth * 2,
            );
            this.ctx.stroke();
            for (let i of circleMap) {
                this.ctx.beginPath();
                this.ctx.fillStyle = this.circle.color;
                this.ctx.arc(
                    i.x,
                    i.y,
                    this.circle.circleWidth,
                    0,
                    Math.PI * 2,
                    true,
                );
                this.ctx.stroke();
                this.ctx.fillStyle = 'white';
                this.ctx.fill();
            }
            this.ctx.restore();
        }
        ellipse({
            centerX: (this.circle.rect.startX + this.circle.rect.endX) / 2,
            centerY: (this.circle.rect.startY + this.circle.rect.endY) / 2,
            radiusX:
                Math.abs(this.circle.rect.startX - this.circle.rect.endX) / 2,
            radiusY:
                Math.abs(this.circle.rect.startY - this.circle.rect.endY) / 2,
        });
    }
}
