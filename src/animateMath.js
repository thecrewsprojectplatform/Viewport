import * as d3 from "d3";
import * as config from './config';

/**
 * Instantiate this section
 */
export function initAnimateMathSection() {
    initSVG();
    drawFrame(false);
}

// Frame data
// Each frame is represented by the matrices visible, separator used, and whether to use color instead of text.
let curFrame = 0;
const frames = [
    {
        'matrices': [
            [['1', '2', '4'],
             ['2', '4', '4'],
             ['2', '0', '0']],
            [['0', '1', '0'],
             ['1', '2', '1'],
             ['0', '1', '0']]
        ],
        'colored': true,
        'separator': '×'
    },
    {
        'matrices': [
            [['1', '2', '4'],
             ['2', '4', '4'],
             ['2', '0', '0']],
            [['0', '1', '0'],
             ['1', '2', '1'],
             ['0', '1', '0']]
        ],
        'colored': false,
        'separator': '×'
    },
    {
        'matrices': [
            [['1×0', '2×1', '4×0'],
             ['2×1', '4×2', '4×1'],
             ['2×0', '0×1', '0×0']]
        ],
        'colored': false,
        'separator': '×'
    },
    {
        'matrices': [
            [['0', '2', '0'],
             ['2', '8', '4'],
             ['0', '0', '0']],
        ],
        'colored': false,
        'separator': '+'
    },
    {
        'matrices': [
            [['0']],
            [['2']],
            [['0']],
            [['2']],
            [['8']],
            [['4']],
            [['0']],
            [['0']],
            [['0']]
        ],
        'colored': false,
        'separator': '+'
    },
    {
        'matrices': [
            [['16']],
        ],
        'colored': false,
        'separator': '+'
    }
];

/** The number of cells wide the gap between matricies is */
const gapSize = 1;

/** The duration of the animation moving cells */
const moveAnimationDuration = 1500;
/** The duration of the animation changing text & coloring cells */
const textAnimationDuration = 1500;

/** Width of cells, height of cells, font size of cells */
let cellWidth = config.kernelCellWidth;
let cellHeight = config.kernelCellHeight;
let fontSize = config.fontSize * 1.5;
    
let buttonWidth = config.cellWidth * 5;
let buttonHeight = config.cellHeight * 2;
let buttonGap = cellHeight;

let leftMargin = cellWidth;
let topMargin = cellHeight;

// Find the maximums of the frame data:
//   Largest total number of cells
//   Largest number of matricies
//   Largest number of rows
//   Largest number of columns(including gaps between matricies)
let maxNumCells = 0;
let maxNumMats = 0;
let maxNumRows = 0;
let maxNumCols = 0;
for (const frame of frames) {
    if (frame.matrices.length > maxNumMats) {
        maxNumMats = frame.matrices.length;
    }
    if (frame.matrices[0].length > maxNumRows) {
        maxNumRows = frame.matrices[0].length;
    }
    if ((frame.matrices[0][0].length) * frame.matrices.length + gapSize * (frame.matrices.length - 1) > maxNumCols) {
        maxNumCols = (frame.matrices[0][0].length) * frame.matrices.length + gapSize * (frame.matrices.length - 1);
    }
    if (frame.matrices.length * frame.matrices[0].length * frame.matrices[0][0].length > maxNumCells) {
        maxNumCells = frame.matrices.length * frame.matrices[0].length * frame.matrices[0][0].length;
    }
}

/**
 * Flattens a 3D array into a 1D array.
 * 
 * @param {any[][][]} a 
 */
function flattenArray(a) {
    return a.flat().flat();
}
/**
 * Stolen from stackoverflow. Check if two arrays are equal(order matters).
 * 
 * @param {any[]} a 
 * @param {any[]} b 
 */
function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

// Pad the cell data for each frame to each have the length of the largest frame.
// Data is padded with "" on the left side.
for (const frame of frames) {
    const flat = flattenArray(frame.matrices);
    const paddedCells = Array(maxNumCells - flat.length).fill('').concat(flat);
    frame.paddedCells = paddedCells;
}

