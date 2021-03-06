/**
 * @description global help
 */
import { Circle, Rect } from 'LIB/interface';

// tslint:disable no-any no-unsafe-any
export const changeVal: Function = (
    obj: any,
    keyA: string,
    keyB: string,
): void => {
    const tmp: any = obj[keyA];
    obj[keyA] = obj[keyB];
    obj[keyB] = tmp;
};

export interface IcircleMap {
    x: number;
    y: number;
    position: string;
    cssPositionEve: string;
    cssPosition: string;
}

export const getCircleMap: Function = (
    obj: Rect,
    borderWidth: number,
): IcircleMap[] => {
    // 转向后 翻转
    const dir: Function = (dirX: string, dirY: string): string => {
        const positiveX: boolean = obj.startX < obj.endX;
        const positiveY: boolean = obj.startY < obj.endY;
        let res: string = '';

        switch (dirY) {
            case 'top':
                if (positiveY) {
                    res += 'n';
                } else {
                    res += 's';
                }
                break;
            case 'middle':
                break;
            case 'bottom':
                if (positiveY) {
                    res += 's';
                } else {
                    res += 'n';
                }
                break;
            default:
        }

        switch (dirX) {
            case 'left':
                if (positiveX) {
                    res += 'w';
                } else {
                    res += 'e';
                }
                break;
            case 'right':
                if (!positiveX) {
                    res += 'w';
                } else {
                    res += 'e';
                }
                break;
            case 'middle':
                break;
            default:
        }

        return res;
    };

    // const circleMap: IcircleMap[] = [
    return [
        {
            x: obj.startX - borderWidth,
            y: obj.startY - borderWidth,
            position: 'left-top',
            cssPositionEve: 'nw',
            cssPosition: dir('left', 'top'),
        },
        // left-bottom
        {
            x: obj.startX - borderWidth,
            y: obj.endY + borderWidth,
            position: 'left-botoom',
            cssPositionEve: 'sw',
            cssPosition: dir('left', 'bottom'),
        },
        // left-middle
        {
            x: obj.startX - borderWidth,
            y: obj.startY + (obj.endY - obj.startY) / 2,
            position: 'left-middle',
            cssPositionEve: 'w',
            cssPosition: dir('left', 'middle'),
        },
        // middle top
        {
            x: obj.startX + (obj.endX - obj.startX) / 2,
            y: obj.startY - borderWidth,
            position: 'middle-top',
            cssPositionEve: 'n',
            cssPosition: dir('middle', 'top'),
        },
        // middle bottom
        {
            x: obj.startX + (obj.endX - obj.startX) / 2,
            y: obj.endY + borderWidth,
            position: 'middle-bottom',
            cssPositionEve: 's',
            cssPosition: dir('middle', 'bottom'),
        },
        // right top
        {
            x: obj.endX + borderWidth,
            y: obj.startY - borderWidth,
            position: 'right-top',
            cssPositionEve: 'ne',
            cssPosition: dir('right', 'top'),
        },
        // right bottom
        {
            x: obj.endX + borderWidth,
            y: obj.endY + borderWidth,
            position: 'right-bottom',
            cssPositionEve: 'se',
            cssPosition: dir('right', 'bottom'),
        },
        // right middle
        {
            x: obj.endX + borderWidth,
            y: obj.startY + (obj.endY - obj.startY) / 2,
            position: 'right-middle',
            cssPositionEve: 'e',
            cssPosition: dir('right', 'middle'),
        },
    ];

    // return circleMap;
};

export const getArrowCircleMap: Function = (obj: Rect): IcircleMap[] => {
    // 转向后 翻转
    const dir: Function = (dirX: string, dirY: string): string => {
        const positiveX: boolean = obj.startX < obj.endX;
        const positiveY: boolean = obj.startY < obj.endY;
        let res: string = '';

        switch (dirY) {
            case 'top':
                if (positiveY) {
                    res += 'n';
                } else {
                    res += 's';
                }
                break;
            case 'middle':
                break;
            case 'bottom':
                if (positiveY) {
                    res += 's';
                } else {
                    res += 'n';
                }
                break;
            default:
        }

        switch (dirX) {
            case 'left':
                if (positiveX) {
                    res += 'w';
                } else {
                    res += 'e';
                }
                break;
            case 'right':
                if (!positiveX) {
                    res += 'w';
                } else {
                    res += 'e';
                }
                break;
            case 'middle':
                break;
            default:
        }

        return res;
    };

    //const circleMap = [
    return [
        {
            x: obj.startX,
            y: obj.startY,
            position: 'left-top',
            cssPositionEve: 'nw',
            cssPosition: dir('left', 'top'),
        },
        {
            x: obj.endX,
            y: obj.endY,
            position: 'right-bottom',
            cssPositionEve: 'se',
            cssPosition: dir('right', 'bottom'),
        },
    ];

    // return circleMap;
};
