import { config } from './config';
import { drawEnd } from './drawbox';
import { hasBox } from './help';
import { cursor, cursorActionToBox } from './cursor';
import Box from './box';

interface Circle {
    x: number;
    y: number;
}

export default class {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    offCanvas: HTMLCanvasElement;
    offCtx: CanvasRenderingContext2D;
    body: HTMLElement;
    mask: HTMLCanvasElement;
    maskCtx: CanvasRenderingContext2D;
    maskCircles: Array<Circle>;
    shootBox: HTMLElement;
    show: Boolean;
    beginMove: Boolean;
    box: Box;
    cursorStyle: string;
    clickTime: number; // 点击次数 只在出现box之后计算 用于判断是否确定

    constructor(selector: string) {
        this.canvas = document.querySelector(selector);

        if (!this.canvas) {
            throw new Error(`The canvas dom ${selector} isn'nt exists!`);
        }

        this.ctx = this.canvas.getContext('2d');
        this.offCanvas = document.createElement('canvas');
        this.offCtx = this.offCanvas.getContext('2d');
        this.body = document.body;
        this.mask = document.createElement('canvas');
        this.maskCtx = this.mask.getContext('2d');
        this.shootBox = document.createElement('div');
        this.show = true;
        this.beginMove = false;
        this.maskCircles = [];
        this.cursorStyle = 'crosshair';
        this.clickTime = 0;
        this.box = new Box();

        this.initBackGround();
        this.initEvent();
        this.hackBody();
    }

    hackBody() {
        // TODO 浏览器前缀
        this.mask.style['userSelect'] = 'none';
    }

    initBackGround() {
        const width = this.body.clientWidth;
        const height = this.body.clientHeight;

        this.mask.style.position = 'fixed';
        this.mask.style.top = '0';
        this.mask.style.left = '0';
        this.mask.style.cursor = this.cursorStyle;
        this.resize();

        this.body.appendChild(this.mask);
    }

    resize() {
        // TODO 防抖
        const width = this.body.clientWidth;
        const height = this.body.clientHeight;

        this.mask.width = width;
        this.mask.height = height;
        this.maskCtx.save();
        this.maskCtx.beginPath();
        this.maskCtx.globalAlpha = 0.7;
        this.maskCtx.fillStyle = 'gray';
        this.maskCtx.fillRect(0, 0, width, height);
        this.maskCtx.stroke();

        this.maskCtx.clearRect(
            this.box.startX,
            this.box.startY,
            this.box.endX - this.box.startX,
            this.box.endY - this.box.startY,
        );
        this.maskCtx.restore();
    }

    initEvent() {
        let hasTrajectory = false;
        window.addEventListener('resize', e => {
            if (this.show) {
                this.resize();
            }
        });
        this.mask.addEventListener('mousedown', e => {
            hasTrajectory = false;
            if (!hasBox.call(this)) {
                this.beginBox(e);
            } else {
                // TODO 根据状态判断操作
                cursorActionToBox.call(this, e);
            }
        });
        this.mask.addEventListener('mousemove', e => {
            if (this.beginMove) {
                this.drawBox(e);
                hasTrajectory = true;
            } else if (hasBox.call(this)) {
                this.cursorStyle = cursor.call(this, e);
                this.mask.style.cursor = this.cursorStyle;
                // cursorActionToBox.call(e);
            }
        });
        this.mask.addEventListener('mouseup', e => {
            this.beginMove = false;
            if (hasTrajectory) {
                drawEnd.call(this);
            } else if (!hasBox.call(this)) {
                this.box.initBox();
            }
        });
    }

    beginBox(e: MouseEvent) {
        this.box.initBox();
        this.box.startX = e.clientX;
        this.box.startY = e.clientY;
        this.beginMove = true;
    }

    drawBox(e: MouseEvent) {
        if (!this.beginMove) return;

        this.box.endX = e.clientX;
        this.box.endY = e.clientY;

        this.resize();
    }

    screenShots() {
        console.log('begin shots');
        // 开始截图
    }
}
