/**
 * @description config
 */
import { Emitter } from 'event-emitter';
import { CustomerDefined, PluginType, Rect, Type } from 'LIB/interface';

interface IConfig {
    emitter?: Emitter;
    uid?: number;
    wrap?: HTMLElement;
    boxRect?: Rect;
    width?: number;
    height?: number;
    platform?: string;
    rate?: number; // deviceRate
    plugins?: PluginType[];
    customerDefined?: CustomerDefined[];
    debuggerMode?: boolean;
    outputType?: Type;
    fullSize?: Boolean;
}

export const config: IConfig = {
    uid: 0,
    fullSize: false,
};

export const inBox: Function = (e: MouseEvent): boolean => {
    if (!config.boxRect) {
        return false;
    }
    if (
        (e.pageX - config.boxRect.startX) *
            (e.pageX - config.boxRect.endX) <=
            0 &&
        (e.pageY - config.boxRect.startY) *
            (e.pageY - config.boxRect.endY) <=
            0
    ) {
        return true;
    }

    return false;
};

export const setConfig: Function = (obj: IConfig): void => {
    Object.assign(config, obj);
};
