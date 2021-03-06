/**
 * @description cursor
 */
import Box from 'Canvas/box';

interface ICircle {
    x: number;
    y: number;
    cssPosition: string;
}

const circlePath: number = 10; // 手势范围 认为这个范围内就是可以使用新手势

const inCircle: Function = (
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

export default class {
    public maskCircles: ICircle[];
    public box: Box;

    constructor(box: Box) {
        this.box = box;
        this.maskCircles = [];
    }

    public getCursor(e: MouseEvent, itype?: string): string {
        let result: string = 'crosshair'; // 判断鼠标位置结果 默认即crosshair
        for (const i of this.box.circles) {
            if (inCircle(i.x, i.y, e.clientX, e.clientY)) {
                // 在这个范围内 对应的手势图标
                if (itype === 'eve') {
                    result = `${i.cssPositionEve}-resize`;
                } else {
                    result = `${i.cssPosition}-resize`;
                }
            }
        }
        if (result === 'crosshair') {
            // 如果还是十字 说明不是9个点 判断是否在矩形内部
            if (this.box.inBox(e.clientX, e.clientY)) {
                result = 'all-scroll';
            }
        }

        return result;
    }
}
