import * as d3 from "d3";

export const minSvgWidth = 720;
export let svgWidth = window.innerWidth * 0.8;

// Width and height of the input and output images, in pixels. The cell
// width and height are automatically calculated to fit this size.
export let img_width = svgWidth * 2 / 5;
export let img_height = img_width;

// Should the input matrix be padded
export const PADDED = true;

// Cell border
export let borderWidth = 1;
export const borderColor = "gray";

// Highlight
export let highlightOutlineWidth = 2;
export const highlightColorIn = "purple";
export const highlightColorOut = "red";

// Button colors
export const nextColor = d3.rgb(61, 195, 122);
export const prevColor = d3.rgb(255, 178, 206);
export const disableColor = "gray";
export const convolveColor = nextColor;
export const stopColor = prevColor;

// Input image size
export const inputWidth = 32;
export const inputHeight = 32;

// Kernel size
export const kernelWidth = 3;
export const kernelHeight = 3;

// The loss in size from padding
export const inputWidthLoss = PADDED ?
    0 :
    Math.floor((kernelWidth - 1) / 2);
export const inputHeightLoss = PADDED ?
    0 :
    Math.floor((kernelHeight - 1) / 2);

// Output image size
export const outputWidth = PADDED ?
    inputWidth :
    inputWidth - 2 * inputWidthLoss;
export const outputHeight = PADDED ?
    inputHeight :
    inputHeight - 2 * inputHeightLoss;

// Width/Height of an individual cell
export let cellWidth = img_width / (inputWidth + 2);
export let cellHeight = img_height / (inputHeight + 2);

export let fontSize = cellHeight * 0.9;

// Padding between images
export let spaceBetween = img_width / 2;

export let kernelCellWidth = spaceBetween / 2 / kernelWidth;
export let kernelCellHeight = spaceBetween / 2 / kernelHeight;

export let kernelFontSize = kernelCellHeight * 0.6;

export const timePerLine = 10;

export const imageUrls = {
    "Bird": "https://raw.githubusercontent.com/UW-CSE442-WI20/A3-convolutional-neural-networks/master/Images/bird.png",
    "Car": "https://raw.githubusercontent.com/UW-CSE442-WI20/A3-convolutional-neural-networks/master/Images/car.png",
    "Cat": "https://raw.githubusercontent.com/UW-CSE442-WI20/A3-convolutional-neural-networks/master/Images/cat.png",
    "Deer": "https://raw.githubusercontent.com/UW-CSE442-WI20/A3-convolutional-neural-networks/master/Images/deer.png",
    "Dog": "https://raw.githubusercontent.com/UW-CSE442-WI20/A3-convolutional-neural-networks/master/Images/dog.png",
    "Frog": "https://raw.githubusercontent.com/UW-CSE442-WI20/A3-convolutional-neural-networks/master/Images/frog.png",
    "Horse": "https://raw.githubusercontent.com/UW-CSE442-WI20/A3-convolutional-neural-networks/master/Images/horse.png",
    "Plane": "https://raw.githubusercontent.com/UW-CSE442-WI20/A3-convolutional-neural-networks/master/Images/plane.png",
    "Ship": "https://raw.githubusercontent.com/UW-CSE442-WI20/A3-convolutional-neural-networks/master/Images/ship.png",
    "Truck": "https://raw.githubusercontent.com/UW-CSE442-WI20/A3-convolutional-neural-networks/master/Images/truck.png"
};

// kernels
export const kernels = {
    "identity":
        [[0, 0, 0],
         [0, 1, 0],
         [0, 0, 0]],
    "x_sobel":
        [[-1, 0, 1],
         [-2, 0, 2],
         [-1, 0, 1]],
    "y_sobel":
        [[ 1,  2,  1],
         [ 0,  0,  0], 
         [-1, -2, -1]],
    "edge_detection":
        [[0,  1, 0],
         [1, -4, 1],
         [0,  1, 0]],
    "sharpen":
        [[ 0, -1,  0],
         [-1,  5, -1],
         [ 0, -1,  0]],
    "box_blur":
        [[1/9, 1/9, 1/9],
         [1/9, 1/9, 1/9],
         [1/9, 1/9, 1/9]]
};

export const kernelBlurbs =  {
   "identity": "The identity kernel preserves the input image.",
   "x_sobel": "The horizontal sobel kernel detects horizontal changes.",
   "y_sobel": "The vertical sobel kernel detects vertical changes.",
   "edge_detection": "The edge detection kernel highlights edges.",
   "sharpen": "The sharpen kernel sharpens the image by amplifying the input pixel and subtracting surrounding pixels.",
   "box_blur": "The box blur kernel blurs the image by averaging surrounding pixels."
};

export const kernelPrettyNames =  {
   "identity": "Identity",
   "x_sobel": "Horizontal Sobel",
   "y_sobel": "Vertical Sobel",
   "edge_detection": "Edge Detection",
   "sharpen": "Sharpen",
   "box_blur": "Blur"
};

export function recalculateConfig() {
    svgWidth = Math.max(window.innerWidth * 0.8, minSvgWidth);

    img_width = svgWidth * 2 / 5;
    img_height = img_width;

    borderWidth = 1;

    highlightOutlineWidth = 2;

    cellWidth = img_width / (inputWidth + 2);
    cellHeight = img_height / (inputHeight + 2);

    fontSize = cellHeight * 0.9;

    spaceBetween = img_width / 2;

    kernelCellWidth = spaceBetween / 2 / kernelWidth;
    kernelCellHeight = spaceBetween / 2 / kernelHeight;

    kernelFontSize = kernelCellHeight * 0.6;

    document.documentElement.style.setProperty('--thumbSize', `${cellWidth * 3 + 3 * 2 + 2 * 3}px`);
    document.documentElement.style.setProperty('--kernelThumbSize', `${cellWidth}px`);
    document.documentElement.style.setProperty('--kernelThumbFont', `${fontSize}px`);
    document.documentElement.style.setProperty('--titleFontSize', `${kernelFontSize * 4}px`);
    document.documentElement.style.setProperty('--textContentTitleFontSize', `${kernelFontSize * 1.5}px`);
    document.documentElement.style.setProperty('--textContentFontSize', `${kernelFontSize}px`);
}