// Width and height of the svg
let svgWidth = leftMargin * 2 + maxNumCols * cellWidth;
let svgHeight = topMargin * 2 + maxNumRows * cellHeight + buttonGap + buttonHeight;

// The cell data that was rendered in the previous frame
let prevCells = [];

/**
 * Initialize the SVG.
 */
function initSVG() {
    const root = d3.select("#animateMathSection")
        .append("svg")
        .attr("id", "animateMathSvg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    // Group for separators(behind the cells)
    const separators = root.append("g").attr("id", "separators");
    separators.selectAll(".separator")
        .data(Array(maxNumMats - 1))
        .enter()
        .append("text")
        .attr("x", -1000)
        .attr("y", -1000)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("font-family", "sans-serif")
        .attr("font-size", fontSize)
        .classed("separator", true);
    
    // Cell Wrappers
    const wrappers = root.selectAll(".cellWrapper")
        .data(Array(maxNumCells))
        .enter()
        .append("g")
        .attr("transform", `translate(${-svgWidth}, ${-svgHeight})`)
        .classed("cellWrapper", true);
    // Cell Color and Outline
    wrappers.append("rect")
        .attr("width", cellWidth)
        .attr("height", cellHeight)
        .attr("fill", "white")
        .attr("stroke", config.borderColor)
        .attr("stroke-width", config.borderWidth)
        .classed("cellColor", true);
    // Cell Text
    wrappers.append("text")
        .attr("x", cellWidth / 2)
        .attr("y", cellHeight / 2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("font-family", "sans-serif")
        .attr("font-size", fontSize)
        .classed("cellText", true);

    // Button Wrappers
    const prevButtonWrapper = root.append("g")
        .attr("id", "prevButtonWrapper")
        .attr("transform", `translate(${(svgWidth / 2) - buttonWidth}, ${topMargin + maxNumRows * cellHeight + buttonGap})`)
        .style("cursor", "pointer")
        .on("click", prevFrame);
    const nextButtonWrapper = d3.select("#animateMathSvg")
        .append("g")
        .attr("id", "nextButtonWrapper")
        .attr("transform", `translate(${svgWidth / 2}, ${topMargin + maxNumRows * cellHeight + buttonGap})`)
        .style("cursor", "pointer")
        .on("click", nextFrame);

    // Button Colors
    prevButtonWrapper.append("rect")
        .attr("width", buttonWidth)
        .attr("height", buttonHeight)
        .attr("fill", config.prevColor)
        .attr("id", "prevButtonColor");
    nextButtonWrapper.append("rect")
        .attr("width", buttonWidth)
        .attr("height", buttonHeight)
        .attr("fill", config.nextColor)
        .attr("id", "nextButtonColor");

    // Button Texts
    prevButtonWrapper.append("text")
        .attr("id", "prevButtonText")
        .attr("x", buttonWidth / 2)
        .attr("y", buttonHeight / 2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("font-family", "sans-serif")
        .attr("font-size", config.fontSize)
        .text("Prev");
    nextButtonWrapper.append("text")
        .attr("id", "nextButtonText")
        .attr("x", buttonWidth / 2)
        .attr("y", buttonHeight / 2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("font-family", "sans-serif")
        .attr("font-size", config.fontSize)
        .text("Next");
}

/**
 * Draw the current frame
 */
function drawFrame(useTransition = true) {
    disableButtons();

    // Hide/Show buttons
    if (curFrame <= 0) {
        d3.select("#animateMathSvg")
            .select("#prevButtonWrapper")
            .attr("visibility", "hidden");
    } else {
        d3.select("#animateMathSvg")
            .select("#prevButtonWrapper")
            .attr("visibility", "visible");
    }

    if (curFrame >= frames.length - 1) {
        d3.select("#animateMathSvg")
            .select("#nextButtonWrapper")
            .attr("visibility", "hidden");
    } else {
        d3.select("#animateMathSvg")
            .select("#nextButtonWrapper")
            .attr("visibility", "visible");
    }

    let t;

    const frameData = frames[curFrame];
    const numCells = frameData.matrices.length * frameData.matrices[0].length * frameData.matrices[0][0].length;

    const leftPadding = leftMargin + cellWidth * ((maxNumCols - ((frameData.matrices[0][0].length) * frameData.matrices.length + gapSize * (frameData.matrices.length - 1))) / 2);
    const topPadding = topMargin + ((maxNumRows - frameData.matrices[0].length) / 2) * cellHeight;

    t = useTransition ?
        d3.transition().duration(moveAnimationDuration).ease(d3.easeCubic) :
        d3.transition().duration(0);

    d3.select("#animateMathSvg")
        .selectAll(".cellWrapper")
        .data(frameData.paddedCells)
        .transition(t)
        .attr("transform", (_, i) => {
            i = i % numCells;

            const matrixI = Math.floor(i / (frameData.matrices[0].length * frameData.matrices[0][0].length));
            const rowI = Math.floor((Math.floor(i % (frameData.matrices[0].length * frameData.matrices[0][0].length))) / frameData.matrices[0][0].length);
            const colI = (Math.floor(i % (frameData.matrices[0].length * frameData.matrices[0][0].length))) % frameData.matrices[0][0].length;

            const matrixGap = frameData.separator !== null ?
                                cellWidth * (frameData.matrices[0][0].length + gapSize) :
                                0;

            return `translate(${leftPadding + matrixI * matrixGap + colI * cellWidth}, ${topPadding + rowI * cellHeight})`;
        })
        .on("end", enableButtons);

    d3.select("#separators")
        .selectAll(".separator")
        .data(Array(maxNumMats - 1))
        .transition(t)
        .attr("x", (_, i) => {
            if (frameData.matrices.length <= 1) {
                return svgWidth / 2;
            } else {
                i = i % (frameData.matrices.length - 1);
                return leftPadding + (cellWidth * frameData.matrices[0][0].length) * (i + 1) + (cellWidth * gapSize * (i + 0.5));
            }
        })
        .attr("y", topPadding + (cellHeight * frameData.matrices[0].length) / 2)
        .text(frameData.separator);

    if (frameData.colored) {
        t = useTransition ?
            d3.transition().duration(moveAnimationDuration).ease(d3.easeCubic):
            d3.transition().duration(0);

        d3.select("#animateMathSvg")
            .selectAll(".cellColor")
            .data(frameData.paddedCells)
            .transition(t)
            .attr("fill", (d, i) => {
                if (d === '' || i >= frameData.matrices[0].length * frameData.matrices[0][0].length) {
                    return "white";
                } else {
                    const val = 255 - (parseInt(d) * 32);
                    return d3.rgb(val, val, val);
                }
            });

        d3.select("#animateMathSvg")
            .selectAll(".cellText")
            .data(frameData.paddedCells)
            .transition(t)
            .text(d => d)
            .attr("fill", (d, i) => {
                if (d === '') {
                    return "white";
                } else if (i >= frameData.matrices[0].length * frameData.matrices[0][0].length) {
                    return "black";
                } else {
                    const val = 255 - (parseInt(d) * 32);
                    return d3.rgb(val, val, val);
                }
            });
        
        prevCells = frameData.paddedCells;
    } else {
        if (!arraysEqual(frameData.paddedCells, prevCells)) {
            t = useTransition ?
                d3.transition().duration(textAnimationDuration / 2).ease(d3.easeCubic):
                d3.transition().duration(0);

            d3.select("#animateMathSvg")
                .selectAll(".cellColor")
                .data(frameData.paddedCells)
                .transition(t)
                .attr("fill", "white");

            d3.select("#animateMathSvg")
                .selectAll(".cellText")
                .data(frameData.paddedCells)
                .transition(t)
                .attr("fill", "white")
                .on("end", appearText);
            
            function appearText() {
                t = useTransition ?
                    d3.transition().duration(textAnimationDuration / 2).ease(d3.easeCubic):
                    d3.transition().duration(0);
                d3.select("#animateMathSvg")
                    .selectAll(".cellText")
                    .data(frameData.paddedCells)
                    .text(d => d)
                    .transition(t)
                    .attr("fill", "black");
            }

            prevCells = frameData.paddedCells;
        } else {
            t = useTransition ?
                d3.transition().duration(textAnimationDuration).ease(d3.easeCubic):
                d3.transition().duration(0);

            d3.select("#animateMathSvg")
                .selectAll(".cellColor")
                .data(frameData.paddedCells)
                .transition(t)
                .attr("fill", "white");

            d3.select("#animateMathSvg")
                .selectAll(".cellText")
                .data(frameData.paddedCells)
                .transition(t)
                .attr("fill", "black");
        }
    }
}

function disableButtons() {
    d3.select("#animateMathSvg")
        .select("#prevButtonColor")
        .attr("fill", config.disableColor);
    d3.select("#animateMathSvg")
        .select("#nextButtonColor")
        .attr("fill", config.disableColor);
    
    d3.select("#animateMathSvg")
        .select("#prevButtonWrapper")
        .style("cursor", "default")
        .on("click", () => {});
    d3.select("#animateMathSvg")
        .select("#nextButtonWrapper")
        .style("cursor", "default")
        .on("click", () => {});
}

function enableButtons() {
    d3.select("#animateMathSvg")
        .select("#prevButtonColor")
        .attr("fill", config.prevColor);
    d3.select("#animateMathSvg")
        .select("#nextButtonColor")
        .attr("fill", config.nextColor);
    
    d3.select("#animateMathSvg")
        .select("#prevButtonWrapper")
        .style("cursor", "pointer")
        .on("click", prevFrame);
    d3.select("#animateMathSvg")
        .select("#nextButtonWrapper")
        .style("cursor", "pointer")
        .on("click", nextFrame);
}

function prevFrame() {
    --curFrame;

    drawFrame();
}
function nextFrame() {
    ++curFrame;
    drawFrame();
}

export function resizeAnimateMath() {
    cellWidth = config.kernelCellWidth;
    cellHeight = config.kernelCellHeight;
    fontSize = config.fontSize * 1.5;
    
    buttonWidth = config.cellWidth * 5;
    buttonHeight = config.cellHeight * 2;
    buttonGap = cellHeight;

    leftMargin = cellWidth;
    topMargin = cellHeight;

    svgWidth = leftMargin * 2 + maxNumCols * cellWidth;
    svgHeight = topMargin * 2 + maxNumRows * cellHeight + buttonGap + buttonHeight;

    const root = d3.select("#animateMathSection")
        .select("#animateMathSvg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    // Group for separators(behind the cells)
    root.select("#separators")
        .selectAll(".separator")
        .attr("font-size", fontSize);
    
    // Cell Wrappers
    const wrappers = root.selectAll(".cellWrapper")
        .attr("transform", `translate(${-svgWidth}, ${-svgHeight})`);
    // Cell Color and Outline
    wrappers.selectAll(".cellColor")
        .attr("width", cellWidth)
        .attr("height", cellHeight)
        .attr("stroke-width", config.borderWidth);
    // Cell Text
    wrappers.selectAll(".cellText")
        .attr("x", cellWidth / 2)
        .attr("y", cellHeight / 2)
        .attr("font-size", fontSize);

    // Button Wrappers
    const prevButtonWrapper = root.select("#prevButtonWrapper")
        .attr("transform", `translate(${(svgWidth / 2) - buttonWidth}, ${topMargin + maxNumRows * cellHeight + buttonGap})`);
    prevButtonWrapper.select("#prevButtonColor")
        .attr("width", buttonWidth)
        .attr("height", buttonHeight);
    prevButtonWrapper.select("#prevButtonText")
        .attr("x", buttonWidth / 2)
        .attr("y", buttonHeight / 2)
        .attr("font-size", config.fontSize);
        
    const nextButtonWrapper = root.select("#nextButtonWrapper")
        .attr("transform", `translate(${svgWidth / 2}, ${topMargin + maxNumRows * cellHeight + buttonGap})`);
    nextButtonWrapper.select("#nextButtonColor")
        .attr("width", buttonWidth)
        .attr("height", buttonHeight);
    nextButtonWrapper.select("#nextButtonText")
        .attr("x", buttonWidth / 2)
        .attr("y", buttonHeight / 2)
        .attr("font-size", config.fontSize);
    
    drawFrame(false);
}
