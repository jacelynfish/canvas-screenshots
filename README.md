# canvas-screenshots

canvas-screenshots is a useful screenshots tools on your website created by canvas.The behavior is similar with your PC clients like wechat or QQ.

## Installation

```js
npm install --save-dev canvas-screenshots
```

## Usage

```js
import ScreenShoots from 'canvas-screenshots';

// generate a screenshots
const screen = new ScreenShoots({
    download: data => {
        console.log(data);
    },
});

// create mask above
screen.start();
```

## Demo

[demo](https://luobata.github.io/canvas-screenshots/test.html)

## Surrpoted fcuntions

*   Rectangular
*   Circle & Ellipsis
*   Arrow
*   Pen
*   Text
*   Mosaic
*   Image
*   Back

## Config

*   **plugins**

    ```js
    The switch to each function.

    type: Array<pluginType>
    pluginType: 'rectangular' || 'circle' || 'arrow' || 'pen' || 'text' || 'mosaic' || 'image' || 'back'
    default: Array<all pluginType>
    required: false
    ```

*   **download**

    ```js
    Trigger when click the download button, the type of output data will be decided by config type.

    type: Function
    default: noop function
    required: true
    arguments: data
    ```

*   **imageFail**

    ```js
    Trigger when choose a image but not match the expected.

    type: Function
    default: noop function
    required: false
    arguments: error
    ```

*   **outputType**

    ```js
    The output type with download.

    type: string('imageData' || 'png' || 'file')
    default: 'imageData'
    required: false
    ```

## Surrported browsers

*   Chrome

The browsers supported is now minimal because of the different behavior of canvas, and it will soon be more.
