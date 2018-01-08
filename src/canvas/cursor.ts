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

const inBox = (
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    positionX: number,
    positionY: number,
): boolean => {
    return !!(
        positionX >= startX &&
        positionX <= endX &&
        positionY >= startY &&
        positionY <= endY
    );
};

export default function(e: MouseEvent): string {
    let result = 'crosshair'; // 判断鼠标位置结果 默认即corsshair
    for (let i of this.maskCircles) {
        if (inCircle(i.x, i.y, e.clientX, e.clientY)) {
            // 在这个范围内 对应的手势图标
            result = `${i.cssPosition}-resize`;
        }
    }
    if (result === 'crosshair') {
        // 如果还是十字 说明不是9个点 判断是否在矩形内部
        if (
            inBox(
                this.box.startX,
                this.box.startY,
                this.box.endX,
                this.box.endY,
                e.clientX,
                e.clientY,
            )
        ) {
            result = 'all-scroll';
        }
    }

    return result;
}
