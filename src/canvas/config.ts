import { Emitter } from 'event-emitter';
import { Rect, plugins } from 'LIB/interface';

interface Config {
    emitter?: Emitter;
    uid?: number;
    wrap?: HTMLElement;
    boxRect?: Rect;
    platform?: string;
    rate?: number; // deviceRate
    plugins?: Array<plugins>;
}

export const inBox = (e: MouseEvent) => {
    if (!config.boxRect) return false;
    if (
        (e.clientX - config.boxRect.startX) *
            (e.clientX - config.boxRect.endX) <=
            0 &&
        (e.clientY - config.boxRect.startY) *
            (e.clientY - config.boxRect.endY) <=
            0
    ) {
        return true;
    }

    return false;
};

export const config: Config = {
    uid: 0,
};

export const setConfig = (obj: Config) => {
    Object.assign(config, obj);
};
