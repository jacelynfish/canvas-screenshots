import { Position } from 'LIB/interface';
import { config } from '../config';

export default class {
    position: Position;
    ctx: CanvasRenderingContext2D;
    input: HTMLElement;
    text: string;
    width: number;
    height: number;
    cols: number;
    rows: number;
    color: string;
    borderColor: string;
    fontSize: string;
    fontFamily: string;
    id: number;
    isFocus: boolean;
    inputListener: EventListener;
    inputBlurListener: EventListener;

    constructor(ctx: CanvasRenderingContext2D, pos: Position) {
        this.position = pos;
        this.ctx = ctx;
        this.color = (<any>window).color || 'red';
        this.borderColor = 'white';
        this.id = config.uid++;
        this.text = '';
        this.isFocus = true;
        this.width = 100;
        this.height = 40;
        this.cols = 10;
        this.rows = 2;
        this.fontSize = '35px';
        this.fontFamily = 'microsoft-yahei';
        this.initTextArea();
        this.event();
    }

    getCursor(e: MouseEvent) {
        let result = 'crosshair';
        if (this.inBoxBorder(e.clientX, e.clientY)) {
            result = 'all-scroll';
        }

        return result;
    }

    inBoxBorder(X: number, y: number) {}

    setPosition(pos: Position, isDraw = false) {
        this.position = pos;

        if (isDraw) {
            config.emitter.emit('draw-all');
        }
    }

    initTextArea() {
        this.input = document.createElement('textArea');
        this.input.className = 'function-text';
        // this.input.style.visibility = 'hidden';
        // this.input.style.opacity = '0';
        this.input.style.left = `${this.position.x}px`;
        this.input.style.top = `${this.position.y}px`;
        this.input.style.color = this.color;
        this.input.setAttribute('cols', this.cols.toString());
        this.input.setAttribute('rows', this.rows.toString());
        if (this.isFocus) {
            this.input.setAttribute('tabIndex', '1');
            this.input.setAttribute('autofocus', 'true');
            this.input.focus();
        }
        this.inputListener = (e: KeyboardEvent) => {
            this.text = (<HTMLInputElement>e.target).value;
            const length = this.text.length;
            const row = length / (this.cols - 1);
            const left = length % (this.cols - 1);
            const rows = left ? row + 1 : row;
            const realRow = rows > 2 ? rows : 2;
            this.input.setAttribute('rows', realRow.toString());
        };
        this.inputBlurListener = (e: KeyboardEvent) => {
            this.drawText();
            // this.input.style.display = 'none';
        };
        this.input.addEventListener('input', this.inputListener);
        this.input.addEventListener('blur', this.inputBlurListener);

        config.wrap.appendChild(this.input);
    }

    event() {}

    getTextWidth(txt: string) {
        this.ctx.save();
        this.ctx.font = `${this.fontSize} ${this.fontFamily}`;
        const width = this.ctx.measureText(txt);
        this.ctx.restore();
        return width;
    }

    drawText() {
        const getHeight = () => {
            this.ctx.save();
            this.ctx.font = `${this.fontSize} ${this.fontFamily}`;
            const height = this.ctx.measureText('w');
            return 33;
            // return height;
        };
        console.log(getHeight());
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.font = `${this.fontSize} ${this.fontFamily}`;
        this.ctx.fillText(
            this.text,
            this.position.x + 1 + 10,
            this.position.y + getHeight() + 10,
        );
        this.ctx.restore();
    }

    draw() {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.borderColor;
        // this.ctx.moveTo(this.position.x, this.position.y);
        // this.ctx.lineTo(this.position.x + this.width, this.position.y);
        // this.ctx.lineTo(
        //     this.position.x + this.width,
        //     this.position.y + this.height,
        // );
        // this.ctx.lineTo(this.position.x, this.position.y + this.height);
        // this.ctx.lineTo(this.position.x, this.position.y);
        // TODO draw text

        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();
    }
}
